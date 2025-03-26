import React from 'react';
import { 
  Home, 
  BarChart, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut,
  Video,
  FileVideo 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard', active: true },
    { icon: Video, label: 'Live Cameras', path: '/cameras', active: false },
    { icon: FileVideo, label: 'Recorded Videos', path: '/recordings', active: false },
    { icon: BarChart, label: 'Analytics', path: '/analytics', active: false },
    { icon: Users, label: 'Users', path: '/users', active: false },
    { icon: Settings, label: 'Settings', path: '/settings', active: false },
  ];

  return (
    <div className={`
      fixed top-0 left-0 h-full bg-white shadow-lg 
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      w-64 z-50 py-6
    `}>
      <div className="flex justify-between items-center px-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Multi-Camera App</h2>
        <button 
          onClick={onClose} 
          className="text-gray-600 hover:text-gray-900"
        >
          <span className="text-2xl">&times;</span>
        </button>
      </div>

      <nav className="space-y-2 px-4">
        {menuItems.map((item, index) => (
          <Link 
            to={item.path}
            key={index} 
            className={`
              w-full flex items-center space-x-3 px-4 py-3 rounded-lg 
              transition-colors duration-200
              ${item.active 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'}
            `}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 border-t py-4 px-4">
        <button 
          className="w-full flex items-center space-x-3 text-red-600 hover:bg-red-50 px-4 py-3 rounded-lg"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
        <div className="flex items-center space-x-3 mt-2 text-gray-500">
          <HelpCircle size={18} />
          <span className="text-sm">Help & Support</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;