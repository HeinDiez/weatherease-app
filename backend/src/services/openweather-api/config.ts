const key = process.env.OPENWEATHER_API_KEY;
const url = process.env.OPENWEATHER_API_URL ?? '';

if (!key || !url) {
    throw new Error('Missing OPENWEATHER_API_KEY or OPENWEATHER_API_URL in environment variables');
}

export { key, url }