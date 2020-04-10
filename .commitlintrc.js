module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'revert', 'perf', 'bump', 'ci', 'build']],
    'subject-case': [0],
    'header-max-length': [0],
    'subject-full-stop': [0],
  },
};
