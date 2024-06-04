async function getProducts() {
    try {
        const response = await fetch('http://localhost:3000/products/');
        const responseJson = await response.json();
        const products = responseJson.products;
        return products;
    } catch (error) {
        console.error('Error:', error);
    }
}

function addProduct(productData) {
    async function addProductAsync(productData) {
        const request = new Request('http://localhost:3000/products', {
            method: 'POST',
            body: productData, 
        });
        const response = await fetch(request);
        if (response.ok) {
            console.log('Producto añadido con éxito');
        } else {
            console.log('Error al añadir producto');
        }
    }
    addProductAsync(productData);
}


function editProduct(data) {

    async function editProductAsync(data) {
        const request = new Request('http://localhost:3000/products/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
    
        
        const response = await fetch(request);
        if (response.ok) {
            alert('Stock modificado con éxito');
            location.reload();
        } else {
            alert('Error al modificar el stock del producto');
        }
    }

    editProductAsync(data);
}

export {
    getProducts,
    addProduct,
    editProduct
}