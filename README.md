feature detection is required by default for applying either a fontface class or a legacy class to the html element. This way, if @fontface is available, the icon elements will use the generated icon font, otherwise if @fontface in not supported, the png background images will be used with thier default color values and sizes. For more complex png fallbacks you will need to define multiple namespaces for a given icon.


example grunt config:
```
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ",
    svgIconFontPngFallback: {
      svgSrc: "public/icons/svg/",
      cssTemplateSrc: "public/icons/templates/font-template.css",
      htmlTemplateSrc: "public/icons/templates/html-demo-template.html",
      relativeFontPath: "../icons/fonts/"
    },
  });
  grunt.loadNpmTasks('grunt-svg-icon-font-png-fallback');
};
```
