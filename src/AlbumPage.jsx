import { data, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { string } from "prop-types";


function AlbumPage() {

    const { id } = useParams();
    const [ albums, setAlbums] = useState(null);

    useEffect(() => {
        fetch("/src/albums.json")
        .then(response => response.json())
        .then(data => {
            const foundAlbum = data.find(
                albums => String(albums.collectionId) === id
            );
            setAlbums(foundAlbum)
        })
    }, [id]);

    if(!albums){
        return <h1>Album not found</h1>
    }

    return(
        <div>
            <div className="album-preview">
                <img
                    src={albums.artworkUrl100.replace("100x100", "300x300")}
                    alt={albums.collectionName}
                    />
                <h1>{albums.collectionName}</h1>
                <h2>{albums.artistName}</h2>
            </div>
        </div>
    )
}

export default AlbumPage;
