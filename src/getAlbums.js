const artists = [
    "Kendrick Lamar",
    "Drake",
     "Kendrick Lamar",
    "Drake",
    "The Weeknd",
    "Tyler, the Creator",
    "Taylor Swift",
    "Frank Ocean",
    "Travis Scott",
    "Billie Eilish",
    "Adele",
    "Kanye West",
    "Playboi Carti",
    "SZA",
    "Doja Cat",
    "Post Malone",
    "Ariana Grande",
    "Bad Bunny",
    "Dua Lipa",
    "Olivia Rodrigo",
    "Lil Baby",
    "21 Savage",
    "Future",
    "J. Cole",
    "Ed Sheeran",
    "Rihanna",
    "Beyoncé",
    "Bruno Mars",
    "Sabrina Carpenter",
    "Lana Del Rey",
    "Ice Spice",
    "Metro Boomin",
    "A$AP Rocky",
    "Central Cee",
    "Don Toliver",
    "Gunna",
    "Lil Uzi Vert",
    "Chris Brown",
    "Charli XCX",
    "Skrillex",
    "Marshmello",
    "Wizkid",
    "Skepta",
    "Denzel Curry",
    "Mac Miller",
    "Joey Bada$$",
    "Wiz Khalifa",
    "Nicki Minaj",
    "Cardi B",
    "Latto",
    "GloRilla",
    "H.E.R.",
    "Daniel Caesar",
    "Giveon",
    "Ty Dolla $ign",
    "Camila Cabello",
    "Selena Gomez",
    "Justin Bieber",
    "Arctic Monkeys",
    "Måneskin",
    "Imagine Dragons",
    "twenty one pilots",
    "Coldplay",
    "Linkin Park",
    "Machine Gun Kelly",
    "Lil Peep",
    "Juice WRLD",
    "XXXTENTACION",
    "Trippie Redd",
    "NBA YoungBoy",
    "Yeat",
    "Ken Carson",
    "Destroy Lonely",
    "Jay-Z",
    "Eminem",
    "50 Cent",
    "Pharrell Williams",
    "Timbaland"
];


// Перемішування масиву (алгоритм Fisher-Yates)
function shuffleArray(array) {
    const arr = [...array]; // копія, щоб не мутувати оригінал
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

async function getAlbums() {
    const allAlbums = [];

    for (const artist of artists) {
        try {
            console.log(`Завантажую: ${artist}`);

            const url =
                `https://itunes.apple.com/search?term=${encodeURIComponent(artist)}&entity=album&attribute=artistTerm&limit=25`;

            const response = await fetch(url);
            const data = await response.json();

            const filtered = data.results.filter(item => {
                const isAlbum = item.collectionType === "Album";
                const isSoundtrack = item.primaryGenreName === "Soundtrack";
                const enoughTracks = (item.trackCount ?? 0) >= 5;

                const name = item.collectionName?.toLowerCase() ?? "";
                const isSuspiciousName =
                    name.includes("single") ||
                    name.includes("- ep") ||
                    name.includes("(from the") ||
                    name.includes("soundtrack") ||
                    name.includes("motion picture");

                return isAlbum && !isSoundtrack && enoughTracks && !isSuspiciousName;
            });

            console.log(`  Знайдено альбомів: ${filtered.length} з ${data.results.length}`);

            allAlbums.push(...filtered);

            await new Promise(resolve => setTimeout(resolve, 1000));

        } catch (error) {
            console.log(`Помилка для ${artist}:`, error);
        }
    }

    console.log(`Всього отримано альбомів: ${allAlbums.length}`);

    // Перемішуємо перед записом
    const shuffledAlbums = shuffleArray(allAlbums);

    const fs = await import("fs");

    fs.writeFileSync(
        "./albums.json",
        JSON.stringify(shuffledAlbums, null, 2)
    );

    console.log("albums.json створено (перемішано)!");
}

getAlbums();