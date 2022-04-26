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
  
  let propertyList = propertiesName.replace(",", "|"); 
  
  console.log(propertyList)
  
  const command = "git show"
     const {
      stdout,
      stderr
  } = await exec(command);
  
  console.log(stdout)
  
  let newRegEx = new RegExp(`(\-|\+)\t"(${propertyList}).+?(?=\n)`, 'gm'); 
  let content = stdout.match(newRegEx);
  console.log(content)

  core.setOutput("property", 0);
}

main().catch(err => core.setFailed(err.message))