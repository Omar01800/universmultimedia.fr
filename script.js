// ===== SÉLECTION DES ÉLÉMENTS =====
const burger = document.getElementById('burger');
const nav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page-content');
const header = document.querySelector('header');

// ===== TOGGLE MENU BURGER =====
burger.addEventListener('click', () => {
    const isActive = burger.classList.toggle('active');
    nav.classList.toggle('active');
    burger.setAttribute('aria-expanded', isActive);
});

// ===== NAVIGATION ENTRE LES PAGES =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Fermer le menu mobile
        burger.classList.remove('active');
        nav.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');

        // Obtenir l'ID de la page cible
        const target = link.getAttribute('href').substring(1);
        const targetPage = document.getElementById(`page-${target}`);
        
        if (!targetPage) return;

        // Mise à jour des états actifs
        navLinks.forEach(l => {
            l.classList.remove('active');
            l.removeAttribute('aria-current');
        });
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');

        // Transition fluide entre les pages
        pages.forEach(page => {
            if (page.classList.contains('active')) {
                page.style.opacity = '0';
                setTimeout(() => {
                    page.classList.remove('active');
                }, 200);
            }
        });

        setTimeout(() => {
            targetPage.classList.add('active');
            targetPage.style.opacity = '0';
            setTimeout(() => {
                targetPage.style.opacity = '1';
            }, 50);
        }, 200);

        // Scroll vers le haut avec animation fluide
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    });
});

// ===== ANIMATION DU HEADER AU SCROLL =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Modifier l'ombre selon le scroll
    if (currentScroll > 50) {
        header.style.boxShadow = '0 6px 30px rgba(0,0,0,0.4)';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    }

    lastScroll = currentScroll;
}, { passive: true });

// ===== FERMER LE MENU EN CLIQUANT DEHORS =====
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
        burger.classList.remove('active');
        nav.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
    }
});

// ===== GESTION DES ÉPINGLES MAP (MOBILE) =====
const mapPins = document.querySelectorAll('.map-pin');

// Sur mobile, permettre le tap pour afficher les infos
if (window.innerWidth <= 768) {
    mapPins.forEach(pin => {
        pin.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Fermer les autres épingles
            mapPins.forEach(p => {
                if (p !== pin) {
                    p.classList.remove('active');
                }
            });
            
            // Toggle l'épingle actuelle
            pin.classList.toggle('active');
        });
    });

    // Fermer les épingles en cliquant dehors
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.map-pin')) {
            mapPins.forEach(p => p.classList.remove('active'));
        }
    });
}

// ===== OPTIMISATION PERFORMANCE - LAZY LOADING =====
// Vérifier si IntersectionObserver est supporté
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Force le chargement
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ===== AMÉLIORATION ACCESSIBILITÉ - NAVIGATION CLAVIER =====
navLinks.forEach((link, index) => {
    link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            link.click();
        }
    });
});

// ===== DÉTECTION DU CHANGEMENT D'ORIENTATION =====
window.addEventListener('orientationchange', () => {
    // Fermer le menu si ouvert lors du changement d'orientation
    if (nav.classList.contains('active')) {
        burger.classList.remove('active');
        nav.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
    }
});

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
    // S'assurer que la première page est visible
    const firstPage = document.getElementById('page-accueil');
    if (firstPage) {
        firstPage.style.opacity = '1';
    }

    // Améliorer les transitions des pages
    pages.forEach(page => {
        page.style.transition = 'opacity 0.3s ease';
    });

    console.log('🚀 Univers Multimédia - Site initialisé avec succès');

});

document.getElementById('current-year').textContent = new Date().getFullYear();

});
