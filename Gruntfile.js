'use strict';

module.exports = function(grunt) {
 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    name: '<%= pkg.name %>',
    coffeeSrc: [
      'src/javascripts/*.coffee',
      'src/javascripts/service/*.coffee',
      'src/javascripts/directive/*.coffee'
    ],

    coffee: {
      compile: {
        options: {
          join: true
        },
        files: {
          'dist/<%= name %>.js': '<%= coffeeSrc %>'
        }
      },
      test: {
        options: {
          bare: true
        },
        files: {
          'test/<%= name %>.js': '<%= coffeeSrc %>',
          'test/test.js': "test/coffee/*.coffee"
        }
      }
    },

    watch: {
      coffee: {
        files: '<%= coffeeSrc %>',
        tasks: ['dist'],
        options: {
          spawn: false,
        }
      },
      test: {
        files: 'test/coffee/*.coffee',
        tasks: ['test'],
        options: {
          spawn: false,
        }
      }
    },

    karma: {
      unit: {
        configFile: 'test/karma.conf.js'
      }
    },

    uglify: {
      min: {
        options: {
          report: 'gzip'
        },
        files: {
          'dist/<%= name %>.min.js': ['dist/<%= name %>.js']
        }
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('dist', ['coffee', 'uglify:min']);
  grunt.registerTask('test', ['coffee:test', 'karma']);

  grunt.registerTask('default', ['dist']);
}