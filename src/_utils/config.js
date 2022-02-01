import { browser } from '$app/env';
import { ConfigError } from './errors';

function configMissing(cKey) {
	throw new ConfigError(`Missing required environment varable: ${cKey}`);
}

let env;
if (!browser) {

  env = process.env || configMissing('ALL');

}

export default {
	env,
	vite: import.meta.env,
};
