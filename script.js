// Sélection des éléments
const burger = document.getElementById('burger');
const nav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page-content');

// Toggle menu burger pour mobile
burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
});

// Navigation entre les pages
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Fermer le menu mobile si ouvert
        burger.classList.remove('active');
        nav.classList.remove('active');

        // Retirer la classe active de tous les liens
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Cacher toutes les pages
        pages.forEach(page => page.classList.remove('active'));

        // Afficher la page correspondante au lien cliqué
        const target = link.getAttribute('href').substring(1);
        const targetPage = document.getElementById(`page-${target}`);
        
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Scroll smooth vers le haut de la page
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    });
});

// Animation du header au scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 6px 30px rgba(0,0,0,0.4)';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    }
});

// Fermer le menu mobile en cliquant en dehors
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
        burger.classList.remove('active');
        nav.classList.remove('active');
    }
});