# Singemoi

Application mobile de suivi d'activité et de nutrition. **React Native / Expo · TypeScript**.

Projet d'apprentissage (novembre 2024), centré sur l'intégration d'APIs tierces et l'usage
des capteurs du téléphone. Jamais publié sur les stores.

---

## Les quatre écrans

**Nutrition** 🥗
Recherche d'aliments via l'API Nutritionix. La liste renvoie une vignette et un nom ; le tap
déclenche un second appel, sur l'endpoint *natural nutrients*, qui remplit une fiche détaillée
en modale : calories, lipides, protéines, glucides. Deux appels et non un seul, parce que
l'endpoint de recherche instantanée ne renvoie pas les valeurs nutritionnelles.

**Scan** 📷
Lecture de codes-barres EAN-13 et UPC-A avec `expo-camera`, puis interrogation d'OpenFoodFacts
sur le code lu. Affiche marque, catégorie et éco-score, ou "item not found" quand le produit
est absent de la base. Le viseur est un cadre découpé dans un calque semi-transparent, composé
en flexbox par-dessus le flux caméra plutôt que dessiné.

**Sport** 💪
Un programme hebdomadaire associe chaque jour à des groupes musculaires (lundi : biceps,
dorsaux, lombaires ; mardi : triceps, pectoraux, avant-bras, etc.). Au montage, l'écran lit
le jour courant, lance un appel par groupe vers l'API Ninjas Exercises et agrège les réponses
avec `Promise.all` avant d'aplatir le résultat. Chaque exercice ouvre une fiche : type,
équipement, difficulté, instructions.

**Pas** 🚶
Podomètre via `expo-sensors`. Sur Android, la permission `ACTIVITY_RECOGNITION` est demandée
puis mémorisée dans AsyncStorage, pour ne pas la redemander à chaque lancement. Le compteur
est persisté par jour avec la date ISO comme clé, et affiché en barre de progression sur un
objectif de 10 000 pas.

À côté de ça, des notifications locales (`expo-notifications`) : un rappel d'hydratation dont
le texte change selon la température relevée à Paris par OpenWeatherMap.

---

## Stack

| | |
|---|---|
| Framework | Expo SDK 51 · React Native 0.74 · TypeScript |
| Navigation | expo-router — routage par fichiers, onglets |
| Capteurs | expo-camera (codes-barres) · expo-sensors (podomètre) |
| Stockage local | AsyncStorage |
| APIs | Nutritionix · OpenFoodFacts · API Ninjas · OpenWeatherMap |

---

## Lancer le projet

Prérequis : Node ≥ 18, et l'application **Expo Go** sur un téléphone. Le podomètre et le scan
de codes-barres ont besoin d'un appareil réel, ils ne fonctionnent pas en simulateur.

```bash
cd Singemoi
npm install
npx expo start --tunnel
```

Scanner le QR code affiché avec Expo Go.

### Clés d'API

Trois des quatre services demandent une clé — OpenFoodFacts est ouverte. Il faut en créer
une chez chacun et la fournir à l'application :

| Service | Où | En-tête attendu |
|---|---|---|
| Nutritionix | developer.nutritionix.com | `x-app-id` + `x-app-key` |
| API Ninjas | api-ninjas.com | `x-api-key` |
| OpenWeatherMap | openweathermap.org/api | paramètre `appid` |

---

## État

Fonctionnel sur Android via Expo Go, jamais buildé en natif ni distribué. Aucun compte,
aucun backend : tout vit en local sur le téléphone. Les données de pas ne remontent nulle
part et disparaissent avec l'application.
