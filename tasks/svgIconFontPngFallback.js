
'use strict';

module.exports = function(grunt) {
  
  grunt.registerMultiTask('svgIconFontPngFallback', 'generate icon font, css & fallback png files', function() {

    var options = grunt.config.get(["svgIconFontPngFallback"]) || {};
    var cwd = process.cwd();
    process.chdir("node_modules/grunt-svg-icon-font-png-fallback");

    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-svg-modify-silent');
    grunt.loadNpmTasks('grunt-svg2png');
    grunt.loadNpmTasks('grunt-webfont');
    
    grunt.config.merge({
      webfont: {
        icons: {
          src: options.svgSrc + "*.svg",
          dest: "icons/generated/icon-assets",
          options: {
            font: options.fontName || "icons",
            types: options.fontTypes || "ttf,woff,svg,eot",
            template: options.cssTemplateSrc || "icons/templates/font-template.css",
            htmlDemo: true,
            htmlDemoTemplate: options.htmlTemplateSrc || "icons/templates/html-demo-template.html",
            stylesheet: "css",
            relativeFontPath: options.relativeFontPath || "../../icons/fonts/"
          }
        }
      },
      svg_modify: {
        //configure sizes and colors for each svg in public/icons/source/svg/config.json
        convert: {
          // cwd: "icons/",
          src: options.svgSrc,
          dest: "../icons/generated/svg_modified/"
        }
      },
      svg2png: {
        rasterize: {
          files: [{
            cwd: "icons/generated/svg_modified/svg/",
            src: ['*.svg'],
            dest: options.pngDest || "icons/png/"
          }]
        }
      },
      copy: {
        fontsLocal: {
          files: [{
            expand: true,
            src: ["icons/generated/icon-assets/" + (options.fontName || "icons") + "-*"],
            dest: options.fontDest || 'icons/fonts/',
            filter: 'isFile',
            flatten: true
          }]
        },
        scssLocal: {
          src: "icons/generated/icon-assets/icons.css",
          dest: "icons/css/icons.css"
        },
        demoLocal: {
          src: "icons/generated/icon-assets/icons.html",
          dest: "icon-demo.html"
        }
      },
      clean: {
        generatedLocal: "icons/generated/",
        tempLocal: "temp/"
      }
    });



    grunt.task.run(["clean:tempLocal", "clean:generatedLocal", "webfont", "svg_modify", "svg2png", "copy:fontsLocal", "copy:scssLocal", "copy:demoLocal"]);
    process.chdir(cwd)
  });
};