console.log("archivo");


const socket = io()

socket.on("products", data => {
    const productsContainer = document.querySelector("#products");

    if (productsContainer) {
        const productsTemplate = data.map(each => ` 
             <div class="product">
                <img src="${each.thumbnail && each.thumbnail.trim() !== '' ? each.thumbnail : 'https://i.pinimg.com/736x/00/22/f7/0022f79582483ded38a7011bc101f34a.jpg'}" alt="${each.title}">
                <h2>${each.title}</h2>
                <p><strong>Stock:</strong> ${each.stock}</p>
                <p><strong>Precio:</strong> $${each.price}</p>
                <p><strong>Categoría:</strong> ${each.category}</p>
            </div>
        `).join("");
        productsContainer.innerHTML = productsTemplate;
    } else {
        console.error('No se encontró el contenedor #products');
    }
})

document.querySelector("#register").addEventListener("click", async () =>{
    const title = document.querySelector("#title").value;
    const price = document.querySelector("#price").value;
    const thumbnail = document.querySelector("#thumbnail").value;
    const stock = document.querySelector("#stock").value;
    const category = document.querySelector("#category").value;
    const product = {
        title,
        price,
        thumbnail,
        stock,
        category
    }
    socket.emit("new-product", product)

    document.querySelector("#title").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#thumbnail").value = "";
    document.querySelector("#stock").value = "";
    document.querySelector("#category").value = "";

    
})