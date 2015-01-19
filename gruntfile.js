/**
 * Gruntfile.js
 */
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                globals: {
                    "angular": true
                },
                laxcomma: true,
                ignores: [
                ]
            },
            files: {
                 src: 'frontend/src/js/**/*.js'
            }
        },
        concat: {
            options: {
                separator: '\r'
            },
            ng: {
                src: [
                    'frontend/src/js/shared/iifeopen.js',
                    'frontend/src/js/app.js',
                    'frontend/src/js/modules/*.js',
                    'frontend/src/js/shared/iifeclose.js'
                ],
                dest: 'frontend/public/js/app.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                compress: false,
                report:'min'
            },
            blueprint : {
                files: {
                    'frontend/public/js/app.min.js': ['<%= concat.ng.dest %>']
                }
            }
        },
        cssmin: {
            site: {
                files : {
                    'frontend/public/css/site.min.css': ['frontend/src/css/*.css']
                }
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'frontend/src/scss/',
                    src: ['*.scss'],
                    dest: 'frontend/src/css',
                    ext: '.css'
                }]
            }
        },
        karma: {
            options: {
                frameworks: ['jasmine'],
                reporters: ['progress'],
                browsers: ['Chrome', 'Firefox', 'PhantomJS', 'Safari'],
                background:true,
                singleRun: false,
                files: [
                    'frontend/tests/js/utils/jquery.min.js',
                    'frontend/public/js/lib/angular/angular.js',
                    'frontend/public/js/lib/angular-resource/angular-resource.js',
                    'frontend/public/js/lib/angular-animate/angular-animate.js',
                    'frontend/public/js/lib/angular-mocks/angular-mocks.js',
                    'frontend/src/js/app.js',
                    'frontend/src/js/modules/*.js',
                    'frontend/tests/js/modules/*.js'
                ]
            },
            dev: {
                background: false,
                singleRun: true,
                reporters: 'dots'
            },
            ci: {
                background: false,
                singleRun: true,
                browsers: ['PhantomJS'],
            }
        },
        watch: {
            jsWatch: {
                files: ['frontend/src/js/**/*.js'],
                tasks: ['jshint','karma:dev:start','concat','uglify'],
                options: {
                    livereload: true
                }
            },
            cssWatch: {
                files: ['frontend/src/scss/**/*.scss'],
                tasks: ['sass', 'cssmin'],
                options: {
                    livereload: true
                }

            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['jshint', 'karma:dev:start', 'concat', 'uglify', /*, 'sass'*/]);
    grunt.registerTask('bg', ['jshint', 'karma:dev:start', 'concat', 'uglify', /*, 'sass'*/ 'watch']);
    grunt.registerTask('css', ['sass', 'cssmin']);
    grunt.registerTask('ng', ['sass', 'jshint', 'karma:ci:start', 'concat', 'uglify', 'cssmin', 'watch']);
};
