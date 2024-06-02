import { editProduct } from "./ProductServices.js";


async function getCart(username) {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const username = user.username
        const response = await fetch(`https://compunet1-backend-production.up.railway.app/cart/${username}`);
        const responseJson = await response.json();
       
        return responseJson.cart;
        
    } catch (error) {
        console.error('Error:', error);
    }
}

function addProductToCart(username, productId) {
    async function addProductToCartAsync(username, productId) {
        try {
            const response = await fetch(`https://compunet1-backend-production.up.railway.app/cart/${username}/products/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId: productId }),
            });
            const responseJson = await response.json();
            alert("Producto añadido al carrito")
            return responseJson.cart;
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return addProductToCartAsync(username, productId);
}

function addPaymentHistory(username){
    async function addPaymentHistoryAsync(username){
        
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            let response = await fetch(`https://compunet1-backend-production.up.railway.app/cart/${user.username}`);
            let responseJson = await response.json();
            
            for(let i = 0; i < responseJson.cart.products.length; i++){
                let element = responseJson.cart.products[i]

                response = await fetch(`https://compunet1-backend-production.up.railway.app/cart/getStock/${username}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(element)
                
                });
                

                response = await response.json();
                    if (!response){
                        console.log(response)
                        alert("Hay productos sin stock. Eliminalos para continuar")
                        return;
                    }
            };
            
                response = await fetch(`https://compunet1-backend-production.up.railway.app/cart/pay/${username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                  body: JSON.stringify(responseJson.cart.products),
                    
                });

                
                
                
                alert("Compra exitosa!.")
                response = await response.json();
                return response
            
            
            
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return addPaymentHistoryAsync(username);
    
}

function getPaymentHistory(username){
    async function addPaymentHistoryAsync(username){
        
        try {
          
             let response = await fetch(`https://compunet1-backend-production.up.railway.app/cart/paymentHistory/${username}`, {
                method: 'POST',              
            });
            
            
            response = await response.json();
            return response;
            
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return addPaymentHistoryAsync(username);
    
}


function removeProductFromCart(username, productId) {
    async function removeProductFromCartAsync(username, productId) {
        try {
            const response = await fetch(`https://compunet1-backend-production.up.railway.app/cart/${username}/products/${productId}`, {
                method: 'DELETE',
            });
            const responseJson = await response.json();
            responseJson.cart;
            return cart;
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return removeProductFromCartAsync(username, productId);
}


export {
    getCart,
    addProductToCart,
    removeProductFromCart,
    addPaymentHistory,
    getPaymentHistory
}