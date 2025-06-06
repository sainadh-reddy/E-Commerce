const slider = document.getElementById('productSlider');
        const visibleCount = 5;
        let cards = Array.from(slider.children);

        // Duplicate for seamless left-to-right loop
        cards = [...cards, ...cards, ...cards];
        cards.forEach(card => slider.appendChild(card.cloneNode(true)));

        let allCards = Array.from(slider.children);
        let currentIndex = Math.floor(allCards.length / 2);

        function updateSliderPosition() {
            const cardWidth = allCards[0].offsetWidth + 20; // card + margin
            const offset = currentIndex - Math.floor(visibleCount / 2);
            slider.style.transform = `translateX(${-offset * cardWidth}px)`;
        }

        function updateCardClasses() {
            allCards.forEach((card, i) => {
                card.classList.remove('active', 'medium');
                if (i === currentIndex) {
                    card.classList.add('active');
                } else if (i === currentIndex - 1 || i === currentIndex + 1) {
                    card.classList.add('medium');
                }
            });
        }

        function slideLeftToRight() {
            currentIndex--;
            if (currentIndex <= Math.floor(visibleCount / 2)) {
                currentIndex = Math.floor(allCards.length / 2);
                slider.style.transition = 'none';
                updateSliderPosition();
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        slider.style.transition = 'transform 0.6s ease';
                        currentIndex--;
                        updateSliderPosition();
                        updateCardClasses();
                    });
                });
            } else {
                updateSliderPosition();
                updateCardClasses();
            }
        }

        // Initialize
        updateSliderPosition();
        updateCardClasses();

        setInterval(slideLeftToRight, 2000);
