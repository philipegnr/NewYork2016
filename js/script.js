// Modal de Contato dos Participantes
const modal = document.getElementById('contactModal');
const participants = document.querySelectorAll('.participant');
const closeBtn = document.querySelector('.close');

participants.forEach(participant => {
    participant.addEventListener('click', () => {
        const name = participant.dataset.name;
        const phone = participant.dataset.phone;
        
        document.getElementById('modalName').textContent = name;
        document.getElementById('modalPhone').textContent = phone;
        document.getElementById('modalPhone').href = `tel:${phone}`;
        
        // WhatsApp link (remove caracteres especiais do número)
        const whatsappNumber = phone.replace(/[^\d]/g, '');
        document.getElementById('modalWhatsapp').href = `https://wa.me/${whatsappNumber}`;
        
        modal.style.display = 'block';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Navegação entre dias
const dayTabs = document.querySelectorAll('.day-tab');
const daySections = document.querySelectorAll('.day-section');

dayTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetDay = tab.dataset.day;
        const targetSection = document.getElementById(targetDay);
        
        // Remove active de todas as tabs
        dayTabs.forEach(t => t.classList.remove('active'));
        
        // Adiciona active na tab clicada
        tab.classList.add('active');
        
        // Scroll suave até a seção
        const navHeight = document.querySelector('.days-navigation').offsetHeight;
        const headerHeight = document.querySelector('.header-fixed').offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Destaque temporário na seção
        targetSection.classList.add('highlight');
        setTimeout(() => {
            targetSection.classList.remove('highlight');
        }, 500);
    });
});

// Atualiza tab ativa ao rolar a página
let isScrolling = false;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            updateActiveTab();
            isScrolling = false;
        });
        isScrolling = true;
    }
});

function updateActiveTab() {
    const navHeight = document.querySelector('.days-navigation').offsetHeight;
    const headerHeight = document.querySelector('.header-fixed').offsetHeight;
    const scrollPosition = window.scrollY + navHeight + headerHeight + 100;
    
    let currentSection = '';
    
    daySections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    if (currentSection) {
        dayTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.day === currentSection) {
                tab.classList.add('active');
            }
        });
    }
}

// Sticky navigation effect
const nav = document.querySelector('.days-navigation');
const generalInfo = document.querySelector('.general-info');

window.addEventListener('scroll', () => {
    const generalInfoBottom = generalInfo.offsetTop + generalInfo.offsetHeight;
    
    if (window.scrollY >= generalInfoBottom - 120) {
        nav.style.opacity = '1';
    } else {
        nav.style.opacity = '0.95';
    }
});

// Animação de entrada dos cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

daySections.forEach(section => {
    observer.observe(section);
});

// Prevenção de clique no modal content
document.querySelector('.modal-content').addEventListener('click', (e) => {
    e.stopPropagation();
});

// Atalhos de teclado
document.addEventListener('keydown', (e) => {
    // Fechar modal com ESC
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
    
    // Navegar entre dias com setas
    const activeTab = document.querySelector('.day-tab.active');
    if (activeTab) {
        let nextTab = null;
        
        if (e.key === 'ArrowRight') {
            nextTab = activeTab.nextElementSibling;
        } else if (e.key === 'ArrowLeft') {
            nextTab = activeTab.previousElementSibling;
        }
        
        if (nextTab && nextTab.classList.contains('day-tab')) {
            nextTab.click();
            
            // Scroll horizontal na navegação se necessário
            const tabsContainer = document.querySelector('.days-tabs');
            const tabLeft = nextTab.offsetLeft;
            const tabWidth = nextTab.offsetWidth;
            const containerScroll = tabsContainer.scrollLeft;
            const containerWidth = tabsContainer.offsetWidth;
            
            if (tabLeft < containerScroll) {
                tabsContainer.scrollLeft = tabLeft;
            } else if (tabLeft + tabWidth > containerScroll + containerWidth) {
                tabsContainer.scrollLeft = tabLeft + tabWidth - containerWidth;
            }
        }
    }
});

// Efeito parallax suave no header
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const header = document.querySelector('.header-fixed');
    
    if (scrolled > 0) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Definir primeira tab como ativa
    if (dayTabs.length > 0) {
        dayTabs[0].classList.add('active');
    }
    
    // Log de boas-vindas
    console.log('🗽 Bem-vindo ao Roteiro de Nova York 2026!');
    console.log('✈️ Desenvolvido com carinho para uma viagem inesquecível');
    
    // Adicionar classe de carregamento completo
    document.body.classList.add('loaded');
});

// Função para copiar número de telefone (adicional)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('phone-link')) {
        e.preventDefault();
        const phone = e.target.textContent;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(phone).then(() => {
                // Feedback visual
                const originalText = e.target.textContent;
                e.target.textContent = '✓ Copiado!';
                e.target.style.color = '#7ED321';
                
                setTimeout(() => {
                    e.target.textContent = originalText;
                    e.target.style.color = '';
                }, 2000);
            });
        }
    }
});

// Suavizar scroll em links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = document.querySelector('.days-navigation').offsetHeight;
            const headerHeight = document.querySelector('.header-fixed').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Adicionar indicador de carregamento para links externos
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
        // Adicionar pequeno delay visual
        this.style.opacity = '0.6';
        setTimeout(() => {
            this.style.opacity = '1';
        }, 300);
    });
});

// Detectar dispositivo móvel e ajustar comportamento
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
    // Melhorar experiência touch
    document.querySelectorAll('.participant, .day-tab, .inline-link').forEach(element => {
        element.style.touchAction = 'manipulation';
    });
}

// Easter egg: Animação especial ao clicar 5x no ícone da estátua
let clickCount = 0;
const statueIcon = document.querySelector('.statue-icon');

statueIcon.addEventListener('click', () => {
    clickCount++;
    
    if (clickCount === 5) {
        statueIcon.style.animation = 'none';
        setTimeout(() => {
            statueIcon.style.animation = 'spin 1s ease-in-out';
        }, 10);
        
        setTimeout(() => {
            statueIcon.style.animation = 'float 3s ease-in-out infinite';
            clickCount = 0;
        }, 1000);
    }
    
    // Reset contador após 2 segundos
    setTimeout(() => {
        clickCount = 0;
    }, 2000);
});

// Adicionar animação de spin
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);