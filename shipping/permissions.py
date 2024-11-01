from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Check if the object has a user_profile attribute
        if hasattr(obj, 'user_profile'):
            return obj.user_profile.user == request.user
        
        # Check if the object has a carrier attribute
        elif hasattr(obj, 'carrier'):
            return obj.carrier.user_profile.user == request.user
        
        # Check if the object has a sender attribute
        elif hasattr(obj, 'sender'):
            return obj.sender.user_profile.user == request.user
        
        # Check if the object is a review
        elif hasattr(obj, 'reviewer'):
            return obj.reviewer.user == request.user
        
        return False

class IsCarrierOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return (
            request.user.is_authenticated and
            hasattr(request.user, 'userprofile') and
            request.user.userprofile.type == 'CARRIER'
        )