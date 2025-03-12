import { sortSongs } from "./main.js";

let submitBtn = document.querySelector(".submit");
let left = document.querySelector(".left .details");
let right = document.querySelector(".right .details");
let result = document.querySelector(".result");
let select = document.querySelector('select');
const countryName = new Intl.DisplayNames(["en"], { type: "region" });


export function renderOption(song, option) {
    let ref;
    if (option === 1) {
        ref = left;
    } else {
        ref = right;
    }
    ref.innerHTML = '';
    ref.innerHTML += `<h1>${countryName.of(`${song.country}`)} ${getFlagEmoji(`${song.country}`)}</h1>`;
    ref.innerHTML += `<h2>${song.song}</h2>`;
    ref.innerHTML += `<h2>${song.artist}</h2>`;
}

export function renderResult(ranking) {
    ranking.forEach((song) => {
        result.innerHTML += `<li>${song.song} - ${song.artist} (${countryName.of(`${song.country}`)} ${getFlagEmoji(`${song.country}`)})</li>`;
    })
}

export function renderSelect() {
    for (let i = 2010; i < 2025; i++) {
        const year = document.createElement('option');
        year.innerHTML = i;
        select.appendChild(year);
    }
}

function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sortSongs();
});