import { Credentials, SpotifyAuth } from "./modules/auth.js";
import { request } from "./modules/request.js";
import routes from "./routes.js";

type SpotifyRoutes = ReturnType<typeof routes>;

export type SpotifyClient = {
	auth: SpotifyAuth;
	request: (this: SpotifyClient, link: string) => Promise<Response>;
} & SpotifyRoutes;

export const Spotify = function (this: SpotifyClient, creds: Credentials) {
	this.auth = new SpotifyAuth(creds);
	this.request = request;
	Object.assign(this, routes.call(this));
	void this.auth.refresh();
} as any as {
	new (creds: Credentials): SpotifyClient;
}
