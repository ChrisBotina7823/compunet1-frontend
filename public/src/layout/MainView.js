export default async function MainView() {
    const container = document.createElement('div');
    container.id = 'fh5co-page';    
    const divWork = document.createElement('div');
    divWork.id = 'fh5co-work';

    const divContainer = document.createElement('div');
    divContainer.className = 'container';

    const divRow = document.createElement('div');
    divRow.className = 'row top-line animate-box';

    const divCol = document.createElement('div');
    divCol.className = 'col-md-7 col-md-push-5 text-left title-container';

    const h2 = document.createElement('h2');
    h2.className = 'main-title';
    const user = JSON.parse(localStorage.getItem('user')); 
    h2.innerHTML = `Hola, ${user ? user.username : ""} ¡Bienvenido a la mejor tienda!<br> ten un buen dia (:`;

    const divSubtext = document.createElement('div');
    divSubtext.className = 'subtext';

    const spanHighlight = document.createElement('span');
    spanHighlight.className = 'fh5co-highlight';
    spanHighlight.innerHTML = 'Productos con <span id="corazon" class="heart">&#10084;</span> <span class="gradient-text">?</span>';

    // Agregar los elementos al DOM
    divSubtext.appendChild(spanHighlight);
    divCol.appendChild(h2);
    divCol.appendChild(divSubtext);
    divRow.appendChild(divCol);
    divContainer.appendChild(divRow);
    divWork.appendChild(divContainer);

    // Agregar el div principal al elemento root
    const root = document.getElementById('root');
    container.appendChild(divWork);
    return container;
}