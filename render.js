import { sharedState } from "./helper.js";
import { sortSongs } from "./main.js";

let submitBtn = document.querySelector(".submit");
let left = document.querySelector(".left div.song");
let right = document.querySelector(".right > div.song");
let leftCard = document.querySelector(".left div.song .details");
let rightCard = document.querySelector(".right > div.song .details");
let leftBtn = document.querySelector(".left button");
let rightBtn = document.querySelector(".right button");
let progress = document.querySelector("#progress");
let progressLabel = document.querySelector(".progress-label");

let result = document.querySelector(".result");
let select = document.querySelector('select');
let code = document.querySelector('.code');
let againBtn = document.querySelector('.again');
const countryName = new Intl.DisplayNames(["en"], { type: "region" });

let optionsPage = document.querySelector(".options");
let loadPage = document.querySelector(".load");
let cardPage = document.querySelector(".container");
let resultsPage = document.querySelector(".results");


export function showOptions(song, option) {
    let ref, btn;
    if (option === 1) {
        ref = leftCard;
        btn = leftBtn;
    } else {
        ref = rightCard;
        btn = rightBtn;
    }

    ref.innerHTML = '';
    ref.innerHTML += `<h1>${countryName.of(song.country)} ${getFlagEmoji(song.country)}</h1>`;
    ref.innerHTML += `<h2>${song.song}</h2>`;
    ref.innerHTML += `<h2>${song.artist}</h2>`;
    //ref.innerHTML += `<a href='${song.url}'>Link</a>`;
    ref.innerHTML += `<iframe title='YouTube video player' type=\"text/html\" width='336' height='189' src='${song.url}' frameborder='0' allow="fullscreen"></iframe>`;
    btn.innerHTML = `Choose ${countryName.of(song.country)}`;
}

export function showResult(ranking) {
    resultsPage.style.display = 'flex';
    result.innerHTML = '';

    ranking.forEach((song, index) => {
        
        let rank = addElement('tr', result);
        addElement('td', rank, `${index + 1}`);
        addElement('td', rank, `${getFlag(song.country)}`);
        addElement('td', rank, `${countryName.of(song.country)}`);
        addElement('td', rank, `${song.song} - ${song.artist}`);
        //result.innerHTML += `<li>${song.song} - ${song.artist} (${countryName.of(`${song.country}`)} ${getFlagEmoji(`${song.country}`)})</li>`;
    })
}

export function showSelect() {
    optionsPage.style.display = 'flex';
    loadPage.style.display = 'none';
    cardPage.style.display = 'none';
    resultsPage.style.display = 'none';

    for (let i = 2024; i > 1955; i--) {
        const year = document.createElement('option');
        year.innerHTML = i;
        select.appendChild(year);
    }
}

export function showLoad() {
    optionsPage.style.display = 'none';
    loadPage.style.display = 'flex';
}

export function showCards() {
    loadPage.style.display = 'none';
    cardPage.style.display = 'flex';
}

export function showCode(ranking) {
    cardPage.style.display = 'none';
    code.innerHTML = '';

    let year = document.querySelector('select').value;
    code.innerHTML = `!submit ${year} `;
    ranking.forEach((song) => {
        code.innerHTML += `${song.country.toLowerCase()} `;
    })
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

function renderTilt(e, target) {
    const pX = e.clientX;
    const pY = e.clientY;

    const rect = target.getBoundingClientRect();

    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;

    const centerX = rect.left + halfWidth;
    const centerY = rect.top + halfHeight;

    const deltaX = pX - centerX;
    const deltaY = pY - centerY;

    const rx = deltaY / halfHeight;
    const ry = deltaX / halfWidth;

    const distanceToCenter = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    const maxDistance = Math.max(halfWidth, halfHeight);
    const degree = distanceToCenter * 10 / maxDistance;

    target.style.transform = `perspective(400px) rotate3D(${-rx}, ${ry}, 0, ${degree}deg)`;
    
    const gloss = target.querySelector('.gloss');
    gloss.style.transform = `translate(${-ry * 100}%, ${-rx * 100}%) scale(2.4)`;
    gloss.style.opacity = (distanceToCenter * 0.6) / maxDistance;
}

function renderReset(e, target) {
    e.target.style = null;
    const gloss = target.querySelector('.gloss');
    gloss.style.opacity = 0;
}

left.addEventListener('mousemove', (e) => {renderTilt(e, left)});
left.addEventListener('mouseleave', (e) => {renderReset(e, left)});
right.addEventListener('mousemove', (e) => {renderTilt(e, right)});
right.addEventListener('mouseleave', (e) => {renderReset(e, right)});

function addElement(type, source, content = '') {
    const element = document.createElement(`${type}`);
    element.innerHTML = `${content}`;
    source.appendChild(element);
    return element;
}

function getFlag(code) {
    return `<img src="https://kapowaz.github.io/square-flags/flags/${code.toLowerCase()}.svg" width="48">`;
}

againBtn.addEventListener('click', () => {
    sharedState.stepsDone = 0;
    showSelect();
})

export function renderProgress(percent) {
    progress.value = percent;
    progressLabel.innerHTML = `${percent}% ranked`;

    if (percent > 70) {
        progressLabel.innerHTML += ' - Almost done!';
    } else if (percent >= 50) {
        progressLabel.innerHTML += ' - Halfway there!';
    } else if (percentage > 30) {
        progressLabel.innerHTML += ' - Making good progress!';
    }
}