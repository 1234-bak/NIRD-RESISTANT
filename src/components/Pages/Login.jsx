import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, ArrowLeft, AlertCircle, Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.password.trim()) return;

    try {
      const response = await fetch('http://localhost:8080/api/player/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/dashboard');
      } else {
        // Gestion des erreurs (404 ou 401)
        setError("Pseudo ou mot de passe incorrect.");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur.");
    }
  };

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.backLink}>
        <ArrowLeft size={20} /> Retour à l'accueil
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        style={styles.card}
      >
        <div style={styles.header}>
          <div style={styles.iconBox}><LogIn size={32} color="white"/></div>
          <h2 style={{color: '#2c3e50', margin: '15px 0 5px'}}>Connexion</h2>
          <p style={{color: '#7f8c8d'}}>Heureux de vous revoir, Résistant !</p>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          {/* Champ Pseudo */}
          <div style={{textAlign: 'left'}}>
            <label style={styles.label}>Votre Pseudo</label>
            <div style={{position: 'relative'}}>
                <User size={18} style={{position: 'absolute', left: '12px', top: '12px', color: '#95a5a6'}}/>
                <input 
                  type="text" 
                  placeholder="Ex: Astérix62" 
                  value={formData.username}
                  onChange={(e) => {setFormData({...formData, username: e.target.value}); setError('');}}
                  style={styles.input}
                />
            </div>
          </div>

          {/* Champ Mot de Passe */}
          <div style={{textAlign: 'left'}}>
            <label style={styles.label}>Mot de passe</label>
            <div style={{position: 'relative'}}>
                <Lock size={18} style={{position: 'absolute', left: '12px', top: '12px', color: '#95a5a6'}}/>
                <input 
                  type="password" 
                  placeholder="Votre secret..." 
                  value={formData.password}
                  onChange={(e) => {setFormData({...formData, password: e.target.value}); setError('');}}
                  style={styles.input}
                />
            </div>
          </div>

          {error && (
            <div style={styles.errorBox}>
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button type="submit" style={styles.button}>
            Se connecter
          </button>
        </form>

        <div style={styles.footer}>
          Pas encore de compte ? <Link to="/register" style={styles.link}>Créer un compte</Link>
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '20px' },
  backLink: { position: 'absolute', top: '20px', left: '20px', textDecoration: 'none', color: '#7f8c8d', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' },
  card: { background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' },
  header: { marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  iconBox: { width: '60px', height: '60px', background: '#3498db', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(52, 152, 219, 0.3)' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  label: { display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#34495e', fontSize: '0.9rem' },
  input: { width: '100%', padding: '12px 15px 12px 40px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box' },
  button: { width: '100%', padding: '15px', background: '#2c3e50', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'transform 0.1s' },
  errorBox: { background: '#fce4e4', color: '#c0392b', padding: '10px', borderRadius: '8px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' },
  footer: { marginTop: '25px', fontSize: '0.95rem', color: '#666' },
  link: { color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }
};

export default Login;