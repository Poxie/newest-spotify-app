export type Album = {
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    external_urls: {
        spotify: string;
    },
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    disc_number: number;
    duration_ms: number
    explicit: boolean;
    is_local: boolean;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}

export type Artist = {
    external_urls: {
        spotify: string;
    },
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export type Image = {
    height: number;,
    url: string;
    width: number;
},