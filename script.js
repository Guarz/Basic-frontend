let cart = [];
let totalPrice = 0;
let editingFlowerId = null;

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const itemName = this.getAttribute('data-name');
        const itemPrice = parseInt(this.getAttribute('data-price'));

        cart.push({ name: itemName, price: itemPrice });
        totalPrice += itemPrice;
        updateCart();
    });
});

function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItemsElement.innerHTML = '';

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - ${item.price} VND <button class="remove-item" onclick="removeItem(${index})">Xóa</button>`;
        cartItemsElement.appendChild(li);
    });

    totalPriceElement.textContent = totalPrice;
}

function removeItem(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

function editFlower(flowerId) {
    editingFlowerId = flowerId;
    const flowerItem = document.getElementById(flowerId);
    const flowerName = flowerItem.querySelector('h2').textContent;
    const flowerPrice = parseInt(flowerItem.querySelector('p').textContent.split(' ')[1].replace(',', ''));

    document.getElementById('edit-name').value = flowerName;
    document.getElementById('edit-price').value = flowerPrice;

    document.getElementById('edit-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

function saveEdit() {
    const newName = document.getElementById('edit-name').value;
    const newPrice = document.getElementById('edit-price').value;

    const flowerItem = document.getElementById(editingFlowerId);
    flowerItem.querySelector('h2').textContent = newName;
    flowerItem.querySelector('p').textContent = `Giá: ${newPrice.toLocaleString()} VND`;

    closeModal();
}
