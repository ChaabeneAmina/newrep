# Projet Réclamations – Architecture EJB 3.x

## Structure du projet

```
reclamation-ejb/
├── pom.xml                          ← POM parent Maven
│
├── ejb-module/                      ← MODULE EJB (côté serveur)
│   └── src/main/java/com/reclamation/
│       ├── enums/
│       │   └── StatusReclamation.java      ← Enum : EN_COURS, TRAITE, REFUSE
│       ├── entities/
│       │   ├── Reclamation.java            ← Entité JPA principale
│       │   └── DetailsReclamation.java     ← Entité JPA détails (composition)
│       ├── interfaces/
│       │   ├── IReclamationMetier.java     ← Interface @Local (même JVM)
│       │   └── IReclamationMetierRemote.java ← Interface @Remote (client externe)
│       └── beans/
│           └── ReclamationMetierBean.java  ← Bean @Stateless (logique métier)
│   └── src/main/resources/META-INF/
│       └── persistence.xml                ← Config JPA / DataSource
│
├── client/                          ← MODULE CLIENT Java autonome
│   └── src/main/java/com/reclamation/client/
│       └── MainClient.java                ← App console : menu 1 & 2
│
└── ear/                             ← MODULE EAR (déploiement serveur)
    └── pom.xml
```

---

## Diagramme de classes

```
┌─────────────────────────────────────────────────────────────────┐
│                    <<enumeration>>                              │
│                   StatusReclamation                             │
├─────────────────────────────────────────────────────────────────┤
│  EN_COURS                                                       │
│  TRAITE                                                         │
│  REFUSE                                                         │
└─────────────────────────────────────────────────────────────────┘
         ▲
         │ utilise
         │
┌────────────────────────────────┐      ┌──────────────────────────────┐
│         Reclamation            │      │      DetailsReclamation       │
│         @Entity                │      │      @Entity                 │
├────────────────────────────────┤      ├──────────────────────────────┤
│ - id            : Long         │      │ - idDetails   : Long         │
│ - nom           : String       │◄────►│ - matiere     : String       │
│ - refRec        : String       │@OneToOne│ - description : String    │
│ - dateRec       : Date         │      └──────────────────────────────┘
│ - numInscription: String       │
│ - status        : StatusRec.   │  (défaut = EN_COURS)
└────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              <<interface>> @Local                               │
│              IReclamationMetier                                 │
├─────────────────────────────────────────────────────────────────┤
│ + enregistrer(Reclamation) : Reclamation                        │
│ + lister(numInscription: String) : List<Reclamation>            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              <<interface>> @Remote                              │
│              IReclamationMetierRemote                           │
├─────────────────────────────────────────────────────────────────┤
│ + enregistrer(Reclamation) : Reclamation                        │
│ + lister(numInscription: String) : List<Reclamation>            │
└─────────────────────────────────────────────────────────────────┘
          ▲                      ▲
          │ implements            │ implements
          └──────────────┬────────┘
                         │
          ┌──────────────────────────────┐
          │   ReclamationMetierBean      │
          │   @Stateless                 │
          ├──────────────────────────────┤
          │ @PersistenceContext          │
          │ - entityManager: EntityManager│
          ├──────────────────────────────┤
          │ + enregistrer(r)             │
          │ + lister(numInscription)     │
          └──────────────────────────────┘
```

---

## Architecture globale (3-tiers EJB)

```
┌──────────────────┐       JNDI/RMI        ┌──────────────────────────────────┐
│  CLIENT JAVA     │ ─────────────────────► │  SERVEUR EJB (WildFly/GlassFish) │
│  MainClient.java │                        │                                  │
│                  │  IReclamationMetier    │  ReclamationMetierBean           │
│  1. Enregistrer  │ ◄────────────────────  │  @Stateless                      │
│  2. Consulter    │       Remote           │                                  │
└──────────────────┘                        │       │ @PersistenceContext       │
                                            │       ▼                          │
                                            │  EntityManager (JPA)             │
                                            │       │                          │
                                            └───────┼──────────────────────────┘
                                                    │ JDBC
                                                    ▼
                                            ┌──────────────────┐
                                            │  BASE DE DONNÉES  │
                                            │  MySQL/H2         │
                                            │                  │
                                            │  TABLE RECLAMATION│
                                            │  TABLE DETAILS    │
                                            └──────────────────┘
```

---

## Instructions de déploiement

### 1. Configurer la DataSource dans WildFly

Dans `standalone.xml` ou via la console d'administration :

```xml
<datasource jndi-name="java:jboss/datasources/ReclamationDS" pool-name="ReclamationDS">
    <connection-url>jdbc:mysql://localhost:3306/reclamation_db</connection-url>
    <driver>mysql</driver>
    <security>
        <user-name>root</user-name>
        <password>votre_mot_de_passe</password>
    </security>
</datasource>
```

### 2. Compiler et déployer

```bash
# Compiler tout le projet
mvn clean package

# Déployer l'EAR dans WildFly
cp ear/target/reclamation-ear.ear $WILDFLY_HOME/standalone/deployments/

# Démarrer WildFly
$WILDFLY_HOME/bin/standalone.sh
```

### 3. Lancer le client

```bash
cd client/target
java -jar reclamation-client-1.0.jar
```

---

## Fonctionnement du client

```
=================================================
   Système de Gestion des Réclamations - EJB
=================================================
[OK] Connexion au serveur EJB réussie.

┌─────────────────────────────────┐
│           MENU PRINCIPAL        │
├─────────────────────────────────┤
│  1. Enregistrer une réclamation │
│  2. Consulter mes réclamations  │
│  0. Quitter                     │
└─────────────────────────────────┘

--- Option 2 : Consulter ---
Numéro d'inscription : 20230045

========================================
  Réclamations pour N° : 20230045
  Total trouvé : 2 réclamation(s)
========================================

  [1] ----------------------------
  Date & Heure   : 11/05/2026 10:30:00
  Référence      : REC-2026-001
  Statut         : ⏳ En cours de traitement
  Description :
    • Matière    : Mathématiques
    • Détail     : Note incorrecte sur le partiel du 5 mai

  [2] ----------------------------
  Date & Heure   : 08/05/2026 14:15:22
  Référence      : REC-2026-002
  Statut         : ✅ Traité
  Description :
    • Matière    : Informatique
    • Détail     : Absence non justifiée lors du TP du 2 mai
```

---

## Points clés EJB

| Concept | Détail |
|---------|--------|
| `@Stateless` | Bean sans état – le conteneur gère un pool d'instances |
| `@Local` | Interface pour appels dans la même JVM (même EAR) |
| `@Remote` | Interface pour appels depuis une JVM externe (client Java) |
| `@PersistenceContext` | Injection automatique de l'EntityManager par le conteneur |
| `CMT` | Container-Managed Transactions – les transactions sont gérées automatiquement |
| `JTA` | Java Transaction API – utilisée avec les DataSources du serveur |
| `@OneToOne` | Relation de composition entre Reclamation et DetailsReclamation |
| `@Enumerated` | Stocke l'enum StatusReclamation sous forme de String en base |
