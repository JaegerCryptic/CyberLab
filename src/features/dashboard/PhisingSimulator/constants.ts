export const emailPairs = [
  {
    legitimate: {
      sender: 'support@company.com',
      subject: 'Account Update Confirmation',
      timestamp: '2023-10-01 10:00 AM',
      body: 'Dear user, your account has been updated successfully. If you did not make this change, please contact support.',
    },
    phishing: {
      sender: 'security@company.com',
      subject: 'Account Compromised - Immediate Action Required',
      timestamp: '2023-10-01 10:05 AM',
      body: 'Dear user, your account has been compromised. Click here to reset your password immediately.',
    },
    reason:
      'The phishing email creates a sense of urgency and asks you to click a link.',
  },
  {
    legitimate: {
      sender: 'noreply@shipping.com',
      subject: 'Your Package Has Shipped',
      timestamp: '2023-10-02 02:00 PM',
      body: 'Your package has been shipped and will arrive in 3-5 business days. Track your package here.',
    },
    phishing: {
      sender: 'delivery@shipping.com',
      subject: 'Delivery Failed - Reschedule Required',
      timestamp: '2023-10-02 02:05 PM',
      body: 'Your package delivery failed. Click here to reschedule delivery.',
    },
    reason:
      'The phishing email uses a fake delivery failure to get you to click a link.',
  },
  // Add more email pairs with increasing difficulty
]
