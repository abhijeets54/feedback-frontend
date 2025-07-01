import React, { useState } from 'react';
import type { DashboardData } from '../types';
import { MessageSquare, TrendingUp, TrendingDown, Minus, CheckCircle, Plus } from 'lucide-react';
import FeedbackList from './FeedbackList';
import Analytics from './Analytics';
import FeedbackRequest from './FeedbackRequest';

interface EmployeeDashboardProps {
  dashboardData: DashboardData;
  onRefresh: () => void;
}

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ dashboardData, onRefresh }) => {
  const { stats, feedback } = dashboardData;
  const [showFeedbackRequest, setShowFeedbackRequest] = useState(false);

  const acknowledgedCount = feedback.filter(f => f.acknowledged).length;
  const unacknowledgedCount = feedback.filter(f => !f.acknowledged).length;

  const statCards = [
    {
      title: 'Total Feedback',
      value: stats.total_feedback,
      icon: MessageSquare,
      color: 'bg-blue-500',
    },
    {
      title: 'Positive',
      value: stats.positive_feedback,
      icon: TrendingUp,
      color: 'bg-emerald-500',
    },
    {
      title: 'Neutral',
      value: stats.neutral_feedback,
      icon: Minus,
      color: 'bg-yellow-500',
    },
    {
      title: 'Negative',
      value: stats.negative_feedback,
      icon: TrendingDown,
      color: 'bg-red-500',
    },
    {
      title: 'Acknowledged',
      value: acknowledgedCount,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Feedback</h1>
          <p className="text-gray-600">View and acknowledge feedback from your manager</p>
        </div>
        <button
          onClick={() => setShowFeedbackRequest(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Request Feedback
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${stat.color} p-3 rounded-md`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.title}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Unacknowledged Feedback Alert */}
      {unacknowledgedCount > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <MessageSquare className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                New Feedback Available
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  You have {unacknowledgedCount} unacknowledged feedback{unacknowledgedCount > 1 ? 's' : ''}. 
                  Please review and acknowledge them below.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics */}
      <Analytics stats={stats} isManager={false} />

      {/* Feedback Timeline */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Feedback Timeline
          </h3>
          {feedback.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No feedback yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Your manager hasn't given you any feedback yet.
              </p>
            </div>
          ) : (
            <FeedbackList
              feedback={feedback}
              onRefresh={onRefresh}
              isManager={false}
            />
          )}
        </div>
      </div>

      {/* Feedback Request Modal */}
      {showFeedbackRequest && (
        <FeedbackRequest
          onClose={() => setShowFeedbackRequest(false)}
          onSubmitted={() => {
            setShowFeedbackRequest(false);
            // Could trigger a notification or refresh here
          }}
        />
      )}
    </div>
  );
};

export default EmployeeDashboard;
