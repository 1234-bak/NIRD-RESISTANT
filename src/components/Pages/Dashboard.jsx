import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Play, Activity, History, User, Clock } from 'lucide-react';
import Navbar from '../UI/Navbar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' ou 'history'

  useEffect(() => {
    // 1. Vérif User
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));

    // 2. Charger le classement
    fetch('http://localhost:8080/api/player/leaderboard')
      .then(res => res.json())
      .then(data => setLeaderboard(data))
      .catch(err => console.error("Erreur leaderboard", err));
  }, [navigate]);

  if (!user) return null;

  return (
    <>
      <Navbar />
      
      <div style={styles.layout}>
        {/* SIDEBAR GAUCHE */}
        <aside style={styles.sidebar}>
          <div style={styles.profileCard}>
            <div style={styles.avatar}>{user.username.charAt(0).toUpperCase()}</div>
            <h3>{user.username}</h3>
            <span style={styles.badge}>Résistant NIRD</span>
          </div>
          
          <nav style={styles.sideMenu}>
            <div 
              onClick={() => setActiveTab('overview')}
              style={activeTab === 'overview' ? styles.menuItemActive : styles.menuItem}
            >
              <Activity size={20}/> Vue d'ensemble
            </div>
            
            <div 
              onClick={() => setActiveTab('history')}
              style={activeTab === 'history' ? styles.menuItemActive : styles.menuItem}
            >
              <History size={20}/> Historique
            </div>
            
            <div style={styles.menuItem} onClick={() => alert("Fonctionnalité Profil à venir !")}>
              <User size={20}/> Profil
            </div>
          </nav>
        </aside>

        {/* CONTENU PRINCIPAL */}
        <main style={styles.main}>
          <h1 style={{marginBottom: '30px', color: '#2c3e50'}}>
            {activeTab === 'overview' ? 'Tableau de Bord' : 'Historique des Parties'}
          </h1>

          {/* VUE D'ENSEMBLE (DASHBOARD) */}
          {activeTab === 'overview' && (
            <>
              <div style={styles.statsGrid}>
                <div style={{...styles.statCard, background: 'linear-gradient(135deg, #f1c40f 0%, #f39c12 100%)'}}>
                  <Trophy size={40} color="white"/>
                  <div>
                    <h3>Meilleur Score</h3>
                    <div style={styles.statValue}>{user.bestScore} pts</div>
                  </div>
                </div>
                
                <div style={styles.actionCard}>
                  <h3>Prêt pour une nouvelle partie ?</h3>
                  <button onClick={() => navigate('/game')} style={styles.playButton}>
                    <Play size={24} fill="white" /> LANCER LA MISSION
                  </button>
                </div>
              </div>

              <div style={styles.leaderboardSection}>
                <h2>🏆 Top 10 des Établissements</h2>
                <table style={styles.table}>
                  <thead>
                    <tr style={{background: '#f8f9fa', textAlign: 'left'}}>
                      <th style={{padding: '15px'}}>Rang</th>
                      <th>Joueur</th>
                      <th>Score NIRD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((player, index) => (
                      <tr key={index} style={{borderBottom: '1px solid #eee'}}>
                        <td style={{padding: '15px', fontWeight: 'bold', color: index < 3 ? '#e67e22' : '#7f8c8d'}}>#{index + 1}</td>
                        <td>{player.username} {player.username === user.username && "(Vous)"}</td>
                        <td style={{fontWeight: 'bold'}}>{player.bestScore} pts</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* VUE HISTORIQUE */}
          {activeTab === 'history' && (
            <div style={styles.leaderboardSection}>
              {user.history && user.history.length > 0 ? (
                <table style={styles.table}>
                  <thead>
                    <tr style={{background: '#f8f9fa', textAlign: 'left'}}>
                      <th style={{padding: '15px'}}>Partie</th>
                      <th>Score Obtenu</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.history.slice().reverse().map((score, index) => (
                      <tr key={index} style={{borderBottom: '1px solid #eee'}}>
                        <td style={{padding: '15px'}}>
                          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <Clock size={16} color="#95a5a6"/>
                            Partie #{user.history.length - index}
                          </div>
                        </td>
                        <td style={{fontWeight: 'bold', color: '#27ae60'}}>{score} pts</td>
                        <td style={{color: '#7f8c8d'}}>Récemment</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{textAlign: 'center', padding: '50px', color: '#7f8c8d'}}>
                  <p>Aucune partie jouée pour le moment.</p>
                  <button onClick={() => navigate('/game')} style={styles.playButton}>Jouer ma première partie</button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

const styles = {
  layout: { display: 'flex', minHeight: 'calc(100vh - 60px)', background: '#f4f6f7' },
  sidebar: { width: '280px', background: 'white', padding: '30px', boxShadow: '2px 0 10px rgba(0,0,0,0.05)' },
  main: { flex: 1, padding: '40px', maxWidth: '1200px', margin: '0 auto' },
  
  profileCard: { textAlign: 'center', marginBottom: '40px' },
  avatar: { width: '80px', height: '80px', background: '#3498db', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 15px', fontWeight: 'bold' },
  badge: { background: '#e0f7fa', color: '#006064', padding: '5px 10px', borderRadius: '15px', fontSize: '0.8rem' },
  
  sideMenu: { display: 'flex', flexDirection: 'column', gap: '10px' },
  menuItem: { display: 'flex', gap: '15px', padding: '15px', color: '#7f8c8d', cursor: 'pointer', borderRadius: '10px', transition: '0.2s' },
  menuItemActive: { display: 'flex', gap: '15px', padding: '15px', background: '#e8f6f3', color: '#16a085', fontWeight: 'bold', borderRadius: '10px', cursor: 'pointer' },

  statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' },
  statCard: { padding: '30px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '20px', color: 'white', boxShadow: '0 10px 20px rgba(241, 196, 15, 0.3)' },
  actionCard: { background: '#2c3e50', padding: '30px', borderRadius: '20px', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' },
  statValue: { fontSize: '2.5rem', fontWeight: 'bold' },
  playButton: { marginTop: '15px', background: '#27ae60', border: 'none', color: 'white', padding: '12px 30px', borderRadius: '50px', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' },

  leaderboardSection: { background: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' }
};

export default Dashboard;