
 



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






let cart = [];
function toggleService(button) {
    const serviceItem = button.closest('.service-item');

    const id = serviceItem.dataset.id;
    const name = serviceItem.dataset.name;
    const price = parseFloat(serviceItem.dataset.price);

    const existingIndex = cart.findIndex(item => item.id === id);

    if (existingIndex === -1) {
        cart.push({ id, name, price });
        button.innerText = "Remove ⊖";
        button.classList.remove("btn-add");
        button.classList.add("btn-remove");
    } else {
        cart.splice(existingIndex, 1);
        button.innerText = "Add ⊕";
        button.classList.remove("btn-remove");
        button.classList.add("btn-add");
    }

    updateCartUI();
    updateBookButtonState();
}


document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    updateBookButtonState();
});



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

(function () {
    emailjs.init("7CscIZm-7t6Mfcj14"); 
})();


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
            "service_m0s88ur",       
            "service_Email",          
            templateParams
        )
        .then(() => {
            successMsg.classList.remove('hidden');
            cart = [];
            updateCartUI();
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





const scrollBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    scrollBtn.style.display =
        document.documentElement.scrollTop > 400 ? "block" : "none";
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
