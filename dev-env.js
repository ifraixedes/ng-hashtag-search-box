'use strict';

const bs = require('browser-sync').create();
const eslintCli = new (require('eslint').CLIEngine)({});
const eslintFormatter = new eslintCli.getFormatter();

bs.watch(['src/**/*.{html,css}', 'test/**/*']).on('change', bs.reload);
bs.watch('src/**/*.js', function (event, file) {
  const report = eslintCli.executeOnFiles([file]);
  if ((report.errorCount > 0) || (report.warningCount > 0)) {
    console.log(eslintFormatter(report.results));
  }

  bs.reload();
});

bs.init({
  server: './',
  open: false,
  online: false
});
