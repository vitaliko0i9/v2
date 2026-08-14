import { useEffect, useState } from "react";
import axios from "axios";

function AlbumWall() {

    const [ albums, setAlbums ] = useState([]);
    
    useEffect(() => {
        const getAlbums = async () => {
            const requests = artists.map(artist => 
                axios.get(`https://itunes.apple.com/search?term=${artist}&entity=album&limit=5`)
            )

            const responses = await Promise.all(requests)
            const AllAlbums = responses.flatMap(
                response => response.data.results
            );
            setAlbums(AllAlbums)
        };
        getAlbums()
    }, []);
 
    return (
        <div className="album-wall">
            {albums.map(album => {
                const size = Math.floor(Math.random() * 155) + 100;
                return (
                    <a
                        className="falling-album"
                        href={album.collectionViewUrl}
                        key={album.collectionId}
                        target="_blank"
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                        }}
                    >
                        <img
                            src={album.artworkUrl100.replace("100x100", "600x600")}
                            alt={album.collectionName}
                        />
                    </a>
                );
            })}
        </div>
    );
}
    const artists = [
        "Kendrick Lamar",
        "Drake",
        "The Weeknd",
        "Tyler the Creator",
        "Taylor Swift",
        "Frank Ocean",
        "Travis Scott",
        "Billie Eilish",
        "Adele",
        "Kanye West",
        "Playboi Carti"
    ];

export default AlbumWall;