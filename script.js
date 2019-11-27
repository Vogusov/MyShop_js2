'use strict'

const API_URL = 'https://raw.githubusercontent.com/Vogusov/store_API/master';
const image = 'https://place-hold.it/150x200';
const cartImage = 'https://place-hold.it/100x100';

const userCart = [];

class List {
	constructor(url, container) {
		this.container = container;
		this.url = url;
		this.goods = [];
		this.allProducts = [];
		// this.filteredGoods = [];
		this._init()
	}

	getJSON(url) {
		return fetch(url ? url : `${API_URL + this.url}`)
			.then(resolve => resolve.json())
			.catch(error => {
				console.log(error)
			})
	}

	handleData(data) {
		this.goods = [...data]
		this.render()
	}

	render() {
		const block = document.querySelector(this.container)

		for (let product of this.goods) {
			const prod = new lists[this.constructor.name](product)
			this.allProducts.push(prod)
			block.insertAdjacentHTML('beforeend', prod.render())
		}
	}
};


class Item {
	constructor(el, img = image) {
		this.product_name = el.product_name;
		this.id_product = el.id_product;
		this.price = el.price;
		this.img = img
	}
	render() {
		return `<div class="goods-item" data-id="${this.id_product}">
                        <img src="${this.img}" alt="product picture" title='product picture'>
                        <h3> ${this.product_name}</h3>
                        <p>${this.price + ' $'}</p>
                        <button class="buy-button"
                            data-id="${this.id_product}"
                            data-name="${this.title}"
                            data-image="${this.img}"
                            data-price="${this.price}"
                            type="button">
                            Buy
                        </button>`
	}
}

class ProductItem extends Item {};

class CartItem extends Item {
	constructor(el, img = cartImage) {
		super(el, img)
		this.quantity = el.quantity
	}
	render() {
		return `<div class='cart-item' data-id="${this.id_product}">
                    <img src='${this.img}' class='cart-item-img' >
                    <div class="cart-item-content">
                        <h4 class="product-title"> ${this.product_name}</h4>
                        <p class="product-single-price">Цена: ${this.price}</p>
                        <p class="product-quantity">Колличество: ${this.quantity}</p>
                        <p class="product-price">Сумма: ${this.price * this.quantity}</p>
                        <button class="del-button" data-id="${this.id_product}">&times;</button>
                    </div>
                </div>`
	}
}

class ProductsList extends List {
	constructor(cart, url = '/catalog.json', container = '.goods-list') {
		super(url, container);
		this.cart = cart;
		this.getJSON()
			.then(data => this.handleData(data))
	}
	_init() {
		document.querySelector(this.container).addEventListener('click', evt => {
			if (evt.target.classList.contains('buy-button')) {
				evt.preventDefault()
				this.cart.addProduct(evt.target)
			}
		})
	}
}


// проверить карзину!!!!!!!
class Cart extends List {
	constructor(url = '/addToBasket.json', container = '.cart') {
		super(url, container);
		this.getJSON()
			.then(data => this.handleData(data.contents))
	}
	addProduct(element) {
		this.getJSON(`${API_URL}/addToBasket.json`)
			.then(data => {
				if (data.result) {
					let productId = +element.dataset['id'];
					let find = this.allProducts.find(product => product.id_product === productId)

					if (!find) {
						let product = {
							product_name: element.dataset['name'],
							id_product: productId,
							price: +element.dataset['price'],
							quantity: 1
						}
						this.goods = [product];
						this.render()
					} else {
						find.quantity++
						this._updateCart(find)
					}
				} else {
					debugger
					console.log('err')
				}
			})
	}
	removeProduct(element) {
		this.getJSON(`${API_URL}/deleteFromBasket.json`)
			.then(data => {
				if (data.result) {
					let productId = +element.dataset['id'];
					let find = this.allProducts.find(product => product.id_product === productId)

					if (find.quantity > 1) {
						find.quantity--
						this._updateCart(find)
					} else {
						this.allProducts.splice(this.allProducts.indexOf(find), 1)
						document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
					}
				} else {
					console.log('err')
				}
			})
	}
	_updateCart(product) {
		let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`)
		block.querySelector('.product-quantity').textContent = `Сумма: ${product.quantity}`
		block.querySelector('.product-price').textContent = `${product.quantity} * ${product.price}`
	}
	_init() {
		document.querySelector(this.container).addEventListener('click', evt => {
			if (evt.target.classList.contains('del-button')) {
				this.removeProduct(evt.target)
			}
		})
	}
}

let lists = {
	ProductsList: ProductItem,
	Cart: CartItem
}

let cart = new Cart();
let products = new ProductsList(cart)

document.querySelector('.cart-button').addEventListener('click', () => {
	document.querySelector('.cart').classList.toggle('invisible')
})



// /#[a-f0-9]{6}\b/gi




//-----класс элемента корзины
// class CartItem extends GoodsItem {
//     constructor(qnt) {
//         this.qnt = qnt;
//     }
//     render() {
//         return `<div class='cart-item'>
//                     <img src=https://place-hold.it/100x100 >
//                     <h4> ${this.product_name}</h4>
//                     <p>Цена: ${this.price}</p>
//                     <p>Колличество: ${this.qnt}</p>
//                     <p>Сумма: ${this.price * this.qnt}</p>
//                 </div>`
//     }
//     addItem() {qnt++};
//     deleteItem() {qnt--};
// }




//----------класс корзины
// class CartList {
//     constructor() {
//         this.cartItems = [];
//     }
//     getCartItems() {   
//         // список добавленных в карзину товаров
//     }
//     render() {
//         let listHtml = '';
//         this.goods.forEach(good => {
//             const cartItem = new CartItem(good.title, good.price, good.qnt);
//             listHtml += cartItem.render();
//         } );
//         document.querySelector('.cart').innerHTML = listHtml;
//     }
// }