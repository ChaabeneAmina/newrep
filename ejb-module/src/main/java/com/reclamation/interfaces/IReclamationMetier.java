package com.reclamation.interfaces;

import com.reclamation.entities.Reclamation;

import javax.ejb.Local;
import java.util.List;

/**
 * Interface locale EJB pour la gestion des réclamations.
 * Annotation @Local : accessible uniquement dans la même JVM (même EAR/WAR).
 */
@Local
public interface IReclamationMetier {

    /**
     * Enregistre une nouvelle réclamation en base de données.
     * @param reclamation L'objet réclamation à persister
     * @return La réclamation persistée avec son ID généré
     */
    Reclamation enregistrer(Reclamation reclamation);

    /**
     * Liste toutes les réclamations d'un étudiant selon son numéro d'inscription.
     * @param numInscription Le numéro d'inscription de l'étudiant
     * @return Liste des réclamations correspondantes
     */
    List<Reclamation> lister(String numInscription);
}
