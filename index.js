const core = require('@actions/core');
const github = require('@actions/github');

try {
  const pathPackage = core.getInput('package-dictionary');

  let content = await fs.readFile(pathPackage, 'utf8')
  console.log(`Content: `, content);
  core.setOutput("property", 0);
} catch (error) {
  core.setFailed(error.message);
}