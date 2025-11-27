const products = [
  { id: 1, name: "Nike Shoes", price: 80000, img:"shoes.webp" },
  { id: 2, name: "Casual T-Shirt", price: 750, img:"Tshirt.webp" },
  { id: 3, name: "Smart Watch", price: 1999, img:"smart watch.jpg" },
  { id: 4, name: "Headphones", price: 2999, img:"headphone.jpg" },
  { id: 5, name: "Backpack", price: 999, img:"perfume.webp" },
  { id: 6, name: "Sunglasses", price: 1199, img:"sunglass.webp" },
  { id: 7, name: "Leather Wallet", price: 650, img:"wallet.webp" },
  { id: 8, name: "Bluetooth Speaker", price: 4599, img:"speaker.webp" },
  { id: 9, name: "MRF Bat", price: 5499, img:"mrf bat.jpg" },
  { id: 10, name: "Fash wash", price: 790, img:"face wash.avif" },
  { id: 11, name: "smart phone", price: 129000, img:"phone.jpg" },
  { id: 12, name: "Fash wash", price: 99999999, img:"troffy.jpg" }
];


let cart = [];

function show(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if(id === 'cart') loadCart();
}

const productList = document.getElementById('productList');
products.forEach(p => {
  productList.innerHTML += `
    <div class="card">
      <img src="${p.img}" />
      <h3>${p.name}</h3>
      <p class="price">₹${p.price}</p>
      <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
    </div>`;
});

function addToCart(id){
  const item = cart.find(c => c.id === id);
  if(item) item.qty++;
  else cart.push({ id, qty:1 });

  document.getElementById('cartCount').innerText =
    cart.reduce((a,b) => a + b.qty, 0);
}

function loadCart(){
  const table = document.getElementById('cartTable');
  table.innerHTML = `<tr><th>Item</th><th>Qty</th><th>Total</th></tr>`;

  let grand = 0;

  cart.forEach(c => {
    const p = products.find(x => x.id === c.id);
    grand += p.price * c.qty;

    table.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${c.qty}</td>
        <td>₹${p.price * c.qty}</td>
      </tr>`;
  });

  table.innerHTML += `
    <tr style="background:#fffae6; font-weight:bold;">
      <td colspan="2">Grand Total</td>
      <td>₹${grand}</td>
    </tr>`;
}

function placeOrder(){
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;

  if(!name || !address || !phone){
    document.getElementById('orderMsg').innerHTML = "Please fill all details!";
    document.getElementById('orderMsg').style.color = "red";
    return;
  }

  document.getElementById('orderMsg').style.color = "green";
  document.getElementById('orderMsg').innerHTML = "🎉 Order Placed Successfully!";

  cart = [];
  document.getElementById('cartCount').innerHTML = 0;
}
