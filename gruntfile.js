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
						'app-dist.js': 'app.js'
					},
					{
						expand: true,
						cwd: 'src/es6/',
						src: ['**/*.js'],
						dest: 'src/dist/'
					},
					{
						expand: true,
						cwd: 'resources/es6/',
						src: ['**/*.js'],
						dest: 'resources/dist/'
					}
				]
			}
		},
		eslint: {
			target: ['resources/dist/**/*.js', 'app.js', 'src/es6/**/*.js']
		}
	});

	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.registerTask('default', ['eslint', 'babel']);
};
