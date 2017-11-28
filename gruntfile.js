module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		babel: {
			options: {
				sourceMap: true,
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: 'server/es6/',
						src: ['**/*.js'],
						dest: 'server/dist/'
					},{ 
						expand: true,
						cwd: 'public/static/js/es6/',
						src: ['**/*.js'],
						dest: 'public/static/js/dist/'
					}
				]
			}
		},
		eslint: {
			target: ['server/es6/**/*.js', 'public/static/js/es6/**/*.js']
		}
	});

	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.registerTask('default', ['eslint', 'babel']);
};
