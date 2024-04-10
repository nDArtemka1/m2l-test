import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default <Partial<Config>>{
	theme: {
		extend: {
			colors: {
				blue: {
					100: '#F2F7FF',
					200: '#CCE2FF',
					600: '#006EFF',
					700: '#1D4ED8',
				},
				gray: {
					0: '#FFFFFF',
					100: '#E9EAED',
					150: '#CDD3E0',
					200: '#C8CBD1',
					300: '#C8CBD1',
					400: '#8B8E92',
					500: '#595759',
					950: '#252525',
				},
			},
		},
		fontSize: {
			xs: '0.7rem',
			sm: '0.8rem',
			base: '1rem',
			xl: '1.25rem',
			'2xl': '1.563rem',
			'3xl': '1.953rem',
			'4xl': '2.441rem',
			'5xl': '3.052rem',
		},
	},
};
