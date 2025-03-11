let left = document.querySelector(".left .details");
let right = document.querySelector(".right .details");
let result = document.querySelector(".result");

export function renderOption(song, option) {
    if (option === 1) {
        left.innerHTML = `${song.song}`;
    } else {
        right.innerHTML = `${song.song}`;
    }
}

export function renderResult(ranking) {
    ranking.forEach((rank) => {
        result.innerHTML += `<li>${rank.song}</li>`;
    })
}