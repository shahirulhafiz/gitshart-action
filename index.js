const core = require('@actions/core');
const github = require('@actions/github');
const spawn = util.promisify(require('child_process').spawn);

const {
  promises: fs
} = require('fs')

const main = async () => {
  const pathPackage = core.getInput('package-dictionary');
  // git log --follow -p -- package.json
  const gitapi = spawn('git diff log --follow -p -- package.json', {
      stdio: 'inherit',
      shell: true
   });
  console.log("gitapi v1", gitapi.stdout)

  // console.log("Current Directory", __dirname)
  let content = await fs.readFile(pathPackage, 'utf8')
  // console.log(`Content: `, content);
  core.setOutput("property", 0);
}

main().catch(err => core.setFailed(err.message))