const addToCartBtn = document.getElementById("addToCartBtn");
const cartMessage = document.getElementById("cart-message");

if (addToCartBtn) {
    addToCartBtn.addEventListener("click", async () => {
        const productId = addToCartBtn.getAttribute("data-product-id");
        const userId = "67bc83dd9e582156d5a86f21"; 

        try {
            
            const addResponse = await fetch(`/cart/add/${productId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ quantity: 1 })
            });

            if (addResponse.ok) {
                const addData = await addResponse.text();
                document.body.innerHTML = addData; 
            } else {
                cartMessage.innerHTML = "<p style='color: red;'>Error al agregar el producto al carrito.</p>";
            }
        } catch (error) {
            console.error("Error:", error);
            cartMessage.innerHTML = "<p style='color: red;'>Hubo un problema al agregar el producto.</p>";
        }
    });
}



