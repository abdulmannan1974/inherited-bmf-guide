/**
 * Blood🩸Doctor - Inherited BMF Syndromes Learning Guide
 * Interactive JavaScript for enhanced learning experience
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initBackToTop();
    initScrollAnimations();
    initProgressBars();
    initTableHighlights();
    initSmoothScroll();
    initActiveNavHighlight();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger to X
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.querySelectorAll('span').forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.querySelectorAll('span').forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    }
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');

    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Scroll Animations using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Animate percentage bars when visible
                if (entry.target.classList.contains('percentage-bar')) {
                    animateProgressBars(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll(
        '.callout, .content-card, .nav-card, .info-box, .treatment-box, ' +
        '.algorithm-box, .data-table, .pathway-diagram, .summary-card, ' +
        '.triad-card, .cda-card, .syndrome-card, .percentage-bar, .high-yield'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animate-in styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Animate Progress Bars
 */
function initProgressBars() {
    // Initial state - set bars to 0 width
    document.querySelectorAll('.bar-fill').forEach(bar => {
        const width = bar.style.width;
        bar.dataset.width = width;
        bar.style.width = '0';
    });
}

function animateProgressBars(container) {
    const bars = container.querySelectorAll('.bar-fill');
    bars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.width = bar.dataset.width;
        }, index * 100);
    });
}

/**
 * Table Row Highlights on Hover
 */
function initTableHighlights() {
    const tables = document.querySelectorAll('.data-table');

    tables.forEach(table => {
        const rows = table.querySelectorAll('tbody tr');

        rows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.transition = 'background-color 0.2s ease';
            });
        });
    });

    // Add click to expand for gene tags
    const geneTags = document.querySelectorAll('.gene-tag');
    geneTags.forEach(tag => {
        tag.style.cursor = 'pointer';
        tag.addEventListener('click', function() {
            const geneName = this.textContent;
            showGeneInfo(geneName);
        });
    });
}

/**
 * Show Gene Information Tooltip
 */
function showGeneInfo(geneName) {
    // Gene information database
    const geneInfo = {
        'FANCA': 'Most common FA gene (65%). Part of FA core complex. Chromosome 16q24.3.',
        'FANCC': 'Second most common FA gene (12%). Part of FA core complex. Chromosome 9q22.3.',
        'FANCG': 'Third most common FA gene (12%). Part of FA core complex. Chromosome 9p13.3.',
        'BRCA2': 'FANCD1 - Associated with high childhood cancer risk (Wilms, medulloblastoma). Also breast/ovarian cancer.',
        'BRCA1': 'FANCS - Breast and ovarian cancer susceptibility gene. Part of DNA repair pathway.',
        'DKC1': 'X-linked DC gene encoding dyskerin. 25% of DC cases. Essential for telomerase stability.',
        'TERC': 'Telomerase RNA component. AD-DC gene. Also risk factor for idiopathic AA.',
        'TERT': 'Telomerase reverse transcriptase. AD-DC and AR-DC gene. Also risk factor for AA and MDS.',
        'SBDS': 'Shwachman-Diamond syndrome gene (>90% of cases). Role in 60S ribosome maturation.',
        'RPS19': 'Most common DBA gene (25%). Small ribosomal subunit protein.',
        'ELANE': 'Most common SCN gene (50-60%). Encodes neutrophil elastase.',
        'MPL': 'Thrombopoietin receptor gene. Mutated in CAMT.',
        'GATA2': 'Transcription factor. Deficiency causes MonoMAC syndrome, MDS risk.',
        'RUNX1': 'Familial platelet disorder with propensity to AML.',
        'DDX41': 'Late-onset familial MDS/AML gene.',
    };

    const info = geneInfo[geneName];
    if (info) {
        // Remove existing tooltip
        const existing = document.querySelector('.gene-tooltip');
        if (existing) existing.remove();

        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'gene-tooltip';
        tooltip.innerHTML = `
            <strong>${geneName}</strong>
            <p>${info}</p>
            <button class="tooltip-close">&times;</button>
        `;
        document.body.appendChild(tooltip);

        // Position tooltip
        tooltip.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
            z-index: 10000;
            max-width: 400px;
            animation: fadeIn 0.3s ease;
        `;

        // Close button
        tooltip.querySelector('.tooltip-close').addEventListener('click', () => {
            tooltip.remove();
        });

        // Close on outside click
        setTimeout(() => {
            document.addEventListener('click', function closeTooltip(e) {
                if (!tooltip.contains(e.target)) {
                    tooltip.remove();
                    document.removeEventListener('click', closeTooltip);
                }
            });
        }, 100);
    }
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Active Navigation Highlight
 */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function highlightNav() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Add active styles
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu a.active {
            background: #fee2e2;
            color: #b91c1c;
        }
    `;
    document.head.appendChild(style);

    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Initial call
}

/**
 * Keyboard Navigation Support
 */
document.addEventListener('keydown', function(e) {
    // Escape key closes any open tooltips
    if (e.key === 'Escape') {
        const tooltip = document.querySelector('.gene-tooltip');
        if (tooltip) tooltip.remove();
    }

    // Home key goes to top
    if (e.key === 'Home' && !e.ctrlKey && !e.metaKey) {
        const activeElement = document.activeElement;
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // End key goes to bottom
    if (e.key === 'End' && !e.ctrlKey && !e.metaKey) {
        const activeElement = document.activeElement;
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    }
});

/**
 * Print Functionality
 */
function printPage() {
    window.print();
}

/**
 * Reading Progress Indicator (optional feature)
 */
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
    document.body.prepend(progressBar);

    const style = document.createElement('style');
    style.textContent = `
        .reading-progress {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            height: 3px;
            background: #e5e7eb;
            z-index: 999;
        }
        .reading-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #b91c1c 0%, #dc2626 100%);
            width: 0%;
            transition: width 0.1s ease;
        }
        @media (max-width: 768px) {
            .reading-progress {
                top: 60px;
            }
        }
    `;
    document.head.appendChild(style);

    const bar = progressBar.querySelector('.reading-progress-bar');

    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        bar.style.width = Math.min(progress, 100) + '%';
    });
}

// Initialize reading progress
initReadingProgress();

/**
 * Dark Mode Toggle (optional - can be enabled)
 */
function initDarkMode() {
    // Check for saved preference
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
}

/**
 * Copy to Clipboard for Tables
 */
function initCopyTables() {
    const tables = document.querySelectorAll('.data-table');

    tables.forEach(table => {
        const wrapper = table.closest('.table-responsive');
        if (wrapper) {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-table-btn';
            copyBtn.innerHTML = '📋 Copy';
            copyBtn.title = 'Copy table to clipboard';
            copyBtn.style.cssText = `
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                padding: 0.25rem 0.5rem;
                font-size: 0.75rem;
                background: #f3f4f6;
                border: 1px solid #d1d5db;
                border-radius: 0.25rem;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.2s ease;
            `;

            wrapper.style.position = 'relative';
            wrapper.appendChild(copyBtn);

            wrapper.addEventListener('mouseenter', () => {
                copyBtn.style.opacity = '1';
            });

            wrapper.addEventListener('mouseleave', () => {
                copyBtn.style.opacity = '0';
            });

            copyBtn.addEventListener('click', () => {
                const text = tableToText(table);
                navigator.clipboard.writeText(text).then(() => {
                    copyBtn.innerHTML = '✓ Copied!';
                    setTimeout(() => {
                        copyBtn.innerHTML = '📋 Copy';
                    }, 2000);
                });
            });
        }
    });
}

function tableToText(table) {
    let text = '';
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('th, td');
        const rowText = Array.from(cells).map(cell => cell.textContent.trim()).join('\t');
        text += rowText + '\n';
    });
    return text;
}

// Initialize copy tables
initCopyTables();

console.log('Blood🩸Doctor - Inherited BMF Guide loaded successfully');
