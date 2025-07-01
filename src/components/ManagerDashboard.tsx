import React, { useState, useEffect } from 'react';
import type { DashboardData, User } from '../types';
import { usersAPI } from '../services/api';
import { Users, MessageSquare, TrendingUp, TrendingDown, Minus, Plus, Sparkles } from 'lucide-react';
import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';
import FeedbackRequests from './FeedbackRequests';
import Analytics from './Analytics';
import AnimatedCard from './AnimatedCard';
import AnimatedButton from './AnimatedButton';

interface ManagerDashboardProps {
  dashboardData: DashboardData;
  onRefresh: () => void;
}

const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ dashboardData, onRefresh }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const members = await usersAPI.getTeamMembers();
        setTeamMembers(members);
      } catch (error) {
        console.error('Failed to fetch team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);

  const { stats, feedback } = dashboardData;

  const statCards = [
    {
      title: 'Team Members',
      value: stats.team_members_count,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Feedback',
      value: stats.total_feedback,
      icon: MessageSquare,
      color: 'bg-green-500',
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
  ];

  const handleFeedbackSubmitted = () => {
    setShowFeedbackForm(false);
    onRefresh();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <AnimatedCard delay={0} className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center">
            <Sparkles className="h-8 w-8 mr-3 text-indigo-500" />
            Manager Dashboard
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Manage your team's feedback and performance</p>
        </div>
        <AnimatedButton
          onClick={() => setShowFeedbackForm(true)}
          variant="primary"
          icon={<Plus className="h-4 w-4" />}
        >
          Give Feedback
        </AnimatedButton>
      </AnimatedCard>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <AnimatedCard
              key={index}
              delay={index * 100}
              className="bg-white/80 backdrop-blur-lg overflow-hidden shadow-xl rounded-2xl border border-white/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${stat.color} p-4 rounded-xl shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-semibold text-gray-600 truncate">
                        {stat.title}
                      </dt>
                      <dd className="text-2xl font-bold text-gray-900 mt-1">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          );
        })}
      </div>

      {/* Team Members */}
      {teamMembers.length > 0 && (
        <AnimatedCard delay={600} className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl border border-white/20 mb-8">
          <div className="px-6 py-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="h-6 w-6 mr-3 text-indigo-500" />
              Your Team
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.map((member, index) => (
                <AnimatedCard
                  key={member.id}
                  delay={700 + index * 100}
                  className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-white to-gray-50 hover:from-indigo-50 hover:to-purple-50 hover:border-indigo-200 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-sm font-bold text-white">
                          {member.full_name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {member.full_name}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {member.email}
                      </p>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </AnimatedCard>
      )}

      {/* Feedback Requests */}
      <FeedbackRequests onRefresh={onRefresh} />

      {/* Analytics */}
      <Analytics stats={stats} isManager={true} />

      {/* Feedback List */}
      <FeedbackList
        feedback={feedback}
        onRefresh={onRefresh}
        isManager={true}
      />

      {/* Feedback Form Modal */}
      {showFeedbackForm && (
        <FeedbackForm
          teamMembers={teamMembers}
          onClose={() => setShowFeedbackForm(false)}
          onSubmitted={handleFeedbackSubmitted}
        />
      )}
    </div>
  );
};

export default ManagerDashboard;
