// example for custom event emitter
// only supports recurring events for the time being.
// might support custom trigger conditions for emitter in the future

module.exports = {
  eventName: 'TheNameOfYourEventNoSpaces',
  // The interval for emitting the custom event, in milliseconds
  eventInterval: 30_000
};