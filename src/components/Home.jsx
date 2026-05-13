import Card from "./Card";
import { Hotels } from "../Data";

function Home() {
  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "50px", color: "#3fa2c6" }}>AminaTravel</h1>
      <h2 style={{ textAlign: "center", marginBottom: 30, color: "black" }}>Nos Hôtels</h2>

      <div className="cards-container">
        {Hotels.map(hotel => <Card key={hotel.id} hotel={hotel} />)}
      </div>

      {/* Footer */}
      <div className="footer">
        <table>
          <tbody>
            <tr>
              <th>Email:</th>
              <td>chaabeneamina2005@gmail.com</td>
            </tr>
            <tr>
              <th>Num tel:</th>
              <td>+216 28 590 545</td>
            </tr>
            <tr>
              <th>Localisation:</th>
              <td>Sfax, Tunisie</td>
            </tr>
          </tbody>
        </table>
        <a href="/reserve" className="btn-footer">Réserver maintenant</a>
      </div>
    </div>
  );
}

export default Home;
