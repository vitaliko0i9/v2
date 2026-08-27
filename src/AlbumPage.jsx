import { data, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { string } from "prop-types";
import AudioPlayer from "./AudioPlayer";
import axios from "axios";

function AlbumPage() {

    const { id } = useParams();
    const [ albums, setAlbums] = useState(null);

    const [ tracks, setTracks] = useState([]);

    useEffect(() => {
        const getTracks = async () => {

            try {
                const response = await axios.get(
                    `https://itunes.apple.com/lookup?id=${id}&entity=song`
                );
                const songs = response.data.results.filter(
                    item => item.wrapperType === "track"
                );
                console.log(songs[0].previewUrl);

            } catch (error) {
                console.log("Помилка в: ", error)
            }
        };
        getTracks()
    }, [id])

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
            <audio
                src={tracks.previewUrl}
                controls
            />
          </div>
    )
}

export default AlbumPage;
