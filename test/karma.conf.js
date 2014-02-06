module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      // libraries
      '../bower_components/jquery/jquery.js',
      '../bower_components/angular/angular.js',
      '../bower_components/angular-ui-utils/mask.js',
      '../bower_components/angular-mocks/angular-mocks.js',
      '../bower_components/pickadate/lib/picker.js',
      '../bower_components/pickadate/lib/picker.date.js',

      // app
      'ngPickadatetime.js',

      // tests
      'test.js',

      // templates
      //'templates/*.html'
    ],

    // generate js files from html templates
    preprocessors: {
    //  'templates/*.html': 'ng-html2js'
    },

    autoWatch: true,
    browsers: ['Chrome']
  });
};