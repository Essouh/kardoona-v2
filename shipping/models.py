from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.db.models.signals import post_save
from django.dispatch import receiver

class UserProfile(models.Model):
    USER_TYPE_CHOICES = [
        ('CARRIER', 'Carrier'),
        ('SENDER', 'Sender'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=7, choices=USER_TYPE_CHOICES)
    phone = models.CharField(max_length=20)
    profile_image = models.ImageField(upload_to='profiles/', null=True, blank=True)

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.type})"

class CarrierProfile(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    company_name = models.CharField(max_length=100)
    business_registration = models.CharField(max_length=50)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=5.00)
    review_count = models.PositiveIntegerField(default=0)
    preferred_routes = models.JSONField(default=list, blank=True)
    special_rates = models.JSONField(default=dict, blank=True)
    verified = models.BooleanField(default=False)
    insurance_info = models.JSONField(default=dict, blank=True)
    total_deliveries = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return f"{self.company_name} ({self.user_profile.user.email})"

class SenderProfile(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    shipping_addresses = models.JSONField(default=list, blank=True)
    preferred_carriers = models.ManyToManyField(CarrierProfile, blank=True)
    total_packages = models.PositiveIntegerField(default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=5.00)
    review_count = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return f"{self.user_profile.user.get_full_name()}"

@receiver(post_save, sender=UserProfile)
def create_specific_profile(sender, instance, created, **kwargs):
    if created:
        if instance.type == 'CARRIER':
            CarrierProfile.objects.create(user_profile=instance)
        else:
            SenderProfile.objects.create(user_profile=instance)

class Vehicle(models.Model):
    carrier = models.ForeignKey(CarrierProfile, on_delete=models.CASCADE)
    license_plate = models.CharField(max_length=20)
    type = models.CharField(max_length=50)
    brand = models.CharField(max_length=50)
    capacity = models.PositiveIntegerField()  # in kg
    documents = models.JSONField(default=dict, blank=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.brand} - {self.license_plate}"

class Journey(models.Model):
    carrier = models.ForeignKey(CarrierProfile, on_delete=models.CASCADE)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    departure_city = models.CharField(max_length=100)
    arrival_city = models.CharField(max_length=100)
    departure_date = models.DateTimeField()
    collection_date = models.DateTimeField()
    collection_address = models.TextField()
    price_per_kg = models.DecimalField(max_digits=10, decimal_places=2)
    available_capacity = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('SCHEDULED', 'Scheduled'),
            ('IN_PROGRESS', 'In Progress'),
            ('COMPLETED', 'Completed'),
            ('CANCELLED', 'Cancelled')
        ],
        default='SCHEDULED'
    )

    def __str__(self):
        return f"{self.departure_city} → {self.arrival_city} ({self.departure_date})"

class StopPoint(models.Model):
    journey = models.ForeignKey(Journey, related_name='stop_points', on_delete=models.CASCADE)
    city = models.CharField(max_length=100)
    address = models.TextField()
    collection_date = models.DateTimeField()
    available_capacity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.city} - {self.collection_date}"

class Package(models.Model):
    SIZE_CHOICES = [
        ('SMALL', 'Small'),
        ('MEDIUM', 'Medium'),
        ('LARGE', 'Large'),
    ]

    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('IN_TRANSIT', 'In Transit'),
        ('DELIVERED', 'Delivered'),
        ('CANCELLED', 'Cancelled')
    ]

    sender = models.ForeignKey(SenderProfile, on_delete=models.CASCADE)
    journey = models.ForeignKey(Journey, on_delete=models.CASCADE)
    sender_id_card = models.CharField(max_length=50)
    sender_phone = models.CharField(max_length=20)
    recipient_phone = models.CharField(max_length=20)
    size = models.CharField(max_length=6, choices=SIZE_CHOICES)
    weight = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(15)]
    )
    contents = models.JSONField()
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='PENDING'
    )
    tracking_number = models.CharField(max_length=50, unique=True)
    pickup_code = models.CharField(max_length=6)
    delivery_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Package {self.tracking_number} - {self.sender.user_profile.user.get_full_name()}"

class Review(models.Model):
    REVIEW_TYPE_CHOICES = [
        ('CARRIER', 'Carrier Review'),
        ('SENDER', 'Sender Review'),
    ]

    reviewer = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name='reviews_given'
    )
    reviewed = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name='reviews_received'
    )
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1)])
    comment = models.TextField()
    review_type = models.CharField(max_length=7, choices=REVIEW_TYPE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.reviewer} for {self.reviewed}"