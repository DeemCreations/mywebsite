// ============================================
// DEEM CREATIONS — Interactions & Animations
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // ---- NAVBAR SCROLL ----
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    const handleNavScroll = () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // ---- MOBILE MENU ----
    const menuBtn = document.getElementById('menuBtn');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const openMenu = () => {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeMobileMenu = () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    };

    menuBtn.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeMobileMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // ---- SCROLL REVEAL ----
    const revealItems = document.querySelectorAll('.reveal-item, .reveal-section');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealItems.forEach(item => revealObserver.observe(item));

    // ---- FAQ ACCORDION ----
    const faqBtns = document.querySelectorAll('.faq-btn');
    
    faqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isActive = item.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
            });
            
            // Open clicked if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ---- PORTFOLIO FILTER ----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioGrid = document.getElementById('portfolioGrid');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.className = b.className.replace(/bg-primary text-white/g, 'bg-neutral text-dark/60');
            });
            btn.classList.add('active');
            btn.classList.remove('bg-neutral', 'text-dark/60');
            btn.classList.add('bg-primary', 'text-white');

            // Filter items
            portfolioItems.forEach(item => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden-item');
                    item.style.display = '';
                } else {
                    item.classList.add('hidden-item');
                    setTimeout(() => {
                        if (item.classList.contains('hidden-item')) {
                            item.style.display = 'none';
                        }
                    }, 400);
                }
            });
        });
    });

    // ---- CONTACT FORM ----
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            formMessage.classList.remove('hidden', 'error');
            formMessage.classList.add('success');
            formMessage.textContent = `Thank you, ${name}! We'll be in touch within 24 hours.`;
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            contactForm.reset();

            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        }, 1500);
    });

    // ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---- ACTIVE NAV SECTION TRACKING ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active-section');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active-section');
                    }
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

    sections.forEach(section => sectionObserver.observe(section));
});

// ---- CASE STUDY DATA ----
const caseStudies = {
    'friends-coffee': {
        title: 'Friends Coffee Shop',
        subtitle: 'Brand Identity & Packaging',
        year: '2026',
        industry: 'Restaurant & Coffee',
        image: 'brand.png',
        overview: 'Friends Coffee Shop is a modern coffee brand created to deliver a warm, premium, and community-focused café experience. The objective was to develop a memorable visual identity that reflects quality coffee, meaningful connections, and a welcoming atmosphere. The branding system includes a custom logo inspired by coffee beans and natural elements, a refined color palette, typography guidelines, packaging design, social media assets, brand applications, and digital touchpoints. Every visual element was designed to create consistency across online and offline customer experiences.The final identity positions Friends Coffee Shop as a contemporary and trustworthy brand that stands out in a competitive coffee market while maintaining a friendly and approachable personality.',
        challenge: 'The local coffee market is saturated with both chains and independent shops. Friends needed a brand that could capture attention while conveying their unique personality: a place where people genuinely connect over great coffee.',
        research: 'We conducted extensive research into the local coffee culture, surveyed target customers, and analyzed competitor positioning. Our findings revealed that customers in this segment value authenticity, community feel, and visual warmth over modern minimalism.',
        strategy: 'We positioned Friends as "Your Third Place"—a warm, inviting space between home and work where people feel they belong. The visual identity draws from this positioning with earthy tones, hand-crafted textures, and friendly typography.',
        identityDesign: 'The logo combines a custom wordmark with a subtle cup-and-steam motif that forms a heart shape—reinforcing the "friends" concept. The color palette centers on warm browns and cream tones with an accent amber that adds energy.',
        applications: [
            { src: 'logo0.png', label: 'Logo Design' },
            { src: 'brand.png', label: 'Branding' },
            { src: 'instagrid.png', label: 'Grid System' },
            { src: 'shop.png', label: 'Interior Signage' }
        ],
        results: [
            { number: '40%', label: 'Increase in walk-ins' },
            { number: '92%', label: 'Brand recall rate' },
            { number: '3x', label: 'Social media growth' }
        ],
        tags: ['Brand Identity', 'Logo Design', 'Packaging', 'Social Media Branding']
    },
    'freshfuel': {
        title: 'FreshFuel',
        subtitle: 'Brand Identity & Strategy',
        year: '2023',
        industry: 'Health & Fitness Startup',
        image: 'brandpage.png',
        overview: 'FreshFuel is a health-focused startup delivering nutritious meal prep to busy professionals. They needed a brand that could communicate energy, health, and convenience without feeling generic or clinical.',
        challenge: 'The meal prep and health food space is crowded with brands that either look too clinical (nutrition facts-heavy) or too casual (no professional credibility). FreshFuel needed to sit in the sweet spot: energetic but trustworthy.',
        research: 'We analyzed 40+ competitors, interviewed potential customers in the target demographic, and studied color psychology around appetite and trust. Our key insight: the target audience responds to bold simplicity—clean design with confident energy.',
        strategy: 'We positioned FreshFuel as the "Premium Fuel" choice—drawing an intentional parallel between fueling a high-performance vehicle and fueling your body. This metaphor drives the entire visual system.',
        identityDesign: 'The wordmark uses bold, geometric letterforms that convey strength and reliability. The accent mark (a speed line through the "F") adds dynamism. The color system pairs a deep navy with an energetic green and clean white.',
        applications: [
            { src: 'brandguide.png', label: 'Brand Guide' },
            { src: 'detail.png', label: 'Brand Collateral' },
            { src: 'appui.png', label: 'App UI Design' },
            { src: 'social.png', label: 'Social Templates' }
        ],
        results: [
            { number: '250%', label: 'Subscriber growth in 6 months' },
            { number: '89%', label: 'Customer retention rate' },
            { number: '4.8/5', label: 'Average brand perception score' }
        ],
        tags: ['Brand Strategy', 'Brand Identity', 'Logo Design', 'Website UI']
    },
    'slice-republic': {
        title: 'Slice Republic',
        subtitle: 'Brand Identity & Guidelines',
        year: '2024',
        industry: 'Slilce Republic',
        image: 'modeboard.png',
        overview: 'Slice Republic is a modern pizza brand created to deliver bold flavors, premium ingredients, and a memorable dining experience. The goal was to develop a distinctive brand identity that would stand out in a competitive food market while appealing to a broad audience of pizza lovers.',
        challenge: 'The pizza industry is crowded with brands using similar visual styles, colors, and messaging. Slice Republic needed a unique identity that could communicate quality, energy, and trust while remaining highly recognizable across packaging, social media, and storefront applications.',
        research: 'Our research focused on successful restaurant and fast-casual food brands. We discovered that customers connect most with brands that combine great food, memorable visuals, and a strong personality. Consistency across every touchpoint was key to building recognition and customer loyalty.',
        strategy: 'We positioned Slice Republic around the concept of "Premium Pizza, Shared Moments." The brand was designed to feel welcoming, energetic, and modern, encouraging customers to associate every meal with quality and connection.',
        identityDesign: 'The visual identity combines modern typography, pizza-inspired elements, and a vibrant color palette to create a bold and memorable brand presence. Every design decision was made to communicate freshness, quality, and a passion for great food.',
        applications: [
            { src: 'brandguide.png', label: 'Delivery System' },
            { src: 'insta.png', label: 'Socials' },
            { src: 'devliverysystem.png', label: 'Brand Guide' },
            { src: 'grid.png', label: 'Instagrid' }
        ],
        results: [
            { number: '65%', label: 'Faster property inquiries' },
            { number: 'Premium', label: 'Price positioning achieved' },
            { number: '100%', label: 'Brand consistency across touchpoints' }
        ],
        tags: ['Brand Identity', 'Brand Guidelines', 'Logo Design', 'Marketing Collateral']
    },
    'idealzero': {
        title: 'IdealZero',
        subtitle: 'Brand Identity & Website UI',
        year: '2024',
        industry: 'Environmental Innovation',
        image: 'logo3.png',
        overview: 'IdealZero is a sustainability-focused brand dedicated to creating a cleaner, greener future. Through innovation, environmental responsibility, and conscious choices, the brand inspires individuals and organizations to reduce waste and move toward a more sustainable tomorrow.',
        challenge: 'In a market filled with generic environmental brands that rely on overused visual elements and messaging, IdealZero needed a distinctive identity that would communicate trust, innovation, and long-term commitment to sustainability while remaining modern and memorable.',
        research: 'Our research focused on sustainability, eco-conscious consumer behavior, and environmental branding trends. We discovered that audiences respond most positively to brands that combine environmental responsibility with practical innovation. People want brands that feel authentic, transparent, and action-oriented rather than purely promotional.',
        strategy: 'We positioned IdealZero around "Precision with Purpose"—the idea that their tools are meticulously crafted but always serve the human workflow. This dual nature of precision and empathy became the creative north star.',
        identityDesign: 'The visual identity combines a clean, approachable wordmark with a distinctive flowing underline that symbolizes progress, movement, and the journey toward a sustainable future. The rich green color palette reflects growth, nature, and environmental responsibility, while neutral gray tones provide balance and professionalism. Typography pairs the expressive Pacifico logo type with Open Sans, creating a balance between personality and clarity.',
        applications: [
            { src: 'branddetail1.png', label: 'Branding' },
            { src: 'appui1.png', label: 'App UI' },
            { src: 'website.png', label: 'Web UI' },
            { src: 'branddetail.png', label: 'Brand Kit' }
        ],
        results: [
            { number: '180%', label: 'Website conversion increase' },
            { number: '94%', label: 'User brand recall' },
            { number: '2 weeks', label: 'From launch to first 1K users' }
        ],
        tags: ['Brand Strategy', 'Brand Identity', 'Website UI', 'Social Media Branding']
    }
};

// ---- CASE STUDY MODAL ----
function openCaseStudy(id) {
    const data = caseStudies[id];
    if (!data) return;

    const content = document.getElementById('caseStudyContent');
    
    content.innerHTML = `
        <div class="mb-12">
            <span class="font-heading text-sm font-semibold text-secondary uppercase tracking-widest">${data.year} — ${data.industry}</span>
            <h1 class="font-heading text-4xl md:text-5xl font-bold text-primary mt-3">${data.title}</h1>
            <p class="text-dark/50 mt-2">${data.subtitle}</p>
            <div class="case-tags mt-4">
                ${data.tags.map(tag => `<span class="case-tag">${tag}</span>`).join('')}
            </div>
        </div>
        
        <img src="${data.image}" alt="${data.title}" class="case-hero-img mb-12">
        
        <div class="case-section">
            <h3>Overview</h3>
            <p>${data.overview}</p>
        </div>

        <div class="case-section">
            <h3>The Challenge</h3>
            <p>${data.challenge}</p>
        </div>

        <div class="case-section">
            <h3>Research & Insights</h3>
            <p>${data.research}</p>
        </div>

        <div class="case-section">
            <h3>Brand Strategy</h3>
            <p>${data.strategy}</p>
        </div>

        <div class="case-section">
            <h3>Identity Design</h3>
            <p>${data.identityDesign}</p>
            <div class="case-grid">
                ${data.applications.slice(0, 2).map(app => `
                    <div>
                        <img src="${app.src}" alt="${app.label}">
                        <p class="text-sm text-dark/50 mt-2">${app.label}</p>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="case-section">
            <h3>Applications</h3>
            <p>Every touchpoint was designed to maintain brand consistency while adapting to its specific medium.</p>
            <div class="case-grid">
                ${data.applications.map(app => `
                    <div>
                        <img src="${app.src}" alt="${app.label}">
                        <p class="text-sm text-dark/50 mt-2">${app.label}</p>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="case-section">
            <h3>Results</h3>
            <p>The strategic approach to brand identity delivered measurable business outcomes.</p>
            <div class="case-results">
                ${data.results.map(r => `
                    <div class="case-result-item">
                        <div class="number">${r.number}</div>
                        <div class="label">${r.label}</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="mt-12 pt-8 border-t border-dark/10 text-center">
            <a href="#contact" onclick="closeCaseStudy()" class="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-heading font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 group">
                Start a Similar Project
                <span class="group-hover:translate-x-1 transition-transform">→</span>
            </a>
        </div>
    `;

    const modal = document.getElementById('caseStudyModal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modal.scrollTop = 0;

    // Re-init icons in modal
    lucide.createIcons();
}

function closeCaseStudy() {
    const modal = document.getElementById('caseStudyModal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCaseStudy();
    }
});
