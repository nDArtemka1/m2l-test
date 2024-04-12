import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default <Partial<Config>>{
	theme: {
		extend: {
			colors: {
				blue: {
					50: '#F2F7FF',
					//CUSTOM
					100: '#CCE2FF',
					//CUSTOM
					200: '#CCE2FF',
					300: '#CDD3E0',
					//CUSTOM
					400: '#006EFF',
					//CUSTOM
					500: '#1D4ED8',
					//CUSTOM
					600: '#006eff',
					//CUSTOM
					700: '#1d4ed8',
					800: '#1e40af',
					900: '#1e3a8a',
					950: '#19253c',
				},
				yellow: {
					50: '#fefce8',
					//CUSTOM
					100: '#FEF2D1',
					//CUSTOM
					200: '#FFEBB4',
					300: '#fde047',
					400: '#facc15',
					500: '#eab308',
					//CUSTOM
					600: '#B98400',
					700: '#a16207',
					800: '#854d0e',
					900: '#713f12',
					950: '#422006',
				},
				red: {
					50: '#fef2f2',
					//CUSTOM
					100: '#FFEFEF',
					//CUSTOM
					200: '#FFD5D5',
					300: '#fca5a5',
					//CUSTOM
					400: '#FF5D5D',
					500: '#ef4444',
					600: '#dc2626',
					700: '#b91c1c',
					800: '#991b1b',
					900: '#7f1d1d',
					950: '#450a0a',
				},
				gray: {
					50: '#f9fafb',
					100: '#f3f4f6',
					200: '#e5e7eb',
					//CUSTOM
					300: '#E9EAED',
					//CUSTOM
					400: '#C8CBD1',
					//CUSTOM
					500: '#8B8E92',
					600: '#4b5563',
					700: '#374151',
					800: '#1f2937',
					//CUSTOM
					900: '#595759',
					//CUSTOM
					950: '#252525',
				},
			},
		},
	},
};
