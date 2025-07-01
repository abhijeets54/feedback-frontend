import type { Feedback } from '../types';

export const exportFeedbackToPDF = (feedback: Feedback[], userType: 'manager' | 'employee', userName: string) => {
  // Create a simple HTML document for PDF generation
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Feedback Report - ${userName}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 40px;
          line-height: 1.6;
          color: #333;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
          border-bottom: 2px solid #4F46E5;
          padding-bottom: 20px;
        }
        .header h1 {
          color: #4F46E5;
          margin: 0;
        }
        .header p {
          margin: 5px 0;
          color: #666;
        }
        .feedback-item {
          margin-bottom: 30px;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background-color: #f9fafb;
        }
        .feedback-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #d1d5db;
        }
        .sentiment {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
        }
        .sentiment.positive {
          background-color: #dcfce7;
          color: #166534;
        }
        .sentiment.neutral {
          background-color: #fef3c7;
          color: #92400e;
        }
        .sentiment.negative {
          background-color: #fee2e2;
          color: #991b1b;
        }
        .feedback-section {
          margin-bottom: 15px;
        }
        .feedback-section h4 {
          margin: 0 0 8px 0;
          color: #374151;
          font-size: 14px;
          font-weight: bold;
        }
        .feedback-section p {
          margin: 0;
          color: #4b5563;
        }
        .meta-info {
          font-size: 12px;
          color: #6b7280;
          margin-top: 15px;
          padding-top: 10px;
          border-top: 1px solid #e5e7eb;
        }
        .summary {
          background-color: #eff6ff;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
        }
        .summary h3 {
          margin: 0 0 10px 0;
          color: #1e40af;
        }
        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }
        .stat-item {
          text-align: center;
          padding: 10px;
          background-color: white;
          border-radius: 6px;
        }
        .stat-value {
          font-size: 24px;
          font-weight: bold;
          color: #1f2937;
        }
        .stat-label {
          font-size: 12px;
          color: #6b7280;
          margin-top: 5px;
        }
        @media print {
          body { margin: 20px; }
          .feedback-item { break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Feedback Report</h1>
        <p><strong>${userName}</strong> - ${userType === 'manager' ? 'Manager' : 'Employee'}</p>
        <p>Generated on ${new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</p>
      </div>

      <div class="summary">
        <h3>Summary</h3>
        <p>Total feedback: <strong>${feedback.length}</strong></p>
        <div class="stats">
          <div class="stat-item">
            <div class="stat-value">${feedback.filter(f => f.overall_sentiment === 'positive').length}</div>
            <div class="stat-label">Positive</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${feedback.filter(f => f.overall_sentiment === 'neutral').length}</div>
            <div class="stat-label">Neutral</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${feedback.filter(f => f.overall_sentiment === 'negative').length}</div>
            <div class="stat-label">Negative</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${feedback.filter(f => f.acknowledged).length}</div>
            <div class="stat-label">Acknowledged</div>
          </div>
        </div>
      </div>

      ${feedback.map(item => `
        <div class="feedback-item">
          <div class="feedback-header">
            <div>
              <strong>${userType === 'manager' ? `To: ${item.employee?.full_name}` : `From: ${item.manager?.full_name}`}</strong>
            </div>
            <span class="sentiment ${item.overall_sentiment}">${item.overall_sentiment}</span>
          </div>
          
          <div class="feedback-section">
            <h4>Strengths</h4>
            <p>${item.strengths}</p>
          </div>
          
          <div class="feedback-section">
            <h4>Areas to Improve</h4>
            <p>${item.areas_to_improve}</p>
          </div>
          
          <div class="meta-info">
            <p>Created: ${new Date(item.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
            ${item.acknowledged ? `<p>Acknowledged: ${new Date(item.acknowledged_at!).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>` : '<p>Not yet acknowledged</p>'}
          </div>
        </div>
      `).join('')}
    </body>
    </html>
  `;

  // Create a new window and print
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.print();
    };
  }
};

export const exportFeedbackToCSV = (feedback: Feedback[], userType: 'manager' | 'employee') => {
  const headers = [
    'Date',
    userType === 'manager' ? 'Employee' : 'Manager',
    'Sentiment',
    'Strengths',
    'Areas to Improve',
    'Acknowledged',
    'Acknowledged Date'
  ];

  const csvContent = [
    headers.join(','),
    ...feedback.map(item => [
      new Date(item.created_at).toLocaleDateString(),
      userType === 'manager' ? item.employee?.full_name : item.manager?.full_name,
      item.overall_sentiment,
      `"${item.strengths.replace(/"/g, '""')}"`,
      `"${item.areas_to_improve.replace(/"/g, '""')}"`,
      item.acknowledged ? 'Yes' : 'No',
      item.acknowledged_at ? new Date(item.acknowledged_at).toLocaleDateString() : ''
    ].join(','))
  ].join('\n');

  // Create and download CSV file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `feedback-report-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
