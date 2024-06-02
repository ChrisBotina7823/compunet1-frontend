import { getCart } from "../services/CartServices.js";
import Cart from "../components/Cart.js";

export default async function CartView() {
    const user = JSON.parse(localStorage.getItem("user"));
    let cart = await getCart(user.username)
    let cartContainer = document.createElement('div');
    cartContainer.classList.add("cart");

    cartContainer.appendChild(Cart(cart))

    return cartContainer;
}