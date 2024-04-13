export default defineAppConfig({
	ui: {
		primary: 'blue',
		gray: 'cool',
		icons: {
			dynamic: true,
		},
		button: {
			color: {
				blue: {
					outline:
						'ring-1 ring-inset ring-current text-{color}-500 dark:text-{color}-400 hover:bg-{color}-50 disabled:bg-transparent dark:hover:bg-{color}-950 dark:disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400',
				},
			},
		},
	},
});
