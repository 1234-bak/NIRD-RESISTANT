import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Home } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* LOGO */}
        <Link to="/" style={styles.logo}>
          🦉 NIRD<span style={{color: '#3498db'}}>RESISTANCE</span>
        </Link>

        {/* MENU DROITE */}
        <div style={styles.menu}>
          <Link to="/" style={styles.link}><Home size={18}/> Accueil</Link>
          
          {user ? (
            <>
              <Link to="/dashboard" style={styles.link}><User size={18}/> Mon Espace ({user.username})</Link>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                <LogOut size={18}/> Déconnexion
              </button>
            </>
          ) : (
            <Link to="/login" style={styles.ctaBtn}>Rejoindre le combat</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: { background: '#2c3e50', padding: '15px 0', color: 'white', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  container: { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' },
  logo: { fontSize: '1.5rem', fontWeight: 'bold', color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' },
  menu: { display: 'flex', alignItems: 'center', gap: '20px' },
  link: { color: '#ecf0f1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', transition: 'color 0.2s' },
  logoutBtn: { background: '#c0392b', border: 'none', color: 'white', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' },
  ctaBtn: { background: '#e67e22', color: 'white', padding: '10px 20px', borderRadius: '20px', textDecoration: 'none', fontWeight: 'bold' }
};

export default Navbar;