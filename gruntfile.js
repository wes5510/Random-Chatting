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
						cwd: 'src/main/es6/',
						src: ['**/*.js'],
						dest: 'src/main/dist/'
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
			target: ['resources/dist/**/*.js', 'src/es6/**/*.js']
		},
		mocha: {
      all: {
        src: ['src/tests/**/*.js'],
      },
      options: {
        run: true
      }
    }
	});

	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.registerTask('default', ['eslint', 'mocha', 'babel']);
};
