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
    }, [])

    
    return(
    <div className="album-wall">
        {albums.map(album =>
        <a
            className="album"
            href={album.collectionViewUrl}
            key={album.collectionId}
            target="_blank"
        >
        <img
            key={album.collectionId}
            src={album.artworkUrl100}
            alt={album.collectionName}
        />
        </a>
        )}
    </div>
    );
}

const artists = [
    "Kendrick Lamar",
    "Drake",
    "The Weeknd",
    "Tyler the Creator",
    "Frank Ocean",
    "Taylor Swift",
    "Adele",
    "Travis Scott",
    "Billie Eilish",
    "Kanye West"
];

export default AlbumWall;