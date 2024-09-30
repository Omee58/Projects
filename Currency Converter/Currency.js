// Theme toggle button
document.getElementById('toggleThemeBtn').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

const btn = document.querySelector('button');
let FValue1, FValue2;

// From side Declaration
const CurSel1 = document.querySelector('#CurrencyOp1');
const img1 = document.querySelector('#img1');
const ConOp1 = document.querySelectorAll('#CurrencyOp1 > option');

const CurSel2 = document.querySelector('#CurrencyOp2');
const img2 = document.querySelector('#img2');
const ConOp2 = document.querySelectorAll('#CurrencyOp2 > option');

// Function to update flag image
function updateFlagImage(selector, imageElement) {
    const selectedOption = document.querySelector(`${selector} option:checked`);
    if (selectedOption) {
        const text = selectedOption.innerText.trim();
        const encodedText = encodeURIComponent(text);
        imageElement.src = `https://flagsapi.com/${encodedText}/flat/64.png`;
    }
}

// From side flag change on select
CurSel1.addEventListener('change', () => {
    updateFlagImage('#CurrencyOp1', img1);
});

CurSel2.addEventListener('change', () => {
    updateFlagImage('#CurrencyOp2', img2);
});

// Event listener for button click
btn.addEventListener('click', () => {
    const fromIn = parseFloat(document.querySelector('#input1').value);
    if (isNaN(fromIn)) {
        alert('Input not found :(');
        return;
    } else if (fromIn < 0) {
        alert('Please Enter Positive Number');
        return;
    }

    // Fetch exchange rates
    Promise.all([
        fetch('https://api.freecurrencyapi.com/v1/latest?apikey={YOUR_API_KEY}')
            .then(response => response.json())
            .then(data => FValue1 = data.data[CurSel1.value]),
        fetch('https://api.freecurrencyapi.com/v1/latest?apikey={YOUR_API_KEY}')
            .then(response => response.json())
            .then(data => FValue2 = data.data[CurSel2.value])
    ]).then(() => {
        if (FValue1 && FValue2) {
            let FinalAmt = ((FValue2 * fromIn) / FValue1).toFixed(3);
            document.querySelector('#Output2').innerText = FinalAmt;
        }
    }).catch(error => console.error('Error fetching currency data:', error));
});

// Swap currencies
document.querySelector('i').addEventListener('click', () => {
    let tp = CurSel1.value;
    let tp2 = CurSel2.value;
    CurSel1.value = tp2;
    CurSel2.value = tp;

    updateFlagImage('#CurrencyOp1', img1);
    updateFlagImage('#CurrencyOp2', img2);
});

// Online/Offline Status
function updateOnlineStatus() {
    const statusElement = document.getElementById('statusMessage');
    if (navigator.onLine) {
        statusElement.textContent = 'You are online';
        statusElement.style.backgroundColor = 'green';
    } else {
        statusElement.textContent = 'You are offline';
        statusElement.style.backgroundColor = 'red';
    }
}

// Initial status check
updateOnlineStatus();

// Event listeners for online/offline status changes
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
