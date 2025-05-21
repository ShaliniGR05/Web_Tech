const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Store donations (in memory for this example)
let donations = [];

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/donate', (req, res) => {
    const { fullName, contact, bookTitles, condition, deliveryPreference } = req.body;
    const newDonation = {
        fullName,
        contact,
        bookTitles,
        condition,
        deliveryPreference,
        date: new Date().toLocaleDateString()
    };
    donations.unshift(newDonation); // Add to beginning of array
    
    // Log the new donation to console
    console.log('New donation received:');
    console.log('-----------------------');
    console.log(`Name: ${newDonation.fullName}`);
    console.log(`Contact: ${newDonation.contact}`);
    console.log(`Books: ${newDonation.bookTitles}`);
    console.log(`Condition: ${newDonation.condition}`);
    console.log(`Delivery: ${newDonation.deliveryPreference}`);
    console.log(`Date: ${newDonation.date}`);
    console.log('-----------------------\n');
    
    res.redirect('/');
});

app.get('/donations', (req, res) => {
    // Log all donations when requested
    console.log('Current donations:');
    console.log('------------------');
    donations.forEach((donation, index) => {
        console.log(`Donation #${index + 1}:`);
        console.log(`Name: ${donation.fullName}`);
        console.log(`Books: ${donation.bookTitles}`);
        console.log('------------------');
    });
    console.log(`Total donations: ${donations.length}\n`);
    
    res.json(donations);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});