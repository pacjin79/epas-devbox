const Listr = require('listr');
const Execa = require('execa');
const Readline = require('readline');
const Path = require('path');
// const Exec = require('child_process').exec;
const fs = require('fs');

const sourceDirectory = '/home/vagrant/edbas'
const sourceGitDirectory = Path.join(sourceDirectory, '.git');
const workspaceDirectory = Path.join(__dirname, '..', 'edbas_work');
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

const gitTrackingBranchTask = {
  title: 'Setup tracking branch',
  skip: () => {
    const { stdout } = Execa.sync('git', ['branch'], {
      cwd: sourceDirectory,
    });
    if (stdout.indexOf('EDBAS-master') !== -1) {
      return 'Tracking branch already exist we skip';
    }
  },
  task: () => {
    const { stdout } = Execa.sync('git', ['branch', '--track', 'EDBAS-master', 'remotes/EDBAS/EDBAS-master'], {
      cwd: sourceDirectory,
    });
    return stdout;
  },
};

const gitCheckoutMaster = {
  title: 'Checkout the tracking branch',
  skip: () => {
    const exists = fs.existsSync(Path.join(sourceDirectory, 'Makefile'));
    if (exists) {
      return 'Checkout already done, skip...';
    }
  },
  task: () => {
    const { stdout } = Execa.sync('git', ['checkout', 'EDBAS-master'], {
      cwd: sourceDirectory,
    });
    return stdout;
  },
};

const gitFetchTask = {
  title: 'Git Fetch',
  skip: () => {
    const exists = fs.existsSync(Path.join(sourceGitDirectory, 'FETCH_HEAD'));
    if (exists) {
      return 'Fetch already done, skip...';
    }
  },
  task: () => {
    const cmd = Execa.sync('git', ['fetch', 'EDBAS', '+refs/heads/*:refs/remotes/EDBAS/*'], {
      cwd: sourceDirectory,
    });
    return cmd.stdout;
  },
};

const gitCloneTask = {
  title: 'Clone the workspace from tracking branch',
  skip: () => {
    const exists = fs.existsSync(workspaceDirectory);
    if (exists) {
      return 'Skip cloning, workspace already exist';
    }
  },
  task: () => {
    return Execa('git', ['clone', '.', workspaceDirectory], {
      cwd: sourceDirectory,
    });
  },
};

const gitRemoteTask = {
  title: 'Git Add Remote',
  skip: () => {
    const results = Execa.sync('cat', ['.git/config'], {
      cwd: sourceDirectory,
    });
    if (results.stdout.indexOf('EDBAS') !== -1) {
      return `EDBAS Remote already exists, we skip...`;
    }
  },
  task: () => {
    return Execa('git', ['remote', 'add', 'EDBAS', `ssh://${gitUserName}@scm.enterprisedb.com/git/EDBAS`], {
      cwd: sourceDirectory,
    });
  },
};

const gitInitTask = {
  title: 'Initialize Git Repository',
  skip: () => {
    const exists = fs.existsSync(sourceGitDirectory);
    if (exists) {
      return `Repository already initialized, we skip...`;
    }
  },
  task: () => {
    const { stdout } = Execa.sync('git', ['init'], {
      cwd: sourceDirectory,
    });
    return stdout;
  },
};

const createCodeDirectory = {
  title: 'Create EDBas code directory',
  skip: () => {
    const exists = fs.existsSync(sourceDirectory);
    if (exists) {
      return 'Source code directory exsits, we skip...';
    }
  },
  task: () => {
    fs.mkdirSync(sourceDirectory);
  },
};

const configureEdbasTask = {
    title: 'Configure Edbas',
    task: () => {
        
    }
}

const pipeline = new Listr([
  createCodeDirectory,
  gitInitTask,
  gitRemoteTask,
  gitFetchTask,
  gitTrackingBranchTask,
  gitCheckoutMaster,
  gitCloneTask,
]);

pipeline.run().catch((err) => {
  console.error(err);
});