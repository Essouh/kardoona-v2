export type Vehicle = {
  id: string;
  licensePlate: string;
  type: string;
  brand: string;
  capacity: number;
};

export type StopPoint = {
  city: string;
  address: string;
  collectionDate: Date;
};

export type Journey = {
  id: string;
  vehicle: Vehicle;
  departureCity: string;
  arrivalCity: string;
  departureDate: Date;
  collectionDate: Date;
  collectionAddress: string;
  stopPoints: StopPoint[];
  pricePerKg: number;
  carrier: User;
};

export type PackageSize = 'SMALL' | 'MEDIUM' | 'LARGE';

export type Package = {
  id: string;
  sender: User;
  senderPhone: string;
  recipientPhone: string;
  size: PackageSize;
  weight: number;
  contents: string[];
  journey: Journey;
  status: 'PENDING' | 'APPROVED' | 'IN_TRANSIT' | 'DELIVERED';
};

export type User = {
  id: string;
  type: 'CARRIER' | 'SENDER';
  name: string;
  email: string;
  phone: string;
  rating: number;
  reviewCount: number;
  profileImage?: string;
  preferredRoutes?: string[];
  specialRates?: Record<string, number>;
};