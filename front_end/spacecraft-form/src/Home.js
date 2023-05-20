import SpacecraftList from "./SpacecraftList";
import useFetch from "./useFetch";

const Home = () => {

    const {data: spacecrafts, isPending, error} = useFetch('http://localhost:5000/spacecrafts')

    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Creating...</div>}
            {spacecrafts && <SpacecraftList spacecrafts={spacecrafts} />}
        </div>
    );
}

export default Home;