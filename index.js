const core = require('@actions/core');
const github = require('@actions/github');
const {
  promises: fs
} = require('fs')

const main = async () => {
  const pathPackage = core.getInput('package-dictionary');
  console.log("github", github)
  console.log("Current Directory", __dirname)
  let content = await fs.readFile(pathPackage, 'utf8')
  console.log(`Content: `, content);
  core.setOutput("property", 0);
}

main().catch(err => core.setFailed(err.message))