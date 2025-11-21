// --- script.js (Enhanced Logic) ---

// 1. Get DOM elements (Updated for new checklist items)
const passwordInput = document.getElementById('passwordInput');
const container = document.querySelector('.container');
const statusBar = document.getElementById('statusBar');
const statusText = document.getElementById('statusText');

const lengthCheck = document.getElementById('lengthCheck');
const lowerCheck = document.getElementById('lowerCheck'); 
const upperCheck = document.getElementById('upperCheck');
const numberCheck = document.getElementById('numberCheck');
const symbolCheck = document.getElementById('symbolCheck');
const bonusCheck = document.getElementById('bonusCheck'); 

const allChecks = [lengthCheck, lowerCheck, upperCheck, numberCheck, symbolCheck, bonusCheck];


// 2. Event Listener (Checks strength whenever user types)
passwordInput.addEventListener('input', checkPasswordStrength);


// 3. Password Visibility Toggle (UX Feature)
function togglePasswordVisibility() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
}


// 4. The Core Logic Function
function checkPasswordStrength() {
    const password = passwordInput.value;
    let score = 0;
    
    // 4.1 Define Regular Expressions and checks
    const checks = {
        // Base requirements
        length_min: password.length >= 8,
        length_bonus: password.length >= 12, // Bonus point for longer passwords
        lower: /[a-z]/.test(password), 
        upper: /[A-Z]/.test(password), 
        number: /\d/.test(password),
        symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };

    // 4.2 Reset state and return if input is empty
    container.classList.remove('weak', 'medium', 'strong');
    
    if (password.length === 0) {
        statusBar.style.width = '0%';
        statusText.innerText = 'Type to check strength...';
        allChecks.forEach(li => {
            li.classList.remove('passed', 'failed');
        });
        return;
    }

    // 4.3 Check requirements, score them, and update the list (DOM)
    
    // Check #1: Length >= 8
    score += checks.length_min ? 1 : 0;
    lengthCheck.classList.toggle('passed', checks.length_min);
    lengthCheck.classList.toggle('failed', !checks.length_min);

    // Check #2: Lowercase
    score += checks.lower ? 1 : 0;
    lowerCheck.classList.toggle('passed', checks.lower);
    lowerCheck.classList.toggle('failed', !checks.lower);

    // Check #3: Uppercase
    score += checks.upper ? 1 : 0;
    upperCheck.classList.toggle('passed', checks.upper);
    upperCheck.classList.toggle('failed', !checks.upper);

    // Check #4: Number
    score += checks.number ? 1 : 0;
    numberCheck.classList.toggle('passed', checks.number);
    numberCheck.classList.toggle('failed', !checks.number);

    // Check #5: Symbol
    score += checks.symbol ? 1 : 0;
    symbolCheck.classList.toggle('passed', checks.symbol);
    symbolCheck.classList.toggle('failed', !checks.symbol);
    
    // --- Bonus Checks & Complexity Reward ---
    
    // Check #6: Length >= 12 (Bonus point)
    score += checks.length_bonus ? 1 : 0;
    // Only mark as failed if the password has content but is too short
    bonusCheck.classList.toggle('passed', checks.length_bonus);
    bonusCheck.classList.toggle('failed', !checks.length_bonus && password.length > 0);
    
    // Complexity Bonus: Calculate how many different types of characters were used (lower, upper, number, symbol)
    const typeCount = [checks.lower, checks.upper, checks.number, checks.symbol].filter(Boolean).length;
    
    if (typeCount >= 4 && checks.length_min) {
        score += 2; // High complexity rewarded (e.g., uses 4/4 types + minimum length)
    } else if (typeCount >= 3 && checks.length_min) {
        score += 1; // Medium complexity rewarded
    }
    
    // 4.4 Update UI based on final score
    
    const maxScore = 8; // Total possible score
    const percentage = Math.min(100, (score / maxScore) * 100); // Cap at 100%
    statusBar.style.width = `${percentage}%`;

    // 4.5 Assign Strength Category based on the enhanced score
    if (score <= 3) {
        container.classList.add('weak');
        statusText.innerText = 'Weak (Needs significant improvement)';
    } else if (score <= 6) {
        container.classList.add('medium');
        statusText.innerText = 'Medium (Good, but could be longer)';
    } else { // Score 7 or 8 (High complexity + bonus length)
        container.classList.add('strong');
        statusText.innerText = 'Strong (Excellent Security!)';
    }
}
// Make function available globally
window.togglePasswordVisibility = togglePasswordVisibility;
