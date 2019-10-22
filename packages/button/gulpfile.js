const createTasks = require('@xcritical/gulpify');

createTasks('@xcritical/button', {
  componentsGlob: [
    'src/**/*.{jsx,js}',
  ],
  resourcesGlob: ['src/**/*.{png,gif,jpg,svg,ttf,woff,json,less}'],
});
