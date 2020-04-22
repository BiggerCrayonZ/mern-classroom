const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
  const files = [
    './dist/classroom-user/runtime-es2015.js',
    './dist/classroom-user/polyfills-es2015.js',
    './dist/classroom-user/main-es2015.js',
  ]
  await fs.ensureDir('../classroom-ui/public/elements/classroom-user')
  await concat(files, '../classroom-ui/public/elements/classroom-user/classroom-user.js');
  await fs.copyFile('./dist/classroom-user/styles.css', '../classroom-ui/public/elements/classroom-user/styles.css')
  await fs.copy('./dist/classroom-user/assets/', '../classroom-ui/public/elements/classroom-user/assets/' )

})()