export const files = [
	{
		name: "file1.txt",
		content: `
      This is a sample file content with some random text.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
      Sed nisi. Nulla quis sem at nibh elementum imperdiet.
      Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
      Mauris massa. Vestibulum lacinia arcu eget nulla.
      Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
    `,
	},
	{
		name: "network1.log",
		content: `
      Network log data here with some irrelevant information.
      2023-10-01 12:00:00 INFO: Connection established from 192.168.1.1
      2023-10-01 12:05:00 WARN: Unusual traffic detected from 192.168.1.2
      2023-10-01 12:10:00 ERROR: Connection timeout from 192.168.1.3
      2023-10-01 12:15:00 INFO: Connection closed from 192.168.1.1
    `,
	},
	{
		name: "file2.txt",
		content: `
      Another file with different content and some more random text.
      The quick brown fox jumps over the lazy dog.
      1234567890!@#$%^&*()_+[]{}|;:',.<>?/~\`"
      This file contains some special characters and numbers.
      It also has multiple lines of text to make it more complex.
    `,
	},
	{
		name: "network2.log",
		content: `
      More network log data with additional irrelevant information.
      2023-10-01 13:00:00 INFO: Connection established from 192.168.1.4
      2023-10-01 13:05:00 WARN: Unusual traffic detected from 192.168.1.5
      2023-10-01 13:10:00 ERROR: Connection timeout from 192.168.1.6
      2023-10-01 13:15:00 INFO: Connection closed from 192.168.1.4
    `,
	},
	{
		name: "file3.txt",
		content: `
      Sensitive information: password123. Do not share this password.
      This file contains sensitive information that should be kept secure.
      It also has some random text to make it more complex.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
    `,
	},
	{
		name: "network3.log",
		content: `
      Suspicious activity detected. Check for unauthorized access.
      2023-10-01 14:00:00 INFO: Connection established from 192.168.1.7
      2023-10-01 14:05:00 WARN: Unusual traffic detected from 192.168.1.8
      2023-10-01 14:10:00 ERROR: Connection timeout from 192.168.1.9
      2023-10-01 14:15:00 INFO: Connection closed from 192.168.1.7
    `,
	},
	{
		name: "file4.txt",
		content: `
      Confidential data: secretKey. Keep this key secure.
      This file contains confidential information that should not be shared.
      It also has some random text to make it more complex.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
    `,
	},
	{
		name: "network4.log",
		content: `
      Network traffic analysis report. No suspicious activity found.
      2023-10-01 15:00:00 INFO: Connection established from 192.168.1.10
      2023-10-01 15:05:00 WARN: Unusual traffic detected from 192.168.1.11
      2023-10-01 15:10:00 ERROR: Connection timeout from 192.168.1.12
      2023-10-01 15:15:00 INFO: Connection closed from 192.168.1.10
    `,
	},
	{
		name: "file5.txt",
		content: `
      Important notes: The meeting is scheduled for 3 PM.
      This file contains important notes and should be reviewed carefully.
      It also has some random text to make it more complex.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
    `,
	},
	{
		name: "network5.log",
		content: `
      Network maintenance scheduled for midnight.
      2023-10-01 16:00:00 INFO: Connection established from 192.168.1.13
      2023-10-01 16:05:00 WARN: Unusual traffic detected from 192.168.1.14
      2023-10-01 16:10:00 ERROR: Connection timeout from 192.168.1.15
      2023-10-01 16:15:00 INFO: Connection closed from 192.168.1.13
    `,
	},
]

export const hints = [
	"The information you seek is not in a .log file.",
	"Look for the file with the number 2 in its name.",
	"The content you need is in a .txt file.",
	"The file you need contains the word 'Sensitive'.",
	"Avoid files with the word 'network' in their name.",
	"The file you are looking for has the number 3 in its name.",
	"The information is in a file with the word 'Confidential'.",
	"The file you need contains the word 'Important'.",
]