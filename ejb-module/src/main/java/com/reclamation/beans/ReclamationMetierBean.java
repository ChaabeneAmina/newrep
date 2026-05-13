package com.reclamation.beans;

import com.reclamation.entities.Reclamation;
import com.reclamation.interfaces.IReclamationMetier;
import com.reclamation.interfaces.IReclamationMetierRemote;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

/**
 * Bean EJB Session Stateless implémentant la logique métier des réclamations.
 *
 * @Stateless : Pas d'état conversationnel entre les appels.
 *              Le conteneur EJB gère un pool de beans pour optimiser les performances.
 *
 * Implémente les deux interfaces (Local et Remote) pour permettre :
 *  - L'accès local depuis un client web (Servlet, JSF) dans le même EAR
 *  - L'accès distant depuis un client Java autonome (JNDI)
 */
@Stateless
public class ReclamationMetierBean implements IReclamationMetier, IReclamationMetierRemote {

    /**
     * EntityManager injecté par le conteneur EJB.
     * "reclamationPU" = nom de l'unité de persistance définie dans persistence.xml
     */
    @PersistenceContext(unitName = "reclamationPU")
    private EntityManager entityManager;

    /**
     * Enregistre une réclamation en base de données.
     * Le conteneur EJB gère automatiquement la transaction (CMT - Container Managed Transaction).
     */
    @Override
    public Reclamation enregistrer(Reclamation reclamation) {
        entityManager.persist(reclamation);
        entityManager.flush(); // Force l'écriture immédiate pour obtenir l'ID généré
        return reclamation;
    }

    /**
     * Retourne la liste des réclamations pour un numéro d'inscription donné.
     * Triées par date décroissante (plus récente en premier).
     */
    @Override
    public List<Reclamation> lister(String numInscription) {
        TypedQuery<Reclamation> query = entityManager.createQuery(
            "SELECT r FROM Reclamation r WHERE r.numInscription = :numInscription ORDER BY r.dateRec DESC",
            Reclamation.class
        );
        query.setParameter("numInscription", numInscription);
        return query.getResultList();
    }
}
