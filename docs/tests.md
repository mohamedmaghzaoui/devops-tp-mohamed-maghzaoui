
# 🧪 Tests - Frontend AiGen

Ce document décrit les tests du **front-end React** du projet AiGen.

Les tests couvrent :
- composants UI
- hooks React Query
- interactions utilisateur
- affichage des données

---

# 🎯 1. Génération de JSON (Form + API côté front)

## 🔥 Fonctionnalité (Front)
L’utilisateur construit un schéma dans le formulaire, puis déclenche une génération via une mutation React Query.

---

## 🧪 Test unitaire (hook / API mock)

- Vérifier que `generateJson` est appelée correctement

```js
expect(api.post).toHaveBeenCalledWith('/generate/', payload)