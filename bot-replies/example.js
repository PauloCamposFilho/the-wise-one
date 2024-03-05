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
	// the improperly named property that takes the model used for the database query.
	// todo: fix property name.
	responseArray: UserQuote,
	// boolean that defines whether the bot itself can trigger this when using /speak command
	botCanTrigger: true,
};