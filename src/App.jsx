import Navbar from './components/UI/Navbar';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Euro, ShieldCheck, Smile, Trophy, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EventCard from './components/Game/EventCard';
import StartScreen from './components/Game/StartScreen';
import SmartText from './components/UI/SmartText';

// --- SYNTHETISEUR AUDIO AVANCE ---
const playSound = (type) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    // Fonction utilitaire pour jouer une note
    const playNote = (freq, startTime, duration, type = 'sine') => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = type;
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0.1, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    
    if (type === 'success') {
      // Ting ! (Gain pièce)
      playNote(500, now, 0.5, 'sine');
    } else if (type === 'error') {
      // Bwomp... (Perte)
      playNote(150, now, 0.4, 'triangle');
    } else if (type === 'victory') {
      // Arpège de Victoire (C Major: C, E, G, C)
      playNote(523.25, now, 0.2, 'square');       // Do
      playNote(659.25, now + 0.2, 0.2, 'square'); // Mi
      playNote(783.99, now + 0.4, 0.2, 'square'); // Sol
      playNote(1046.50, now + 0.6, 0.8, 'square');// Do (Haut)
    } else if (type === 'gameover') {
      // Descente triste
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 1.5); // Long slide vers le bas
      
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 1.5);
      
      osc.start(now);
      osc.stop(now + 1.5);
    }
  } catch (e) {
    console.error("Erreur Audio:", e);
  }
};

function App() {
  const navigate = useNavigate();

  // --- ÉTAT DU JEU ---
  const [stats, setStats] = useState({ budget: 5000, ecology: 50, sovereignty: 20, satisfaction: 70 });
  const [prevStats, setPrevStats] = useState(null);
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameStatus, setGameStatus] = useState('menu'); 
  const [lastFeedback, setLastFeedback] = useState(null);
  const [failReason, setFailReason] = useState("");
  
  const [floatingEffects, setFloatingEffects] = useState([]);

  // --- 1. DÉMARRAGE ---
  const startGame = () => {
    setStats({ budget: 5000, ecology: 50, sovereignty: 20, satisfaction: 70 });
    setCurrentIndex(0);
    setGameStatus('loading');
    setFailReason("");
    setLastFeedback(null);
    setFloatingEffects([]);

    fetch('http://localhost:8080/api/game/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setGameStatus('playing');
      })
      .catch(err => {
        console.error(err);
        setGameStatus('error');
      });
  };

  // --- 2. GESTION DES CHOIX ---
  const handleChoice = (impacts, feedback) => {
    setPrevStats({ ...stats });

    const newStats = {
      budget: stats.budget + impacts.budget,
      ecology: Math.min(100, Math.max(0, stats.ecology + impacts.ecology)),
      sovereignty: Math.min(100, Math.max(0, stats.sovereignty + impacts.sovereignty)),
      satisfaction: Math.min(100, Math.max(0, stats.satisfaction + impacts.satisfaction))
    };

    // Effets visuels
    const newEffects = [];
    if (impacts.budget !== 0) newEffects.push({ id: Date.now() + 'b', text: `${impacts.budget > 0 ? '+' : ''}${impacts.budget} €`, type: impacts.budget > 0 ? 'good' : 'bad', icon: <Euro size={20}/> });
    if (impacts.ecology !== 0) newEffects.push({ id: Date.now() + 'e', text: `${impacts.ecology > 0 ? '+' : ''}${impacts.ecology}% Eco`, type: impacts.ecology > 0 ? 'good' : 'bad', icon: <Leaf size={20}/> });
    if (impacts.sovereignty !== 0) newEffects.push({ id: Date.now() + 's', text: `${impacts.sovereignty > 0 ? '+' : ''}${impacts.sovereignty}% Souv.`, type: impacts.sovereignty > 0 ? 'good' : 'bad', icon: <ShieldCheck size={20}/> });
    if (impacts.satisfaction !== 0) newEffects.push({ id: Date.now() + 'h', text: `${impacts.satisfaction > 0 ? '+' : ''}${impacts.satisfaction}% Bonheur`, type: impacts.satisfaction > 0 ? 'good' : 'bad', icon: <Smile size={20}/> });

    setFloatingEffects(newEffects);

    // Son de feedback immédiat
    const isOverallGood = (impacts.ecology + impacts.sovereignty + impacts.satisfaction) > -5; 
    playSound(isOverallGood ? 'success' : 'error');

    setStats(newStats);
    setLastFeedback(feedback);

    setTimeout(() => setFloatingEffects([]), 2000);

    // Préparation Game Over (mais ne déclenche pas tout de suite, attend le clic "Continuer")
    if (newStats.budget <= 0) setFailReason("Faillite ! L'école a été rachetée par Goliath Corp.");
    else if (newStats.satisfaction <= 0) setFailReason("Grève Générale ! Les profs et élèves bloquent le lycée.");
    else setFailReason("");
  };

  const cancelChoice = () => {
    if (prevStats) {
      setStats(prevStats);
      setLastFeedback(null);
      setFailReason("");
      setFloatingEffects([]);
    }
  };

  // --- 3. PASSAGE AU TOUR SUIVANT ---
  const nextTurn = () => {
    // CAS 1 : C'est perdu
    if (failReason) {
      setGameStatus('gameover');
      setLastFeedback(null);
      playSound('gameover'); // <--- SON DE DÉFAITE
      return;
    }

    setLastFeedback(null);

    // CAS 2 : On continue ou on gagne
    if (currentIndex < events.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setGameStatus('finished');
      playSound('victory'); // <--- SON DE VICTOIRE
    }
  };

  const saveScoreAndQuit = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const finalScore = stats.ecology + stats.sovereignty;

    if (user) {
      try {
        const response = await fetch('http://localhost:8080/api/player/score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: user.username, score: finalScore })
        });
        const updatedUser = await response.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } catch (err) {
        console.error("Erreur sauvegarde score", err);
      }
    }
    navigate('/dashboard');
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      <Navbar />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', position: 'relative' }}>
      
        {/* POP-UPS ANIMÉS */}
        <div style={{
          position: 'fixed', top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
          zIndex: 9999, pointerEvents: 'none', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center'
        }}>
          <AnimatePresence>
            {floatingEffects.map((effect) => (
              <motion.div
                key={effect.id}
                initial={{ opacity: 0, y: 50, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1.1 }}
                exit={{ opacity: 0, y: -100, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  background: effect.type === 'good' ? '#27ae60' : '#c0392b',
                  color: 'white',
                  padding: '12px 25px',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  fontSize: '1.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                  border: '2px solid white'
                }}
              >
                {effect.icon} {effect.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {gameStatus !== 'menu' && (
          <header style={{ textAlign: 'center', marginBottom: '20px', marginTop: '20px' }}>
            <h1 style={{ color: '#2c3e50', fontSize: '1.5rem' }}>🏫 School Tycoon: NIRD Ops</h1>
          </header>
        )}

        {gameStatus === 'menu' && <StartScreen onStart={startGame} />}

        {(gameStatus === 'playing' || gameStatus === 'finished' || gameStatus === 'gameover') && (
          <>
            <div style={styles.dashboard}>
              <StatBadge icon={<Euro />} value={`${stats.budget} €`} label="Budget" color={stats.budget < 1000 ? 'red' : '#e67e22'} />
              <StatBadge icon={<ShieldCheck />} value={`${stats.sovereignty}%`} label="Souveraineté" color="#2980b9" />
              <StatBadge icon={<Leaf />} value={`${stats.ecology}%`} label="Écologie" color="#27ae60" />
              <StatBadge icon={<Smile />} value={`${stats.satisfaction}%`} label="Bonheur" color={stats.satisfaction < 20 ? 'red' : '#8e44ad'} />
            </div>

            <div style={{ position: 'relative', minHeight: '400px' }}>
              
              {/* BARRE DE PROGRESSION */}
              {gameStatus === 'playing' && events.length > 0 && (
                <div style={{ marginBottom: '20px', color: '#7f8c8d', fontWeight: 'bold', textAlign: 'right', fontSize: '0.9rem' }}>
                  Défi {currentIndex + 1} / {events.length}
                  <div style={{ width: '100%', height: '8px', background: '#e0e0e0', borderRadius: '4px', marginTop: '5px', overflow: 'hidden' }}>
                    <div style={{ width: `${((currentIndex + 1) / events.length) * 100}%`, height: '100%', background: '#3498db', transition: 'width 0.5s ease' }}></div>
                  </div>
                </div>
              )}

              {/* CARTE */}
              {gameStatus === 'playing' && events.length > 0 && (
                <EventCard event={events[currentIndex]} onChoice={handleChoice} />
              )}

              {/* FEEDBACK POPUP */}
              {lastFeedback && (
                <div style={styles.feedbackOverlay}>
                  <h2 style={{color: '#2c3e50'}}>📊 Conséquences</h2>
                  <div style={styles.feedbackText}>
                    <SmartText text={lastFeedback} />
                  </div>
                  <div style={{display: 'flex', gap: '20px'}}>
                    <button onClick={cancelChoice} style={styles.cancelButton}>
                      <RotateCcw size={20} /> Annuler
                    </button>
                    <button onClick={nextTurn} style={styles.nextButton}>
                      Continuer <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              )}

              {/* GAME OVER */}
              {gameStatus === 'gameover' && (
                <div style={{...styles.endScreen, background: '#c0392b'}}>
                  <AlertTriangle size={60} color="white" />
                  <h2>ÉCHEC DE LA MISSION</h2>
                  <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>{failReason}</p>
                  <button onClick={() => setGameStatus('menu')} style={styles.restartButton}>Réessayer</button>
                  <button onClick={() => navigate('/dashboard')} style={{...styles.restartButton, background: 'transparent', color: 'white', border: '1px solid white', marginLeft: '10px'}}>Quitter</button>
                </div>
              )}

              {/* VICTOIRE */}
              {gameStatus === 'finished' && (
                <div style={styles.endScreen}>
                  <Trophy size={60} color="#f1c40f" />
                  <h2>Mission Terminée !</h2>
                  <p>Vous avez survécu à l'année scolaire.</p>
                  <div style={{ marginTop: '20px', fontSize: '1.5rem' }}>
                    Score NIRD : <strong>{stats.ecology + stats.sovereignty} pts</strong>
                  </div>
                  <button onClick={saveScoreAndQuit} style={styles.restartButton}>
                    Valider et voir le classement
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {gameStatus === 'error' && (
           <div style={{textAlign:'center', color: 'red', marginTop: '50px'}}>
            <h3>⚠️ Erreur de connexion</h3>
            <p>Le serveur Spring Boot (Back) n'est pas détecté sur le port 8080.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// --- STYLES ---
const StatBadge = ({ icon, value, label, color }) => (
  <div style={{ textAlign: 'center', color: color, transition: 'color 0.3s' }}>
    <div style={{ marginBottom: '5px' }}>{icon}</div>
    <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{value}</div>
    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#555' }}>{label}</div>
  </div>
);

const styles = {
  dashboard: {
    display: 'flex', justifyContent: 'space-around',
    background: '#f8f9fa', padding: '15px',
    borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    marginBottom: '30px'
  },
  feedbackOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(255,255,255,0.98)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    textAlign: 'center', borderRadius: '15px', zIndex: 10, padding: '20px'
  },
  feedbackText: {
    fontSize: '1.3rem', margin: '20px 0', color: '#34495e',
    maxWidth: '600px', lineHeight: '1.6'
  },
  nextButton: {
    padding: '12px 30px', fontSize: '1.1rem',
    background: '#3498db', color: 'white', border: 'none', borderRadius: '50px',
    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
    boxShadow: '0 4px 15px rgba(52, 152, 219, 0.4)'
  },
  cancelButton: {
    padding: '12px 30px', fontSize: '1.1rem',
    background: '#95a5a6', color: 'white', border: 'none', borderRadius: '50px',
    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'
  },
  endScreen: {
    textAlign: 'center', padding: '40px', background: '#27ae60', color: 'white',
    borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
  },
  restartButton: {
    marginTop: '20px', padding: '15px 30px', fontSize: '1.2rem', cursor: 'pointer',
    background: 'white', color: '#333', border: 'none', borderRadius: '50px', fontWeight: 'bold',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
  }
};

export default App;