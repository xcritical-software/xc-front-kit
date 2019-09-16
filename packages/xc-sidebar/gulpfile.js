const createTasks = require('@xcritical/xc-front-libs-utils/gulp-tasks');

createTasks('@xcritical/xc-front-kit', {
  componentsGlob: [
    'src/**/*.{jsx,js}',
  ],
  resourcesGlob: ['src/**/*.{png,gif,jpg,svg,ttf,woff,json,less}'],
});
