/*global module:false*/

/*global module:false*/
module.exports = function(grunt) {


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: '/* \n' +
					' * <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> \n' +
					' */ \n'
		},
		// CSSMin
		cssmin: {
			options: {
				banner: '<%= meta.banner %>'
			},
			combine: {
				files: '<%= pkg.css %>'
			}
		},
		// Uglify
		uglify: {
			target: {
				keepSpecialComments: 0,
				banner: '<%= meta.banner %>',
				files: '<%= pkg.js %>'
			}
		},
		// Watch
		watch: {
			css: {
				files: [ 'css/*', '!css/*.min.css' ],
				tasks: [ 'cssmin' ]
			},
			js: {
				files: [ 'js/*', '!js/*.min.js' ],
				tasks: [ 'uglify' ]
			}
		}
	});

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task.
	grunt.registerTask('default', [ 'uglify', 'cssmin' ]);

};