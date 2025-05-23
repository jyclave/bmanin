function nextSlide() {
  const activeSlide = document.querySelector('[data-active]');
  const slides = document.querySelectorAll('.slide');
  let newIndex = [...slides].indexOf(activeSlide) + 1;

  if (newIndex >= slides.length) {
    newIndex = 0;
  }

  slides[newIndex].dataset.active = true;
  delete activeSlide.dataset.active;
}

  const burger = document.getElementById('burger');
  const nav = document.querySelector('nav ul');

  burger.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

// Démarrer le défilement automatique
let slideInterval = setInterval(nextSlide, 3000); // Change toutes les 3 secondes

// Carousel buttons functionality
const buttons = document.querySelectorAll('.carousel-button');
const slides = document.querySelectorAll('.slide');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Arrêter le défilement automatique lors du clic
    clearInterval(slideInterval);

    const offset = button.classList.contains('next') ? 1 : -1;
    const activeSlide = document.querySelector('[data-active]');
    let newIndex = [...slides].indexOf(activeSlide) + offset;

    if (newIndex < 0) {
      newIndex = slides.length - 1;
    } else if (newIndex >= slides.length) {
      newIndex = 0;
    }

    slides[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;

    // Redémarrer le défilement automatique après le clic
    slideInterval = setInterval(nextSlide, 3000);
  });
});

// Header scroll and button visibility functionality
window.addEventListener("scroll", function() {
  let header = document.getElementById("header");
  const carouselButtons = document.querySelectorAll('.carousel-button');
  
  if (window.scrollY > 300) {
    header.classList.add("scrolled");
    carouselButtons.forEach(button => button.classList.add('hidden'));
  } else {
    header.classList.remove("scrolled");
    carouselButtons.forEach(button => button.classList.remove('hidden'));
  }
});

// document.querySelectorAll('.accordion-header').forEach(header => {
//   header.addEventListener('click', () => {
//       const accordionItem = header.parentElement;
//       const isActive = accordionItem.classList.contains('active');
      
//       // Ferme tous les accordéons
//       document.querySelectorAll('.accordion').forEach(item => {
//           item.classList.remove('active');
//       });
      
//       // Ouvre l'accordéon cliqué si il n'était pas déjà ouvert
//       if (!isActive) {
//           accordionItem.classList.add('active');
//       }
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const accordions = document.querySelectorAll(".accordion");

//   accordions.forEach((accordion) => {
//     accordion.querySelector(".accordion-header").addEventListener("click", () => {
//       const isActive = accordion.classList.contains("active");

//       if (isActive) {
//         // Fermer tous
//         accordions.forEach(acc => acc.classList.remove("active"));
//       } else {
//         // Ouvrir tous
//         accordions.forEach(acc => acc.classList.add("active"));
//       }
//     });
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const accordions = document.querySelectorAll(".accordion");

//   accordions.forEach((accordion) => {
//     accordion.querySelector(".accordion-header").addEventListener("click", () => {
//       const isActive = accordion.classList.contains("active");

//       // Fermer tous les volets
//       accordions.forEach(acc => acc.classList.remove("active"));

//       // Ouvrir uniquement si ce n'était pas déjà ouvert
//       if (!isActive) {
//         accordion.classList.add("active");
//       }
//     });
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const accordions = document.querySelectorAll(".accordion");

//   accordions.forEach((accordion) => {
//     const header = accordion.querySelector(".accordion-header");
//     const content = accordion.querySelector(".accordion-content");

//     header.addEventListener("click", () => {
//       const isActive = accordion.classList.contains("active");

//       // Fermer tous les accordéons
//       accordions.forEach(acc => {
//         acc.classList.remove("active");
//         acc.querySelector(".accordion-content").style.maxHeight = null;
//       });

//       // Ouvrir celui cliqué s'il n'était pas déjà actif
//       if (!isActive) {
//         accordion.classList.add("active");
//         content.style.maxHeight = content.scrollHeight + "px";
//       }
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    const header = accordion.querySelector(".accordion-header");
    const content = accordion.querySelector(".accordion-content");

    header.addEventListener("click", () => {
      const isActive = accordion.classList.contains("active");

      // Fermer tous les volets
      accordions.forEach(acc => {
        acc.classList.remove("active");
        acc.querySelector(".accordion-content").style.maxHeight = null;
      });

      // Ouvrir celui cliqué s'il n'était pas actif
      if (!isActive) {
        accordion.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // ✅ Ouvrir le premier volet automatiquement
  const firstAccordion = accordions[0];
  const firstContent = firstAccordion.querySelector(".accordion-content");

  firstAccordion.classList.add("active");
  firstContent.style.maxHeight = firstContent.scrollHeight + "px";
});

  const fadeIns = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    let delay = 0;

    entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => a.target.offsetTop - b.target.offsetTop) // pour animer dans l'ordre visuel
      .forEach(entry => {
        entry.target.style.transitionDelay = `${delay}s`;
        entry.target.classList.add('visible');
        delay += 0.15; // décalage de 150ms entre chaque
      });

    entries
      .filter(entry => !entry.isIntersecting)
      .forEach(entry => {
        entry.target.classList.remove('visible');
        entry.target.style.transitionDelay = '0s';
      });
  }, {
    threshold: 0.1
  });

  fadeIns.forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-contact');
    
    function handleSubmit(e) {
        e.preventDefault(); // Empêche l'envoi par défaut
        
        // Récupération des champs
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const msg = document.querySelector('.msg');
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        
        // Réinitialisation du message d'erreur
        msg.innerHTML = '';
        let hasError = false;
        
        // Validation du nom (lettres, espaces, accents, tirets et apostrophes)
        if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(name)) {
            msg?.classList.add('error');
            msg.innerHTML += '<p class="error">Le champ "Nom" doit contenir uniquement des lettres, des espaces, des accents, des tirets ou des apostrophes</p>';
            hasError = true;
            setTimeout(() => {
                msg.innerHTML = '';
            }, 5000);
        }
        
        // Validation de l'email (format correct)
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            msg?.classList.add('error');
            msg.innerHTML += '<p class="error">Le champ "Email" doit contenir une adresse email valide.</p>';
            hasError = true;
            setTimeout(() => {
                msg.innerHTML = '';
            }, 5000);
        }
        
        // Validation du message (non vide)
        if (message === '' || message.length < 100) {
            msg?.classList.add('error');
            msg.innerHTML += `<p class="error">Le champ "Message" doit contenir au minimum 100 caractères. Actuellement : ${message.length} caractères.</p>`;
            hasError = true;
            setTimeout(() => {
                msg.innerHTML = '';
            }, 5000);
        }
        
        // Si pas d'erreur, préparation de l'envoi
        if (!hasError) {
            // Création de l'URL mailto
            const mailtoLink = `mailto:contact.mywebdev@gmail.com?subject=Message%20de%20${encodeURIComponent(name)}&body=${encodeURIComponent(
                `De: ${name} (${email})\n\n${message}`
            )}`;
            
            // Ouvrir le client mail dans une nouvelle fenêtre
            window.open(mailtoLink, '_blank');
            
            // Réinitialisation du formulaire
            form.reset();
            
            // Message de succès
            msg?.classList.add('succes');
            msg.innerHTML = '<p class="success">Votre message a été envoyé avec succès!</p>';
            
            // Effacer le message de succès après 5 secondes
            setTimeout(() => {
                msg.innerHTML = '';
            }, 5000);
        }
    }
    
    // Ajout de l'écouteur d'événement
    form.addEventListener('submit', handleSubmit);
});

// Sélection du bouton
const scrollToTopButton = document.getElementById("scrollToTop");

// Affiche la flèche après 300px de scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
});

// Scroll automatique vers le haut
scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

