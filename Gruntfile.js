module.exports = function (grunt) {

    var jsFiles = [
        'www/src/js/controllers/*',
        'www/src/js/models/*',
        'www/src/js/collections/*',
        'www/src/js/views/*',
        'www/src/js/app.js'
    ];

    var jsLibs = [
        'www/src/js/libraries/*.js'
    ];

    grunt.initConfig({
        concat: {
            css: {
                src: 'www/src/sass/compiled/*.css',
                dest: 'www/build/css/styles.css'
            },
            csslibs: {
                src: 'www/src/sass/libraries/*.css',
                dest: 'www/build/css/libraries.css'
            },
            jslibs: {
                src: jsLibs,
                dest: 'www/build/js/libraries.js'
            },
            js: {
                src: jsFiles,
                dest: 'www/build/js/app.js'
            },
            jstemplates: {
                src: ['www/src/templates/*.twig'],
                dest: 'www/build/includes/jstemplates.tpl'
            }
        },

        uglify: {
            js: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'www/build/js/app.js.map'
                },
                files: {
                    'www/build/js/app.min.js': 'www/build/js/app.js'
                }
            },
            jslibs: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'www/build/js/libraries.js.map'
                },
                files: {
                    'www/build/js/libraries.min.js': 'www/build/js/libraries.js'
                }
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'www/src/sass/',
                    src: ['*.scss'],
                    dest: 'www/src/sass/compiled/',
                    ext: '.css'
                }]
            }
        },

        copy: {
            main: {
                files: [
                    //IOS specific
                    // { expand: true, flatten: true, src: ['Resources/icons/**'], dest: 'platforms/ios/Sample/Resources/icons/', filter: 'isFile'},
                    {
                        expand: true,
                        flatten: true,
                        src: ['www/src/fonts/**'],
                        dest: 'www/build/css/fonts/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['www/src/images/*'],
                        dest: 'www/build/images/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['www/src/images/circle.skin/**'],
                        dest: 'www/build/images/circle.skin',
                        filter: 'isFile'
                    }

                ]
            }
        },
        cssmin: {
            compress: {
                files: {
                    'www/build/css/styles.min.css': 'www/build/css/styles.css',
                    'www/build/css/libraries.min.css': 'www/build/css/libraries.css'
                }
            }
        },
        clean: {
            build: {
                src: ["www/build/js", "www/build/css", "www/src/sass/compiled/*.css", "www/build/images"]
            }
        },

        includes: {
            build: {
                cwd: 'www/src/html',
                src: ['*.html'],
                dest: 'www/build',
                options: {
                    includePath: 'www/build/includes',
                    flatten: true,
                }
            }
        },

        watch: {
            sass: {
                files: ['www/src/sass/*.scss'],
                tasks: ['sass', 'concat:css', 'cssmin']
            },
            js: {
                files: jsFiles,
                tasks: ['concat:js', 'uglify']
            },
            html: {
                files: ['www/src/html/*'],
                tasks: ['includes']
            },
            misc: {
                files: ['www/src/html/*.scss'],
                tasks: ['includes']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-includes');

    grunt.registerTask('default', ['clean', 'sass', 'concat', 'copy', 'includes', 'cssmin', 'uglify']);
};
