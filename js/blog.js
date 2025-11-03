// ===================================
// Traction - Blog JavaScript
// ===================================

(function() {
    'use strict';

    // ===== CATEGORY FILTERING =====
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    if (categoryButtons.length > 0 && blogCards.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');

                // Update active button
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter blog cards
                blogCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'flex';
                        // Trigger animation
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.3s';
                            card.style.opacity = '1';
                        }, 100);
                    } else {
                        card.style.display = 'none';
                    }
                });

                // Update URL without reload
                const url = new URL(window.location);
                if (category !== 'all') {
                    url.searchParams.set('category', category);
                } else {
                    url.searchParams.delete('category');
                }
                window.history.pushState({}, '', url);
            });
        });

        // Load category from URL on page load
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        if (categoryParam) {
            const button = document.querySelector(`[data-category="${categoryParam}"]`);
            if (button) {
                button.click();
            }
        }
    }

    // ===== BLOG SEARCH =====
    const searchInput = document.getElementById('blogSearch');
    
    if (searchInput) {
        let searchTimeout;

        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const searchTerm = this.value.toLowerCase().trim();

            searchTimeout = setTimeout(() => {
                if (searchTerm === '') {
                    // Show all cards
                    blogCards.forEach(card => {
                        card.style.display = 'flex';
                    });
                } else {
                    // Filter based on search
                    blogCards.forEach(card => {
                        const title = card.querySelector('.blog-title').textContent.toLowerCase();
                        const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
                        const category = card.querySelector('.blog-category').textContent.toLowerCase();

                        if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
                            card.style.display = 'flex';
                            // Highlight search term (optional enhancement)
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }

                // Show "no results" message if needed
                const visibleCards = Array.from(blogCards).filter(card => card.style.display !== 'none');
                showNoResultsMessage(visibleCards.length === 0);
            }, 300);
        });
    }

    function showNoResultsMessage(show) {
        let noResultsMsg = document.getElementById('noResultsMessage');
        
        if (show && !noResultsMsg) {
            const blogGrid = document.querySelector('.blog-grid');
            noResultsMsg = document.createElement('div');
            noResultsMsg.id = 'noResultsMessage';
            noResultsMsg.style.cssText = `
                grid-column: 1 / -1;
                text-align: center;
                padding: 60px 20px;
                color: var(--text-secondary);
            `;
            noResultsMsg.innerHTML = `
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
                <h3>No articles found</h3>
                <p>Try adjusting your search or filter criteria</p>
            `;
            blogGrid.appendChild(noResultsMsg);
        } else if (!show && noResultsMsg) {
            noResultsMsg.remove();
        }
    }

    // ===== LOAD MORE ARTICLES =====
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let articlesLoaded = 9; // Initial number of articles shown

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real implementation, this would fetch more articles from an API
            // For demo, we'll just show a message
            const btnText = this.querySelector('span');
            const btnIcon = this.querySelector('i');
            
            btnText.textContent = 'Loading...';
            btnIcon.className = 'fas fa-spinner fa-spin';
            this.disabled = true;

            setTimeout(() => {
                // Simulate loading
                articlesLoaded += 6;
                
                if (articlesLoaded >= 18) {
                    btnText.textContent = 'All articles loaded';
                    btnIcon.className = 'fas fa-check';
                    setTimeout(() => {
                        this.style.display = 'none';
                    }, 1000);
                } else {
                    btnText.textContent = 'Load More Articles';
                    btnIcon.className = 'fas fa-chevron-down';
                    this.disabled = false;
                }

                // Show notification
                if (window.showNotification) {
                    showNotification(`Loaded ${articlesLoaded} articles`, 'success');
                }
            }, 1000);
        });
    }

    // ===== NEWSLETTER FORM =====
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button');
            const email = emailInput.value;

            // Show loading state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Subscribing...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Success
                submitBtn.innerHTML = '<span>Subscribed!</span><i class="fas fa-check"></i>';
                emailInput.value = '';

                // Show success notification
                if (window.showNotification) {
                    showNotification('Successfully subscribed! Check your email for confirmation.', 'success');
                }

                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }, 2000);

                // Log subscription (in production, send to server)
                console.log('Newsletter subscription:', email);
            }, 1500);
        });
    }

    // ===== READING PROGRESS BAR =====
    function createReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.id = 'readingProgress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: var(--gradient-primary);
            width: 0%;
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = (window.scrollY / documentHeight) * 100;
            progressBar.style.width = `${Math.min(scrolled, 100)}%`;
        });
    }

    // Only show reading progress on blog post pages
    if (document.querySelector('.blog-post')) {
        createReadingProgress();
    }

    // ===== ESTIMATED READ TIME CALCULATION =====
    function calculateReadTime(text) {
        const wordsPerMinute = 200;
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return minutes;
    }

    // Update read time if post content exists
    const postText = document.querySelector('.post-text');
    if (postText) {
        const readTime = calculateReadTime(postText.textContent);
        const readTimeElements = document.querySelectorAll('.post-read-time');
        readTimeElements.forEach(el => {
            el.innerHTML = `<i class="far fa-clock"></i> ${readTime} min read`;
        });
    }

    // ===== SHARE BUTTONS FUNCTIONALITY =====
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const url = window.location.href;
            const title = document.querySelector('.post-title')?.textContent || 'Check out this article';
            
            if (this.classList.contains('share-twitter')) {
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank', 'width=600,height=400');
            } else if (this.classList.contains('share-linkedin')) {
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
            } else if (this.classList.contains('share-facebook')) {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
            } else if (this.classList.contains('share-email')) {
                window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
            }

            // Show notification
            if (window.showNotification) {
                showNotification('Opening share dialog...', 'info');
            }
        });
    });

    // ===== COPY LINK FUNCTIONALITY =====
    function addCopyLinkButton() {
        const shareButtons = document.querySelector('.share-buttons');
        if (shareButtons && !document.querySelector('.share-copy')) {
            const copyBtn = document.createElement('a');
            copyBtn.href = '#';
            copyBtn.className = 'share-btn share-copy';
            copyBtn.innerHTML = '<i class="fas fa-link"></i> Copy Link';
            copyBtn.addEventListener('click', function(e) {
                e.preventDefault();
                navigator.clipboard.writeText(window.location.href).then(() => {
                    if (window.showNotification) {
                        showNotification('Link copied to clipboard!', 'success');
                    }
                    this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    setTimeout(() => {
                        this.innerHTML = '<i class="fas fa-link"></i> Copy Link';
                    }, 2000);
                });
            });
            shareButtons.appendChild(copyBtn);
        }
    }

    if (document.querySelector('.blog-post')) {
        addCopyLinkButton();
    }

    // ===== SMOOTH SCROLL TO SECTIONS IN POST =====
    const postLinks = document.querySelectorAll('.post-text a[href^="#"]');
    postLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 100;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== ADD TABLE OF CONTENTS (Optional) =====
    function createTableOfContents() {
        const postText = document.querySelector('.post-text');
        if (!postText) return;

        const headings = postText.querySelectorAll('h2, h3');
        if (headings.length < 3) return; // Only create TOC if there are enough headings

        const toc = document.createElement('div');
        toc.className = 'table-of-contents glass-card';
        toc.style.cssText = `
            padding: 30px;
            margin-bottom: 40px;
        `;

        let tocHTML = '<h3 style="margin-bottom: 20px; color: var(--text-primary);">Table of Contents</h3><ul style="list-style: none; padding: 0;">';
        
        headings.forEach((heading, index) => {
            const id = `section-${index}`;
            heading.id = id;
            const level = heading.tagName === 'H2' ? 'main' : 'sub';
            const indent = level === 'sub' ? 'margin-left: 20px;' : '';
            tocHTML += `
                <li style="${indent} margin-bottom: 10px;">
                    <a href="#${id}" style="color: var(--text-secondary); transition: all 0.3s;">
                        ${heading.textContent}
                    </a>
                </li>
            `;
        });
        
        tocHTML += '</ul>';
        toc.innerHTML = tocHTML;

        // Insert TOC after the lead paragraph
        const lead = postText.querySelector('.lead');
        if (lead) {
            lead.parentNode.insertBefore(toc, lead.nextSibling);
        }

        // Style TOC links on hover
        toc.querySelectorAll('a').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.color = 'var(--primary-purple)';
                this.style.paddingLeft = '10px';
            });
            link.addEventListener('mouseleave', function() {
                this.style.color = 'var(--text-secondary)';
                this.style.paddingLeft = '0';
            });
        });
    }

    // Uncomment to enable table of contents
    // if (document.querySelector('.blog-post')) {
    //     createTableOfContents();
    // }

    // ===== LAZY LOAD IMAGES IN BLOG POSTS =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== HIGHLIGHT ACTIVE SECTION IN URL =====
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                target.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
                target.style.transition = 'background-color 0.5s';
                setTimeout(() => {
                    target.style.backgroundColor = 'transparent';
                }, 2000);
            }
        }, 100);
    }

    console.log('Blog JavaScript loaded successfully! 📝');

})();