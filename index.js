const core = require('@actions/core');
const getVariables = require('./lib/util/variables.util');
const translateBranch = require('./lib/branchTranslation');

(async () => {
  try {
    const variables = getVariables();
    // TODO Validate

    // Get current branch
    const currentBranch = process.env.GITHUB_REF.split('refs/heads/')[1];
    const translatedCurrentBranch = translateBranch(currentBranch, variables.regexReplaces);

    core.setOutput('environment', translatedCurrentBranch);

    const matrix = variables.environmentMap[translatedCurrentBranch] || [translatedCurrentBranch];

    core.setOutput('environmentMatrix', JSON.stringify(matrix));
  } catch (error) {
    core.setFailed(error.message);
  }
})();
