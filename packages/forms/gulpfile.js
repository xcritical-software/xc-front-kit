const createTasks = require('@xcritical/gulpify');

createTasks('@xcritical/xc-front-kit', {
  componentsGlob: [
    'src/**/*.{jsx,js}',
  ],
  resourcesGlob: ['src/**/*.{png,gif,jpg,svg,ttf,woff,json,less}'],
});
