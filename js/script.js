document.addEventListener('DOMContentLoaded', () => {

    // --- Data ---
    const products = [
        {
            id: 1,
            name: "Twisted Petal Gold Bracelet",
            category: "bracelets",
            price: "₹79,904",
            mrp: "₹99,904",
            image: "assets/images/product-bracelet.png"
        },
        {
            id: 2,
            name: "Eternal Gold Ring",
            category: "rings",
            price: "₹15,400",
            mrp: "₹18,000",
            image: "assets/images/product-bracelet.png"
        },
        {
            id: 3,
            name: "Diamond Stud Earrings",
            category: "earrings",
            price: "₹45,000",
            mrp: "₹55,000",
            image: "assets/images/product-bracelet.png"
        },
        {
            id: 4,
            name: "Gold Leaf Pendant",
            category: "pendants",
            price: "₹22,500",
            mrp: "₹28,000",
            image: "assets/images/product-bracelet.png"
        },
        {
            id: 5,
            name: "Classic Gold Bangle",
            category: "bangles",
            price: "₹65,000",
            mrp: "₹72,000",
            image: "assets/images/product-bracelet.png"
        },
        {
            id: 6,
            name: "Rose Gold Hoop",
            category: "earrings",
            price: "₹32,000",
            mrp: "₹40,000",
            image: "assets/images/product-bracelet.png"
        },
        {
            id: 7,
            name: "Solitaire Ring",
            category: "rings",
            price: "₹85,000",
            mrp: "₹100,000",
            image: "assets/images/product-bracelet.png"
        },
        {
            id: 8,
            name: "Silver Charm Bracelet",
            category: "bracelets",
            price: "₹5,000",
            mrp: "₹8,000",
            image: "assets/images/product-bracelet.png"
        }
    ];

    const reviews = [
        {
            id: 1,
            name: "Ananya S.",
            rating: 5,
            quote: "The craftsmanship is absolutely stunning. My bracelet looks even better in person!"
        },
        {
            id: 2,
            name: "Priya M.",
            rating: 5,
            quote: "Fast shipping and the packaging was so luxurious. Truly a premium experience."
        },
        {
            id: 3,
            name: "Rahul K.",
            rating: 4,
            quote: "Bought a ring for my wife's anniversary, she loved the design. Highly recommended."
        },
        {
            id: 4,
            name: "Sneha D.",
            rating: 5,
            quote: "I love the modern minimal designs. Perfect for daily wear yet looks elegant."
        }
    ];

    // --- State ---
    let activeTab = 'rings'; // Default to rings as per prompt ordering, or whatever user clicks. Prompt lists Rings first.

    // --- Selectors ---
    const header = document.getElementById('main-header');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const productGrid = document.getElementById('bestseller-grid');
    const recentlyViewedContainer = document.getElementById('recently-viewed-list');
    const reviewsSlider = document.getElementById('reviews-slider');
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.header__nav');

    // --- Functions ---

    // 1. Sticky Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
            header.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            header.style.paddingTop = "0";
            header.style.paddingBottom = "0";
        } else {
            header.classList.remove('header--scrolled');
            header.style.boxShadow = "none";
        }
    });

    // 2. Render Products
    // 2. Render Products
    const renderProducts = (category) => {
        productGrid.innerHTML = '';

        // Filter products based on category. 
        const filtered = products.filter(p => p.category === category || category === 'all');
        const displayProducts = filtered.length > 0 ? filtered : products.slice(0, 4);

        displayProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            // Swatches logic (mock)
            const swatchesHtml = `
                <div class="product-card__swatches">
                    <div class="swatch" style="background-color: #E6C685;"></div> <!-- Gold -->
                    <div class="swatch" style="background-color: #C0C0C0;"></div> <!-- Silver -->
                </div>
            `;

            card.innerHTML = `
                <div style="overflow:hidden; border-radius:4px; margin-bottom:12px;">
                    <img src="${product.image}" alt="${product.name}" class="product-card__image" style="background-color: #f9f9f9; width:100%; height:auto;">
                </div>
                <div class="product-card__divider"></div>
                <h3 class="product-card__title">${product.name}</h3>
                <div class="product-card__price">
                    ${product.price} <span class="product-card__mrp">${product.mrp}</span>
                </div>
                ${swatchesHtml}
            `;
            productGrid.appendChild(card);
        });
    };

    // 3. Render Recently Viewed (Mock)
    const renderRecentlyViewed = () => {
        const list = document.getElementById('recently-viewed-list');
        if (!list) return;
        list.innerHTML = '';

        // Just take the first 4 products
        products.slice(0, 4).forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            // Duplicate structure from bestsellers for consistency or keep slightly simpler if image implies differently.
            card.innerHTML = `
                <div style="overflow:hidden; border-radius:4px; margin-bottom:12px;">
                    <img src="${product.image}" alt="${product.name}" class="product-card__image" style="background-color: #fff; width:100%; height:auto;">
                </div>
                <h3 class="product-card__title">${product.name}</h3>
                <div class="product-card__price">
                    ${product.price} <span class="product-card__mrp">${product.mrp}</span>
                </div>
            `;
            list.appendChild(card);
        });
    };

    // 4. Render Reviews
    const renderReviews = () => {
        reviews.forEach(review => {
            const stars = Array(review.rating).fill('<i class="ph-fill ph-star"></i>').join('');
            const card = document.createElement('div');
            card.className = 'review-card';
            card.innerHTML = `
                <div class="review-card__stars">${stars}</div>
                <p class="review-card__quote">“${review.quote}”</p>
                <p class="review-card__author">- ${review.name}</p>
           `;
            reviewsSlider.appendChild(card);
        });
    };

    // 5. Tabs Interaction
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabButtons.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            const category = btn.getAttribute('data-tab');
            renderProducts(category);
        });
    });

    // 6. Mobile Menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const isVisible = nav.style.display === 'block';
            nav.style.display = isVisible ? 'none' : 'block';
            if (!isVisible) {
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.backgroundColor = 'var(--color-bg)';
                nav.style.padding = '20px';
                nav.style.boxShadow = 'var(--shadow-md)';
            }
        });
    }

    // --- Init ---
    // Start with the active tab (Rings) or default mock filtering
    // Since our mock data is small, I'll force render some items even if category doesn't strictly match for demo purposes if needed, but logic above handles it.
    renderProducts('rings');
    renderRecentlyViewed();
    renderReviews();

});
