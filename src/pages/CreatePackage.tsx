import { Box, Package2, Phone, User } from 'lucide-react';
import { useState } from 'react';
import type { PackageSize } from '../types';

export default function CreatePackage() {
  const [contents, setContents] = useState<string[]>([]);
  const [size, setSize] = useState<PackageSize>('MEDIUM');

  const addContent = () => {
    setContents([...contents, '']);
  };

  const updateContent = (index: number, value: string) => {
    const newContents = [...contents];
    newContents[index] = value;
    setContents(newContents);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New Package</h1>

      <form className="space-y-8">
        {/* Sender Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Sender Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Card Number
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="ID number"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="+1234567890"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recipient Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Recipient Information</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="+1234567890"
              />
            </div>
          </div>
        </div>

        {/* Package Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Package Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <div className="grid grid-cols-3 gap-4">
                {(['SMALL', 'MEDIUM', 'LARGE'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`p-4 rounded-lg border ${
                      size === s
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                        : 'border-gray-200 hover:border-gray-300'
                    } flex flex-col items-center justify-center`}
                  >
                    <Box className={`h-6 w-6 ${
                      size === s ? 'text-indigo-600' : 'text-gray-400'
                    }`} />
                    <span className="mt-1 text-sm font-medium">
                      {s.charAt(0) + s.slice(1).toLowerCase()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                min="15"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Minimum 15kg"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Contents
                </label>
                <button
                  type="button"
                  onClick={addContent}
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  + Add Item
                </button>
              </div>
              <div className="space-y-2">
                {contents.map((content, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={content}
                      onChange={(e) => updateContent(index, e.target.value)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      placeholder="Item description"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newContents = [...contents];
                        newContents.splice(index, 1);
                        setContents(newContents);
                      }}
                      className="px-3 py-2 text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {contents.length === 0 && (
                  <div className="text-sm text-gray-500 text-center py-4 border-2 border-dashed rounded-lg">
                    Click "Add Item" to list package contents
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 flex items-center"
          >
            <Package2 className="h-5 w-5 mr-2" />
            Create Package
          </button>
        </div>
      </form>
    </div>
  );
}