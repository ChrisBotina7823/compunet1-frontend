import {getPaymentHistory} from "../services/CartServices.js";

export default async function PaymentHistoryComponent(){

    let divRecibo = document.createElement('div');
            divRecibo.setAttribute("class", "divRecibo");
            divRecibo.setAttribute("id", "divRecibo");

            divRecibo.innerText += "Historial de compras ";
            let paymentList = document.createElement('ul');
            var res;
                    
            const user = JSON.parse(localStorage.getItem('user'));
            res = await getPaymentHistory(user.username);
            
            console.log(res)

            
            let i = 1;
            res.forEach(factura =>{
                let ulFactura = document.createElement('ul');
                ulFactura.classList.add("spanFactura");
                ulFactura.innerText += "Compra #" + i++;
                let total = 0;
                factura.payment_history.forEach(product=>{
                    let productElement = document.createElement('li');
                    productElement.classList.add("cart-product");
                    productElement.innerText = "Producto: " + product.title + " - " + "Precio: $" + product.price + " - " + "Cantidad: " + product.quantity;
                    total += product.price;
                    ulFactura.appendChild(productElement);
                })
                
                let spanTotal = document.createElement('span');
                spanTotal.innerHTML = "Total: $" + total;
                ulFactura.appendChild(spanTotal)
                paymentList.appendChild(ulFactura)
            })

           
            divRecibo.appendChild(paymentList)
            
            return divRecibo;
        }
