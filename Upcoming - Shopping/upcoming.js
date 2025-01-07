const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');
const cancel = document.getElementById('cancel');
const bar = document.getElementById('bar');

let isOpen = true;
cancel.style.display = "none"

mobileMenu.addEventListener('click', () => {
    if (isOpen) {
        navList.classList.add('active');
        bar.style.display = "none"
        cancel.style.display = "block"
        isOpen = false;
    }
    else if (!isOpen) {
        navList.classList.remove('active');
        bar.style.display = "block";
        cancel.style.display = "none";
        isOpen = true;
    }
});

let cart_body = document.getElementsByClassName('cart-body');
let products = document.querySelector('.products')

fetch('https://fakestoreapi.com/products/')
    .then(res => res.json())
    .then(json => {

        for (x = 0; x <= json.length - 1; x++) {

            products.innerHTML += `
            <div class="product-cart" onclick="me()">
                    <div class="img">
                        <img class="pimg" id="img${x}" src="" loading="lazy" alt="Product Image" />
                    </div>
                    
                    <div class="cart-body">
                        <h2 class="JStitle" id="title${x}">Product Title</h2>
                        <h2 class="JSprice" id="price${x}">$00.00</h2>
                        <!--<p class="JSdescription" id="description${x}">Product description goes here.</p>-->
                        <h4 class="JScategory" id="category${x}">Category Name</h4>
                    </div>

                </div> `;

            document.getElementById(`title${x}`).innerText = json[x].title;
            document.getElementById(`price${x}`).innerText = '$' + json[x].price;
            // document.getElementById(`description${x}`).innerText = json[x].description;
            document.getElementById(`category${x}`).innerText = json[x].category;
            document.getElementById(`img${x}`).src = json[x].image;
        }

    }) // fetch

    .catch(e => {
        const loader = document.getElementById('loader');
        loader.style.display = 'flex';

        setTimeout(() => {
            loader.style.display = 'none';
        }, 2000);
    })

document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById('loader');
    loader.style.display = 'flex';

    setTimeout(() => {
        loader.style.display = 'none';
    }, 1500);
});

const GoToTop = document.querySelector(".go-to-top");
GoToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Smooth scroll
    });
});