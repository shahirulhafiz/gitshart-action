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
  

  const { stdout } = await execa('git', ['show', '-m', 'package.json']);

  console.log(stdout);

  console.log("regex :",`"${propertyList}.+?(?=,)`)
  let newRegEx = new RegExp(`"${propertyList}.+?(?=,)`, 'gm');
  let content = stdout.match(newRegEx);
  console.log(content);

  // [ '"version": "1.3.6.2"', '"version_staging": "1.4.4.4"' ]

  let output = {}
  content.forEach((env) => {
    // let output = env
    let [key, value] = env.split(":")
    const flatKey = key.replace(/[\s"]/g, '');
    const flatValue = value.replace(/[\s"]/g, '');
    output = {
      ...output,
      [flatKey]:flatValue
    }
});
  
  console.log(output)
  core.setOutput("env-prop",JSON.stringify(output));
}

main().catch(err => core.setFailed(err.message))