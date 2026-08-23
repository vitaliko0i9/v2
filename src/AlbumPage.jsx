import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function AlbumPage() {
    const { id } = useParams();

    const [album, setAlbum] = useState(null);

    useEffect(() => {
        fetch("/src/albums.json")
            .then(response => response.json())
            .then(data => {
                const foundAlbum = data.find(
                    album => String(album.collectionId) === id
                );

                setAlbum(foundAlbum);
            });
    }, [id]);

    if (!album) {
        return <h1>Album not found</h1>;
    }

    return (
        <div className="album-page">

            <img
                src={album.artworkUrl100.replace(
                    "100x100",
                    "600x600"
                )}
                alt={album.collectionName}
            />

            <div>
                <h1>{album.collectionName}</h1>

                <h2>{album.artistName}</h2>

                <p>{album.releaseDate}</p>

                <a
                    href={album.collectionViewUrl}
                    target="_blank"
                    rel="noreferrer"
                >
                    Open in iTunes
                </a>
            </div>

        </div>
    );
}

export default AlbumPage;