import { useParams } from "react-router-dom";

function AlbumPage() {
    const { id } = useParams();

    console.log(id);

    return (
        <div>
            Album ID: {id}  
        </div>
    );
}

export default AlbumPage;