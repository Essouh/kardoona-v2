import { ArrowRight, Package2, Star, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Connect with Trusted Carriers
          <br />
          <span className="text-indigo-600">Worldwide</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Ship your packages between Europe and Africa with verified carriers.
          Track your deliveries and manage everything in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/search"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Find a Carrier
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/journey/new"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
          >
            Register as Carrier
            <Truck className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <Package2 className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Easy Shipping</h3>
          <p className="text-gray-600">
            Book your shipment in minutes. Track your package from pickup to delivery.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <Truck className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Verified Carriers</h3>
          <p className="text-gray-600">
            All carriers are verified and rated by our community for your peace of mind.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <Star className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Trusted Community</h3>
          <p className="text-gray-600">
            Read reviews and ratings from real users before choosing your carrier.
          </p>
        </div>
      </section>

      {/* Featured Routes */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Popular Routes</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { from: 'Paris', to: 'Tunis', price: '8' },
            { from: 'Marseille', to: 'Algiers', price: '7' },
            { from: 'Brussels', to: 'Casablanca', price: '9' },
          ].map((route) => (
            <Link
              key={`${route.from}-${route.to}`}
              to="/search"
              className="block bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">{route.from}</span>
                <ArrowRight className="h-5 w-5 text-gray-400" />
                <span className="text-lg font-semibold">{route.to}</span>
              </div>
              <div className="text-sm text-gray-600">
                From {route.price}€/kg
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}