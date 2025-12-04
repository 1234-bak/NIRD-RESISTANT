// src/utils/glossary.js

export const TERMS = {
  "NIRD": "Numérique Inclusif, Responsable et Durable. Une démarche pour un numérique éthique à l'école.",
  "Obsolescence": "Fait de rendre un appareil périmé (par le logiciel ou le matériel) pour forcer l'achat d'un neuf.",
  "GAFAM": "Google, Apple, Facebook, Amazon, Microsoft. Les 5 géants du web qui dominent le marché.",
  "Linux": "Un système d'exploitation gratuit et libre (comme Windows, mais en mieux) qui respecte la vie privée.",
  "Souveraineté": "Capacité à garder le contrôle de ses propres données sans dépendre d'une entreprise étrangère.",
  "Cloud": "Ordinateurs appartenant à d'autres (souvent aux USA) où sont stockées vos données.",
  "Open Source": "Logiciel dont le code est ouvert et vérifiable par tous, gage de transparence.",
  "RGPD": "Règlement européen qui protège vos données personnelles.",
  "Big Tech": "Surnom donné aux géants de la technologie qui ont un quasi-monopole."
};

// Petite fonction magique pour détecter les mots
export const regexTerms = new RegExp(`(${Object.keys(TERMS).join('|')})`, 'gi');