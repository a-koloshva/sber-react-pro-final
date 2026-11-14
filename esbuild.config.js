const fs = require('node:fs/promises');
const path = require('node:path');
const esbuild = require('esbuild');
const CssModulesPlugin = require('esbuild-css-modules-plugin');
const { transform } = require('@svgr/core');

const rootDir = __dirname;
const outputDir = path.resolve(rootDir, 'dist-esbuild');
const entryFile = path.resolve(rootDir, 'src/index.tsx');
const htmlTemplate = path.resolve(rootDir, 'public/index.html');

require('dotenv').config({ path: path.resolve(rootDir, '.env') });

const svgImportsPlugin = {
	name: 'svg-imports',
	setup(build) {
		build.onResolve({ filter: /\.svg$/ }, (args) => ({
			path: path.resolve(args.resolveDir, args.path),
			namespace: 'svg-dual',
		}));

		build.onLoad({ filter: /.*/, namespace: 'svg-dual' }, (args) => ({
			contents: [
				`import url from ${JSON.stringify(`${args.path}?url`)};`,
				`import ReactComponent from ${JSON.stringify(
					`${args.path}?component`
				)};`,
				'export default url;',
				'export { ReactComponent };',
			].join('\n'),
			resolveDir: path.dirname(args.path),
			loader: 'js',
		}));

		build.onResolve({ filter: /\.svg\?url$/ }, (args) => ({
			path: args.path.slice(0, -4),
			namespace: 'svg-url',
		}));

		build.onLoad({ filter: /.*/, namespace: 'svg-url' }, async (args) => ({
			contents: await fs.readFile(args.path),
			loader: 'file',
		}));

		build.onResolve({ filter: /\.svg\?component$/ }, (args) => ({
			path: args.path.slice(0, -10),
			namespace: 'svg-component',
		}));

		build.onLoad({ filter: /.*/, namespace: 'svg-component' }, async (args) => {
			const svg = await fs.readFile(args.path, 'utf8');
			const contents = await transform(
				svg,
				{ plugins: ['@svgr/plugin-jsx'] },
				{ filePath: args.path }
			);

			return {
				contents,
				loader: 'jsx',
				resolveDir: path.dirname(args.path),
			};
		});
	},
};

async function build() {
	if (!process.env.API_URL) {
		throw new Error('API_URL is required for the esbuild production build.');
	}

	await fs.rm(outputDir, { recursive: true, force: true });

	await esbuild.build({
		entryPoints: [entryFile],
		bundle: true,
		minify: true,
		target: ['es2015'],
		platform: 'browser',
		format: 'iife',
		outdir: outputDir,
		metafile: true,
		entryNames: 'static/scripts/[name]',
		assetNames: 'static/assets/[name]-[hash]',
		publicPath: '/',
		loader: {
			'.png': 'file',
			'.jpg': 'file',
			'.gif': 'file',
			'.webp': 'file',
			'.woff': 'file',
			'.woff2': 'file',
			'.eot': 'file',
			'.ttf': 'file',
			'.otf': 'file',
		},
		define: {
			'process.env.API_URL': JSON.stringify(process.env.API_URL),
			'process.env.NODE_ENV': JSON.stringify('production'),
		},
		plugins: [
			CssModulesPlugin({
				force: true,
				inject: false,
				localsConvention: 'camelCaseOnly',
				pattern: '[hash]__[name]__[local]',
			}),
			svgImportsPlugin,
		],
	});

	const template = await fs.readFile(htmlTemplate, 'utf8');
	if (!template.includes('</head>') || !template.includes('</body>')) {
		throw new Error(
			'The HTML template must contain closing </head> and </body> tags.'
		);
	}

	const html = template
		.replace(
			'</head>',
			'  <link rel="stylesheet" href="/static/scripts/index.css">\n</head>'
		)
		.replace(
			'</body>',
			'  <script defer src="/static/scripts/index.js"></script>\n</body>'
		);
	await fs.writeFile(path.join(outputDir, 'index.html'), html);
}

build().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
