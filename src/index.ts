import { Spotify } from "./client.js"
// export { Spotify } from './modules/client.js';

import { config } from 'dotenv'
config()

;(async () => {
	let spotify = new Spotify({
		id: process.env.CLIENT ?? '',
		secret: process.env.SECRET ?? '',
	})
	let test = await spotify.tracks.id("1pKYYY0dkg23sQQXi0Q5zN")
	test.album.images[0].
})()
