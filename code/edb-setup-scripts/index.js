const Listr = require('listr');
const Execa = require('execa');
const Readline = require('readline');
const Path = require('path');
// const Exec = require('child_process').exec;
const fs = require('fs');

const sourceDirectory = Path.join(__dirname, '..', 'edbas');
const sourceGitDirectory = Path.join(sourceDirectory, '.git');
const gitUserName = 'leo.jin';

const prompt = () => {
  const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question('Please provide your git password \n', (ans) => {
      rl.close();
      resolve(ans);
    });
  });
};

const gitBranch = {

}

const gitFetchTask = {
  title: 'Git Fetch',
  task: () => {
    const cmd = Execa('git', ['fetch', 'EDBAS', '+refs/heads/*:refs/remotes/EDBAS/*'], {
      cwd: sourceDirectory,
    });
    console.log('streaming subprocess stout');
    cmd.stdout.pipe(process.stdout);
    cmd.stderr.pipe(process.stderr);
  },
};

const gitRemoteTask = {
  title: 'Git Add Remote',
  task: () => {
    const exists = fs.existsSync(sourceGitDirectory);
    if (exists) {
      console.log('Found git remote.');
    } else {
      return Execa('git', ['remote', 'add', 'EDBAS', `ssh://${gitUserName}@scm.enterprisedb.com/git/EDBAS`], {
        cwd: sourceDirectory,
      });
    }
  },
};

const gitInitTask = {
  title: 'Initialize Git Repository',
  task: () => {
    const exists = fs.existsSync(sourceGitDirectory);
    if (exists) {
      console.log('Found .git');
    } else {
      return Execa('git', ['init'], {
        cwd: sourceDirectory,
      });
    }
  },
};

const gitBranchAndCheckout = new Listr([
    {
        title: ''
    }
])
const createCodeDirectory = {
  title: 'Create EDBas code directory',
  task: () => {
    const exists = fs.existsSync(sourceDirectory);
    if (exists) {
      console.log('Source code directory exsits.');
    } else {
      fs.mkdirSync(sourceDirectory);
    }
  },
};

const pipeline = new Listr([
//   createCodeDirectory,
//   gitInitTask,
//   gitRemoteTask,
//   gitFetchTask,
]);

pipeline.run().catch((err) => {
  console.error(err);
});

// prompt().then((ans) => {
//   console.log('cloning from git ans = ', ans);
// });

// (async () => {
// const ret = execa('git', ['fetch', 'EDBAS', '+refs/heads/*:refs/remotes/EDBAS/*'], {
//   cwd: Path.join(__dirname, '..', 'edbas'),
//   input: 'G0g0doll88!'
// });
//   console.log('huh');
//   console.log(ret);
//   ret.stdin.write('G0g0doll88!');
//   return 'hi';
// ret.stderr.pipe(process.stderr);
// ret.stdout.pipe(process.stdout);
// ret.then((val) => {
//   console.log('finished val = ', val);
// });
// })().then((val) => {
//   console.log(val);
// });

// const cmd = Exec(
//   'git fetch EDBAS +refs/heads/*:refs/remotes/EDBAS/*',
//   {
//     cwd: Path.join(__dirname, '..', 'edbas'),
//   },
//   (err, stdout, stderr) => {
//     console.log('stdout = ', stdout);
//     console.log('err = ', err);
//     // console.log('cmd = ', cmd);
//   }
// );
// cmd.stdout.on('data', (val) => {
//     fs.writeFileSync('hello.js', '');
//     console.log('val = ', val);
// })
// cmd.stdin.on('data', val => {
//     console.log('val = ', val);
// })
// cmd.stderr.pipe(process.stderr);
// cmd.stdout.pipe(process.stdout);
// cmd.stdin.write('yes');
