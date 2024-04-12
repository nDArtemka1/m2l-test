// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: false },
	modules: ['@nuxt/ui'],
	app: {
		head: {
			title: 'M2Lab - Test',
		},
	},
});
