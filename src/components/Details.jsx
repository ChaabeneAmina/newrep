import { useState } from "react";

function Details({ informations, google_map }) {
  const { build_year, time_period, location } = informations;
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <button className="btn btn-outline-primary mb-2" onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide details" : "Show details"}
      </button>
      {showDetails && (
        <ul className="list-group mb-2">
          <li className="list-group-item"><strong>Build year: {build_year}</strong></li>
          <li className="list-group-item"><strong>Time period: {time_period}</strong></li>
          <li className="list-group-item"><strong>Location: {location}</strong></li>
          <li className="list-group-item">
            <a className="btn btn-primary me-2" 
               href={`https://fr.wikipedia.org/wiki/${encodeURIComponent(informations.name)}`} target="_blank">
              Wikipedia
            </a>
            <a className="btn btn-primary" href={google_map} target="_blank">Google Maps</a>
          </li>
        </ul>
      )}
    </>
  );
}

export default Details;
