const products = [
  {name:"mini-robe", price:300, img1:"images/la mini-robe.jpeg", img2:"images/la mini-rob.jpeg"},
  {name:"bonnet", price:70, img1:"images/bonneet.jpeg", img2:"images/bonnet.jpg"},
  {name:"CAPE", price:700, img1:"images/capee.jpeg", img2:"images/cape.jpeg"},
  {name:"VESTE", price:400, img1:"images/VESTEe.jpeg", img2:"images/VESTE.jpeg"},
  {name:"MONTO", price:900, img:"images/MONTO.jpeg"},
  {name:"VESTE", price:300, img1:"images/TSS.jpeg", img2:"images/TSS1.jpg"},
  {name:"MONTO", price:900, img1:"images/hwayje.jpeg", img2:"images/ll.jpeg"},
  {name:"MONTO", price:900, img:"images/ff.jpeg"},
  {name:"CAPE", price:350, img:"images/hh.jpeg"},
  {name:"VESTE D'ENFANT ( 6ANS / 13ANS )", price:300, img:"images/BE.jpeg"},
  {name:"combinaison pour bébé", price:150, img1:"images/bebe.jpeg", img2:"images/salobite.jpeg"},
  {name:"PULL", price:200, img1:"images/soso.jpeg", img2:"images/sisi.jpeg"},
  {name:"CHAUSSETTES DE LAINE", price:50, img1:"images/na.jpeg", img2:"images/no.jpeg"},
];

let cart = [];

function renderProducts() {
  const container = document.getElementById('products');
  container.innerHTML = '';
  products.forEach((p,i)=>{
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <div class="image-container">
        <img src="${p.img1 || p.img}" 
             data-img1="${p.img1 || p.img}" 
             data-img2="${p.img2 || p.img}" 
             onmouseover="this.src=this.dataset.img2" 
             onmouseout="this.src=this.dataset.img1">
      </div>
      <h3>${p.name}</h3>
      <p>${p.price} درهم</p>
      <button onclick="addToCart(${i})">أضف للسلة</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(index) {
  const existing = cart.find(item => item.name === products[index].name);
  if(existing){ existing.quantity +=1; } 
  else { cart.push({...products[index], quantity:1}); }
  updateCart();
}

function removeFromCart(name){
  cart = cart.filter(item => item.name !== name);
  updateCart();
}

function updateCart(){
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart');
  const totalElem = document.getElementById('total');
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item=>{
    total += item.price*item.quantity;
    const li = document.createElement('li');
    li.innerHTML = `${item.name} (${item.quantity} × ${item.price} د) 
      <button onclick="removeFromCart('${item.name}')">حذف</button>`;
    cartItems.appendChild(li);
  });
  cartCount.textContent = cart.reduce((sum,item)=>sum+item.quantity,0);
  totalElem.textContent = `المجموع: ${total} درهم`;
}

function orderWhatsApp(){
  if(cart.length===0){ alert("السلة فارغة! أضف منتجات أولاً."); return; }
  let phoneNumber = "212753253681"; // غيره برقمك
  let message = "سلام! بغيت نطلب هاد المنتجات:\n";
  cart.forEach(p => { message += `- ${p.name} (${p.quantity} × ${p.price} درهم)\n`; });
  let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

renderProducts();