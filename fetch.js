export async function getSongs() {
    try {
        const response = await fetch('https://eurovisionapi.runasp.net/api/contests/2024');
        const json = await response.json();
        return json.contestants;
    } catch (err) {
        console.log(err);
    }
}