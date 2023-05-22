import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import {useBackendUrl} from "./backendURLContext";

const SpacecraftDetails = () => {
    const backendUrl = useBackendUrl();
    const { id } = useParams();
    const { data: spacecraft, error, isPending } = useFetch(backendUrl + id);
    const navigate = useNavigate();

    const handleClick = () => {
        fetch(backendUrl + spacecraft._id, {
            method: 'DELETE'
        }).then(() => {
            navigate('/');
        })
    }

    return (
        <div className="spacecraft-details">
            {isPending && <div>Preparing...</div>}
            {error && <div>{error}</div>}
            {spacecraft && (
                <article>
                    <h2>{spacecraft.name}</h2>
                    <p>First seen in {spacecraft.fictional_source}</p>
                    <button onClick={handleClick}>Delete spacecraft</button>
                </article>
            )}
        </div>
    );
}

export default SpacecraftDetails;