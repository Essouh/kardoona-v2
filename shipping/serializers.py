from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    UserProfile, CarrierProfile, SenderProfile, Vehicle,
    Journey, StopPoint, Package, Review
)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')
        read_only_fields = ('id',)

class CarrierProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(source='user_profile.user', read_only=True)
    phone = serializers.CharField(source='user_profile.phone')
    profile_image = serializers.ImageField(source='user_profile.profile_image')

    class Meta:
        model = CarrierProfile
        fields = '__all__'
        read_only_fields = ('user', 'rating', 'review_count', 'total_deliveries', 'verified')

class SenderProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(source='user_profile.user', read_only=True)
    phone = serializers.CharField(source='user_profile.phone')
    profile_image = serializers.ImageField(source='user_profile.profile_image')

    class Meta:
        model = SenderProfile
        fields = '__all__'
        read_only_fields = ('user', 'rating', 'review_count', 'total_packages')

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'
        read_only_fields = ('carrier',)

class StopPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = StopPoint
        fields = '__all__'
        read_only_fields = ('journey', 'available_capacity')

class JourneySerializer(serializers.ModelSerializer):
    stop_points = StopPointSerializer(many=True, read_only=True)
    carrier = CarrierProfileSerializer(read_only=True)
    vehicle = VehicleSerializer(read_only=True)

    class Meta:
        model = Journey
        fields = '__all__'
        read_only_fields = ('carrier', 'available_capacity', 'status')

    def create(self, validated_data):
        stop_points_data = self.context.get('stop_points', [])
        journey = Journey.objects.create(**validated_data)
        
        for stop_point_data in stop_points_data:
            StopPoint.objects.create(
                journey=journey,
                available_capacity=journey.available_capacity,
                **stop_point_data
            )
        
        return journey

class PackageSerializer(serializers.ModelSerializer):
    sender = SenderProfileSerializer(read_only=True)
    journey = JourneySerializer(read_only=True)

    class Meta:
        model = Package
        fields = '__all__'
        read_only_fields = (
            'sender', 'tracking_number', 'pickup_code',
            'delivery_code', 'status'
        )

class ReviewSerializer(serializers.ModelSerializer):
    reviewer = UserSerializer(source='reviewer.user', read_only=True)
    reviewed = UserSerializer(source='reviewed.user', read_only=True)

    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('reviewer', 'reviewed', 'review_type')