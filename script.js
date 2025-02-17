// Constants for validation
const MIN_NAME_LENGTH = 5;
const MIN_ADDRESS_LENGTH = 5;
const VALID_PHONE_LENGTH = 10;
const MIN_AGE = 18;

// Helper function to calculate age from DOB
function calculateAge(dob) {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const age = new Date(difference).getUTCFullYear() - 1970;
    return age;
}

// Toggle between Login and Register sections
document.getElementById('show-register').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
});

// Registration Form Submission
document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const dob = document.getElementById('dob').value;
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();

    if (firstName.length < MIN_NAME_LENGTH) {
        alert('First Name must be at least 5 characters.');
        return;
    }
    if (calculateAge(dob) < MIN_AGE) {
        alert('You must be at least 18 years old.');
        return;
    }
    if (phone.length !== VALID_PHONE_LENGTH || isNaN(phone)) {
        alert('Phone number must be exactly 10 digits.');
        return;
    }
    if (address.length < MIN_ADDRESS_LENGTH) {
        alert('Address must be at least 5 characters.');
        return;
    }
    if (username.length < MIN_NAME_LENGTH) {
        alert('Username must be at least 5 characters.');
        return;
    }

    const user = {
        firstName,
        lastName,
        dob,
        phone,
        address,
        username,
        password,
        orders: [],
    };
    localStorage.setItem('user', JSON.stringify(user));

    alert('Account created successfully!');
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
});

// Login Form Submission
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || user.username !== username || user.password !== password) {
        alert('Invalid username or password.');
        return;
    }

    alert('Login successful!');
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('main-container').style.display = 'block';
});

// Logout functionality
document.getElementById('logout').addEventListener('click', function () {
    alert('Logged out successfully!');
    location.reload();
});

// Profile Popup
document.getElementById('profile-btn').addEventListener('click', function () {
    const user = JSON.parse(localStorage.getItem('user'));
    const profileDetails = document.getElementById('profile-details');

    profileDetails.innerHTML = `
        <p>First Name: ${user.firstName}</p>
        <p>Last Name: ${user.lastName}</p>
        <p>Date of Birth: ${user.dob}</p>
        <p>Phone: ${user.phone}</p>
        <p>Address: ${user.address}</p>
        <p>Username: ${user.username}</p>
    `;
    document.getElementById('profile-popup').style.display = 'block';
});

document.getElementById('close-profile-btn').addEventListener('click', function () {
    document.getElementById('profile-popup').style.display = 'none';
});

// Edit Profile
document.getElementById('edit-profile-btn').addEventListener('click', function () {
    const user = JSON.parse(localStorage.getItem('user'));
    const updatedFirstName = prompt('Edit First Name:', user.firstName);
    const updatedLastName = prompt('Edit Last Name:', user.lastName);
    const updatedDob = prompt('Edit Date of Birth:', user.dob);
    const updatedPhone = prompt('Edit Phone:', user.phone);
    const updatedAddress = prompt('Edit Address:', user.address);
    const updatedUsername = prompt('Edit Username:', user.username);

    user.firstName = updatedFirstName;
    user.lastName = updatedLastName;
    user.dob = updatedDob;
    user.phone = updatedPhone;
    user.address = updatedAddress;
    user.username = updatedUsername;

    localStorage.setItem('user', JSON.stringify(user));
    alert('Profile updated successfully!');
});

// Show Previous Orders
document.getElementById('previous-orders-btn').addEventListener('click', function () {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.orders.length === 0) {
        alert('No previous orders found.');
        return;
    }

    alert(`Previous Orders:\n${user.orders.join('\n')}`);
});

// Product Selection
document.getElementById('brick-type').addEventListener('change', function () {
    const brickType = this.value;
    const customDimensions = document.getElementById('custom-dimensions');
    if (brickType === 'custom') {
        customDimensions.style.display = 'block';
    } else {
        customDimensions.style.display = 'none';
    }
});

// Reset Quantity
document.getElementById('reset-quantity').addEventListener('click', function () {
    document.getElementById('quantity').value = '';
    alert('Quantity reset!');
});

// Reset Village
document.getElementById('reset-village').addEventListener('click', function () {
    document.getElementById('village').selectedIndex = 0;
    alert('Village selection reset!');
});

// Add to Cart functionality
document.getElementById('add-to-cart').addEventListener('click', function () {
    const brickType = document.getElementById('brick-type').value;
    const quantity = document.getElementById('quantity').value;
    const village = document.getElementById('village').value;

    if (!quantity || !village) {
        alert('Please select both quantity and village before adding to cart.');
        return;
    }

    const cartBox = document.getElementById('cart-box');
    cartBox.style.display = 'block';

    const cartItems = document.getElementById('cart-items');
    const item = document.createElement('p');
    item.textContent = `Brick: ${brickType}, Quantity: ${quantity}, Village: ${village}`;
    cartItems.appendChild(item);

    document.getElementById('buy-now').disabled = false;
});

// Clear Cart functionality
document.getElementById('clear-cart').addEventListener('click', function () {
    document.getElementById('cart-items').innerHTML = '';
    alert('Cart cleared successfully!');
    document.getElementById('buy-now').disabled = true;
});

// Buy Now functionality with "Thank You" page and Home button
document.getElementById('buy-now').addEventListener('click', function () {
    const orderId = `ORD-${Math.floor(Math.random() * 1000000)}`;
    document.body.innerHTML = `
        <div style="text-align: center; margin-top: 50px;">
            <h2>Thank you for shopping!</h2>
            <p>Your Order ID is: ${orderId}</p>
            <p>Bill Status: Payment Pending</p>
            <button id="back-to-home-btn">Home</button>
        </div>
    `;

    document.getElementById('back-to-home-btn').addEventListener('click', function () {
        location.reload();
    });
});

// Dynamically Populate Village List
const villages = [
    { name: 'Arugolanu', charge: 600 },
    { name: 'Bommuluru', charge: 650 },
    { name: 'Hanuman Junction', charge: 500 },
    { name: 'Kalparu', charge: 600 },
    { name: 'Kanumolu', charge: 550 },
    { name: 'Kothapalli', charge: 600 },
    { name: 'M.N.Palem', charge: 400 },
    { name: 'Marribandam', charge: 500 },
    { name: 'Meerjapuram', charge: 600 },
    { name: 'Madicherla', charge: 650 },
    { name: 'Morsapudi', charge: 650 },
    { name: 'Ogirala', charge: 600 },
    { name: 'Pallerlamudi', charge: 500 },
    { name: 'Pedapadu', charge: 700 },
    { name: 'Punukoiiu', charge: 650 },
    { name: 'Seetharamapuram', charge: 500 },
    { name: 'Tulluluru', charge: 700 },
    { name: 'Telaprolu', charge: 650 },
    { name: 'Tippanagunta', charge: 650 },
    { name: 'Veleru', charge: 600 },
    { name: 'Veeravali', charge: 600 },
    { name: 'Gollapali', charge: 650 }
];
const villageDropdown = document.getElementById('village');
villages.sort((a, b) => a.name.localeCompare(b.name)).forEach(village => {
    const option = document.createElement('option');
    option.value = village.name;
    option.textContent = `${village.name} - ${village.charge} Rs`;
    villageDropdown.appendChild(option);
});