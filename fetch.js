export async function getSongs() {
    try {
        let year = document.querySelector('select').value;
        console.log(year);
        const response = await fetch(`https://eurovisionapi.runasp.net/api/contests/${year}`);
        const json = await response.json();
        return json.contestants;
    } catch (err) {
        console.log(err);
    }
}