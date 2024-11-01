import { MapPin, Package2, Star, Truck } from 'lucide-react';
import type { Journey, User } from '../types';

export default function CarrierProfile() {
  // Mock data - would come from API in real app
  const carrier: User = {
    id: '1',
    type: 'CARRIER',
    name: 'John Doe Transport',
    email: 'john@example.com',
    phone: '+33123456789',
    rating: 4.8,
    reviewCount: 156,
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    preferredRoutes: ['Paris - Tunis', 'Marseille - Algiers'],
    specialRates: {
      'Car Parts': 1.5,
      'Electronics': 2.0,
      'Furniture': 3.0
    }
  };

  const upcomingJourneys: Journey[] = [
    {
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
      stopPoints: [
        {
          city: 'Lyon',
          address: '456 Avenue Lyon',
          collectionDate: new Date('2024-03-30')
        }
      ],
      pricePerKg: 8,
      carrier
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={carrier.profileImage}
            alt={carrier.name}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{carrier.name}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <Star className="h-5 w-5 text-yellow-400 mr-1" />
              <span className="font-semibold">{carrier.rating}</span>
              <span className="mx-2">•</span>
              <span>{carrier.reviewCount} reviews</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <div className="space-y-1 text-gray-600">
                  <p>{carrier.phone}</p>
                  <p>{carrier.email}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Preferred Routes</h3>
                <div className="space-y-1">
                  {carrier.preferredRoutes?.map((route) => (
                    <div
                      key={route}
                      className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-600 mr-2"
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      {route}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Special Rates */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Special Rates</h2>
            <div className="space-y-3">
              {Object.entries(carrier.specialRates || {}).map(([item, rate]) => (
                <div
                  key={item}
                  className="flex justify-between items-center text-gray-600"
                >
                  <span>{item}</span>
                  <span className="font-semibold">+{rate}x</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Journeys */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Upcoming Journeys</h2>
          <div className="space-y-4">
            {upcomingJourneys.map((journey) => (
              <div
                key={journey.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Truck className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="font-semibold">
                      {journey.departureCity} → {journey.arrivalCity}
                    </div>
                    <div className="text-sm text-gray-600">
                      {journey.departureDate.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-xl font-bold text-indigo-600">
                      {journey.pricePerKg}€
                    </div>
                    <div className="text-sm text-gray-600">per kg</div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <div className="font-medium">Collection Address:</div>
                    <div>{journey.collectionAddress}</div>
                  </div>
                  <div>
                    <div className="font-medium">Stop Points:</div>
                    <div>
                      {journey.stopPoints.map((stop) => (
                        <div key={stop.city}>
                          {stop.city} - {stop.collectionDate.toLocaleDateString()}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}