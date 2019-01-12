const env = process.env.NODE_ENV || 'development';

if (['development', 'test'].includes(env)) {
  const config = require('./config.json');
  Object.assign(process.env, config[env]);
}

/*
Example of config.json:
{
  "development": {
    "PORT": 3000,
    "MONGODB_URI": "mongodb://127.0.0.1:27017/NodeRestfulApiCrud"
  },
  "test": {
    "PORT": 3000,
    "MONGODB_URI": "mongodb://127.0.0.1:27017/NodeRestfulApiCrudTest"
  }
}
*/