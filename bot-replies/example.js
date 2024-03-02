module.exports = {
	name: 'Your example bot reply',
	trigger: 'the-command-to-trigger-this-response',
	responseContent: 'the-response-to-this-trigger',
	followUpMessage: 'follow up message that goes after the reply',
	// attachment is always an array, regardless of size.
	attachment: ['./attachments/your-first-file', './attachments/your-second-file'],
	// boolean that defines whether the bot itself can trigger this when using /speak command
	botCanTrigger: true,
};