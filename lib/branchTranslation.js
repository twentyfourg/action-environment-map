module.exports = (branch, regexReplacePatterns) => {
  let translatedBranch = branch;

  regexReplacePatterns.forEach(([pattern, replacement]) => {
    const regex = new RegExp(pattern, 'g');
    translatedBranch = translatedBranch.replace(regex, replacement);
  });

  return translatedBranch;
};
