const core = require('@actions/core');
const github = require('@actions/github');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const {
  promises: fs
} = require('fs')

const main = async () => {
  const propertiesName = core.getInput('properties-name');
  console.log(propertiesName)

  let propertyList = null
  let split = propertiesName.split(",");

  if (split.length > 1) {
    propertyList = propertiesName.replace(",", "|");
    propertyList = `(${propertyList})`
  } else {
    propertyList = propertiesName
  }

  console.log(propertyList)

  const command = "git show"
  const {
    stdout,
    stderr
  } = await exec(command);

  let newRegEx = new RegExp(`"${propertyList}.+?(?=,)`, 'gm');
  let content = stdout.match(newRegEx);
  console.log(content)
  let output = content[1].replace(/[\s"]/g, '');
  console.log(output)
  core.setOutput("property",output.split(":")[1]);
}

main().catch(err => core.setFailed(err.message))