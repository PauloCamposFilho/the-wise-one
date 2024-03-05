// example for bot trigger/response without using the database
module.exports = {
  // the name for ease of identification
  name: 'some-local-name',
  // the trigger message sent by users
  trigger: 'some-local-trigger',
  // the text response to be sent by the bot
  responseContent: 'the-response-content',
  // optional attachments to be embeded by the bot in the resposne
  attachment: ['./attachments/some-file.png', './attachments/some-other-file.jpeg'],
  // whether or not the bot itself can trigger this command.
  botCanTrigger: true,
};