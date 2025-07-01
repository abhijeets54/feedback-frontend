import React, { useState, useEffect } from 'react';
import { MessageSquare, Clock, CheckCircle, X, User } from 'lucide-react';
import { feedbackAPI } from '../services/api';
import type { FeedbackRequest } from '../types';
import AnimatedCard from './AnimatedCard';
import AnimatedButton from './AnimatedButton';

interface FeedbackRequestsProps {
  onRefresh?: () => void;
}

const FeedbackRequests: React.FC<FeedbackRequestsProps> = ({ onRefresh }) => {
  const [requests, setRequests] = useState<FeedbackRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await feedbackAPI.getFeedbackRequests();
      setRequests(data);
    } catch (err: any) {
      setError('Failed to load feedback requests');
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteRequest = async (requestId: number) => {
    try {
      setActionLoading(requestId);
      await feedbackAPI.completeFeedbackRequest(requestId);
      await fetchRequests();
      if (onRefresh) onRefresh();
    } catch (err: any) {
      setError('Failed to complete request');
      console.error('Error completing request:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancelRequest = async (requestId: number) => {
    try {
      setActionLoading(requestId);
      await feedbackAPI.cancelFeedbackRequest(requestId);
      await fetchRequests();
      if (onRefresh) onRefresh();
    } catch (err: any) {
      setError('Failed to cancel request');
      console.error('Error cancelling request:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const pendingRequests = requests.filter(req => req.status === 'pending');
  const completedRequests = requests.filter(req => req.status !== 'pending');

  if (loading) {
    return (
      <AnimatedCard className="p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
          <span className="ml-2 text-gray-600">Loading feedback requests...</span>
        </div>
      </AnimatedCard>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <AnimatedCard className="p-6">
          <div className="flex items-center mb-4">
            <MessageSquare className="h-5 w-5 text-indigo-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Pending Feedback Requests ({pendingRequests.length})
            </h3>
          </div>

          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="font-medium text-gray-900">
                        {request.employee?.full_name || 'Unknown Employee'}
                      </span>
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        <span className="ml-1 capitalize">{request.status}</span>
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      Requested on {formatDate(request.created_at)}
                    </p>
                    
                    {request.message && (
                      <div className="bg-gray-50 rounded-md p-3 mb-3">
                        <p className="text-sm text-gray-700 italic">"{request.message}"</p>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <AnimatedButton
                      onClick={() => handleCompleteRequest(request.id)}
                      loading={actionLoading === request.id}
                      variant="primary"
                      size="sm"
                      className="text-xs"
                    >
                      Mark Complete
                    </AnimatedButton>
                    <AnimatedButton
                      onClick={() => handleCancelRequest(request.id)}
                      loading={actionLoading === request.id}
                      variant="secondary"
                      size="sm"
                      className="text-xs"
                    >
                      Cancel
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>
      )}

      {/* Recent Completed/Cancelled Requests */}
      {completedRequests.length > 0 && (
        <AnimatedCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Request History
          </h3>

          <div className="space-y-3">
            {completedRequests.slice(0, 5).map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-900">
                    {request.employee?.full_name || 'Unknown Employee'}
                  </span>
                  <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    <span className="ml-1 capitalize">{request.status}</span>
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {request.completed_at ? formatDate(request.completed_at) : formatDate(request.created_at)}
                </span>
              </div>
            ))}
          </div>
        </AnimatedCard>
      )}

      {/* Empty State */}
      {requests.length === 0 && (
        <AnimatedCard className="p-8 text-center">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Feedback Requests</h3>
          <p className="text-gray-600">
            When team members request feedback, they'll appear here.
          </p>
        </AnimatedCard>
      )}
    </div>
  );
};

export default FeedbackRequests;
