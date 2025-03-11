import { getSongs } from './fetch.js';
import { mergeSort, shuffle } from './helper.js';

async function sortSongs() {
    let songs = await getSongs();
    songs = shuffle(songs);
    songs.length = 4;
    console.log(mergeSort(songs));
}

sortSongs();