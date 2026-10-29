let cart = [];

const cartButton = document.querySelector(".cart-button");

document.querySelectorAll(".product-card").forEach((card) => {
    const price = Number(card.dataset.price);
    const name = card.dataset.name;
    const yardInput = card.querySelector(".yard-input");
    const totalPrice = card.querySelector(".total-price");
    const addButton = card.querySelector(".add-button");

    // Update the total when the number of yards changes
    yardInput.addEventListener("input", () => {
        const yards = Math.max(
            1,
            Math.floor(Number(yardInput.value) || 1)
        );

        totalPrice.textContent = (yards * price).toLocaleString("en-NG");
    });

    // Add fabric to the cart
    addButton.addEventListener("click", () => {
        const yards = Number(yardInput.value);

        if (!Number.isInteger(yards) || yards < 1) {
            alert("Please select at least 1 yard.");
            return;
        }

        const existingItem = cart.find(
            (item) => item.name === name
        );

        if (existingItem) {
            existingItem.yards += yards;
        } else {
            cart.push({
                name: name,
                price: price,
                yards: yards
            });
        }

        const totalYards = cart.reduce(
            (sum, item) => sum + item.yards,
            0
        );

        cartButton.textContent = `My Cart (${totalYards})`;

        alert(`${yards} yard(s) of ${name} added to your cart!`);

        console.log("Current cart:", cart);
    });
});