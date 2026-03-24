import { useState } from 'react';
import { MapPin, Clock, AlertCircle, Navigation, Phone } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

interface BusLocation {
  id: string;
  busNumber: string;
  driverName: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  lastUpdate: string;
  eta: string;
  distance: number;
  students: number;
}

interface BusStop {
  id: string;
  name: string;
  distance: number;
  eta: string;
  students: number;
}

const BUS_LOCATION_DATA: BusLocation = {
  id: 'bus_001',
  busNumber: 'SB-2024',
  driverName: 'Mr. Rajesh Kumar',
  latitude: 28.6139,
  longitude: 77.2090,
  speed: 45,
  heading: 180,
  lastUpdate: '2 minutes ago',
  eta: '8 minutes',
  distance: 2.4,
  students: 32
};

const BUS_STOPS: BusStop[] = [
  { id: '1', name: 'School Gate', distance: 0, eta: 'Now', students: 0 },
  { id: '2', name: 'City Center Mall', distance: 0.5, eta: '2 min', students: 3 },
  { id: '3', name: 'Blue Park Society', distance: 1.2, eta: '4 min', students: 5 },
  { id: '4', name: 'Green Valley Road', distance: 2.4, eta: '8 min', students: 12 },
  { id: '5', name: 'Your Stop - Maple Lane', distance: 3.1, eta: '12 min', students: 1 }
];

export const BusTrackingPage: React.FC = () => {
  const [bus, setBus] = useState<BusLocation>(BUS_LOCATION_DATA);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setBus(prev => ({
        ...prev,
        lastUpdate: 'Just now',
        speed: Math.floor(Math.random() * 60) + 20,
        distance: Math.max(0, prev.distance - 0.1)
      }));
      setRefreshing(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bus Tracking</h1>
        <p className="text-gray-600">Real-time location of your school bus</p>
      </div>

      {/* Bus Status Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold text-gray-900">{bus.busNumber}</h2>
              <p className="text-sm text-gray-600">Driver: {bus.driverName}</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-green-700">Live</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600">Distance</p>
              <p className="text-lg font-bold text-gray-900">{bus.distance.toFixed(1)} km</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600">ETA</p>
              <p className="text-lg font-bold text-gray-900">{bus.eta}</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600">Speed</p>
              <p className="text-lg font-bold text-gray-900">{bus.speed} km/h</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600">Students</p>
              <p className="text-lg font-bold text-gray-900">{bus.students}</p>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {refreshing ? 'Updating...' : 'Refresh Location'}
            </Button>
            <Button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white gap-2">
              <Phone size={16} />
              Call Driver
            </Button>
          </div>

          <p className="text-xs text-gray-600 text-center">Last updated: {bus.lastUpdate}</p>
        </div>
      </Card>

      {/* Map Mock */}
      <Card>
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 aspect-video rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-3">
          <MapPin size={48} className="text-blue-600" />
          <div className="text-center">
            <p className="font-semibold text-gray-900">Live Bus Map</p>
            <p className="text-sm text-gray-600">Integration ready for Google Maps API</p>
          </div>
        </div>
      </Card>

      {/* Route Stops */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3">Your Route</h3>
        <Card>
          <div className="space-y-0">
            {BUS_STOPS.map((stop, index) => (
              <div
                key={stop.id}
                className={`flex gap-4 p-3 border-b border-gray-200 last:border-b-0 ${
                  index <= 3 ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    index === 4 ? 'bg-purple-600 border-purple-600' : 'bg-white border-blue-600'
                  }`} />
                  {index < BUS_STOPS.length - 1 && (
                    <div className="w-0.5 h-8 bg-gray-300 my-1" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{stop.name}</p>
                  <div className="flex gap-4 mt-1">
                    <span className="text-xs text-gray-600 flex items-center gap-1">
                      <Navigation size={12} /> {stop.distance} km
                    </span>
                    <span className="text-xs text-gray-600 flex items-center gap-1">
                      <Clock size={12} /> {stop.eta}
                    </span>
                  </div>
                </div>
                {stop.students > 0 && (
                  <div className="bg-blue-100 px-2 py-1 rounded text-xs font-semibold text-blue-700">
                    {stop.students} student{stop.students !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Safety Notice */}
      <Card className="bg-amber-50 border-amber-200">
        <div className="flex gap-3">
          <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900">Safety Reminder</p>
            <p className="text-sm text-amber-800 mt-1">
              Always wait at your designated stop. Make sure an adult is present to pick you up after the bus arrives.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};