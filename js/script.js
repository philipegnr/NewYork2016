// Modal de Participantes
const modal = document.getElementById('participantModal');
const closeBtn = document.getElementsByClassName('close')[0];
const participantBadges = document.querySelectorAll('.participant-badge');

// Abrir modal ao clicar no participante
participantBadges.forEach(badge => {
    badge.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const phone = this.getAttribute('data-phone');
        
        document.getElementById('modalName').textContent = name;
        document.getElementById('modalPhone').textContent = phone;
        document.getElementById('modalPhone').href = `tel:${phone}`;
        
        // Link do WhatsApp (remove caracteres especiais e espaços)
        const whatsappNumber = phone.replace(/\D/g, '');
        const whatsappLink = `https://wa.me/${whatsappNumber}`;
        document.getElementById('modalWhatsapp').href = whatsappLink;
        
        modal.style.display = 'block';
    });
});

// Fechar modal
closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Filtro de Dias
const filterButtons = document.querySelectorAll('.filter-btn');
const dayCards = document.querySelectorAll('.day-card');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Adiciona active no botão clicado
        this.classList.add('active');
        
        const filterDay = this.getAttribute('data-day');
        
        if (filterDay === 'all') {
            // Mostra todos os dias
            dayCards.forEach(card => {
                card.classList.remove('hidden');
                card.style.display = 'block';
            });
        } else {
            // Mostra apenas o dia selecionado
            dayCards.forEach(card => {
                if (card.id === filterDay) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                    // Scroll suave até o card
                    setTimeout(() => {
                        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });
        }
    });
});

// Animação ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar todos os cards
dayCards.forEach(card => {
    observer.observe(card);
});

// Adicionar animação suave ao clicar nos links de localização
document.querySelectorAll('a[href^="https://www.google.com/maps"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Adiciona uma pequena animação de clique
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

// Destacar botão do dia atual ao rolar
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY + 300;
    
    dayCards.forEach((card, index) => {
        const cardTop = card.offsetTop;
        const cardBottom = cardTop + card.offsetHeight;
        
        if (scrollPosition >= cardTop && scrollPosition < cardBottom) {
            // Verifica se não está no modo de filtro específico
            const activeFilter = document.querySelector('.filter-btn.active');
            if (activeFilter && activeFilter.getAttribute('data-day') === 'all') {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                const dayButton = document.querySelector(`[data-day="${card.id}"]`);
                if (dayButton) {
                    dayButton.classList.add('active');
                }
            }
        }
    });
});

// Efeito de parallax suave no header
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header-fixed');
    
    if (scrolled > 50) {
        header.style.padding = '15px 0';
    } else {
        header.style.padding = '20px 0';
    }
});

// Adicionar efeito hover nos ícones de período
document.querySelectorAll('.period-header').forEach(header => {
    header.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
    });
    
    header.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// Adicionar transição suave
document.querySelectorAll('.period-header').forEach(header => {
    header.style.transition = 'transform 0.3s ease';
});

// Função para copiar número de telefone ao clicar
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar tooltip aos participantes
    participantBadges.forEach(badge => {
        badge.setAttribute('title', 'Clique para ver informações de contato');
    });
    
    console.log('🗽 Roteiro Nova York carregado com sucesso!');
    console.log('📅 23 a 31 de março de 2026');
    console.log('👥 Participantes: Philipe, Sharla, Raphael, Sarah, Robinho');
});