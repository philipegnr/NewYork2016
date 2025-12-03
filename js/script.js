// Navegação entre dias
const dayButtons = document.querySelectorAll('.day-btn');
const daySections = document.querySelectorAll('.day-section');

dayButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetDay = button.getAttribute('data-day');
        const targetSection = document.getElementById(targetDay);
        
        // Remove active class de todos os botões
        dayButtons.forEach(btn => btn.classList.remove('active'));
        
        // Adiciona active class no botão clicado
        button.classList.add('active');
        
        // Scroll suave até a seção
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    });
});

// Atualiza botão ativo ao rolar a página
const observerOptions = {
    root: null,
    rootMargin: '-250px 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            dayButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-day') === sectionId) {
                    btn.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

daySections.forEach(section => {
    observer.observe(section);
});

// Modal de Participantes
const modal = document.getElementById('participantModal');
const participantButtons = document.querySelectorAll('.participant-btn');
const closeBtn = document.querySelector('.close');
const modalName = document.getElementById('modalName');
const modalPhone = document.getElementById('modalPhone');
const modalWhatsapp = document.getElementById('modalWhatsapp');

participantButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const phone = button.getAttribute('data-phone');
        
        modalName.textContent = name;
        modalPhone.textContent = phone;
        
        // Formata o número para WhatsApp (remove caracteres especiais)
        const whatsappNumber = phone.replace(/\D/g, '');
        modalWhatsapp.href = `https://wa.me/${whatsappNumber}`;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Fecha modal com ESC
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Adiciona efeito de fade-in nas seções ao carregar
window.addEventListener('load', () => {
    daySections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 100);
        }, index * 50);
    });
});
