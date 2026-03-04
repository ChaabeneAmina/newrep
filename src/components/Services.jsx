import { useState } from "react";

// Exemple d'avis initialisés (comme venant de la base de données)
const initialReviews = [
  { text: "Très bon service !", stars: 5 },
  { text: "Correct mais peut s'améliorer.", stars: 3 }
];

function Services() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Bonjour 👋 ! Comment puis-je vous aider ?" }
  ]);
  const [reviewText, setReviewText] = useState("");
  const [reviewStars, setReviewStars] = useState(5); // note par défaut
  const [reviewsList, setReviewsList] = useState(initialReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const quickReplies = [
    "Quels hôtels proposez-vous ? 🏨",
    "Avez-vous des offres ? 💸",
    "Quels pays disponibles ? ✈️",
    "Comment réserver ? 📅",
    "Contacter l’agence 📞"
  ];

  const handleQuickReply = (value) => {
    setMessages([...messages, { from: "user", text: value }]);
    let reply =
      value === "Quels hôtels proposez-vous ? 🏨"
        ? "Nous proposons des hôtels à Djerba, Hammamet, Sousse et d'autres destinations en Tunisie avec différents budgets."
        : value === "Avez-vous des offres ? 💸"
        ? "Oui ! Jusqu’à -20% sur plusieurs hôtels cette semaine."
        : value === "Quels pays disponibles ? ✈️"
        ? "Nous travaillons juste en Tunisie (Djerba, Hammamet, Sousse et autres destinations)."
        : value === "Comment réserver ? 📅"
        ? "Cliquez sur Réserver → Remplissez le formulaire pour réserver votre hôtel."
        : "Téléphone : 28 590 545 — Email : chaabeneamina2005@gmail.com";

    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    }, 700);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewText.trim() === "") return;
    const newReview = { text: reviewText, stars: reviewStars };
    setReviewsList([...reviewsList, newReview]);
    setReviewText("");
    setReviewStars(5);
    setShowReviewForm(false);
    setShowReviews(true);
  };

  const renderStars = (num) => "★".repeat(num) + "☆".repeat(5 - num);

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ color: "#3fa2c6" }}>Nos Services</h1>

      {/* Chat */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <div style={{ width: 350, background: "#000", padding: 15, borderRadius: 15 }}>
          <div style={{ maxHeight: 250, overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <p key={i} style={{
                background: msg.from === "bot" ? "#3fa2c6" : "#333",
                color: msg.from === "bot" ? "#000" : "#3fa2c6",
                padding: "8px 12px",
                borderRadius: 12,
                textAlign: msg.from === "bot" ? "left" : "right",
                margin: "5px 0"
              }}>{msg.text}</p>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {quickReplies.map((qr, i) => (
              <button key={i} onClick={() => handleQuickReply(qr)} style={{
                padding: "5px 10px",
                borderRadius: 20,
                border: "1px solid #3fa2c6",
                background: "#000",
                color: "#3fa2c6",
                cursor: "pointer"
              }}>{qr}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Boutons avis */}
      <div style={{ marginTop: 30 }}>
        <h2 style={{ color: "#3fa2c6" }}>Avis des clients</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: 15, marginBottom: 15 }}>
          <button
            onClick={() => { setShowReviewForm(true); setShowReviews(false); }}
            style={{ padding: "8px 15px", borderRadius: 10, border: "none", background: "#3fa2c6", color: "#000", cursor: "pointer" }}
          >
            Donner un avis
          </button>
          <button
            onClick={() => { setShowReviews(true); setShowReviewForm(false); }}
            style={{ padding: "8px 15px", borderRadius: 10, border: "none", background: "#3fa2c6", color: "#000", cursor: "pointer" }}
          >
            Voir les avis
          </button>
        </div>

        {/* Formulaire avis avec étoiles */}
        {showReviewForm && (
          <form onSubmit={handleReviewSubmit} style={{ marginBottom: 15 }}>
            <input
              type="text"
              placeholder="Votre avis..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              style={{ padding: 8, width: 250, borderRadius: 10, border: "1px solid #3fa2c6" }}
            />
            <div style={{ margin: "10px 0" }}>
              <label style={{ marginRight: 10, color: "#3fa2c6" }}>Étoiles:</label>
              {[1,2,3,4,5].map((n) => (
                <span
                  key={n}
                  onClick={() => setReviewStars(n)}
                  style={{
                    cursor: "pointer",
                    color: n <= reviewStars ? "#FFD700" : "#555",
                    fontSize: 20,
                    marginRight: 3
                  }}
                >★</span>
              ))}
            </div>
            <button type="submit" style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "none",
              backgroundColor: "#3fa2c6",
              color: "#000",
              cursor: "pointer"
            }}>Envoyer</button>
          </form>
        )}

        {/* Liste des avis avec étoiles */}
        {showReviews && (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {reviewsList.length === 0 ? (
              <li style={{ color: "#3fa2c6" }}>Aucun avis pour le moment.</li>
            ) : (
              reviewsList.map((r, i) => (
                <li key={i} style={{ background: "#333", color: "#3fa2c6", padding: 8, borderRadius: 10, margin: "5px 0" }}>
                  <strong>{renderStars(r.stars)}</strong> <br /> {r.text}
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div className="footer" style={{ marginTop: 30 }}>
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

export default Services;
