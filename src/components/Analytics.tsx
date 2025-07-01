import React from 'react';
import type { DashboardStats } from '../types';
import { TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react';

interface AnalyticsProps {
  stats: DashboardStats;
  isManager: boolean;
}

const Analytics: React.FC<AnalyticsProps> = ({ stats, isManager }) => {
  const totalFeedback = stats.total_feedback;
  const positivePercentage = totalFeedback > 0 ? Math.round((stats.positive_feedback / totalFeedback) * 100) : 0;
  const neutralPercentage = totalFeedback > 0 ? Math.round((stats.neutral_feedback / totalFeedback) * 100) : 0;
  const negativePercentage = totalFeedback > 0 ? Math.round((stats.negative_feedback / totalFeedback) * 100) : 0;

  const sentimentData = [
    {
      label: 'Positive',
      value: stats.positive_feedback,
      percentage: positivePercentage,
      color: 'bg-green-500',
      lightColor: 'bg-green-100',
      icon: TrendingUp,
    },
    {
      label: 'Neutral',
      value: stats.neutral_feedback,
      percentage: neutralPercentage,
      color: 'bg-yellow-500',
      lightColor: 'bg-yellow-100',
      icon: Minus,
    },
    {
      label: 'Negative',
      value: stats.negative_feedback,
      percentage: negativePercentage,
      color: 'bg-red-500',
      lightColor: 'bg-red-100',
      icon: TrendingDown,
    },
  ];

  const getOverallSentiment = () => {
    if (positivePercentage >= 60) return { label: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-50' };
    if (positivePercentage >= 40) return { label: 'Good', color: 'text-green-500', bgColor: 'bg-green-50' };
    if (negativePercentage >= 40) return { label: 'Needs Attention', color: 'text-red-600', bgColor: 'bg-red-50' };
    return { label: 'Neutral', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
  };

  const overallSentiment = getOverallSentiment();

  if (totalFeedback === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-4">
          <BarChart3 className="h-6 w-6 text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Analytics</h3>
        </div>
        <div className="text-center py-8">
          <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No data available</h3>
          <p className="mt-1 text-sm text-gray-500">
            {isManager ? "Start giving feedback to see analytics." : "No feedback received yet."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BarChart3 className="h-6 w-6 text-indigo-600 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">
            {isManager ? 'Team Sentiment Analytics' : 'Your Feedback Analytics'}
          </h3>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${overallSentiment.bgColor} ${overallSentiment.color}`}>
          {overallSentiment.label}
        </div>
      </div>

      {/* Sentiment Distribution */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Sentiment Distribution</h4>
        <div className="space-y-3">
          {sentimentData.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center">
                <div className="flex items-center w-20">
                  <Icon className={`h-4 w-4 mr-2 ${item.color.replace('bg-', 'text-')}`} />
                  <span className="text-sm text-gray-600">{item.label}</span>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 w-16 text-right">
                  <span className="text-sm font-medium text-gray-900">{item.value}</span>
                  <span className="text-xs text-gray-500">({item.percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-gray-900">{totalFeedback}</div>
          <div className="text-sm text-gray-600">
            {isManager ? 'Total Feedback Given' : 'Total Feedback Received'}
          </div>
        </div>
        {isManager && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">{stats.team_members_count}</div>
            <div className="text-sm text-gray-600">Team Members</div>
          </div>
        )}
        {!isManager && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{positivePercentage}%</div>
            <div className="text-sm text-gray-600">Positive Feedback</div>
          </div>
        )}
      </div>

      {/* Insights */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Insights</h4>
        <div className="text-sm text-blue-800">
          {isManager ? (
            <>
              {positivePercentage >= 60 && (
                <p>Great job! Your team is receiving mostly positive feedback. Keep up the good work!</p>
              )}
              {positivePercentage < 60 && negativePercentage < 30 && (
                <p>Your feedback is balanced. Consider focusing on specific areas for improvement.</p>
              )}
              {negativePercentage >= 30 && (
                <p>Consider having one-on-one meetings to address areas of concern with your team.</p>
              )}
            </>
          ) : (
            <>
              {positivePercentage >= 60 && (
                <p>Excellent! You're receiving mostly positive feedback. Keep up the great work!</p>
              )}
              {positivePercentage < 60 && negativePercentage < 30 && (
                <p>You're on the right track. Focus on the improvement areas mentioned in your feedback.</p>
              )}
              {negativePercentage >= 30 && (
                <p>Consider discussing with your manager about specific steps to improve in the mentioned areas.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
