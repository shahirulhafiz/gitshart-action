const core = require('@actions/core');
const github = require('@actions/github');
const util = require('util');
// const exec = util.promisify(require('child_process').exec);
import {execa} from 'execa';

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
  
  const {stdout} = await execa('git', ['show','package.json']);
  console.log(stdout);

  let newRegEx = new RegExp(`"${propertyList}.+?(?=,)`, 'gm');
  let content = stdout.match(newRegEx);
  console.log(content);

  let output = content[1].replace(/[\s"]/g, '');
  const propertyName = output.split(":")[0]
  const propertyValue = output.split(":")[1]
  console.log(output)
  console.log("name",propertyName)
  console.log("value",propertyValue)
  core.setOutput("property-name",propertyName);
  core.setOutput("property-value",propertyValue);
}

main().catch(err => core.setFailed(err.message))