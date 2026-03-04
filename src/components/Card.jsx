function Card({ hotel }) {
  return (
    <div className="card">
      <img src={hotel.image} alt={hotel.name} />
      <h3>{hotel.name}</h3>
      <p>{hotel.description}</p>
      <a href={hotel.link} className="btn-footer">Voir l'hôtel</a>
    </div>
  );
}

export default Card;
