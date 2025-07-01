import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, MessageSquare, Sparkles } from 'lucide-react';
import AnimatedCard from './AnimatedCard';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center group">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Feedback System
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-gray-50 to-indigo-50 px-4 py-2 rounded-full border border-gray-200">
                <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">{user?.full_name}</div>
                  <div className="text-indigo-600 capitalize font-medium">{user?.role}</div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-gray-200 text-sm font-medium rounded-lg text-gray-600 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-105"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <AnimatedCard delay={100} hoverEffect={false}>
            {children}
          </AnimatedCard>
        </div>
      </main>
    </div>
  );
};

export default Layout;
