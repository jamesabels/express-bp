module.exports = function (grunt) {
  "use strict";

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'dist/public/stylesheets/style.css': 'src/public/sass/style.scss'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      no_dest_single: {
        src: 'dist/public/stylesheets/style.css'
      },
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: [{
          src: ['dist/public/stylesheets/style.css', 'dist/public/stylesheets/!*.min.css'],
          dest: 'dist/public/stylesheets/style.min.css',
          ext: '.min.css'
        }]
      }
    },
    ts: {
      app: {
        files: [{
          src: ["src/public/js/\*\*/\*.ts", "src/\*\*/\*.ts"],
          dest: "./dist/"
        }],
        options: {
          rootDir: "./src/",
          module: "commonjs",
          jsx: 'preserve',
          noLib: false,
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
    apidoc: {
      mypp: {
        src: "src/",
        dest: "dist/public/",
        options: {
          debug: true,
          includeFilters: [ ".*\\.ts$" ],
          excludeFilters: [ "node_modules/", "views", "public" ]
        }
      }
    },    
    watch: {
      livereload: {
        options: { livereload: true },
        files: ['dist/**/*'],
      },
      files: ["src/\*\*/\*.ts", "src/\*\*/\*.tsx", "src/\*\*/\*.scss", 'views/\*\*/\*.pug'],
      tasks: ["default"]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-tslint");
  grunt.loadNpmTasks('grunt-livereload');
  grunt.loadNpmTasks('grunt-apidoc');

  grunt.registerTask("default", [
    "ts",
    "tslint",
    "sass",
    "autoprefixer",
    "cssmin",
    "apidoc"
  ]);

};