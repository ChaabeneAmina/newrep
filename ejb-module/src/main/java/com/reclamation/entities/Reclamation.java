package com.reclamation.entities;

import com.reclamation.enums.StatusReclamation;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "RECLAMATION")
public class Reclamation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NOM", nullable = false)
    private String nom;

    @Column(name = "REF_REC", nullable = false, unique = true)
    private String refRec;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DATE_REC", nullable = false)
    private Date dateRec;

    @Column(name = "NUM_INSCRIPTION", nullable = false)
    private String numInscription;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS", nullable = false)
    private StatusReclamation status = StatusReclamation.EN_COURS; // Valeur par défaut

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "ID_DETAILS", referencedColumnName = "ID_DETAILS")
    private DetailsReclamation details;

    // Constructeurs
    public Reclamation() {
        this.dateRec = new Date();
        this.status = StatusReclamation.EN_COURS;
    }

    public Reclamation(String nom, String refRec, String numInscription, DetailsReclamation details) {
        this.nom = nom;
        this.refRec = refRec;
        this.numInscription = numInscription;
        this.details = details;
        this.dateRec = new Date();
        this.status = StatusReclamation.EN_COURS;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getRefRec() { return refRec; }
    public void setRefRec(String refRec) { this.refRec = refRec; }

    public Date getDateRec() { return dateRec; }
    public void setDateRec(Date dateRec) { this.dateRec = dateRec; }

    public String getNumInscription() { return numInscription; }
    public void setNumInscription(String numInscription) { this.numInscription = numInscription; }

    public StatusReclamation getStatus() { return status; }
    public void setStatus(StatusReclamation status) { this.status = status; }

    public DetailsReclamation getDetails() { return details; }
    public void setDetails(DetailsReclamation details) { this.details = details; }

    @Override
    public String toString() {
        return "Reclamation{" +
               "id=" + id +
               ", nom='" + nom + "'" +
               ", refRec='" + refRec + "'" +
               ", dateRec=" + dateRec +
               ", numInscription='" + numInscription + "'" +
               ", status=" + status +
               ", details=" + details +
               '}';
    }
}
