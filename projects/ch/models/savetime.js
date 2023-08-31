const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(__dirname, 'hours.json');

let cache = null;

const readJsonFile = () => {
  const data = fs.readFileSync(jsonFilePath);
  return JSON.parse(data);
};

// Function to write to JSON file
const writeJsonFile = (data) => {
  fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));
};

const updateCache = () => {
  cache = readJsonFile();
};

updateCache();

module.exports = {
  saveHours: (userId, hours) => {
    if (!cache) {
      updateCache();
    }

    let user = cache.users.find(u => u.id === userId);
    if (!user) {
      user = { id: userId, hours: [] };
      cache.users.push(user);
    }

    user.hours.push({ timestamp: new Date().toISOString(), value: hours });

    writeJsonFile(cache);

    updateCache();
  },

  getHours: (userId) => {
    if (!cache) {
      updateCache();
    }

    const user = cache.users.find(u => u.id === userId);
    return user ? user.hours : [];
  }
};
