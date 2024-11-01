import { Menu, Package2, Search, Truck, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Package2 className="h-8 w-8" />
              <span className="font-bold text-xl">ShipLink</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/search" className="hover:bg-indigo-500 px-3 py-2 rounded-md">
                <Search className="inline-block h-5 w-5 mr-1" />
                Find Journeys
              </Link>
              <Link to="/carriers" className="hover:bg-indigo-500 px-3 py-2 rounded-md">
                <Truck className="inline-block h-5 w-5 mr-1" />
                Carriers
              </Link>
              <Link to="/profile" className="hover:bg-indigo-500 px-3 py-2 rounded-md">
                <User className="inline-block h-5 w-5 mr-1" />
                Profile
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-indigo-500"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/search"
              className="block hover:bg-indigo-500 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              <Search className="inline-block h-5 w-5 mr-1" />
              Find Journeys
            </Link>
            <Link
              to="/carriers"
              className="block hover:bg-indigo-500 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              <Truck className="inline-block h-5 w-5 mr-1" />
              Carriers
            </Link>
            <Link
              to="/profile"
              className="block hover:bg-indigo-500 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              <User className="inline-block h-5 w-5 mr-1" />
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}