import { getSongs } from './fetch.js';
import { mergeSort, shuffle } from './helper.js';
import { showSelect, showLoad, showCards, showResult, showCode } from './render.js';

showSelect();

export async function sortSongs() {
    showLoad();
    let songs = await getSongs();
    songs = shuffle(songs);
    songs.length = 12;
    
    showCards();
    let ranking = await mergeSort(songs);
    showResult(ranking);
    showCode(ranking);
}