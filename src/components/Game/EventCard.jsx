import React from 'react';
import { MousePointerClick, Info } from 'lucide-react';
import SmartText from '../UI/SmartText'; // Vérifie que ce chemin est correct par rapport à ton dossier

const EventCard = ({ event, onChoice }) => {
  // Sécurité si les données ne sont pas encore là
  if (!event) return <div>Chargement du prochain défi...</div>;

  return (
    <div style={styles.card}>
      {/* En-tête de la carte */}
      <div style={styles.header}>
        <h2 style={styles.title}>{event.title}</h2>
      </div>
      
      {/* Description du problème - MODIFIÉ POUR UTILISER SMARTTEXT */}
      <div style={styles.description}>
        <SmartText text={event.description} />
      </div>

      {/* Le contexte pédagogique NIRD - MODIFIÉ POUR UTILISER SMARTTEXT */}
      <div style={styles.infoBox}>
        <Info size={20} style={{ marginRight: '10px', minWidth: '20px' }} />
        <span style={{ fontSize: '0.9em', lineHeight: '1.4' }}>
          <strong>Info NIRD : </strong>
          <SmartText text={event.educationalContext} />
        </span>
      </div>

      {/* Les Choix */}
      <div style={styles.choicesContainer}>
        {event.choices.map((choice, index) => (
          <button 
            key={index}
            onClick={() => onChoice(choice.impacts, choice.feedback)}
            style={styles.button}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '5px' }}>
              <MousePointerClick size={18} style={{ marginRight: '8px' }} />
              <strong>Option {index + 1}</strong>
            </div>
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
};

// Styles CSS-in-JS
const styles = {
  card: {
    background: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'left',
    border: '1px solid #e1e4e8'
  },
  header: {
    borderBottom: '2px solid #f0f0f0',
    paddingBottom: '15px',
    marginBottom: '20px'
  },
  title: {
    margin: 0,
    color: '#2c3e50',
    fontSize: '1.5rem'
  },
  description: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#4a5568',
    marginBottom: '25px'
  },
  infoBox: {
    background: '#e3f2fd',
    color: '#0d47a1',
    padding: '15px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'start', // Important pour que l'icône reste en haut si le texte est long
    marginBottom: '25px',
    borderLeft: '4px solid #2196f3'
  },
  choicesContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px'
  },
  button: {
    padding: '15px',
    border: '2px solid #cbd5e0',
    background: '#f7fafc',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    color: '#2d3748',
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  }
};

export default EventCard;