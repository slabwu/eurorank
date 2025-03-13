export async function getSongs() {
    try {
        let year = document.querySelector('select').value;
        const response = await fetch(`https://eurovisionapi.runasp.net/api/contests/${year}`);
        const json = await response.json();
        let requests = json.contestants.map(getVideo);
        let songs = await Promise.all(requests);
        return songs;
    } catch (err) {
        console.log(err);
    }
}

async function getVideo(song) {
    let response = await fetch(`${song.url}`);
    const info = await response.json();
    song.url = info.videoUrls[0];
    return song;
}