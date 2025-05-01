module.exports = {
	env: {
		node: true,
		es2021: true
	},
	extends: 'standard',
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	rules: {
		semi: ['error', 'never'],
		quotes: ['error', 'single'],
		indent: ['error', 'tab'],
		'no-tabs': 'off',
		'comma-dangle': ['error', 'never'],
		'no-unused-vars': 'warn',
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'space-before-function-paren': ['error', 'never']
	}
}
