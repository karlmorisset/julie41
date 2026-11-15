// Ordre du parcours (de Merlo à Chaitén) et réponses attendues.
// Les réponses sont à remplacer au fur et à mesure que les jeux sont créés.
const ETAPES = [
  { id: "merlo", nom: "Merlo", reponse: "TEST1" },
  { id: "mendoza", nom: "Mendoza", reponse: "TEST2" },
  { id: "bariloche", nom: "Bariloche", reponse: "TEST3" },
  { id: "el-chalten", nom: "El Chaltén", reponse: "TEST4" },
  { id: "el-calafate", nom: "El Calafate", reponse: "TEST5" },
  { id: "puerto-natales", nom: "Puerto Natales", reponse: "TEST6" },
  { id: "punta-arenas", nom: "Punta Arenas", reponse: "TEST7" },
  { id: "puerto-montt", nom: "Puerto Montt", reponse: "TEST8" },
  { id: "chaiten", nom: "Chaitén", reponse: "TEST9" },
];

const CLE = "patagonie.deverrouilles";

const normaliser = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .toUpperCase();

function lireProgression() {
  try {
    return JSON.parse(localStorage.getItem(CLE)) || ["merlo"];
  } catch {
    return ["merlo"];
  }
}

function estDeverrouillee(id) {
  return lireProgression().includes(id);
}

function deverrouiller(id) {
  const p = lireProgression();
  if (!p.includes(id)) {
    p.push(id);
    localStorage.setItem(CLE, JSON.stringify(p));
  }
}

function indexEtape(id) {
  return ETAPES.findIndex((e) => e.id === id);
}

// Garde d'accès : à appeler en haut de chaque page de jeu.
function garde(id) {
  if (!estDeverrouillee(id)) {
    location.replace("../index.html?refus=" + id);
  }
}

// Valide la réponse saisie pour l'étape `id`.
// Si OK : débloque l'étape suivante et renvoie true.
function validerReponse(id, saisie) {
  const i = indexEtape(id);
  if (normaliser(saisie) !== normaliser(ETAPES[i].reponse)) return false;
  if (ETAPES[i + 1]) deverrouiller(ETAPES[i + 1].id);
  return true;
}
