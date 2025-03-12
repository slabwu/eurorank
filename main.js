import { getSongs } from './fetch.js';
import { mergeSort, shuffle } from './helper.js';
import { renderResult, renderSelect } from './render.js';

renderSelect()

export async function sortSongs() {
    let songs = await getSongs();
    songs = shuffle(songs);
    songs.length = 4;
    
    let ranking = await mergeSort(songs);
    renderResult(ranking);
}