module.exports = function (grunt) {
  "use strict";

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
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
      files: ["src/\*\*/\*.ts", "src/\*\*/\*.tsx"],
      tasks: ["default"]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-tslint");
  grunt.loadNpmTasks('grunt-livereload');
  grunt.loadNpmTasks('grunt-apidoc');

  grunt.registerTask("default", [
    "ts",
    "tslint",
    "apidoc"
  ]);

};