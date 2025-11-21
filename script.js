// --- script.js (Setup) ---

// 1. Get DOM elements
const passwordInput = document.getElementById('passwordInput');
const container = document.querySelector('.container');
const statusBar = document.getElementById('statusBar');
const statusText = document.getElementById('statusText');
const lengthCheck = document.getElementById('lengthCheck');
const upperCheck = document.getElementById('upperCheck');
const numberCheck = document.getElementById('numberCheck');
const symbolCheck = document.getElementById('symbolCheck');


// 2. Event Listener (Checks strength whenever user types)
passwordInput.addEventListener('input', checkPasswordStrength);


// 3. Password Visibility Toggle (UX Feature)
function togglePasswordVisibility() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    // Simple UI change for the eye icon can be added here if needed
}


// 4. The Core Logic Function (To be filled in next)
function checkPasswordStrength() {
    const password = passwordInput.value;
    let score = 0;

    // Remove previous state classes
    container.classList.remove('weak', 'medium', 'strong');

    if (password.length === 0) {
        // Reset state if input is empty
        statusBar.style.width = '0%';
        statusText.innerText = 'Type to check strength...';
        // (We will add reset logic for the list items here later)
        return;
    }

    // --- YOUR LOGIC WILL GO HERE ---
    
    // 5. Update UI based on score
    // (This part will be completed after the logic is built)

}
// Call the function to make it available globally for the HTML button
window.togglePasswordVisibility = togglePasswordVisibility;
