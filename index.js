const core = require('@actions/core');
const github = require('@actions/github');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const {
  promises: fs
} = require('fs')

const main = async () => {
  const pathPackage = core.getInput('package-dictionary');
  const propertiesName = core.getInput('properties-name');
  let propertyList = propertiesName.split(',');
  // git log --follow -p -- package.json
  
  const command = "git show"
     const {
      stdout,
      stderr
   } = await exec(command);
  console.log("stdout v1", stdout.trim().split('\r\n'))



  // console.log("Current Directory", __dirname)
  let content = await fs.readFile(pathPackage, 'utf8')
  // console.log(`Content: `, content);
  core.setOutput("property", 0);
}

main().catch(err => core.setFailed(err.message))