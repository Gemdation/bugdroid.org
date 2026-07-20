document.querySelectorAll('div.box details summary').forEach(summary => {
    summary.addEventListener('click', (e) => {
        e.preventDefault();
        
        const details = summary.parentElement;
        const box = summary.closest('.box');
        
        if (box.classList.contains('active-info')) {
            box.classList.remove('active-info');
            details.removeAttribute('open');
            
            const overlay = box.querySelector('.info-overlay');
            if (overlay) overlay.remove();
        } else {
            box.classList.add('active-info');
            details.setAttribute('open', '');
            
            const overlay = document.createElement('div');
            overlay.className = 'info-overlay';
            
            Array.from(details.children).forEach(child => {
                if (child.tagName !== 'SUMMARY') {
                    overlay.appendChild(child.cloneNode(true));
                }
            });
            
            box.appendChild(overlay);
        }
    });
});