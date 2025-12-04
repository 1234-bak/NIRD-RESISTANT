import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Leaf, Users, ArrowRight, CheckCircle } from 'lucide-react';
import Navbar from '../UI/Navbar';

const Home = () => {
  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', color: '#2c3e50' }}>
      <Navbar />

      {/* HERO SECTION */}
      <header style={styles.hero}>
        <div style={styles.heroOverlay}>
          <div style={styles.heroContent}>
            <span style={styles.tagline}>Initiative NIRD</span>
            <h1 style={styles.title}>Le Village Numérique Résistant</h1>
            <p style={styles.subtitle}>
              Reprenez le contrôle de votre établissement scolaire. 
              Réduisez vos dépendances aux géants du numérique de manière progressive, réaliste et durable.
            </p>
            <div style={styles.ctaGroup}>
              <Link to="/register"><button style={styles.primaryBtn}>Rejoindre le mouvement</button></Link>
              <a href="#demarche" style={{textDecoration: 'none'}}><button style={styles.secondaryBtn}>Découvrir la démarche</button></a>
            </div>
          </div>
        </div>
      </header>

      {/* LA PROBLÉMATIQUE */}
      <section style={styles.sectionLight}>
        <div style={styles.container}>
          <div style={styles.gridTwo}>
            <div>
              <h2 style={styles.sectionTitleLeft}>L'École face au Goliath Numérique</h2>
              <p style={styles.text}>
                Obsolescence programmée, licences coûteuses, données stockées hors de l'UE... 
                Les établissements scolaires sont aujourd'hui captifs d'un système qui leur échappe.
              </p>
              <p style={styles.text}>
                La fin du support de Windows 10 menace de rendre obsolètes des milliers d'ordinateurs parfaitement fonctionnels. 
                Il est temps de changer de paradigme.
              </p>
              <ul style={styles.list}>
                <li><CheckCircle size={18} color="#27ae60" /> Matériel jeté inutilement</li>
                <li><CheckCircle size={18} color="#27ae60" /> Coûts d'abonnements croissants</li>
                <li><CheckCircle size={18} color="#27ae60" /> Perte de souveraineté pédagogique</li>
              </ul>
            </div>
            <div style={styles.imageBox}>
               {/* Illustration conceptuelle (remplace l'image externe pour éviter les liens brisés) */}
               <div style={{fontSize: '5rem'}}>🏰</div>
               <p style={{fontStyle: 'italic', marginTop: '20px'}}>
                 "Face à l'Empire, devenons un village d'irréductibles ingénieux."
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* LA SOLUTION NIRD */}
      <section id="demarche" style={styles.sectionDark}>
        <div style={styles.container}>
          <h2 style={{...styles.sectionTitle, color: 'white'}}>La Démarche NIRD</h2>
          <p style={{textAlign: 'center', color: '#ecf0f1', maxWidth: '700px', margin: '0 auto 50px', fontSize: '1.2rem'}}>
            Numérique Inclusif, Responsable et Durable. <br/>
            Une méthode pas à pas pour redonner du pouvoir d'agir aux équipes éducatives.
          </p>
          
          <div style={styles.featuresGrid}>
            <FeatureCard 
              icon={<Users size={40} color="#3498db"/>} 
              title="Inclusif" 
              text="Un numérique accessible à tous, sans laisser personne au bord de la route. Utilisation de formats ouverts pour garantir l'accès au savoir pour tous les élèves."
            />
            <FeatureCard 
              icon={<Shield size={40} color="#e67e22"/>} 
              title="Responsable" 
              text="Souveraineté des données. Nous vous aidons à reprendre le contrôle sur les informations de vos élèves et à sortir des écosystèmes fermés."
            />
            <FeatureCard 
              icon={<Leaf size={40} color="#27ae60"/>} 
              title="Durable" 
              text="Lutte active contre l'obsolescence programmée. Apprenez à reconditionner, réparer et installer des systèmes légers (Linux) pour prolonger la vie du matériel."
            />
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section style={styles.ctaSection}>
        <div style={styles.container}>
          <h2>Prêt à transformer votre établissement ?</h2>
          <p>Accédez à notre simulateur et découvrez votre score de résistance.</p>
          <Link to="/register">
            <button style={styles.ctaBtnBig}>
              Lancer la simulation <ArrowRight size={24} />
            </button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <p style={{fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '10px'}}>Le Village Numérique Résistant</p>
          <p style={{fontSize: '0.9rem', color: '#bdc3c7'}}>
            Une initiative pour accompagner la transition numérique des écoles. <br/>
            Portée par le collectif enseignant NIRD et la Forge des communs numériques.
          </p>
          <div style={{marginTop: '20px', fontSize: '0.8rem', color: '#7f8c8d'}}>
            © 2025 - Tous droits réservés - Licence Libre
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, text }) => (
  <div style={styles.card}>
    <div style={{marginBottom: '20px'}}>{icon}</div>
    <h3 style={{margin: '10px 0', fontSize: '1.5rem', color: '#2c3e50'}}>{title}</h3>
    <p style={{color: '#666', lineHeight: '1.6'}}>{text}</p>
  </div>
);

const styles = {
  hero: { 
    backgroundImage: 'url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    color: 'white', 
    textAlign: 'center',
    position: 'relative'
  },
  heroOverlay: {
    backgroundColor: 'rgba(44, 62, 80, 0.85)',
    padding: '120px 20px',
    width: '100%',
    height: '100%'
  },
  heroContent: { maxWidth: '900px', margin: '0 auto' },
  tagline: { background: '#27ae60', padding: '8px 20px', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' },
  title: { fontSize: '3.5rem', margin: '30px 0', fontWeight: '800', lineHeight: '1.2' },
  subtitle: { fontSize: '1.3rem', color: '#ecf0f1', marginBottom: '50px', lineHeight: '1.6', fontWeight: '300' },
  ctaGroup: { display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' },
  primaryBtn: { padding: '15px 35px', fontSize: '1.1rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', transition: 'transform 0.2s', boxShadow: '0 4px 15px rgba(52, 152, 219, 0.4)' },
  secondaryBtn: { padding: '15px 35px', fontSize: '1.1rem', background: 'transparent', color: 'white', border: '2px solid white', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', transition: 'background 0.2s' },
  
  sectionLight: { padding: '100px 20px', background: 'white' },
  sectionDark: { padding: '100px 20px', background: '#2c3e50', color: 'white' },
  ctaSection: { padding: '80px 20px', background: '#ecf0f1', textAlign: 'center', color: '#2c3e50' },
  container: { maxWidth: '1200px', margin: '0 auto' },
  sectionTitle: { textAlign: 'center', fontSize: '2.5rem', marginBottom: '20px', color: '#2c3e50', fontWeight: 'bold' },
  sectionTitleLeft: { fontSize: '2.5rem', marginBottom: '30px', color: '#2c3e50', fontWeight: 'bold' },
  
  gridTwo: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' },
  text: { fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '20px' },
  list: { listStyle: 'none', padding: 0, marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '1.1rem', color: '#555' },
  imageBox: { background: '#f8f9fa', padding: '60px', borderRadius: '20px', textAlign: 'center', border: '2px dashed #bdc3c7' },
  
  featuresGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' },
  card: { background: 'white', padding: '40px', borderRadius: '15px', textAlign: 'center', color: '#2c3e50', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' },
  
  ctaBtnBig: { marginTop: '30px', padding: '18px 40px', fontSize: '1.3rem', background: '#e67e22', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 25px rgba(230, 126, 34, 0.4)' },
  
  footer: { background: '#1a252f', color: 'white', padding: '60px 20px', textAlign: 'center' }
};

export default Home;