
function inicioTienda() {

    fetch('https://fakestoreapi.com/products/categories')
    .then((res) => res.json())
    .then((categories) => {

        const botonesCategorias = categories.map(
            (cate) => `
            <button class="categoria" onclick="mostrarProductos('${cate}')">${cate}</button>
        `        
        ).join("");
    
        document.getElementById("categorias").innerHTML = botonesCategorias;
    })

    .catch((error) => console.error("Error al obtener los datos:", error));


    fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {

        const productosHTML = data.map(
            (producto) => `
            <div class="producto">
                <img src="${producto.image}" alt="${producto.title}" width="200" height="150">
                <p>${producto.title} - $${producto.price}</p>
                <button onclick="agregarAlCarrito('${producto.title}', ${producto.price})">Agregar al carrito</button>
            </div>
        `
        ).join("");
            
        document.getElementById("productos").innerHTML = productosHTML;

        actualizarCarrito()
    })

    .catch((error) => console.error("Error al obtener los datos:", error));

}

function mostrarProductos(categ) {

    fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {

        const productosFiltrados = data.filter(
            (producto) => producto.category === categ
        );
        const productosHTML = productosFiltrados
            .map(
                (producto) => `
            <div class="producto">
                <img src="${producto.image}" alt="${producto.title}" width="200" height="150">
                <p>${producto.title} - $${producto.price}</p>
                <button onclick="agregarAlCarrito('${producto.title}', ${producto.price})">Agregar al carrito</button>
            </div>
        `
            ).join("");
            
        document.getElementById("productos").innerHTML = productosHTML;

    })

    .catch((error) => console.error("Error al obtener los datos:", error));

}

function agregarAlCarrito(nombre, precio) {
    listaCarritoObjs.push({ nombre, precio });
    actualizarCarrito();
}

function actualizarCarrito() {

    let contador = -1;

    const carritoHTML = listaCarritoObjs.map(
        (item) => `
        <div class="productosCarrito">
            <p>${item.nombre} - $${item.precio}</p>
            <button class="eliminar" onclick="eliminarDeCarrito('${contador += 1}')">Eliminar del carrito</button>
        </div>
    `
    ).join("");

    document.getElementById("carrito").innerHTML = carritoHTML;

    localStorage.setItem('listadaCarrito', JSON.stringify(listaCarritoObjs));
}

function eliminarDeCarrito(posicion) {
    listaCarritoObjs.splice(posicion, 1)
    actualizarCarrito(listaCarritoObjs)
}

let listaCarritoObjs = [];

const contenedor = localStorage.getItem('listadaCarrito');

if (contenedor === null) {

    inicioTienda();

} else {

    // Trae el elemento almacenado del localStorage.
    const listaJSON = localStorage.getItem('listadaCarrito');
    // Convierte el elemento de localStorage en lenguaje de javascript.
    listaCarritoObjs = JSON.parse(listaJSON);

    // Carga el sitio con las modificaciones realizadas la última vez.
    inicioTienda();

}
