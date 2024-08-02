const key = process.env.WEATHERBIT_API_KEY;
const url = process.env.WEATHERBIT_API_URL ?? '';

if (!key || !url) {
    throw new Error('Missing WEATHERBIT_API_KEY or WEATHERBIT_API_URL in environment variables');
}

export { key, url }