import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, ArrowLeft, AlertCircle, Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_URL } from '../../config'; // <--- 1. IMPORT IMPORTANT

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.password.trim()) return;

    try {
      // <--- 2. CORRECTION ICI : Utilisation de backticks ` et ${API_URL}
      const response = await fetch(`${API_URL}/api/player/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/dashboard');
      } else if (response.status === 409) {
        setError("Ce pseudo est déjà pris par un autre résistant !");
      } else {
        setError("Une erreur est survenue lors de l'inscription.");
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
          <div style={styles.iconBox}><UserPlus size={32} color="white"/></div>
          <h2 style={{color: '#2c3e50', margin: '15px 0 5px'}}>Inscription</h2>
          <p style={{color: '#7f8c8d'}}>Rejoignez le Village Numérique !</p>
        </div>

        <form onSubmit={handleRegister} style={styles.form}>
          <div style={{textAlign: 'left'}}>
            <label style={styles.label}>Choisissez votre Pseudo</label>
            <div style={{position: 'relative'}}>
                <User size={18} style={{position: 'absolute', left: '12px', top: '12px', color: '#95a5a6'}}/>
                <input 
                  type="text" 
                  placeholder="Ex: Panoramix" 
                  value={formData.username}
                  onChange={(e) => {setFormData({...formData, username: e.target.value}); setError('');}}
                  style={styles.input}
                />
            </div>
          </div>

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
            Rejoindre l'aventure
          </button>
        </form>

        <div style={styles.footer}>
          Déjà un compte ? <Link to="/login" style={styles.link}>Se connecter</Link>
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', background: '#e0f7fa', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '20px' },
  backLink: { position: 'absolute', top: '20px', left: '20px', textDecoration: 'none', color: '#006064', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' },
  card: { background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' },
  header: { marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  iconBox: { width: '60px', height: '60px', background: '#00bcd4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(0, 188, 212, 0.3)' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  label: { display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#34495e', fontSize: '0.9rem' },
  input: { width: '100%', padding: '12px 15px 12px 40px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box' },
  button: { width: '100%', padding: '15px', background: '#00838f', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'transform 0.1s' },
  errorBox: { background: '#fce4e4', color: '#c0392b', padding: '10px', borderRadius: '8px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' },
  footer: { marginTop: '25px', fontSize: '0.95rem', color: '#666' },
  link: { color: '#00bcd4', textDecoration: 'none', fontWeight: 'bold' }
};

export default Register;