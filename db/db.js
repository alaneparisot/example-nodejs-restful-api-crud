const mongoose = require('mongoose');

exports.connect = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const client = await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
      console.info(`App is CONNECTED to database ${client.connections[0].name}.`);
      return resolve();
    } catch (err) {
      console.error('UNABLE to connect app to database.', err);
      return reject(err);
    }
  });
};
