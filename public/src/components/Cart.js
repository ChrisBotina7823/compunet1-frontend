import { removeProductFromCart, addPaymentHistory, addProductToCart } from "../services/CartServices.js";

export default function Cart(cart) {
    let cartElement = document.createElement('div');
    cartElement.classList.add("cart");
    cartElement.setAttribute("id", "cartElement")

    let cartTitle = document.createElement('h2');
    cartTitle.innerText = "Carrito de Compras";
    cartElement.appendChild(cartTitle);


    let cartList = document.createElement('ul');
    cartList.classList.add("cart-list");
    cartElement.appendChild(cartList);
    
    const user = JSON.parse(localStorage.getItem('user'));

    cart.products.forEach(product => {
        let productElement = document.createElement('li');
        productElement.classList.add("cart-product");
        productElement.innerText = product.title + " - " + product.price + " - " + product.quantity;
        cartList.appendChild(productElement);
        const removeButton = document.createElement('button');
        removeButton.textContent = "-";
        removeButton.onclick = () => {
            removeProductFromCart(user.username, product.id);
        }
        const addButton = document.createElement('button');
        addButton.textContent = "+";
        addButton.onclick = () => {
            addProductToCart(user.username, product.id);
        };
        productElement.appendChild(removeButton);
        productElement.appendChild(addButton);
    });

    //Comprar e historial
    let send_button = document.createElement("button");
    send_button.textContent = "Comprar ahora";

    send_button.addEventListener("click", async ()=>{
        let divRecibo = document.createElement('div');
        divRecibo.setAttribute("class", "divRecibo");
        divRecibo.setAttribute("id", "divRecibo");

        divRecibo.innerText += "Factura: ";

        let paymentList = document.createElement('ul');
        let res = await addPaymentHistory(user.username);
        console.log(res)
        let factura = res[res.length - 1].payment_history;


        let total = 0;
        factura.forEach(product =>{
            let productElement = document.createElement('li');
            productElement.classList.add("cart-product");
            productElement.innerText = "Producto: " + product.title + " - " + "Precio: $" + product.price + " - " + "Cantidad: " + product.quantity;
            total += product.price;
            paymentList.appendChild(productElement);
        })

        
        divRecibo.appendChild(paymentList)
        let spanTotal = document.createElement('span');
        spanTotal.innerText = "Total: $" + total;
        divRecibo.appendChild(spanTotal)
        
        let buttonFinish = document.createElement('button');
        buttonFinish.innerText = "Aceptar";
        buttonFinish.style.display = "block";
        buttonFinish.onclick = ()=>{
            document.querySelector("#divRecibo").style.display = "none";
        }
        
        divRecibo.appendChild(buttonFinish)
        document.querySelector("#cartElement").appendChild(divRecibo)

    });

    if(cart.products.length > 0){
        cartElement.appendChild(send_button);
    } else {
        let emptyCart = document.createElement('h3');
        emptyCart.innerText = "El carrito está vacío";
        let emptyCartDescription = document.createElement('p');
        emptyCartDescription.innerText = "Agrega productos al carrito para poder comprar";
        cartElement.appendChild(emptyCart);
        cartElement.appendChild(emptyCartDescription);
    }

    return cartElement;
}