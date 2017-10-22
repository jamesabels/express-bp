module.exports = function(grunt) {
"use strict";

require('load-grunt-tasks')(grunt);

    grunt.initConfig({
      sass: {
        options: {
          sourceMap: true
        },
        dist: {
          files: {
            'public/stylesheets/style.css': 'src/sass/style.scss'
          }
        }
      },
      autoprefixer: {
        options: {
          browsers: ['last 2 versions', 'ie 8', 'ie 9']
        },
        no_dest_single: {
          src: 'public/stylesheets/style.css'
        },
      },
      cssmin: {
        options: {
          mergeIntoShorthands: false,
          roundingPrecision: -1
        },
        target: {
          files: [{
            // expand: false,
            // cwd: 'public/stylesheets/',
            src: ['public/stylesheets/style.css', 'public/stylesheets/!*.min.css'],
            dest: 'public/stylesheets/style.min.css',
            ext: '.min.css'
          }]
        }
      },
      ts: {
        app: {
          files: [{
            src: ["src/ts/\*\*/\*.ts", "!src/ts/.baseDir.ts", "!src/ts/_all.d.ts"],
            dest: "./dist/"
          }],
          options: {
            rootDir: "./src/ts/",
            module: "commonjs",
            noLib: true,
            target: "es6",
            sourceMap: false
          }
        }
      },
      tslint: {
        options: {
          configuration: "tslint.json"
        },
        files: {
          src: ["src/\*\*/\*.ts"]
        }
      },
      watch: {
        ts: {
          files: ["src/\*\*/\*.ts"],
          tasks: ["ts", "tslint"]
        },
        sass: {
          files: ["src/sass/*.scss"],
          tasks: ["sass"]
        } 
      }
    });
  
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-tslint");
  
    grunt.registerTask("default", [
      "ts",
      "tslint",
      "sass",
      "autoprefixer",
      "cssmin"
    ]);
  
  };