import { env } from '$env/dynamic/public';

export const twitch_login_uri = `https://id.twitch.tv/oauth2/authorize?client_id=${env.PUBLIC_TWITCH_OAUTH_CLIENT_ID}&redirect_uri=${env.PUBLIC_TWITCH_REDIRECT_URI}&response_type=code&scope=channel%3Aread%3Aredemptions+channel%3Amanage%3Aredemptions`;

export const twitch_bot_uri = `https://id.twitch.tv/oauth2/authorize?client_id=${env.PUBLIC_TWITCH_OAUTH_CLIENT_ID}&redirect_uri=${env.PUBLIC_TWITCH_REDIRECT_URI}&response_type=code&scope=chat:read+chat:edit+user:manage:whispers`;
