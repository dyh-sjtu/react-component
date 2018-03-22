const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	
	devServer: {
		inline: true,
		port: 8080
	},
	
	devtool: 'eval-source-map',
	
	module: {
		rules: [
			{
				test:/\.js$/,
				exclude: /(node_modules|bower_components)/,
				use:{
					loader: 'babel-loader',
					options: {
						presets: ['react', 'latest']
					}
				}
			},
			// css loader
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: "css-loader",
						options: {
							importLoaders: 1  // 当后面只有postcss-loader时候，需要引入importLoaders参数，当有less-loader
							// 或者sass-loader时候，可以无需引用importLoaders属性
						}
					},
					{
						loader:'postcss-loader',  // css的前处理插件
						options: {
							ident: 'postcss',
							plugins: [
								require('autoprefixer')({browsers: 'last 5 versions'}), //处理CSS前缀问题的插件，自动添加前缀
							]
						}
					}
				]
			}
		]
	}
}
