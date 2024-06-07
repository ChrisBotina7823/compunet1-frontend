import { getPaymentHistory } from "../services/CartServices.js";

export default async function PaymentHistoryComponent() {
    // Crear el contenedor principal
    let divRecibo = document.createElement('div');

    divRecibo.setAttribute("class", "divRecibo");
    divRecibo.classList.add("payment-history-container");            
    divRecibo.setAttribute("id", "divRecibo");

    let title = document.createElement('h2');
    title.innerText = "Historial de compras";
    divRecibo.appendChild(title);

    let paymentList = document.createElement('ul');

    const user = JSON.parse(localStorage.getItem('user'));
    // Obtener el historial de pagos
    var paymentHistory = await getPaymentHistory(user.username);
    console.log(paymentHistory);

    let purchaseIndex = 1;

    // Iterar a través de cada registro de compra
    paymentHistory.forEach(factura => {
        // Crear un contenedor para cada compra
        let divFactura = document.createElement('div');
        divFactura.classList.add("factura");

        // Añadir encabezado de la compra
        let header = document.createElement('div');
        header.classList.add("factura-header");
        header.innerText = "Compra #" + purchaseIndex++;
        divFactura.appendChild(header);

        let total = 0;

        // Iterar a través de cada producto en la compra
        factura.payment_history.forEach(product => {
            let productElement = document.createElement('div');
            productElement.classList.add("cart-product");

            let productTitle = document.createElement('div');
            productTitle.innerText = `Producto: ${product.title}`;

            let productPrice = document.createElement('div');
            productPrice.innerText = `Precio: $${product.price}`;

            let productQuantity = document.createElement('div');
            productQuantity.innerText = `Cantidad: ${product.quantity}`;

            total += product.price * product.quantity;

            productElement.appendChild(productTitle);
            productElement.appendChild(productPrice);
            productElement.appendChild(productQuantity);

            divFactura.appendChild(productElement);
        });

        // Añadir el monto total
        let spanTotal = document.createElement('div');
        spanTotal.classList.add("factura-total");
        spanTotal.innerHTML = `Total: $${total.toFixed(2)}`;
        divFactura.appendChild(spanTotal);

        // Añadir el contenedor de la compra a la lista de pagos
        paymentList.appendChild(divFactura);
    });

    // Adjuntar la lista de pagos al contenedor principal
    divRecibo.appendChild(paymentList);

    return divRecibo;
}

