// Ordre du parcours (de Merlo à Puerto Montt).
// `reponse` = le code que Julie obtient en résolvant l'étape.
// Ce code est ensuite demandé sur la carte pour ouvrir l'étape suivante.
// Les réponses TESTn sont à remplacer au fur et à mesure que les jeux sont créés.
const ETAPES = [
  { id: "merlo", nom: "Merlo", reponse: "DEPART" },
  { id: "bahia-blanca", nom: "Bahía Blanca", reponse: "1804" },
  { id: "puerto-madryn", nom: "Puerto Madryn", reponse: "BALEINE" },
  { id: "ushuaia", nom: "Ushuaïa", reponse: "DOUCHE" },
  { id: "mont-tarn", nom: "Mont Tarn", reponse: "TEST5" },
  { id: "punta-arenas", nom: "Punta Arenas", reponse: "TEST6" },
  { id: "torres-del-paine", nom: "Torres del Paine", reponse: "TEST7" },
  { id: "grey-glacier", nom: "Grey Glacier", reponse: "TEST8" },
  { id: "puerto-montt", nom: "Puerto Montt", reponse: "TEST9" },
];

const CLE = "patagonie.deverrouilles";

const normaliser = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, ""); // espaces, apostrophes, ponctuation ignorés

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

// Sur la carte : ouvre l'étape `id` si `saisie` est le code de l'étape précédente.
function essayerCode(id, saisie) {
  const i = indexEtape(id);
  if (i <= 0) return false;
  if (normaliser(saisie) !== normaliser(ETAPES[i - 1].reponse)) return false;
  deverrouiller(id);
  return true;
}

// Dans une page de jeu : vrai si `saisie` est la bonne réponse de l'étape `id`.
// Ne débloque rien : Julie doit noter le code et le saisir sur la carte.
function estBonneReponse(id, saisie) {
  return normaliser(saisie) === normaliser(ETAPES[indexEtape(id)].reponse);
}

// Nom de l'étape qui suit `id` (ou null si c'est la dernière).
function etapeSuivante(id) {
  return ETAPES[indexEtape(id) + 1] || null;
}
