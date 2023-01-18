import { SpotifyClient } from "../client.js";

let API_ENDPOINT = "https://api.spotify.com/v1"

export async function request(this: SpotifyClient, link: string): Promise<Response>{
	if(!this.auth.access_token || this.auth.expire_time - Date.now() < 1){
		await this.auth.refresh();
	}
	return fetch(API_ENDPOINT + link, {
		headers: new Headers({
			"Authorization": `Bearer ${this.auth.access_token}`
		}),
		method: "get"
	});
}
