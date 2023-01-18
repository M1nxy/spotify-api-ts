import { SpotifyClient } from "../../client.js";
import { AvailableLocales } from "../locales.js";

type Image = {
	url: string;
	height: number;
	width: number;
}
type ImageResponse = Image[]

type Track = {
	album: {
		album_type: "album" | "single" | "compilation";
		total_tracks: number;
		available_markets: AvailableLocales;
		external_urls: {
			spotify: string
		};
		href: string;
		id: string;
		images: ImageResponse
		name: string;
		release_date: string;
		release_date_precision: "year" | "month" | "day"
		restrictions?: {
			reason: "market" | "product" | "explicit"
		}
		type: "album",
		uri: `spotify:album:${string}`;
	}
	artists: {
		external_urls: {
			spotify: string;
		}
		href: string;
		id: string;
		name: string;
		type: "artist";
		uri: `spotify:artist:${string}`;
	}[];
	available_markets: AvailableLocales;
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: {
		isrc?: string;
		ean?: string;
		upc?: string;
	}
	external_urls: {
		spotify: string;
	}
	href: string;
	id: string;
	is_local: boolean;
	name: string;
	popularity: number
	preview_url: string | null;
	track_number: number;
	type: "track";
	uri: `spotify:track:${string}`
}

export default async function single(this: any, id: string): Promise<Track> {
	let self = this as SpotifyClient
	let res = await self.request(`/tracks/${id}`)
	if(!res.ok) throw new Error(res.status + res.statusText)
	let data = await res.json()
	return data as Track
}

