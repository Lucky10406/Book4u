// Function to process payment based on selected method
function processPayment(totalAmount) {
    // Get selected payment method (Credit Card or Polygon)
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    if (paymentMethod === 'credit-card') {
        processCreditCardPayment(totalAmount);
    } else if (paymentMethod === 'polygon') {
        processPolygonPayment(totalAmount);
    }
}

// Simulate credit card payment process
function processCreditCardPayment(totalAmount) {
    // Mock processing (simulate with a random success/fail for demo purposes)
    const paymentSuccess = Math.random() > 0.2; // 80% chance of success

    if (paymentSuccess) {
        // Redirect to success page if payment is successful
        window.location.href = "Success.html";
    } else {
        // Redirect to error page if payment fails
        window.location.href = "Error.html";
    }
}

// Simulate Polygon network payment process
function processPolygonPayment(totalAmount) {
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
        alert("Please install MetaMask to use Polygon payments.");
        return;
    }

    // Connect to MetaMask and simulate transaction
    window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
            const account = accounts[0];
            return window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: account,
                    to: "0xRecipientWalletAddress", // replace with recipient wallet address
                    value: (totalAmount * 1e18).toString(16) // convert to wei in hexadecimal
                }]
            });
        })
        .then(() => {
            // Redirect to success page on completion
            window.location.href = "Success.html";
        })
        .catch(error => {
            console.error("Polygon payment failed:", error);
            // Redirect to error page if payment fails
            window.location.href = "Error.html";
        });
}

// Event listener to trigger payment processing on button click
document.getElementById('pay-now-btn').addEventListener('click', () => {
    // Assume totalAmount is passed in or calculated from the page/cart
    const totalAmount = parseFloat(document.getElementById('total-amount').textContent.replace('$', ''));
    processPayment(totalAmount);
});
