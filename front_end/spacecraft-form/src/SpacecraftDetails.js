import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const SpacecraftDetails = () => {
    const { id } = useParams();
    const { data: spacecraft, error, isPending } = useFetch('http://localhost:5000/spacecrafts/' + id);
    const navigate = useNavigate();

    const handleClick = () => {
        fetch('http://localhost:5000/spacecrafts/' + spacecraft.id, {
            method: 'DELETE'
        }).then(() => {
            navigate('/');
        })
    }

    return (
        <div className="spacecraft-details">
            {isPending && <div>Creating...</div>}
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