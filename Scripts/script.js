const cards = document.querySelectorAll('.cardsfx');

cards.forEach(card => {

    let currentX = 0;
    let currentY = 0;

    let targetX = 0;
    let targetY = 0;

    let isHovering = false;

    function animate() {

        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;

        card.style.transform = `
            perspective(1000px)
            rotateX(${currentY}deg)
            rotateY(${currentX}deg)
        `;

        if (isHovering) {
            const shadowX = currentX * 2;
            const shadowY = currentY * 2;

            card.style.boxShadow = `
                ${shadowX}px ${-shadowY}px 35px
                rgba(0, 0, 0, 0.35)
            `;
        }

        requestAnimationFrame(animate);
    }

    animate();

    card.addEventListener('mouseenter', () => {
        isHovering = true;
    });

    card.addEventListener('mousemove', (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        targetX = ((x - centerX) / centerX) * 8;
        targetY = -((y - centerY) / centerY) * 8;
    });

    card.addEventListener('mouseleave', () => {

        isHovering = false;

        targetX = 0;
        targetY = 0;

        card.style.boxShadow = 'none';
    });

});