from django_filters import rest_framework as filters
from .models import Journey, Package

class JourneyFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name="price_per_kg", lookup_expr='gte')
    max_price = filters.NumberFilter(field_name="price_per_kg", lookup_expr='lte')
    departure_date_after = filters.DateFilter(field_name="departure_date", lookup_expr='gte')
    departure_date_before = filters.DateFilter(field_name="departure_date", lookup_expr='lte')

    class Meta:
        model = Journey
        fields = ['carrier', 'departure_city', 'arrival_city', 'min_price', 'max_price',
                 'departure_date_after', 'departure_date_before']

class PackageFilter(filters.FilterSet):
    min_weight = filters.NumberFilter(field_name="weight", lookup_expr='gte')
    max_weight = filters.NumberFilter(field_name="weight", lookup_expr='lte')
    created_after = filters.DateFilter(field_name="created_at", lookup_expr='gte')
    created_before = filters.DateFilter(field_name="created_at", lookup_expr='lte')

    class Meta:
        model = Package
        fields = ['sender', 'journey', 'status', 'size', 'min_weight', 'max_weight',
                 'created_after', 'created_before']