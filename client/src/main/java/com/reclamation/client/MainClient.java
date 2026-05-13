package com.reclamation.client;

import com.reclamation.entities.DetailsReclamation;
import com.reclamation.entities.Reclamation;
import com.reclamation.enums.StatusReclamation;
import com.reclamation.interfaces.IReclamationMetierRemote;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Properties;
import java.util.Scanner;

/**
 * Application cliente Java autonome.
 * Accède au bean EJB via JNDI (Remote).
 *
 * Fonctionnalités :
 *  1. Enregistrer une réclamation
 *  2. Consulter ses réclamations (liste par numéro d'inscription)
 */
public class MainClient {

    // Nom JNDI du bean EJB (format WildFly)
    // Format : ejb:/<nom-ear>/<nom-ejb-jar>/<NomBean>!<InterfaceRemote>
    private static final String JNDI_NAME =
        "ejb:/reclamation-ear/reclamation-ejb/ReclamationMetierBean!" +
        "com.reclamation.interfaces.IReclamationMetierRemote";

    private static IReclamationMetierRemote metierBean;
    private static final Scanner scanner = new Scanner(System.in);
    private static final SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

    public static void main(String[] args) {
        System.out.println("=================================================");
        System.out.println("   Système de Gestion des Réclamations - EJB");
        System.out.println("=================================================");

        try {
            // Connexion au serveur EJB via JNDI
            metierBean = lookup();
            System.out.println("[OK] Connexion au serveur EJB réussie.\n");

            // Boucle principale du menu
            boolean continuer = true;
            while (continuer) {
                afficherMenu();
                int choix = lireEntier("Votre choix : ");

                switch (choix) {
                    case 1:
                        enregistrerReclamation();
                        break;
                    case 2:
                        consulterReclamations();
                        break;
                    case 0:
                        continuer = false;
                        System.out.println("\nAu revoir !");
                        break;
                    default:
                        System.out.println("[ERREUR] Choix invalide. Veuillez réessayer.");
                }
            }

        } catch (NamingException e) {
            System.err.println("[ERREUR] Impossible de se connecter au serveur EJB.");
            System.err.println("Vérifiez que le serveur WildFly est démarré et que l'EAR est déployé.");
            e.printStackTrace();
        } finally {
            scanner.close();
        }
    }

    // =========================================================
    //  Connexion JNDI au bean EJB distant
    // =========================================================

    private static IReclamationMetierRemote lookup() throws NamingException {
        Properties props = new Properties();

        // Configuration du contexte JNDI pour WildFly
        props.put(Context.INITIAL_CONTEXT_FACTORY,
            "org.jboss.ejb.client.naming.EJBClientContextJNDIFactory");
        props.put(Context.URL_PKG_PREFIXES, "org.jboss.ejb.client.naming");

        // Alternativement pour GlassFish :
        // props.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.enterprise.naming.SerialInitContextFactory");
        // props.put(Context.PROVIDER_URL, "iiop://localhost:3700");

        Context context = new InitialContext(props);
        return (IReclamationMetierRemote) context.lookup(JNDI_NAME);
    }

    // =========================================================
    //  Fonctionnalité 1 : Enregistrer une réclamation
    // =========================================================

    private static void enregistrerReclamation() {
        System.out.println("\n--- ENREGISTRER UNE RÉCLAMATION ---");

        System.out.print("Nom : ");
        String nom = scanner.nextLine().trim();

        System.out.print("Référence de la réclamation (ex: REC-2026-001) : ");
        String refRec = scanner.nextLine().trim();

        System.out.print("Numéro d'inscription : ");
        String numInscription = scanner.nextLine().trim();

        System.out.println("\n-- Détails de la réclamation --");
        System.out.print("Matière concernée : ");
        String matiere = scanner.nextLine().trim();

        System.out.print("Description (expliquez votre réclamation) : ");
        String description = scanner.nextLine().trim();

        // Construction des objets
        DetailsReclamation details = new DetailsReclamation(matiere, description);
        Reclamation reclamation = new Reclamation(nom, refRec, numInscription, details);

        try {
            Reclamation enregistree = metierBean.enregistrer(reclamation);
            System.out.println("\n[SUCCÈS] Réclamation enregistrée avec succès !");
            System.out.println("  → ID attribué      : " + enregistree.getId());
            System.out.println("  → Référence        : " + enregistree.getRefRec());
            System.out.println("  → Date             : " + sdf.format(enregistree.getDateRec()));
            System.out.println("  → Statut           : " + enregistree.getStatus());
        } catch (Exception e) {
            System.err.println("[ERREUR] L'enregistrement a échoué : " + e.getMessage());
        }
    }

    // =========================================================
    //  Fonctionnalité 2 : Consulter les réclamations
    // =========================================================

    private static void consulterReclamations() {
        System.out.println("\n--- CONSULTER MES RÉCLAMATIONS ---");
        System.out.print("Entrez votre numéro d'inscription : ");
        String numInscription = scanner.nextLine().trim();

        try {
            List<Reclamation> liste = metierBean.lister(numInscription);

            if (liste == null || liste.isEmpty()) {
                System.out.println("\n[INFO] Aucune réclamation trouvée pour le numéro : " + numInscription);
                return;
            }

            System.out.println("\n========================================");
            System.out.println("  Réclamations pour N° : " + numInscription);
            System.out.println("  Total trouvé : " + liste.size() + " réclamation(s)");
            System.out.println("========================================");

            for (int i = 0; i < liste.size(); i++) {
                Reclamation r = liste.get(i);
                System.out.println("\n  [" + (i + 1) + "] ----------------------------");
                System.out.println("  Date & Heure   : " + sdf.format(r.getDateRec()));
                System.out.println("  Référence      : " + r.getRefRec());
                System.out.println("  Statut         : " + formaterStatut(r.getStatus()));

                // Affichage des détails (Description)
                if (r.getDetails() != null) {
                    System.out.println("  Description :");
                    System.out.println("    • Matière    : " + r.getDetails().getMatiere());
                    System.out.println("    • Détail     : " + r.getDetails().getDescription());
                }
            }
            System.out.println("\n========================================\n");

        } catch (Exception e) {
            System.err.println("[ERREUR] Impossible de récupérer les réclamations : " + e.getMessage());
        }
    }

    // =========================================================
    //  Méthodes utilitaires
    // =========================================================

    private static void afficherMenu() {
        System.out.println("\n┌─────────────────────────────────┐");
        System.out.println("│           MENU PRINCIPAL        │");
        System.out.println("├─────────────────────────────────┤");
        System.out.println("│  1. Enregistrer une réclamation │");
        System.out.println("│  2. Consulter mes réclamations  │");
        System.out.println("│  0. Quitter                     │");
        System.out.println("└─────────────────────────────────┘");
    }

    private static int lireEntier(String message) {
        System.out.print(message);
        while (!scanner.hasNextInt()) {
            scanner.next();
            System.out.print(message);
        }
        int val = scanner.nextInt();
        scanner.nextLine(); // Consomme le saut de ligne
        return val;
    }

    private static String formaterStatut(StatusReclamation status) {
        switch (status) {
            case EN_COURS: return "⏳ En cours de traitement";
            case TRAITE:   return "✅ Traité";
            case REFUSE:   return "❌ Refusé";
            default:       return status.name();
        }
    }
}
