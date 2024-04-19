const { Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const clientLoadEmitters = (client) => {
  client.emitters = new Collection();
  const emittersPath = path.join(__dirname, '../../', 'emitters');
  const emitterFiles = fs.readdirSync(emittersPath).filter(file => file.endsWith('.js'));

  for (const file of emitterFiles) {
    if (!file.includes("example")) {
      const filePath = path.join(emittersPath, file);
      const emitter = require(filePath);
      // make sure the emitter has the necessary properties
      if ('eventName' in emitter && 'eventInterval' in emitter) {
        // initiate the setInterval and capture the intervalId
        const intervalId = setInterval(() => {
          client.emit(emitter.eventName);
        }, emitter.eventInterval);

        // add the emitter to the collection with intervalId in case we need to terminate it at runtime
        client.emitters.set(emitter.eventName, intervalId);
        continue;
      }
      console.log(`[WARNING] the emitter at ${filePath} is missing either an eventName or eventInterval property`);
    }
  }
};

module.exports = clientLoadEmitters;