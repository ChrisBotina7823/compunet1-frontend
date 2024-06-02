import Product from "../components/editProduct.js";
import { getProducts, editProduct } from "../services/ProductServices.js";

export default async function ProductsView() {
    let products = await getProducts();
    let productsContainer = document.createElement('div');
    productsContainer.classList.add("product-list");

    for (let product of products) {
        let productElement = Product(product);
        productsContainer.appendChild(productElement);
    }

    return productsContainer;
}