export const emailPairs = [
  {
    legitimate: {
      sender: 'support@company.com',
      subject: 'Account Update Confirmation',
      timestamp: '2023-10-01 10:00 AM',
      body: 'Dear user, your account has been updated successfully. If you did not make this change, please contact support.',
    },
    phishing: {
      sender: 'security@c0mpany.com',
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
  // New Additions
  {
    legitimate: {
      sender: 'donotreply@vendor.com',
      subject: 'Important News: Immediate Action Required',
      timestamp: '2023-10-02 02:00 PM',
      body: 'Please log into your account and action notifications that are pending.',
    },
    phishing: {
      sender: 'urgent@vend0r.com',
      subject: 'Imediate Action Required!',
      timestamp: '2023-10-02 02:05 PM',
      body: 'We have sent you an alert, please click here to log in and view.',
    },
    reason:
      'The phishing email is a classic attempt at spear phishing - the art of trying to steal your credentials. Legitimate emails usually never tell you log in directly from their own link. The senders email is also fake.',
  },
  {
    legitimate: {
      sender: 'notifications@fakebank.com',
      subject: 'Update to your Bank Account',
      timestamp: '2023-10-02 02:00 PM',
      body: 'We are committed to keeping your account safe. As part of our ongoing efforts, we have made updates to our security policies. There is no action required on your part. This update will take effect automatically on October 31, 2024.',
    },
    phishing: {
      sender: ' security@bancoftrust.com',
      subject: 'Urgent: Your Account Has Been Compromised!',
      timestamp: '2023-10-02 02:05 PM',
      body: 'Your Bank of Trust account has been temporarily locked due to suspicious activity. To restore access, please click the link below and verify your account information: Click here to restore your account. Failure to do so will result in your account being permanently locked. This is your last chance to avoid losing access! Please act now to ensure your account’s security.',
    },
    reason:
      'In phishing emails, look for urgency, incorrect URLs, and suspicious email addresses. Legitimate companies rarely ask for sensitive information through email and will direct you to their official site for secure communication.',
  },
  {
    legitimate: {
      sender: 'support@clouddrive.com',
      subject: 'Update: New Features Added to Your Cloud Storage Account',
      timestamp: '2023-10-02 02:00 PM',
      body: 'Hi, We’re excited to inform you that new features have been added to your CloudDrive account! \n You can now enjoy enhanced file sharing options and increased storage capacity at no additional cost. \n You can access these new features by logging in to your account as usual at www.clouddrive.com.',
    },
    phishing: {
      sender: 'privacy@clouddrivesupport.com',
      subject: 'Important: We’ve Made Small Changes to Our Privacy Policy',
      timestamp: '2023-10-02 02:05 PM',
      body: 'At CloudDrive, we are committed to protecting your privacy. \n As part of our regular policy reviews, we have made some small updates to our Privacy Policy to better serve our users. \n To continue using your CloudDrive account without interruption, we kindly ask you to review and accept these changes. Please follow this link to update your preferences: Review Privacy Policy',
    },
    reason:
      'It is important to pay close attention to details such as the sender’s address, the URL of links, and whether the request aligns with what a company typically asks its users to do.',
  },
  // Add more email pairs with increasing difficulty
]
