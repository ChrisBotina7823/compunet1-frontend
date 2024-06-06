import { addProduct } from "../services/ProductServices.js";

async function AddProductView() {
    // Crear el contenedor del formulario
    let formContainer = document.createElement('div');
    formContainer.classList.add("form-container", "add-product");
    
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://compunet1-backend-production.up.railway.app/products';
    form.enctype = 'multipart/form-data';
    
    // Crear el título del formulario
    const formTitle = document.createElement('h2');
    formTitle.textContent = 'Añadir Producto';
    
    // Crear el grupo de título
    const titleGroup = document.createElement('div');
    titleGroup.classList.add('input-group');
    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title:';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'title';
    titleGroup.appendChild(titleLabel);
    titleGroup.appendChild(titleInput);
    
    // Crear el grupo de categoría
    const categoryGroup = document.createElement('div');
    categoryGroup.classList.add('input-group');
    const categoryLabel = document.createElement('label');
    categoryLabel.textContent = 'Category:';
    const categoryInput = document.createElement('input');
    categoryInput.type = 'text';
    categoryInput.name = 'category';
    categoryGroup.appendChild(categoryLabel);
    categoryGroup.appendChild(categoryInput);
    
    // Crear el grupo de descripción
    const descriptionGroup = document.createElement('div');
    descriptionGroup.classList.add('input-group');
    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description:';
    const descriptionInput = document.createElement('textarea');
    descriptionInput.name = 'description';
    descriptionGroup.appendChild(descriptionLabel);
    descriptionGroup.appendChild(descriptionInput);
    
    // Crear el grupo de precio
    const priceGroup = document.createElement('div');
    priceGroup.classList.add('input-group');
    const priceLabel = document.createElement('label');
    priceLabel.textContent = 'Price:';
    const priceInput = document.createElement('input');
    priceInput.type = 'number';
    priceInput.name = 'price';
    priceGroup.appendChild(priceLabel);
    priceGroup.appendChild(priceInput);
    
    // Crear el grupo de imagen
    const thumbnailGroup = document.createElement('div');
    thumbnailGroup.classList.add('input-group');
    const thumbnailLabel = document.createElement('label');
    thumbnailLabel.textContent = 'Thumbnail:';
    const thumbnailInput = document.createElement('input');
    thumbnailInput.type = 'file';
    thumbnailInput.name = 'thumbnail';
    thumbnailInput.id = 'fileInput'; // Agregar id al input de archivo
    thumbnailInput.style.display = 'none'; // Ocultar el input de archivo por defecto

    // Crear el botón personalizado para seleccionar archivo
    const customFileUpload = document.createElement('label');
    customFileUpload.textContent = 'Seleccionar archivo';
    customFileUpload.classList.add('custom-file-upload');
    customFileUpload.setAttribute('for', 'fileInput');
    customFileUpload.id = 'customFileLabel'; // Agregar id al botón personalizado

    thumbnailGroup.appendChild(thumbnailLabel);
    thumbnailGroup.appendChild(thumbnailInput);
    thumbnailGroup.appendChild(customFileUpload);

    // Agregar todos los campos al formulario
    form.appendChild(formTitle);
    form.appendChild(titleGroup);
    form.appendChild(categoryGroup);
    form.appendChild(descriptionGroup);
    form.appendChild(priceGroup);
    form.appendChild(thumbnailGroup);
    
    const button = document.createElement('button');
    button.textContent = 'Añadir producto';
    button.type = 'submit';
    form.appendChild(button);

    // Agregar el formulario al contenedor
    formContainer.appendChild(form);

    // Agregar evento de envío al formulario
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        addProduct(new FormData(form));
        location.href = '#products';
        alert('Producto añadido con éxito')
    });

    // Agregar evento de clic al botón personalizado para abrir el selector de archivos
    customFileUpload.addEventListener('click', () => {
        thumbnailInput.click();
    });

    // Agregar evento de cambio al input de archivo para actualizar el texto del botón personalizado
    thumbnailInput.addEventListener('change', () => {
        if (thumbnailInput.files.length > 0) {
            customFileUpload.textContent = thumbnailInput.files[0].name;
        } else {
            customFileUpload.textContent = 'Seleccionar archivo';
        }
    });

    return formContainer;
}

export default AddProductView;
