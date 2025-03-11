import { getSongs } from './fetch.js';
import { mergeSort, shuffle } from './helper.js';
import { renderResult } from './render.js';

async function sortSongs() {
    let songs = await getSongs();
    songs = shuffle(songs);
    songs.length = 4;
    console.log(songs);
    
    let ranking = await mergeSort(songs);
    renderResult(ranking);
}

sortSongs();