import { useEffect, useState } from "react";

function AlbumWall() {
    const [ albums, setAlbums ] = useState([]);

    useEffect(() => {
        const getAlbums = async () => {
            const response = await fetch("/src/albums.json");
            const data = await response.json();
            setAlbums(data);
        };
        getAlbums();
    }, []);

    // useEffect(() => {
    //     const getAlbums = async () => {
    //         const requests = artists.map(artist => 
    //             axios.get(`https://itunes.apple.com/search?term=${artist}&entity=album&limit=7`)
    //         )

    //         const responses = await Promise.all(requests)
    //         const AllAlbums = responses.flatMap(
    //             response => response.data.results
    //         );
    //         setAlbums(AllAlbums)
    //     };
    //     getAlbums()
    // }, []);

    return (
        <div className="wall-container">
            <div className="album-wall">
            {[...albums, ...albums].map((album, index) => (
                <a
                    className="falling-album"
                    href={album.collectionViewUrl}
                    key={`${album.collectionId}-${index}`}
                    target="_blank"
                >
                    <img
                        src={album.artworkUrl100.replace("100x100", "600x600")}
                        alt={album.collectionName}
                    />
                </a>
            ))}
        </div>
    </div>
    )
}
export default AlbumWall;