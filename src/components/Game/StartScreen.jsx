import React from 'react';
import { Rocket } from 'lucide-react';

const StartScreen = ({ onStart }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏫 School Tycoon</h1>
      <h2 style={styles.subtitle}>Opération Résistance Numérique</h2>
      
      <div style={styles.storyBox}>
        <p>
          <strong>Votre mission :</strong> Vous êtes le nouveau proviseur. 
          L'Empire du "Big Tech" veut contrôler votre école.
        </p>
        <p>
          Vous avez <strong>1 an</strong> (5 tours) pour rendre votre établissement 
          <strong> Inclusif, Responsable et Durable (NIRD)</strong>.
        </p>
        <p>Attention à votre budget !</p>
      </div>

      <button onClick={onStart} style={styles.button}>
        <Rocket size={24} />
        Lancer la simulation
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '40px',
    background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
    color: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
    maxWidth: '600px',
    margin: '40px auto'
  },
  title: { fontSize: '3rem', margin: '0 0 10px 0', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' },
  subtitle: { fontSize: '1.5rem', color: '#ecf0f1', marginBottom: '30px', fontWeight: '300' },
  storyBox: {
    background: 'rgba(255,255,255,0.1)',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'left',
    lineHeight: '1.6',
    marginBottom: '30px',
    fontSize: '1.1rem'
  },
  button: {
    padding: '15px 40px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    background: '#f1c40f',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    transition: 'transform 0.2s, background 0.2s',
    margin: '0 auto'
  }
};

export default StartScreen;