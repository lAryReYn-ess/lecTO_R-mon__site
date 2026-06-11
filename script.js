document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page');
    const currentPageSpan = document.getElementById('current-page');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const menuBtn = document.getElementById('menu-btn');
    
    let currentPage = 1;
    const totalPages = pages.length;
    
    // Met à jour l'affichage
    function showPage(pageNum) {
        // Cache toutes les pages
        pages.forEach(page => page.classList.remove('active'));
        
        // Affiche la page demandée
        const targetPage = document.querySelector(`.page[data-page="${pageNum}"]`);
        if (targetPage) {
            targetPage.classList.add('active');
            currentPage = pageNum;
            currentPageSpan.textContent = currentPage;
            
            // Scroll en haut
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    
    // Page suivante
    function nextPage() {
        if (currentPage < totalPages) {
            showPage(currentPage + 1);
        } else {
            // Dernière page → propose chapitre suivant
            const nextChapitreBtn = document.querySelector('.btn-nav[href*="chapitre"]');
            if (nextChapitreBtn && confirm('Chapitre terminé ! Passer au suivant ?')) {
                window.location.href = nextChapitreBtn.href;
            }
        }
    }
    
    // Page précédente
    function prevPage() {
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    }
    
    // Événements clic
    nextBtn.addEventListener('click', nextPage);
    prevBtn.addEventListener('click', prevPage);
    
    // Navigation clavier
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            nextPage();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevPage();
        }
    });
    
    // Clic sur l'image pour avancer
    pages.forEach(page => {
        page.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            
            // Clic à droite = page suivante, à gauche = précédente
            if (clickX > width / 2) {
                nextPage();
            } else {
                prevPage();
            }
        });
    });
    
    // Mode plein écran (double clic)
    menuBtn.addEventListener('dblclick', function() {
        const reader = document.querySelector('.reader-container');
        reader.classList.toggle('fullscreen');
    });
    
    // Initialisation
    showPage(1);
});
