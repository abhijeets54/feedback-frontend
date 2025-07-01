import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { DashboardData } from '../types';
import { feedbackAPI } from '../services/api';
import ManagerDashboard from './ManagerDashboard';
import EmployeeDashboard from './EmployeeDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await feedbackAPI.getDashboardData();
        setDashboardData(data);
      } catch (err: any) {
        setError('Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const refreshData = async () => {
    try {
      const data = await feedbackAPI.getDashboardData();
      setDashboardData(data);
    } catch (err: any) {
      setError('Failed to refresh data');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="text-center text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <div>
      {user?.role === 'manager' ? (
        <ManagerDashboard 
          dashboardData={dashboardData} 
          onRefresh={refreshData}
        />
      ) : (
        <EmployeeDashboard 
          dashboardData={dashboardData} 
          onRefresh={refreshData}
        />
      )}
    </div>
  );
};

export default Dashboard;
