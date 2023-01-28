import cors from "cors";
import express from "express";
import logger from "morgan";
/**
 * On créé une nouvelle "application" express
 */
const app = express();

/**
 * On dit à Express que l'on souhaite parser le body des requêtes en JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */
app.use(express.json());

/**
 * On dit à Express que l'on souhaite autoriser tous les noms de domaines
 * à faire des requêtes sur notre API.
 */
app.use(cors());
app.use(logger("dev"));

/**
 * Toutes les routes CRUD pour les animaux seronts préfixées par `/pets`
 */

//connection.connect();

/**
 * Homepage (uniquement necessaire pour cette demo)
 */
app.get("/", (req, res) => res.send("🏠 bark bark Jérôme"));

/**
 * On demande à Express d'ecouter les requêtes sur le port défini dans la config
 */
app.listen(3000, () => console.log("Silence, ça tourne."));
