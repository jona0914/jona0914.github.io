document.addEventListener('DOMContentLoaded', () => {
    // 1. Detección de elementos en el viewport para animaciones de desplazamiento (Scroll Animations)
    const fadeInElements = document.querySelectorAll('.fade-in, .zoom-in');

    const observerOptions = {
        root: null, // El viewport es el root
        rootMargin: '0px',
        threshold: 0.2 // El 20% del elemento debe ser visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si el elemento está en el viewport, le añadimos la clase 'visible'
                entry.target.classList.add('visible');
                // Dejamos de observarlo una vez que ha aparecido
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar cada elemento que debe animarse
    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    // 2. Animación de Scroll Suave para la barra de navegación
    const navLinks = document.querySelectorAll('.navbar a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Previene el comportamiento de anclaje instantáneo por defecto
            e.preventDefault();

            // Obtiene el ID de la sección (ej. #inicio, #nosotros)
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Desplazamiento suave al elemento
                window.scrollTo({
                    top: targetSection.offsetTop - document.querySelector('header').offsetHeight, // Ajuste para el sticky header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Nota: Los efectos de hover/concentración como la sombra y el movimiento de las tarjetas
    // se manejan directamente en el CSS con la pseudo-clase `:hover` y la propiedad `transition`.
});
