import React, { useState } from 'react';
import type { User, FeedbackCreate } from '../types';
import { feedbackAPI } from '../services/api';
import { X, User as UserIcon } from 'lucide-react';

interface FeedbackFormProps {
  teamMembers: User[];
  onClose: () => void;
  onSubmitted: () => void;
  editingFeedback?: any;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ 
  teamMembers, 
  onClose, 
  onSubmitted, 
  editingFeedback 
}) => {
  const [formData, setFormData] = useState<FeedbackCreate>({
    employee_id: editingFeedback?.employee_id || 0,
    strengths: editingFeedback?.strengths || '',
    areas_to_improve: editingFeedback?.areas_to_improve || '',
    overall_sentiment: editingFeedback?.overall_sentiment || 'neutral',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (editingFeedback) {
        await feedbackAPI.updateFeedback(editingFeedback.id, formData);
      } else {
        await feedbackAPI.createFeedback(formData);
      }
      onSubmitted();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof FeedbackCreate, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {editingFeedback ? 'Edit Feedback' : 'Give Feedback'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Employee Selection */}
          {!editingFeedback && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Team Member
              </label>
              <select
                value={formData.employee_id}
                onChange={(e) => handleChange('employee_id', parseInt(e.target.value))}
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value={0}>Choose a team member...</option>
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.full_name} ({member.email})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Strengths */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Strengths
            </label>
            <textarea
              value={formData.strengths}
              onChange={(e) => handleChange('strengths', e.target.value)}
              required
              rows={4}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="What are this person's key strengths and positive contributions?"
            />
          </div>

          {/* Areas to Improve */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Areas to Improve
            </label>
            <textarea
              value={formData.areas_to_improve}
              onChange={(e) => handleChange('areas_to_improve', e.target.value)}
              required
              rows={4}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="What areas could this person focus on for improvement?"
            />
          </div>

          {/* Overall Sentiment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overall Sentiment
            </label>
            <div className="mt-2 space-y-2">
              {[
                { value: 'positive', label: 'Positive', color: 'text-green-600' },
                { value: 'neutral', label: 'Neutral', color: 'text-yellow-600' },
                { value: 'negative', label: 'Negative', color: 'text-red-600' },
              ].map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="sentiment"
                    value={option.value}
                    checked={formData.overall_sentiment === option.value}
                    onChange={(e) => handleChange('overall_sentiment', e.target.value as any)}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <span className={`ml-3 text-sm ${option.color}`}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || formData.employee_id === 0}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : (editingFeedback ? 'Update Feedback' : 'Submit Feedback')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
