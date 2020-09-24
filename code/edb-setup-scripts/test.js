const exec = require('child_process').execSync;
const path = require('path');

const cmd = exec('git fetch EDBAS +refs/heads/*:refs/remotes/EDBAS/*', {
  cwd: path.join(__dirname, '..', 'edbas'),
});

console.log('get here');
