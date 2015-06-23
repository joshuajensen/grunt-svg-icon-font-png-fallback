module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ",
    /*
    * generates the icon font files, css & html demo based on contents of public/icons/source/svg
    * @module tasks
    * @class webfont
    */
    env: {
      dev: "http://localhost:4200/"
    }
  });

  grunt.loadTasks('tasks');

 
  grunt.registerTask("generate", ["svgIconFontPngFallback"]);

};