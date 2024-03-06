// example for bot trigger/response with content strictly being fetched from the database.

const { getQuote } = require('../config/db/controllers/QuoteController');
const UserQuote = require('../config/schemas/UserQuotes');

module.exports = {
	name: 'Your example bot reply',
	trigger: 'the-command-to-trigger-this-response',
	// a mongoDB document to query against the database for your model
	responseFilter: {"propertyName" : "propertyValue"},
	// the controller action to fetch quotes from the database
	responseContent: getQuote,
	// mongoose model that is used for the database query
	responseModel: UserQuote,
	// boolean that defines whether the bot itself can trigger this when using /speak command
	botCanTrigger: true,
};