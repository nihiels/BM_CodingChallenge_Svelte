import type {PlaywrightTestConfig} from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	workers: 1 //make sure, tests are not parallel
};

export default config;
