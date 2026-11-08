
const items=[
{name:"A4 Exercise Book",category:"Notebooks",price:15,image:"notebook",desc:"Ruled exercise book for everyday school work."},
{name:"Ballpoint Pens (Pack)",category:"Pens & Pencils",price:25,image:"pens",desc:"Smooth-writing assorted ballpoint pens."},
{name:"Colour Pencils (12 Pack)",category:"Art & Craft",price:45,image:"pencils",desc:"Bright colour pencils for drawing and colouring."},
{name:"Sticky Notes",category:"Office Supplies",price:20,image:"sticky-notes",desc:"Colourful sticky notes for reminders."},
{name:"Scientific Calculator",category:"Calculators",price:75,image:"calculator",desc:"Practical calculator for school and office."},
{name:"School Backpack",category:"Bags",price:180,image:"backpack",desc:"Everyday backpack with useful storage."},
{name:"Watercolour Paint Set",category:"Art & Craft",price:65,image:"paint",desc:"A starter set for creative projects."},
{name:"A4 Printing Paper (Ream)",category:"Paper",price:58,image:"paper",desc:"Quality A4 paper for printing and copying."},
{name:"Document Folder",category:"Office Supplies",price:18,image:"folder",desc:"Keep your documents organised."}
];
const money=n=>"P"+Number(n).toFixed(2);
function cart(){return JSON.parse(localStorage.getItem("beautianoCart")||"[]")}
function saveCart(c){localStorage.setItem("beautianoCart",JSON.stringify(c));updateCount()}
function updateCount(){document.querySelectorAll(".cart-count").forEach(e=>e.textContent=cart().reduce((s,x)=>s+x.qty,0))}
function addToCart(id){let c=cart(),found=c.find(x=>x.id===id);if(found)found.qty++;else c.push({id,qty:1});saveCart(c);alert("Added to your cart.")}
function productCard(p){return `<article class="product"><img src="assets/${p.image}.svg" alt="${p.name}"><span class="tag">${p.category}</span><h3>${p.name}</h3><p>${p.desc}</p><div class="price">${money(p.price)}</div><button class="add" onclick="addToCart('${p.name}')">Add to Cart</button></article>`}
function renderProducts(target,list){let el=document.querySelector(target);if(el)el.innerHTML=list.map(productCard).join("")||'<p class="empty">No products found. Try another search.</p>'}
function initShop(){let search=document.querySelector("#productSearch"),filter=document.querySelector("#categoryFilter");function apply(){let q=(search?.value||"").toLowerCase(),cat=filter?.value||"All";renderProducts("#productGrid",items.filter(p=>(p.name+" "+p.category).toLowerCase().includes(q)&&(cat==="All"||p.category===cat)))}search?.addEventListener("input",apply);filter?.addEventListener("change",apply);apply()}
function renderCart(){let el=document.querySelector("#cartContents");if(!el)return;let c=cart();if(!c.length){el.innerHTML='<p class="empty">Your cart is empty. Visit the shop to add stationery.</p>';return}let rows=c.map(x=>{let p=items.find(i=>i.name===x.id);return `<tr><td>${p.name}</td><td>${money(p.price)}</td><td><input type="number" min="1" value="${x.qty}" onchange="changeQty('${x.id}',this.value)"></td><td>${money(p.price*x.qty)}</td><td><button class="add" onclick="removeItem('${x.id}')">Remove</button></td></tr>`}).join("");let total=c.reduce((s,x)=>s+items.find(p=>p.name===x.id).price*x.qty,0);el.innerHTML=`<table class="cart-list"><thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th><th></th></tr></thead><tbody>${rows}</tbody></table><h2>Order total: ${money(total)}</h2><p class="notice">This demo stores your cart in this browser. To place an order, send your cart details through the order form or contact Beautiano.</p><a class="btn" style="display:inline-block;border-radius:24px" href="contacts.html">Continue to Order Enquiry</a>`}
function changeQty(id,n){let c=cart();let x=c.find(i=>i.id===id);if(x)x.qty=Math.max(1,Number(n)||1);saveCart(c);renderCart()}
function removeItem(id){saveCart(cart().filter(x=>x.id!==id));renderCart()}
document.addEventListener("DOMContentLoaded",()=>{updateCount();renderProducts("#featuredGrid",items.slice(0,4));initShop();renderCart()});
