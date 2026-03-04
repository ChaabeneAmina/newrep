import React from "react";
import "./About.css";
import moiImage from "./moi .jpeg";

function About() {
  return (
    <div className="about-container">
      <h1>
        À propos de <span className="highlight">AminaTravel</span>
      </h1>
      <p>
        Nous offrons des services de voyage et des hôtels haut de gamme pour des vacances inoubliables.
      </p>

      <h2>Notre mission</h2>
      <p>
        Rendre les voyages simples, luxueux et mémorables pour tous nos clients.
      </p>

      <h2>Notre vision</h2>
      <p>
        Devenir la référence numéro 1 du tourisme en Tunisie et à l’international.
      </p>

      <h2>Notre équipe</h2>
      <div className="team">
        <div className="team-member">
          <img
            src={moiImage}
            alt="Amina Chaabene"
          />
          <p><b>Amina Chaabene</b> <br /> Étudiante en DSI, responsable RH</p>
        </div>
      </div>

      <h2>Localisation</h2>
      <div className="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3221.123456789!2d10.760278!3d34.740556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x125e0f123456789%3A0xabcdef123456!2sSfax%2C%20Tunisie!5e0!3m2!1sfr!2s!4v1234567890"
        width="900"
        height="300"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Carte de Sfax"
      ></iframe>
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

export default About;
