import SpacecraftList from "./SpacecraftList";
import useFetch from "./useFetch";
import {useBackendUrl} from "./backendURLContext";

const Home = () => {

    const backendUrl = useBackendUrl();

    const {data: spacecrafts, isPending, error} = useFetch(backendUrl)

    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Retrieving...</div>}
            {spacecrafts && <SpacecraftList spacecrafts={spacecrafts} />}
        </div>
    );
}

export default Home;