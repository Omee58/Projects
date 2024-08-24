// Theme toggle btn
document.getElementById('toggleThemeBtn').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
const btn = document.querySelector('button');
let FValue1, FValue2;

// From side Declaration
const CurSel1 = document.querySelector('#CurrencyOp1');
const img1 = document.querySelector('#img1');
const ConOp1 = document.querySelectorAll('#CurrencyOp1 > option');

CurSel1.addEventListener('change', () => {
    ConOp1.forEach(e => {
        if (CurSel1.value === e.value) {

            const text = e.innerText.trim();
            const encodedText = encodeURIComponent(text);
            img1.src = `https://flagsapi.com/${encodedText}/flat/64.png`;
        }
    })
})

ConOp1.forEach((e) => {
    btn.addEventListener('click', () => {
        if (CurSel1.value === e.value) {


            // don't remove this comment , this is link of API of 5k monthly free. i used it for some time, after i get new api from same website

            // fetch('https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_dPiuTdhGWbKgGxVdVpBIQt7ARaLBJROSi7kz1EAj'))


            fetch('https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_X6bIyQeijBvHPhNan8z5Skvkbw2tHwHoDs5j6XK3')
                .then(response => response.json())
                .then(data => {
                    FValue1 = data.data[CurSel1.value];
                });// 2nd .then

        }// if condition
    });// btn eventListener
});//ConOp1.ForEach

const CurSel2 = document.querySelector('#CurrencyOp2');
const img2 = document.querySelector('#img2');
const ConOp2 = document.querySelectorAll('#CurrencyOp2 > option');

CurSel2.addEventListener('change', () => {
    ConOp2.forEach(e => {
        if (CurSel2.value === e.value) {

            const text = e.innerText.trim();
            const encodedText = encodeURIComponent(text);
            img2.src = `https://flagsapi.com/${encodedText}/flat/64.png`;
        }

    })
})


ConOp2.forEach((e) => {
    btn.addEventListener('click', () => {
        if (CurSel2.value === e.value) {
            const text = e.innerText.trim();
            const encodedText = encodeURIComponent(text);
            img2.src = `https://flagsapi.com/${encodedText}/flat/64.png`;

            // fetch('https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_dPiuTdhGWbKgGxVdVpBIQt7ARaLBJROSi7kz1EAj')

            fetch('https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_X6bIyQeijBvHPhNan8z5Skvkbw2tHwHoDs5j6XK3')
                .then(response => response.json())
                .then(data => {
                    FValue2 = data.data[CurSel2.value];

                    const fromIn = document.querySelector('#input1').value;

                    if (fromIn < 0) {
                        alert('Please Enter Positive Number')
                    } else if (!fromIn) {
                        alert('Input not found :(')
                    } else if (FValue1 && FValue2 && fromIn) {
                        let FinalAmt = ((FValue2 * fromIn) / FValue1).toFixed(3);
                        document.querySelector('#Output2').innerText = FinalAmt;
                    }
                });// 2nd .then
        }// if condition
    });// btn eventListener
});//ConOp2.ForEa