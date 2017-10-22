module.exports = function(grunt) {
"use strict";
  
    grunt.initConfig({
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
          files: ["js/src/\*\*/\*.ts", "src/\*\*/\*.ts"],
          tasks: ["ts", "tslint"]
        }
      }
    });
  
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-tslint");
  
    grunt.registerTask("default", [
      "ts",
      "tslint"
    ]);
  
  };