import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import {useBackendUrl} from "./backendURLContext";

const Create = () => {

    const backendUrl = useBackendUrl();
    //state
    const [name, setName] = useState('');
    const [fictional_source, setFictionalSource] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); //stops page refresh
        const spacecraft = {name, fictional_source};
        setIsPending(true);
        
        fetch(backendUrl, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(spacecraft)
        }).then(() => {
            console.log(JSON.stringify(spacecraft));
            setIsPending(false);
            navigate('/');
        })

    }

    return ( 
        <div className="create">
            <h2>Add a New Spacecraft</h2>
            <form onSubmit={handleSubmit}>
                <label>Spacecraft Name</label>
                <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                 <label>Fictional Source</label>
                <textarea
                required
                value={fictional_source}
                onChange={(e) => setFictionalSource(e.target.value)}
                ></textarea>
                { !isPending && <button>Add Spacecraft</button> }
                { isPending && <button disabled>Adding Spacecraft...</button> }
            </form>
        </div>
     );
}
 
export default Create;