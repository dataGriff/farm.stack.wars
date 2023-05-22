import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import {useBackendUrl} from "./backendURLContext";

const Create = () => {

    const backendUrl = useBackendUrl();
    //state
    const [name, setName] = useState('');
    const [fictional_source, setFictionalSource] = useState('Alien');
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
             <select
                value={fictional_source}
                onChange={(e) => setFictionalSource(e.target.value)}
                >
                    <option value="Alien">Alien</option>
                    <option value="Aliens">Aliens</option>
                    <option value="Alien3">Alien3</option>
                    <option value="Alien: Resurrection">Alien: Resurrection</option>
                    <option value="Prometheus">Prometheus</option>
                    <option value="Alien: Covenant">Alien: Covenant</option>
                    <option value="Star Wars">Star Wars</option>
                    <option value="Star Trek">Star Trek</option>
                    <option value="Firefly">Firefly</option>
                    <option value="Stargate">Stargate</option>
                    <option value="Battlestar Galactica">Battlestar Galactica</option>
                    <option value="Doctor Who">Doctor Who</option>
                    <option value="Futurama">Futurama</option>
                    <option value="Hitchhiker's Guide to the Galaxy">Hitchhiker's Guide to the Galaxy</option>
                    <option value="Lost in Space">Lost in Space</option>
                    <option value="Space: 1999">Space: 1999</option>
                    <option value="Thunderbirds">Thunderbirds</option>
                    <option value="Expanse">Expanse</option>
                    <option value="Other">Other</option>
                </select> 
                { !isPending && <button>Create Spacecraft</button> }
                { isPending && <button disabled>Creating Spacecraft...</button> }
            </form>
        </div>
     );
}
 
export default Create;