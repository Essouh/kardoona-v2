from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404
from .models import (
    UserProfile, CarrierProfile, SenderProfile, Vehicle,
    Journey, Package, Review
)
from .serializers import (
    CarrierProfileSerializer, SenderProfileSerializer, VehicleSerializer,
    JourneySerializer, PackageSerializer, ReviewSerializer
)
from .permissions import IsCarrierOrReadOnly, IsOwnerOrReadOnly
import uuid
import random
import string

class CarrierProfileViewSet(viewsets.ModelViewSet):
    queryset = CarrierProfile.objects.all()
    serializer_class = CarrierProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = [
        'user_profile__user__username',
        'user_profile__user__email',
        'company_name'
    ]

    def get_queryset(self):
        queryset = CarrierProfile.objects.all()
        verified = self.request.query_params.get('verified', None)
        if verified is not None:
            queryset = queryset.filter(verified=verified.lower() == 'true')
        return queryset

    @action(detail=True, methods=['post'])
    def verify(self, request, pk=None):
        carrier = self.get_object()
        if request.user.is_staff:
            carrier.verified = True
            carrier.save()
            return Response({'status': 'carrier verified'})
        return Response(
            {'error': 'Only staff can verify carriers'},
            status=status.HTTP_403_FORBIDDEN
        )

class SenderProfileViewSet(viewsets.ModelViewSet):
    queryset = SenderProfile.objects.all()
    serializer_class = SenderProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = [
        'user_profile__user__username',
        'user_profile__user__email'
    ]

    @action(detail=True, methods=['post'])
    def add_shipping_address(self, request, pk=None):
        sender = self.get_object()
        address = request.data.get('address')
        if address:
            addresses = sender.shipping_addresses
            addresses.append(address)
            sender.shipping_addresses = addresses
            sender.save()
            return Response({'status': 'address added'})
        return Response(
            {'error': 'Address is required'},
            status=status.HTTP_400_BAD_REQUEST
        )

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    permission_classes = [permissions.IsAuthenticated, IsCarrierOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['carrier', 'type', 'active']

    def perform_create(self, serializer):
        carrier = get_object_or_404(
            CarrierProfile,
            user_profile__user=self.request.user
        )
        serializer.save(carrier=carrier)

class JourneyViewSet(viewsets.ModelViewSet):
    queryset = Journey.objects.all()
    serializer_class = JourneySerializer
    permission_classes = [permissions.IsAuthenticated, IsCarrierOrReadOnly]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter
    ]
    filterset_fields = [
        'carrier',
        'departure_city',
        'arrival_city',
        'status'
    ]
    search_fields = ['departure_city', 'arrival_city']
    ordering_fields = ['departure_date', 'price_per_kg']

    def perform_create(self, serializer):
        carrier = get_object_or_404(
            CarrierProfile,
            user_profile__user=self.request.user
        )
        vehicle = get_object_or_404(Vehicle, id=self.request.data.get('vehicle'))
        serializer.save(
            carrier=carrier,
            vehicle=vehicle,
            available_capacity=vehicle.capacity
        )

    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        journey = self.get_object()
        status = request.data.get('status')
        if status in dict(Journey.status.field.choices):
            journey.status = status
            journey.save()
            return Response({'status': 'updated'})
        return Response(
            {'error': 'Invalid status'},
            status=status.HTTP_400_BAD_REQUEST
        )

class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['sender', 'journey', 'status', 'size']
    ordering_fields = ['created_at', 'weight']

    def generate_codes(self):
        return (
            ''.join(random.choices(string.ascii_uppercase + string.digits, k=6)),
            ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        )

    def perform_create(self, serializer):
        sender = get_object_or_404(
            SenderProfile,
            user_profile__user=self.request.user
        )
        journey = get_object_or_404(Journey, id=self.request.data.get('journey'))
        
        if journey.available_capacity < float(self.request.data.get('weight', 0)):
            raise serializers.ValidationError(
                'Package weight exceeds available capacity'
            )

        tracking_number = str(uuid.uuid4().hex[:10].upper())
        pickup_code, delivery_code = self.generate_codes()
        
        serializer.save(
            sender=sender,
            journey=journey,
            tracking_number=tracking_number,
            pickup_code=pickup_code,
            delivery_code=delivery_code
        )

    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        package = self.get_object()
        new_status = request.data.get('status')
        code = request.data.get('code')

        if new_status not in dict(Package.STATUS_CHOICES):
            return Response(
                {'error': 'Invalid status'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if new_status == 'IN_TRANSIT' and code != package.pickup_code:
            return Response(
                {'error': 'Invalid pickup code'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if new_status == 'DELIVERED' and code != package.delivery_code:
            return Response(
                {'error': 'Invalid delivery code'},
                status=status.HTTP_400_BAD_REQUEST
            )

        package.status = new_status
        package.save()

        if new_status == 'DELIVERED':
            package.sender.total_packages += 1
            package.sender.save()
            package.journey.carrier.total_deliveries += 1
            package.journey.carrier.save()

        return Response({'status': 'updated'})

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['reviewer', 'reviewed', 'package', 'review_type']
    ordering_fields = ['created_at', 'rating']

    def perform_create(self, serializer):
        package = get_object_or_404(Package, id=self.request.data.get('package'))
        reviewer = get_object_or_404(
            UserProfile,
            user=self.request.user
        )
        
        if reviewer.type == 'CARRIER':
            reviewed = package.sender.user_profile
            review_type = 'SENDER'
        else:
            reviewed = package.journey.carrier.user_profile
            review_type = 'CARRIER'

        serializer.save(
            reviewer=reviewer,
            reviewed=reviewed,
            package=package,
            review_type=review_type
        )