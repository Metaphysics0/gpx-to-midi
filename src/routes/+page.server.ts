import { ExecuteService } from '$lib/server/executeService';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	default: async (event) => {
		const service = new ExecuteService();
		await service.call();
	}
} satisfies Actions;
