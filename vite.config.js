/* eslint-disable no-process-env */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const fs = require('fs');
// const reactPlugin = require('@vitejs/plugin-react');

const environment = process.env.NODE_ENV;
const sourcePath = environment === 'development' ? 'src' : 'dist';

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
module.exports = {
	mode: environment,
	jsx: 'react',
	root: './src',
	base: './',
	publicDir: '../public',
	resolve: {
		alias: {
			'@app': path.join(__dirname, './src'),
		},
	},
	// plugins: [
	// 	reactPlugin({ include: '**/*.tsx' }),
	// ],
	build: {
		target: 'chrome93',
		outDir: '../dist',
		emptyOutDir: true,
		sourcemap: true,
		assetsDir: '.',
		minify: environment === 'development' ? false : 'esbuild',
		rollupOptions: {
			external: [],
			output: {
				entryFileNames: '[name].[format].min.js',
				chunkFileNames: '[name].[format].min.js',
				assetFileNames: '[name].[ext]',
			},
		},
		define: {
			'import.meta.env.ENVIRONMENT': writeDefinition(environment),
		},
	},
};

function writeDefinition(value) {
	if (value === void 0)
		return value;

	return `'${value}'`;
}
