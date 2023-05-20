import { Link } from "react-router-dom";

const SpacecraftList = ({ spacecrafts }) => {
  if (spacecrafts.length === 0) {
    return (
      <div className="spacecraft-list">
        <h2>No spacecrafts to show</h2>
      </div>
    );
  }
  else
  return (
    <div className="spacecraft-list">
      {spacecrafts.map(spacecraft => (
        <div className="spacecraft-preview" key={spacecraft.id} >
          <Link to={`/spacecraft/${spacecraft.id}`}>
            <h2>{spacecraft.name}</h2>
            <p>First seen in {spacecraft.fictional_source}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default SpacecraftList;