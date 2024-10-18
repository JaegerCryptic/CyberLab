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
			sender: 'security@bancoftrust.com',
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
	// Additional Email Pairs
	{
		legitimate: {
			sender: 'newsletter@trustednews.com',
			subject: 'Weekly Newsletter - October 2023',
			timestamp: '2023-10-03 09:00 AM',
			body: 'Welcome to our weekly newsletter! Here are the top stories for this week...',
		},
		phishing: {
			sender: 'news@trustedn3ws.com',
			subject: 'Breaking News: Urgent Update Required',
			timestamp: '2023-10-03 09:05 AM',
			body: 'Dear subscriber, we have detected unusual activity on your account. Click here to verify your information.',
		},
		reason:
			'The phishing email uses a fake news alert to create urgency and asks you to click a link to verify your information.',
	},
	{
		legitimate: {
			sender: 'events@conference.com',
			subject: 'Your Conference Registration Confirmation',
			timestamp: '2023-10-04 11:00 AM',
			body: 'Thank you for registering for our upcoming conference. Here are the details...',
		},
		phishing: {
			sender: 'register@conference.com',
			subject: 'Action Required: Complete Your Registration',
			timestamp: '2023-10-04 11:05 AM',
			body: 'We noticed that your registration is incomplete. Click here to complete your registration.',
		},
		reason:
			'The phishing email attempts to trick you into clicking a link by claiming your registration is incomplete.',
	},
	{
		legitimate: {
			sender: 'support@software.com',
			subject: 'Software Update Available',
			timestamp: '2023-10-05 01:00 PM',
			body: 'A new update for your software is available. Please visit our official website to download the update.',
		},
		phishing: {
			sender: 'update@software.com',
			subject: 'Critical Update Required',
			timestamp: '2023-10-05 01:05 PM',
			body: 'Your software is out of date. Click here to download the critical update.',
		},
		reason:
			'The phishing email uses a fake software update to get you to click a link. Always download updates from the official website.',
	},
	{
		legitimate: {
			sender: 'hr@company.com',
			subject: 'Annual Performance Review',
			timestamp: '2023-10-06 03:00 PM',
			body: 'Your annual performance review is scheduled for next week. Please log in to the HR portal to view the details.',
		},
		phishing: {
			sender: 'hr@c0mpany.com',
			subject: 'Immediate Action Required: Performance Review',
			timestamp: '2023-10-06 03:05 PM',
			body: 'Your performance review has been flagged for immediate attention. Click here to view the details.',
		},
		reason:
			'The phishing email creates a sense of urgency and asks you to click a link to view your performance review.',
	},
	{
		legitimate: {
			sender: 'billing@utility.com',
			subject: 'Your Monthly Bill is Ready',
			timestamp: '2023-10-07 05:00 PM',
			body: 'Your monthly utility bill is ready. Please log in to your account to view and pay your bill.',
		},
		phishing: {
			sender: 'billing@ut1lity.com',
			subject: 'Payment Overdue: Immediate Action Required',
			timestamp: '2023-10-07 05:05 PM',
			body: 'Your payment is overdue. Click here to pay your bill immediately to avoid service interruption.',
		},
		reason:
			'The phishing email uses a fake overdue payment notice to create urgency and asks you to click a link to pay your bill.',
	},
	// More Email Pairs
	{
		legitimate: {
			sender: 'admin@university.edu',
			subject: 'Class Schedule Update',
			timestamp: '2023-10-08 08:00 AM',
			body: 'Dear student, your class schedule has been updated. Please log in to the student portal to view the changes.',
		},
		phishing: {
			sender: 'admin@un1versity.edu',
			subject: 'Urgent: Class Schedule Change',
			timestamp: '2023-10-08 08:05 AM',
			body: 'Dear student, there has been an urgent change to your class schedule. Click here to view the new schedule.',
		},
		reason:
			'The phishing email uses a fake class schedule change to create urgency and asks you to click a link to view the new schedule.',
	},
	{
		legitimate: {
			sender: 'it@company.com',
			subject: 'Password Expiry Notification',
			timestamp: '2023-10-09 10:00 AM',
			body: 'Your password is set to expire in 7 days. Please log in to the company portal to update your password.',
		},
		phishing: {
			sender: 'it@c0mpany.com',
			subject: 'Immediate Password Reset Required',
			timestamp: '2023-10-09 10:05 AM',
			body: 'Your password has expired. Click here to reset your password immediately.',
		},
		reason:
			'The phishing email uses a fake password expiry notice to create urgency and asks you to click a link to reset your password.',
	},
	{
		legitimate: {
			sender: 'travel@agency.com',
			subject: 'Your Travel Itinerary',
			timestamp: '2023-10-10 12:00 PM',
			body: 'Your travel itinerary is ready. Please log in to your account to view the details.',
		},
		phishing: {
			sender: 'travel@agencyy.com',
			subject: 'Urgent: Travel Itinerary Update',
			timestamp: '2023-10-10 12:05 PM',
			body: 'There has been an urgent update to your travel itinerary. Click here to view the changes.',
		},
		reason:
			'The phishing email uses a fake travel itinerary update to create urgency and asks you to click a link to view the changes.',
	},
	{
		legitimate: {
			sender: 'info@healthcare.com',
			subject: 'Your Appointment Confirmation',
			timestamp: '2023-10-11 02:00 PM',
			body: 'Your appointment has been confirmed. Please log in to your account to view the details.',
		},
		phishing: {
			sender: 'info@healthcaree.com',
			subject: 'Urgent: Appointment Reschedule Required',
			timestamp: '2023-10-11 02:05 PM',
			body: 'Your appointment needs to be rescheduled. Click here to choose a new date and time.',
		},
		reason:
			'The phishing email uses a fake appointment reschedule notice to create urgency and asks you to click a link to choose a new date and time.',
	},
	{
		legitimate: {
			sender: 'support@streaming.com',
			subject: 'Subscription Renewal Notice',
			timestamp: '2023-10-12 04:00 PM',
			body: 'Your subscription is set to renew on October 31, 2023. No action is required on your part.',
		},
		phishing: {
			sender: 'support@streamingg.com',
			subject: 'Urgent: Subscription Renewal Failed',
			timestamp: '2023-10-12 04:05 PM',
			body: 'Your subscription renewal has failed. Click here to update your payment information.',
		},
		reason:
			'The phishing email uses a fake subscription renewal failure notice to create urgency and asks you to click a link to update your payment information.',
	},
	// New Complex Email Pairs
	{
		legitimate: {
			sender: 'security@bank.com',
			subject: 'Security Alert: Unusual Login Attempt',
			timestamp: '2023-10-13 06:00 AM',
			body: 'We detected an unusual login attempt on your account. If this was not you, please log in to your account and secure it.',
		},
		phishing: {
			sender: 'security@b4nk.com',
			subject: 'Immediate Action Required: Unusual Login Attempt',
			timestamp: '2023-10-13 06:05 AM',
			body: 'We detected an unusual login attempt on your account. Click here to secure your account immediately.',
		},
		reason:
			'The phishing email uses a fake security alert to create urgency and asks you to click a link to secure your account.',
	},
	{
		legitimate: {
			sender: 'admin@socialmedia.com',
			subject: 'New Privacy Policy Update',
			timestamp: '2023-10-14 08:00 AM',
			body: 'We have updated our privacy policy. Please log in to your account to review the changes.',
		},
		phishing: {
			sender: 'admin@socialmedi4.com',
			subject: 'Urgent: Privacy Policy Update',
			timestamp: '2023-10-14 08:05 AM',
			body: 'We have updated our privacy policy. Click here to review the changes immediately.',
		},
		reason:
			'The phishing email uses a fake privacy policy update to create urgency and asks you to click a link to review the changes.',
	},
	{
		legitimate: {
			sender: 'support@ecommerce.com',
			subject: 'Order Confirmation',
			timestamp: '2023-10-15 10:00 AM',
			body: 'Thank you for your order. Your order number is 123456. Please log in to your account to view the details.',
		},
		phishing: {
			sender: 'support@ecommerces.com',
			subject: 'Urgent: Order Confirmation Required',
			timestamp: '2023-10-15 10:05 AM',
			body: 'Thank you for your order. Please click here to confirm your order details.',
		},
		reason:
			'The phishing email uses a fake order confirmation to create urgency and asks you to click a link to confirm your order details.',
	},
	{
		legitimate: {
			sender: 'info@charity.com',
			subject: 'Thank You for Your Donation',
			timestamp: '2023-10-16 12:00 PM',
			body: 'Thank you for your generous donation. Please log in to your account to view your donation receipt.',
		},
		phishing: {
			sender: 'info@charityy.com',
			subject: 'Urgent: Donation Receipt',
			timestamp: '2023-10-16 12:05 PM',
			body: 'Thank you for your donation. Click here to view your donation receipt.',
		},
		reason:
			'The phishing email uses a fake donation receipt to create urgency and asks you to click a link to view your receipt.',
	},
	{
		legitimate: {
			sender: 'alerts@creditcard.com',
			subject: 'Credit Card Statement Available',
			timestamp: '2023-10-17 02:00 PM',
			body: 'Your monthly credit card statement is now available. Please log in to your account to view the details.',
		},
		phishing: {
			sender: 'alerts@creditc4rd.com',
			subject: 'Urgent: Credit Card Statement',
			timestamp: '2023-10-17 02:05 PM',
			body: 'Your credit card statement is now available. Click here to view the details immediately.',
		},
		reason:
			'The phishing email uses a fake credit card statement notice to create urgency and asks you to click a link to view the details.',
	},
]
