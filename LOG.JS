// Highlight the active navigation link
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active-link'));
        // Add active class to clicked link
        this.classList.add('active-link');
    });
});

// Click logo to go back to home/top
const logos = document.querySelectorAll('.logo img');

logos.forEach(logo => {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});





// Service Data
const services = [
    { id: 1, name: "Dry Cleaning", price: 200, icon: "👕" },
    { id: 2, name: "Wash & Fold", price: 100, icon: "🧺" },
    { id: 3, name: "Ironing", price: 30, icon: "💨" },
    { id: 4, name: "Stain Removal", price: 500, icon: "🍷" },
    { id: 5, name: "Leather & Suede Cleaning", price: 999, icon: "👞" },
    { id: 6, name: "Wedding Dress Cleaning", price: 2800, icon: "👗" }
];

let cart = [];

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    renderServices();
    updateCartUI();
});

function scrollToBooking() {
    document.getElementById('booking').scrollIntoView();
}

function renderServices() {
    const list = document.getElementById('services-list');
    list.innerHTML = services.map(s => {
        const inCart = cart.find(item => item.id === s.id);
        return `
            <div class="service-item">
                <div class="service-info">${s.icon} ${s.name} • <span>₹${s.price.toFixed(2)}</span></div>
                ${inCart
                ? `<button class="btn-remove" onclick="removeFromCart(${s.id})">Remove Item ⊖</button>`
                : `<button class="btn-add" onclick="addToCart(${s.id})">Add Item ⊕</button>`
            }
            </div>
        `;
    }).join('');
}

function addToCart(id) {
    const item = services.find(s => s.id === id);
    cart.push(item);
    updateCartUI();
    renderServices();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
    renderServices();
}

function updateCartUI() {
    const body = document.getElementById('cart-body');
    const totalDisplay = document.getElementById('total-price');

    body.innerHTML = cart.length ? cart.map((item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>₹${item.price.toFixed(2)}</td>
        </tr>
    `).join('') : '<tr><td colspan="3" style="text-align:center; padding:20px; color:#aaa;">No items added yet</td></tr>';

    const total = cart.reduce((acc, curr) => acc + curr.price, 0);
    totalDisplay.innerText = `₹${total.toFixed(2)}`;
}

document.getElementById('booking-form').onsubmit = function (e) {
    e.preventDefault();

    const errorMsg = document.getElementById('error-msg');
    const successMsg = document.getElementById('success-msg');
    const bookBtn = document.querySelector('.btn-book');

    // Reset messages
    errorMsg.classList.add('hidden');
    successMsg.classList.add('hidden');

    // Disable button while processing
    bookBtn.disabled = true;

    // ❌ Cart empty → show red message
    if (cart.length === 0) {
        errorMsg.classList.remove('hidden');

        // Re-enable button after 2 seconds
        setTimeout(() => {
            bookBtn.disabled = false;
            errorMsg.classList.add('hidden');
        }, 2000);

        return;
    }

    // ✅ SUCCESS — Email sent
    successMsg.classList.remove('hidden');

    // Clear cart
    cart = [];
    updateCartUI();
    renderServices();

    // Reset booking form fields
    document.getElementById('booking-form').reset();

    // Keep button disabled (optional)
    // If you want to re-enable after few seconds, uncomment below:
    /*
    setTimeout(() => {
        bookBtn.disabled = false;
        successMsg.classList.add('hidden');
    }, 3000);
    */
};
function updateBookButtonState() {
    const bookBtn = document.querySelector('.btn-book');

    if (cart.length > 0) {
        bookBtn.disabled = false;
    } else {
        bookBtn.disabled = true;
    }
}


function addToCart(id) {
    const item = services.find(s => s.id === id);
    cart.push(item);
    updateCartUI();
    renderServices();
    updateBookButtonState();
}


function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
    renderServices();
    updateBookButtonState();
}



document.addEventListener('DOMContentLoaded', () => {
    renderServices();
    updateCartUI();
    updateBookButtonState(); // important
});



document.getElementById('booking-form').onsubmit = function (e) {
    e.preventDefault();

    const errorMsg = document.getElementById('error-msg');
    const successMsg = document.getElementById('success-msg');
    const bookBtn = document.querySelector('.btn-book');

    errorMsg.classList.add('hidden');
    successMsg.classList.add('hidden');

    bookBtn.disabled = true;

    if (cart.length === 0) {
        errorMsg.classList.remove('hidden');
        return;
    }

    successMsg.classList.remove('hidden');

    cart = [];
    updateCartUI();
    renderServices();
    updateBookButtonState();

    document.getElementById('booking-form').reset();
};



// --- FOOTER & NEWSLETTER LOGIC ---

// 1. Handle Newsletter Subscription
const newsletterForm = document.getElementById('newsletter-form');
const newsSuccess = document.getElementById('news-success');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Collect data
        const name = document.getElementById('news-name').value;
        const email = document.getElementById('news-email').value;

        // UI Feedback
        const btn = document.getElementById('news-btn');
        btn.innerText = "Subscribing...";
        btn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            newsletterForm.style.display = 'none';
            newsSuccess.style.display = 'block';
            console.log(`Newsletter Subscriber: ${name} (${email})`);
        }, 1500);
    });
}

// 2. Scroll to Top Functionality
const scrollBtn = document.getElementById('scroll-top');

window.onscroll = function () {
    // Show button when user scrolls down 400px
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
};

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// Footer Icon Interaction
document.querySelectorAll('.social-icons a').forEach(iconLink => {
    iconLink.addEventListener('mouseenter', () => {
        console.log(`Hovering over: ${iconLink.getAttribute('aria-label')}`);
    });

    iconLink.addEventListener('click', (e) => {
        // e.preventDefault(); // Uncomment this if you don't want the page to jump
        const platform = iconLink.getAttribute('aria-label');
        alert(`Redirecting to our ${platform} page...`);
    });
});
