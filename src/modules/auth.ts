let AUTH_ENDPOINT = "https://accounts.spotify.com/api/token"

export interface Credentials {
	id: string;
	secret: string;
}

export interface spotifyAuthResponse {
	access_token: string;
	token_type: string;
	expire_time: number;
}

export class SpotifyAuth implements spotifyAuthResponse {
	private readonly clientCredentials: Credentials;
	access_token!: string;
	token_type!: string;
	expire_time: number;
	constructor(credentials: Credentials) {
		this.clientCredentials = credentials;
		this.expire_time = Date.now()
	}
	async refresh() {
		let data = await fetch(AUTH_ENDPOINT, {
			method: 'POST',
			body: 'grant_type=client_credentials&client_id=' +
				this.clientCredentials.id +
				'&client_secret=' +
				this.clientCredentials.secret,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		let { access_token, token_type, expires_in } = await data.json();
		this.access_token = access_token
		this.token_type = token_type
		this.expire_time = Date.now() + expires_in
		return this
	}
}
