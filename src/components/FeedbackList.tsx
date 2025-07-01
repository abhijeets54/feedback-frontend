import React, { useState } from 'react';
import type { Feedback } from '../types';
import { feedbackAPI } from '../services/api';
import {
  Calendar,
  User,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle,
  Edit,
  Clock,
  Download,
  FileText,
  Sparkles
} from 'lucide-react';
import FeedbackForm from './FeedbackForm';
import { exportFeedbackToPDF, exportFeedbackToCSV } from '../utils/exportUtils';
import { useAuth } from '../contexts/AuthContext';
import AnimatedCard from './AnimatedCard';
import AnimatedButton from './AnimatedButton';

interface FeedbackListProps {
  feedback: Feedback[];
  onRefresh: () => void;
  isManager: boolean;
}

const FeedbackList: React.FC<FeedbackListProps> = ({ feedback, onRefresh, isManager }) => {
  const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null);
  const [acknowledgingId, setAcknowledgingId] = useState<number | null>(null);
  const { user } = useAuth();

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'negative':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return <Minus className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-50 border-green-200';
      case 'negative':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-yellow-50 border-yellow-200';
    }
  };

  const handleAcknowledge = async (feedbackId: number) => {
    setAcknowledgingId(feedbackId);
    try {
      await feedbackAPI.acknowledgeFeedback(feedbackId);
      onRefresh();
    } catch (error) {
      console.error('Failed to acknowledge feedback:', error);
    } finally {
      setAcknowledgingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (feedback.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center py-8">
            <User className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No feedback yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {isManager 
                ? "You haven't given any feedback yet. Start by giving feedback to your team members."
                : "You haven't received any feedback yet."
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <AnimatedCard delay={0} className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl border border-white/20">
        <div className="px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center">
              <Sparkles className="h-6 w-6 mr-3 text-indigo-500" />
              {isManager ? 'Feedback Given' : 'Feedback Received'}
            </h3>
            {feedback.length > 0 && (
              <div className="flex space-x-3">
                <AnimatedButton
                  onClick={() => exportFeedbackToPDF(feedback, isManager ? 'manager' : 'employee', user?.full_name || '')}
                  variant="secondary"
                  size="sm"
                  icon={<FileText className="h-4 w-4" />}
                >
                  PDF
                </AnimatedButton>
                <AnimatedButton
                  onClick={() => exportFeedbackToCSV(feedback, isManager ? 'manager' : 'employee')}
                  variant="secondary"
                  size="sm"
                  icon={<Download className="h-4 w-4" />}
                >
                  CSV
                </AnimatedButton>
              </div>
            )}
          </div>
          <div className="space-y-6">
            {feedback.map((item, index) => (
              <AnimatedCard
                key={item.id}
                delay={200 + index * 100}
                className={`border rounded-xl p-6 hover-lift ${getSentimentColor(item.overall_sentiment)}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    {getSentimentIcon(item.overall_sentiment)}
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {item.overall_sentiment} Feedback
                    </span>
                    {item.acknowledged && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(item.created_at)}
                    </div>
                    {isManager && (
                      <button
                        onClick={() => setEditingFeedback(item)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center mb-3 text-sm text-gray-600">
                  <User className="h-4 w-4 mr-1" />
                  {isManager ? (
                    <span>To: {item.employee?.full_name}</span>
                  ) : (
                    <span>From: {item.manager?.full_name}</span>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Strengths</h4>
                    <p className="text-sm text-gray-700">{item.strengths}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Areas to Improve</h4>
                    <p className="text-sm text-gray-700">{item.areas_to_improve}</p>
                  </div>
                </div>

                {!isManager && !item.acknowledged && (
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => handleAcknowledge(item.id)}
                      disabled={acknowledgingId === item.id}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                    >
                      {acknowledgingId === item.id ? (
                        <>
                          <Clock className="h-4 w-4 mr-1 animate-spin" />
                          Acknowledging...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Acknowledge
                        </>
                      )}
                    </button>
                  </div>
                )}

                {item.acknowledged && item.acknowledged_at && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center text-sm text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Acknowledged on {formatDate(item.acknowledged_at)}
                    </div>
                  </div>
                )}
              </AnimatedCard>
            ))}
          </div>
        </div>
      </AnimatedCard>

      {/* Edit Feedback Modal */}
      {editingFeedback && (
        <FeedbackForm
          teamMembers={[]}
          editingFeedback={editingFeedback}
          onClose={() => setEditingFeedback(null)}
          onSubmitted={() => {
            setEditingFeedback(null);
            onRefresh();
          }}
        />
      )}
    </>
  );
};

export default FeedbackList;
