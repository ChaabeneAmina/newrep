package com.reclamation.entities;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "DETAILS_RECLAMATION")
public class DetailsReclamation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_DETAILS")
    private Long idDetails;

    @Column(name = "MATIERE", nullable = false)
    private String matiere;

    @Column(name = "DESCRIPTION", nullable = false, length = 1000)
    private String description;

    // Constructeurs
    public DetailsReclamation() {}

    public DetailsReclamation(String matiere, String description) {
        this.matiere = matiere;
        this.description = description;
    }

    // Getters & Setters
    public Long getIdDetails() { return idDetails; }
    public void setIdDetails(Long idDetails) { this.idDetails = idDetails; }

    public String getMatiere() { return matiere; }
    public void setMatiere(String matiere) { this.matiere = matiere; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    @Override
    public String toString() {
        return "DetailsReclamation{idDetails=" + idDetails +
               ", matiere='" + matiere + "', description='" + description + "'}";
    }
}
