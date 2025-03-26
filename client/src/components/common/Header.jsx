import React from 'react';
import { Menu, Search, Bell, User } from 'lucide-react';

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md flex items-center justify-between px-4 py-3">
      <div className="flex items-center space-x-4">
        <button 
          onClick={onToggleSidebar} 
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="relative flex-grow max-w-md">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-900 relative">
          <Bell size={20} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </button>
        <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors">
          <User size={20} />
          <span className="font-medium">John Doe</span>
        </button>
      </div>
    </header>
  );
};

export default Header;