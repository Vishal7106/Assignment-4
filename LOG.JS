/************************************
 * 1. EmailJS Init
 ************************************/
(function () {
    emailjs.init("7CscIZm-7t6Mfcj14"); // Public Key
})();

/************************************
 * Navigation UI
 ************************************/
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(l => l.classList.remove('active-link'));
        this.classList.add('active-link');
    });
});

document.querySelectorAll('.logo img').forEach(logo => {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

/************************************
 * Services & Cart
 ************************************/
const services = [
    { id: 1, name: "Dry Cleaning", price: 200, icon: "👕" },
    { id: 2, name: "Wash & Fold", price: 100, icon: "🧺" },
    { id: 3, name: "Ironing", price: 30, icon: "💨" },
    { id: 4, name: "Stain Removal", price: 500, icon: "🍷" },
    { id: 5, name: "Leather & Suede Cleaning", price: 999, icon: "👞" },
    { id: 6, name: "Wedding Dress Cleaning", price: 2800, icon: "👗" }
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    renderServices();
    updateCartUI();
    updateBookButtonState();
});

function renderServices() {
    const list = document.getElementById('services-list');
    list.innerHTML = services.map(s => {
        const inCart = cart.some(i => i.id === s.id);
        return `
            <div class="service-item">
                <div class="service-info">
                    ${s.icon} ${s.name} • ₹${s.price}
                </div>
                ${inCart
                ? `<button class="btn-remove" onclick="removeFromCart(${s.id})">Remove ⊖</button>`
                : `<button class="btn-add" onclick="addToCart(${s.id})">Add ⊕</button>`
            }
            </div>
        `;
    }).join('');
}

function addToCart(id) {
    cart.push(services.find(s => s.id === id));
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

function updateCartUI() {
    const body = document.getElementById('cart-body');
    const totalDisplay = document.getElementById('total-price');

    body.innerHTML = cart.length
        ? cart.map((item, i) => `
            <tr>
                <td>${i + 1}</td>
                <td>${item.name}</td>
                <td>₹${item.price}</td>
            </tr>
        `).join('')
        : `<tr><td colspan="3" style="text-align:center;color:#aaa;">No items added</td></tr>`;

    const total = cart.reduce((sum, i) => sum + i.price, 0);
    totalDisplay.innerText = `₹${total.toFixed(2)}`;
}

function updateBookButtonState() {
    document.querySelector('.btn-book').disabled = cart.length === 0;
}

/************************************
 *  Booking Form + EmailJS
 ************************************/
document.getElementById('booking-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = document.querySelector('.btn-book');
    const successMsg = document.getElementById('success-msg');
    const errorMsg = document.getElementById('error-msg');

    successMsg.classList.add('hidden');
    errorMsg.classList.add('hidden');

    if (cart.length === 0) {
        errorMsg.innerText = "⚠️ Cart is empty";
        errorMsg.classList.remove('hidden');
        return;
    }

    btn.innerText = "Sending...";
    btn.disabled = true;

    const templateParams = {
        from_name: document.getElementById('full-name').value,
        user_email: document.getElementById('email').value,
        user_phone: document.getElementById('phone').value,
        services_booked: cart.map(i => i.name).join(', '),
        total_amount: document.getElementById('total-price').innerText
    };

    emailjs
        .send(
            "service_m0s88ur",       // Service ID
            "service_Email",          // Template ID
            templateParams
        )
        .then(() => {
            successMsg.classList.remove('hidden');
            cart = [];
            updateCartUI();
            renderServices();
            updateBookButtonState();
            e.target.reset();
        })
        .catch(err => {
            errorMsg.innerText = err.text || "Email failed";
            errorMsg.classList.remove('hidden');
            console.error(err);
        })
        .finally(() => {
            btn.innerText = "Book Now";
            btn.disabled = false;
        });
});


function scrollToBooking() {
    document.getElementById('booking').scrollIntoView();
}

/************************************
 * Footer / Scroll / Newsletter
 ************************************/
const scrollBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    scrollBtn.style.display =
        document.documentElement.scrollTop > 400 ? "block" : "none";
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
