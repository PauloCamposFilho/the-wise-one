const { Collection } = require('mongoose');
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
        client.emitters.set(emitter.eventName, emitter);
        continue;
      }
      console.log(`[WARNING] the emitter at ${filePath} is missing either an eventName or eventInterval property`);
    }
  }
};