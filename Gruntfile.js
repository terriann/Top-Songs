module.exports = function (grunt) {

    var jsFiles = [
        'src/js/controllers/*',
        'src/js/models/*',
        'src/js/collections/*',
        'src/js/views/*',
        'src/js/app.js'
    ];

    var jsLibs = [
        'src/js/libraries/*.js'
    ];

    grunt.initConfig({
        concat: {
            css: {
                src: 'src/sass/compiled/*.css',
                dest: 'docs/css/styles.css'
            },
            csslibs: {
                src: 'src/sass/libraries/*.css',
                dest: 'docs/css/libraries.css'
            },
            jslibs: {
                src: jsLibs,
                dest: 'docs/js/libraries.js'
            },
            js: {
                src: jsFiles,
                dest: 'docs/js/app.js'
            },
            jstemplates: {
                src: ['src/templates/*.twig'],
                dest: 'docs/includes/jstemplates.tpl'
            }
        },

        uglify: {
            js: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'docs/js/app.js.map'
                },
                files: {
                    'docs/js/app.min.js': 'docs/js/app.js'
                }
            },
            jslibs: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'docs/js/libraries.js.map'
                },
                files: {
                    'docs/js/libraries.min.js': 'docs/js/libraries.js'
                }
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/sass/',
                    src: ['*.scss'],
                    dest: 'src/sass/compiled/',
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
                        src: ['src/fonts/**'],
                        dest: 'docs/css/fonts/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/images/*'],
                        dest: 'docs/images/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/images/circle.skin/**'],
                        dest: 'docs/images/circle.skin',
                        filter: 'isFile'
                    }

                ]
            }
        },
        cssmin: {
            compress: {
                files: {
                    'docs/css/styles.min.css': 'docs/css/styles.css',
                    'docs/css/libraries.min.css': 'docs/css/libraries.css'
                }
            }
        },
        clean: {
            build: {
                src: ['docs/js', 'docs/css', 'src/sass/compiled/*.css', 'docs/images', 'docs/*.html']
            }
        },

        includes: {
            build: {
                cwd: 'src/html',
                src: ['*.html'],
                dest: 'docs',
                options: {
                    includePath: 'docs/includes',
                    flatten: true,
                }
            }
        },

        watch: {
            sass: {
                files: ['src/sass/*.scss'],
                tasks: ['sass', 'concat:css', 'cssmin']
            },
            js: {
                files: jsFiles,
                tasks: ['concat:js', 'uglify']
            },
            html: {
                files: ['src/html/*'],
                tasks: ['includes']
            },
            misc: {
                files: ['src/html/*.scss'],
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
