// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all functionality
function initializeApp() {
    setupMobileNavigation();
    setupScrollAnimations();
    setupNewsletterForm();
    setupSmoothScrolling();
    setupModalFunctionality();
}

// Mobile Navigation
function setupMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}



// Smooth Scrolling
function setupSmoothScrolling() {
    // Add smooth scrolling to all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScroll(targetId);
        });
    });
}

function smoothScroll(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements that should animate on scroll
    const animateElements = document.querySelectorAll('.about-content, .collection-grid, .features-grid, .contact-content, .footer-content');
    
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Animate individual items with delay
    const collectionItems = document.querySelectorAll('.collection-item');
    collectionItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in');
        observer.observe(item);
    });

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
        observer.observe(card);
    });
}

// Newsletter Form
function setupNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('email');
    const formMessage = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubmit(emailInput, formMessage);
        });
    }
}

function handleNewsletterSubmit(emailInput, formMessage) {
    const email = emailInput.value.trim();
    
    if (!isValidEmail(email)) {
        showFormMessage(formMessage, 'Please enter a valid email address.', 'error');
        return;
    }

    // Simulate form submission
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.querySelector('span').textContent;
    
    submitBtn.querySelector('span').textContent = 'Subscribing...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        showFormMessage(formMessage, 'Thank you for subscribing! Welcome to the Labubu community.', 'success');
        emailInput.value = '';
        submitBtn.querySelector('span').textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(messageElement, message, type) {
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;
    messageElement.style.opacity = '1';
    
    // Clear message after 5 seconds
    setTimeout(() => {
        messageElement.style.opacity = '0';
        setTimeout(() => {
            messageElement.textContent = '';
            messageElement.className = 'form-message';
        }, 300);
    }, 5000);
}

// Modal Functionality
function setupModalFunctionality() {
    const modal = document.getElementById('modal');
    
    if (modal) {
        // Close modal when clicking outside or on close button
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }
}

function openModal(collectionId) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    const collectionData = getCollectionData(collectionId);
    
    modalBody.innerHTML = `
        <div class="modal-header">
            <div class="modal-collection-header">
                <h2>${collectionData.title}</h2>
                <p class="collection-subtitle">${collectionData.subtitle}</p>
            </div>
        </div>
        <div class="modal-body">
            <div class="modal-collection">
                <div class="modal-image">
                    <img src="${collectionData.image}" alt="${collectionData.title}" class="modal-collection-image">
                </div>
                <div class="collection-details">
                    <h3>Collection Details</h3>
                    <p>${collectionData.description}</p>
                    
                    <div class="collection-features">
                        <h4>Key Features:</h4>
                        <ul>
                            ${collectionData.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="collection-price">
                        <span class="price-range">${collectionData.priceRange}</span>
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn-primary" onclick="simulateShop('${collectionId}')">
                            <i class="fas fa-shopping-cart"></i>
                            Shop Collection
                        </button>
                        <button class="btn-secondary" onclick="simulateWishlist('${collectionId}')">
                            <i class="fas fa-heart"></i>
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}

function getCollectionData(collectionId) {
    const collections = {
        'urban-dreams': {
            title: 'MEGA LABUBU TEC 1000%',
            subtitle: 'Pop Mart MEGA Collection',
            icon: 'fas fa-robot',
            image: 'assets/images/mega-labubu.jpg',
            description: 'Part of Pop Mart\'s high-end MEGA Collection, a premium series designed for serious art-toy collectors. Released on March 15, 2024, with only 10 units produced worldwide.',
            features: [
                'Size: Approximately 793 mm tall (~31.2 inches)',
                'Material: Crafted from durable PVC (with some regions mentioning PVC/ABS)',
                'Collectible Factor: Ships as a vinyl figure—no plush elements',
                'Age Suitability: Not intended for children under 15 due to size and collectible nature',
                'Exclusions: Part of the MEGA line, excluded from promos, discounts, and events'
            ],
            priceRange: '$959.90'
        },
        'minimalist-chic': {
            title: 'LABUBU × PRONOUNCE',
            subtitle: 'BE FANCY NOW',
            icon: 'fas fa-palette',
            image: 'assets/images/labubu x pronounce.jpg',
            description: 'Hybrid vinyl + plush collectible from a collaboration between Pop Mart\'s Labubu line and fashion brand Pronounce. Released on March 15, 2024, featuring vibrant fashion-forward details.',
            features: [
                'Dimensions: 8.66" (W) × 5.91" (D) × 15.75" (H) (approx. 22 × 15 × 40 cm)',
                'Material: 25% Polyester, 18% Cotton, 18% PVC, 15% ABS, 12% Acrylic, 7% Wool, 5% Viscose Fiber',
                'Design: Features fanciful textures and bold colorways fitting the "Be Fancy Now" theme',
                'Collectibility: Mid-size figure with plush huggability and vinyl durability',
                'Type: Hybrid vinyl + plush collectible from fashion collaboration'
            ],
            priceRange: '$99.99'
        },
        'avant-garde': {
            title: 'LABUBU Originals accessories',
            subtitle: 'Brown Silicone Earphone Bag',
            icon: 'fas fa-headphones',
            image: 'assets/images/labubu-earphone.jpg',
            description: 'Practical and stylish accessory from the LABUBU Originals line. Released on October 13, 2023, this compact bag combines functionality with Labubu charm.',
            features: [
                'Material: Soft-touch silicone with metal alloy clasp—durable and shock-absorbing',
                'Size: Approximately 3.54–3.9 inches tall—compact for earbuds, coins, or small items',
                'Closure & Portability: Zipper closure with clasp that clips onto bags, belts, or keychains',
                'Use Cases: Protective pouch for earbuds, coins, lip balm, keys—stylish and practical',
                'Age Recommendation: Not suitable for children under 15 years old'
            ],
            priceRange: '$17.99'
        },
        'eco-luxe': {
            title: 'LABUBU "Time to Chill"',
            subtitle: 'Vinyl Plush Doll',
            icon: 'fas fa-couch',
            image: 'assets/images/labubu-time.jpg',
            description: 'Part of the core Labubu line under "The Monsters" series. Originally released October 31, 2022, with regional re-releases through July 2024.',
            features: [
                'Design: Vinyl face with plush body in relaxed denim dungarees and pastel-blue top',
                'Iconic Features: Mischievous eyes, toothy grin, and signature rabbit-like ears',
                'Size: Around 14.5 inches (~38 cm) tall',
                'Materials: Combination of vinyl, polyester, cotton, and PP (polypropylene)',
                'Age Recommendation: 15+ due to collectible nature'
            ],
            priceRange: '$82.99'
        }
    };
    
    return collections[collectionId] || collections['urban-dreams'];
}

function simulateShop(collectionId) {
    const collection = getCollectionData(collectionId);
    alert(`Redirecting to shop for ${collection.title}... (This is a demo)`);
    closeModal();
}

function simulateWishlist(collectionId) {
    const collection = getCollectionData(collectionId);
    alert(`${collection.title} added to your wishlist! (This is a demo)`);
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(254, 254, 254, 0.98)';
    } else {
        navbar.style.background = 'rgba(254, 254, 254, 0.95)';
    }
});

// Add some additional CSS for modal styling
const additionalStyles = `
    .modal-collection {
        color: var(--text-primary);
    }
    
    .modal-collection-header h2 {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
        color: var(--accent-color);
        font-family: 'Playfair Display', serif;
        background: linear-gradient(135deg, var(--accent-color), var(--accent-pink));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .collection-subtitle {
        color: var(--text-secondary);
        margin-bottom: 0;
        font-style: italic;
        font-size: 1.1rem;
    }
    
    .modal-image {
        margin-bottom: 2rem;
    }
    
    .modal-collection-image {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 18px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
    }
    
    .modal-collection-image:hover {
        transform: scale(1.02);
    }
    
    .modal-image .image-placeholder {
        height: 220px;
        background: linear-gradient(135deg, var(--accent-bg), rgba(212, 165, 116, 0.1));
        border-radius: 18px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--text-accent);
        border: 2px dashed rgba(212, 165, 116, 0.3);
        position: relative;
        overflow: hidden;
    }
    
    .modal-image .image-placeholder::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transform: rotate(45deg);
        animation: shimmer 3s infinite;
    }
    
    @keyframes shimmer {
        0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
        100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
    }
    
    .modal-image .image-placeholder i {
        font-size: 3.5rem;
        margin-bottom: 1rem;
        color: var(--accent-color);
        z-index: 1;
    }
    
    .modal-image .image-placeholder p {
        z-index: 1;
    }
    
    .collection-details h3 {
        color: var(--text-primary);
        margin-bottom: 1rem;
        font-size: 1.4rem;
        position: relative;
        padding-bottom: 0.5rem;
    }
    
    .collection-details h3::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 50px;
        height: 2px;
        background: linear-gradient(90deg, var(--accent-color), var(--accent-pink));
        border-radius: 1px;
    }
    
    .collection-details h4 {
        color: var(--text-primary);
        margin-bottom: 1rem;
        font-size: 1.1rem;
    }
    
    .collection-details p {
        color: var(--text-secondary);
        line-height: 1.7;
        margin-bottom: 1.5rem;
        font-size: 1rem;
    }
    
    .collection-features {
        background: rgba(255, 255, 255, 0.5);
        border-radius: 15px;
        padding: 1.5rem;
        margin: 1.5rem 0;
        border: 1px solid rgba(212, 165, 116, 0.1);
    }
    
    .collection-features ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .collection-features li {
        padding: 0.75rem 0;
        border-bottom: 1px solid rgba(212, 165, 116, 0.1);
        color: var(--text-secondary);
        transition: all 0.3s ease;
        position: relative;
        padding-left: 2rem;
    }
    
    .collection-features li:last-child {
        border-bottom: none;
    }
    
    .collection-features li:hover {
        color: var(--text-primary);
        padding-left: 2.2rem;
    }
    
    .collection-features li::before {
        content: "✨";
        position: absolute;
        left: 0;
        color: var(--accent-color);
        font-weight: bold;
        transition: all 0.3s ease;
    }
    
    .collection-features li:hover::before {
        transform: scale(1.2);
    }
    
    .collection-price {
        text-align: center;
        margin: 2rem 0;
        padding: 1.5rem;
        background: linear-gradient(135deg, rgba(212, 165, 116, 0.1), rgba(230, 184, 162, 0.1));
        border-radius: 15px;
        border: 1px solid rgba(212, 165, 116, 0.2);
    }
    
    .price-range {
        font-size: 1.8rem;
        font-weight: 700;
        background: linear-gradient(135deg, var(--accent-color), var(--accent-pink));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-family: 'Playfair Display', serif;
    }
    
    .modal-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(212, 165, 116, 0.1);
    }
    
    .btn-primary, .btn-secondary {
        padding: 1rem 2rem;
        border: none;
        border-radius: 30px;
        cursor: pointer;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
        overflow: hidden;
    }
    
    .btn-primary {
        background: linear-gradient(135deg, var(--accent-color), var(--accent-pink));
        color: white;
        box-shadow: 0 4px 15px rgba(212, 165, 116, 0.3);
    }
    
    .btn-primary::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
    }
    
    .btn-primary:hover::before {
        left: 100%;
    }
    
    .btn-primary:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(212, 165, 116, 0.4);
    }
    
    .btn-secondary {
        background: rgba(255, 255, 255, 0.8);
        color: var(--text-primary);
        border: 2px solid rgba(212, 165, 116, 0.3);
        backdrop-filter: blur(10px);
    }
    
    .btn-secondary:hover {
        background: rgba(212, 165, 116, 0.1);
        border-color: var(--accent-color);
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(212, 165, 116, 0.2);
    }
    
    .form-message.success {
        color: #10b981;
    }
    
    .form-message.error {
        color: #ef4444;
    }
    
    @media (max-width: 768px) {
        .modal-actions {
            flex-direction: column;
        }
        
        .btn-primary, .btn-secondary {
            justify-content: center;
        }
        
        .modal-collection-header h2 {
            font-size: 2rem;
        }
        
        .modal-image .image-placeholder {
            height: 180px;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Add custom scrollbar styling for modal
const modalScrollStyles = `
    .modal-body::-webkit-scrollbar {
        width: 6px;
    }
    
    .modal-body::-webkit-scrollbar-track {
        background: transparent;
        margin: 8px 0;
    }
    
    .modal-body::-webkit-scrollbar-thumb {
        background: linear-gradient(45deg, var(--accent-color), var(--accent-pink));
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .modal-body::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(45deg, var(--accent-color-dark), var(--accent-color));
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        transform: scaleX(1.2);
    }
    
    .modal-body::-webkit-scrollbar-thumb:active {
        background: var(--accent-color-dark);
    }
    
    /* Enhanced scrollbar for better visibility */
    .modal-body::-webkit-scrollbar-corner {
        background: transparent;
    }
    
    /* For Firefox */
    .modal-body {
        scrollbar-width: thin;
        scrollbar-color: var(--accent-color) transparent;
        scroll-behavior: smooth;
    }
    
    /* Add scroll fade effects */
    .modal-body {
        background: 
            linear-gradient(rgba(248, 246, 243, 1) 30%, transparent),
            linear-gradient(transparent, rgba(248, 246, 243, 1) 70%) 0 100%,
            radial-gradient(farthest-side at 50% 0, rgba(0, 0, 0, 0.1), transparent),
            radial-gradient(farthest-side at 50% 100%, rgba(0, 0, 0, 0.1), transparent) 0 100%;
        background-repeat: no-repeat;
        background-size: 100% 20px, 100% 20px, 100% 10px, 100% 10px;
        background-attachment: local, local, scroll, scroll;
    }
`;

const scrollStyleSheet = document.createElement('style');
scrollStyleSheet.textContent = modalScrollStyles;
document.head.appendChild(scrollStyleSheet); 