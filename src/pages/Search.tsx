import { Calendar, MapPin, Search as SearchIcon, Truck } from 'lucide-react';
import { useState } from 'react';
import type { Journey } from '../types';

export default function Search() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  // Mock data - would come from API in real app
  const journeys: Journey[] = [
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
    // Add more mock journeys here
  ];

  return (
    <div className="space-y-8">
      {/* Search Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Departure city"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Arrival city"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center"
            >
              <SearchIcon className="h-5 w-5 mr-2" />
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {journeys.map((journey) => (
          <div
            key={journey.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Truck className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{journey.carrier.name}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="flex items-center">
                        ⭐ {journey.carrier.rating}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{journey.carrier.reviewCount} reviews</span>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Departure</div>
                    <div className="font-semibold">{journey.departureCity}</div>
                    <div className="text-sm text-gray-600">
                      {journey.departureDate.toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Arrival</div>
                    <div className="font-semibold">{journey.arrivalCity}</div>
                    <div className="text-sm text-gray-600">
                      Collection: {journey.collectionDate.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between items-end">
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-600">
                    {journey.pricePerKg}€
                  </div>
                  <div className="text-sm text-gray-600">per kg</div>
                </div>
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}