const fs = require('fs-extra');
(async function build() {
    await fs.copy('./build', '../classroom-api/src/views' )
  })()