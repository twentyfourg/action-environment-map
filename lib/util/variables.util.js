const core = require('@actions/core');
const yaml = require('yaml');
const fs = require('fs');
const path = require('path');

module.exports = () => {
  let actionDotYaml;
  const variables = {};

  try {
    actionDotYaml = fs.readFileSync(path.join(__dirname, '../../action.yml'), 'utf8');
  } catch (fsError) {
    console.error(fsError);
    throw new Error(
      "Error while trying to parse the 'action.yml' file in the root of the directory. Make sure it exists."
    );
  }

  const parsedActionDotYaml = yaml.parse(actionDotYaml);
  Object.keys(parsedActionDotYaml.inputs).forEach((inputVariable) => {
    try {
      variables[inputVariable] = JSON.parse(core.getInput(inputVariable));
    } catch (error) {
      variables[inputVariable] = core.getInput(inputVariable);
    }
  });

  return variables;
};
