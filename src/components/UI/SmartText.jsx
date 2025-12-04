import React, { useState } from 'react';
import { TERMS, regexTerms } from '../../utils/glossary';

const SmartText = ({ text }) => {
  if (!text) return null;

  // On découpe le texte autour des mots-clés
  const parts = text.split(regexTerms);

  return (
    <span>
      {parts.map((part, index) => {
        // On vérifie si ce bout de texte est dans notre dictionnaire (insensible à la casse)
        const definition = Object.keys(TERMS).find(key => key.toLowerCase() === part.toLowerCase());

        if (definition) {
          return <TooltipWord key={index} word={part} def={TERMS[definition]} />;
        }
        return part;
      })}
    </span>
  );
};

// Le petit mot souligné avec l'infobulle
const TooltipWord = ({ word, def }) => {
  const [show, setShow] = useState(false);

  return (
    <span 
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={{
        cursor: 'help',
        borderBottom: '2px dashed #3498db',
        color: '#2980b9',
        fontWeight: 'bold',
        position: 'relative',
        display: 'inline-block'
      }}
    >
      {word}
      {show && (
        <span style={{
          position: 'absolute',
          bottom: '120%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#2c3e50',
          color: '#fff',
          padding: '10px',
          borderRadius: '6px',
          fontSize: '0.85rem',
          width: '200px',
          zIndex: 100,
          textAlign: 'center',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          pointerEvents: 'none' // Pour ne pas gêner la souris
        }}>
          {def}
          {/* Petite flèche vers le bas */}
          <span style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            marginLeft: '-5px',
            borderWidth: '5px',
            borderStyle: 'solid',
            borderColor: '#2c3e50 transparent transparent transparent'
          }}></span>
        </span>
      )}
    </span>
  );
};

export default SmartText;