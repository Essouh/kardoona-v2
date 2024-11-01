import { Package2, Star, Truck } from 'lucide-react';
import type { Package, User } from '../types';

export default function UserProfile() {
  // Mock data - would come from API in real app
  const user: User = {
    id: '2',
    type: 'SENDER',
    name: 'Alice Smith',
    email: 'alice@example.com',
    phone: '+33987654321',
    rating: 4.9,
    reviewCount: 23,
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
  };

  const packages: Package[] = [
    {
      id: '1',
      sender: user,
      senderPhone: user.phone,
      recipientPhone: '+21612345678',
      size: 'MEDIUM',
      weight: 25,
      contents: ['Clothes', 'Books', 'Electronics'],
      status: 'IN_TRANSIT',
      journey: {
        id: '1',
        vehicle: {
          id: '1',
          licensePlate: 'AB123CD',
          type: 'Truck',
          brand: 'Mercedes',
          capacity: 2000
        },
        departureCity: 'Paris',
        arrivalCity: 'Tunis',
        departureDate: new Date('2024-04-01'),
        collectionDate: new Date('2024-03-30'),
        collectionAddress: '123 Rue de Paris',
        stopPoints: [],
        pricePerKg: 8,
        carrier: {
          id: '1',
          type: 'CARRIER',
          name: 'John Doe Transport',
          email: 'john@example.com',
          phone: '+33123456789',
          rating: 4.8,
          reviewCount: 156
        }
      }
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={user.profileImage}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <Star className="h-5 w-5 text-yellow-400 mr-1" />
              <span className="font-semibold">{user.rating}</span>
              <span className="mx-2">•</span>
              <span>{user.reviewCount} reviews</span>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Contact Information</h3>
              <div className="space-y-1 text-gray-600">
                <p>{user.phone}</p>
                <p>{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Packages */}
      <h2 className="text-xl font-semibold mb-4">My Packages</h2>
      <div className="space-y-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <Package2 className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="font-semibold">
                      {pkg.journey.departureCity} → {pkg.journey.arrivalCity}
                    </div>
                    <div className="text-sm text-gray-600">
                      {pkg.journey.departureDate.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium">
                    {pkg.status.replace('_', ' ')}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-gray-700">Package Details</div>
                    <div className="text-gray-600">
                      <div>Size: {pkg.size}</div>
                      <div>Weight: {pkg.weight}kg</div>
                      <div>Contents: {pkg.contents.join(', ')}</div>
                    </div>
                  </div>

                  <div>
                    <div className="font-medium text-gray-700">Recipient</div>
                    <div className="text-gray-600">
                      Phone: {pkg.recipientPhone}
                    </div>
                  </div>

                  <div>
                    <div className="font-medium text-gray-700">Carrier</div>
                    <div className="flex items-center text-gray-600">
                      <Truck className="h-4 w-4 mr-1" />
                      {pkg.journey.carrier.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}