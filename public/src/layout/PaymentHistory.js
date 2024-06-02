import PaymentHistoryComponent from "../components/PaymentHistoryComponent.js";

export default async function PaymentHistory() {

    let paymentHistoryContainer = document.createElement('div');
    paymentHistoryContainer.classList.add("paymentHistoryContainer");
    paymentHistoryContainer.appendChild(await PaymentHistoryComponent());

    return paymentHistoryContainer;
}