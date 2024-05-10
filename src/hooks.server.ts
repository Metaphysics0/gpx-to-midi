import type { Handle } from '@sveltejs/kit';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

const ratelimit = new Ratelimit({
	redis: kv,
	limiter: Ratelimit.slidingWindow(10, '10 s')
});

export const handle: Handle = async ({ event, resolve }) => {
	const clientIpAddress = event.request.headers.get('x-forwarded-for') || event.getClientAddress();
	const { success } = await ratelimit.limit(clientIpAddress);

	if (success) {
		return resolve(event);
	}

	console.warn(`RateLimit - client ip: ${clientIpAddress} is triggering rate limiter`);
	return new Response('Too many requests!!', {
		status: 429
	});
};
