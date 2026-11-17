document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Side Drawer (Hamburger) Logic ---
    const menuBtn = document.getElementById('menu-btn');
    const drawer = document.getElementById('side-drawer');
    const backdrop = document.querySelector('.drawer-backdrop');
    const logoutBtn = document.getElementById('logout-btn');

    function toggleDrawer() {
        if (drawer.classList.contains('hidden')) {
            drawer.classList.remove('hidden');
        }
        drawer.classList.toggle('active');
    }

    if(menuBtn) menuBtn.addEventListener('click', toggleDrawer);
    if(backdrop) backdrop.addEventListener('click', toggleDrawer);

    if (logoutBtn) logoutBtn.addEventListener('click', () => {
        if(confirm("Are you sure you want to log out?")) {
            window.location.href = "login.html";
        }
    });

    // --- 2. FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            faqItems.forEach(other => {
                if(other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // --- 3. Carousel Logic (With Dots) ---
    const track = document.getElementById('carousel-track');
    const dotsContainer = document.getElementById('carousel-dots');
    const slides = document.querySelectorAll('.slide');
    
    if (track && slides.length > 0) {
        
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        let currentIndex = 0;
        const totalSlides = slides.length;
        const gap = 15;

        // The dot used to twitch during every smooth scroll because this index
        // ignored the 15px gap that the auto-advance below adds, so the two
        // disagreed and the active class flipped back and forth mid-animation.
        // Include the gap, and only touch the DOM when the slide really changes.
        function activeIndex() {
            const slideWidth = slides[0].getBoundingClientRect().width;
            return Math.round(track.scrollLeft / (slideWidth + gap));
        }

        function paintDots(index) {
            dots.forEach((d, i) => d.classList.toggle('active', i === index));
        }

        track.addEventListener('scroll', () => {
            const index = activeIndex();
            if (index === currentIndex || index < 0 || index >= totalSlides) return;
            currentIndex = index;
            paintDots(currentIndex);
        }, { passive: true });

        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            const slideWidth = slides[0].getBoundingClientRect().width;

            paintDots(currentIndex);
            track.scrollTo({
                left: (slideWidth + gap) * currentIndex,
                behavior: 'smooth'
            });
        }, 4000);
    }

    // --- 4. Dock Active State ---
    const dockItems = document.querySelectorAll('.dock-item');
    dockItems.forEach(item => {
        item.addEventListener('click', (e) => {
            dockItems.forEach(d => d.classList.remove('active'));
            if(!item.classList.contains('onoe-big')) {
                item.classList.add('active');
            }
        });
    });
});