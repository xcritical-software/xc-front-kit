const createTasks = require('@xcritical/gulpify');

createTasks('@xcritical/switch', {
  componentsGlob: [
    'src/**/*.{jsx,js}',
  ],
  resourcesGlob: ['src/**/*.{png,gif,jpg,svg,ttf,woff,json,less}'],
});
