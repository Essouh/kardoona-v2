from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'profiles', views.UserProfileViewSet)
router.register(r'vehicles', views.VehicleViewSet)
router.register(r'journeys', views.JourneyViewSet)
router.register(r'packages', views.PackageViewSet)
router.register(r'reviews', views.ReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
]