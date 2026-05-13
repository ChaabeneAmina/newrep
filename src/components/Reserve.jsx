import { useState } from "react";
import { Hotels } from "../Data";

function Reserve() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    hotel: Hotels[0].name,
    nuits: 1,
    personnes: 1,
    paiement: "CB",
    cbNum: "",
    cbPass: ""
  });

  const [prixTotal, setPrixTotal] = useState(0);
  const [chambres, setChambres] = useState(1);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const calculate = () => {
    const hotelObj = Hotels.find(h => h.name === form.hotel);
    let base = hotelObj.price * form.nuits;
    let pers = parseInt(form.personnes);
    if (pers > 1) base = base * pers;
    const chamb = Math.ceil(pers / 2);
    setChambres(chamb);
    setPrixTotal(base);
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Réservation confirmée pour ${form.hotel} : ${prixTotal} DT`);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
      <div style={{ backgroundColor: "#000", padding: 30, borderRadius: 15, width: "100%", maxWidth: 700, color: "#fff" }}>
        <h1 style={{ textAlign: "center", color: "#3fa2c6" }}>Réserver un hôtel</h1>

        <form onSubmit={handleSubmit}>
          <input type="text" name="nom" placeholder="Nom" onChange={handleChange} required style={{ width: "100%", marginBottom: 10, padding: 8 }} />
          <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} required style={{ width: "100%", marginBottom: 10, padding: 8 }} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={{ width: "100%", marginBottom: 10, padding: 8 }} />
          <input type="tel" name="tel" placeholder="Téléphone" onChange={handleChange} required style={{ width: "100%", marginBottom: 10, padding: 8 }} />

          <select name="hotel" onChange={handleChange} style={{ width: "100%", marginBottom: 10, padding: 8 }}>
            {Hotels.map(h => <option key={h.id} value={h.name}>{h.name}</option>)}
          </select>

          <input type="number" name="nuits" min="1" onChange={handleChange} placeholder="Nombre de nuitées" required style={{ width: "100%", marginBottom: 10, padding: 8 }} />
          <input type="number" name="personnes" min="1" onChange={handleChange} placeholder="Nombre de personnes" required style={{ width: "100%", marginBottom: 10, padding: 8 }} />

          <select name="paiement" onChange={handleChange} style={{ width: "100%", marginBottom: 10, padding: 8 }}>
            <option value="CB">Carte bancaire</option>
            <option value="cash">Cash à Sfax</option>
          </select>

          {form.paiement === "CB" && (
            <>
              <input type="text" name="cbNum" placeholder="Numéro CB" onChange={handleChange} required style={{ width: "100%", marginBottom: 10, padding: 8 }} />
              <input type="password" name="cbPass" placeholder="Mot de passe CB" onChange={handleChange} required style={{ width: "100%", marginBottom: 10, padding: 8 }} />
            </>
          )}

          <button type="button" onClick={calculate} style={{ width: "100%", backgroundColor: "#3fa2c6", color: "#fff", padding: 10, marginBottom: 10 }}>Calculer Prix</button>

          <p>Nombre de chambres nécessaires : {chambres}</p>
          <p>Prix total : {prixTotal} DT</p>

          <button type="submit" style={{ width: "100%", backgroundColor: "#3fa2c6", color: "#fff", padding: 10 }}>Confirmer Réservation</button>
        </form>

        <hr style={{ margin: "20px 0", borderColor: "#3fa2c6" }} />

        {/* Footer */}
        <div className="footer" > 
          <table> 
            <tr> 
              <th>Email:</th> 
              <td>chaabeneamina2005@gmail.com</td> 
            </tr> 
            <tr> 
              <th>Num tel:</th> 
              <td>+216 28 590 545</td> 
            </tr> 
            <tr> 
              <th>Localisation: </th> 
              <td>Sfax, Tunisie</td> 
            </tr> 
            </table> 
            <a href="/reserve" className="btn btn-footer" >Réserver maintenant</a> </div>
      </div>
    </div>
  );
}

export default Reserve;
