'use strict'
<<<<<<< Updated upstream
// ==== Глобальные сущности
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// end Глобальные сущности
=======
   // ==== Глобальные сущности
const API_URL = 'https://raw.githubusercontent.com/Vogusov/store_API/master';
// https:raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses
   // end Глобальные сущности
>>>>>>> Stashed changes

function makeGETRequest(url) {
    return new Promise ((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.open('GET', url, true);
        xhr.onload = () => {
            console.log('Состояние запроса: ' + xhr.readyState);
            console.log('Статус запроса: ' + xhr.status);
            resolve(xhr.responseText);
            console.log('Тело ответа сервера: ' + xhr.response);
            console.log('Текст ответа: ' + xhr.responseText);           
        };
        xhr.onerror = () => {
            console.log('Состояние запроса: ' + xhr.readyState);
            console.log('Статус запроса: ' + xhr.status);
            reject(xhr.statusText);
            console.log('Тело ответа сервера: ' + xhr.response);
            console.log('Текст ответа: ' + xhr.responseText);
        
        };
        xhr.send();
    })
}

class GoodsItem {
    constructor(title, price) {
        this.product_name = title;
        this.price = price;
    }
    render() {
        return `<div class='goods-item'>
                    <img src=https://place-hold.it/150x200 title='product picture'>
                    <h3> ${this.product_name}</h3>
                    <p>${this.price + ' $'}</p>
                    <button class="product-button" type="button">Buy</button>
                </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
        this.filteredGoods = [];
    }

    fetchGoods() {
        makeGETRequest (`${API_URL}/catalog.json`)
            .then((goods) => {
                this.goods = JSON.parse(goods);
                this.filteredGoods = JSON.parse(goods);
            })
            // .then(goods => this.render(goods))
            .catch(error => {
                console.log(error)
            })
        } 

    render() {
        let listHtml = '';
        this.filteredGoods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        } );
        document.querySelector('.goods-search').innerHTML = listHtml;
    }

    findTotalCost() {
        let totalCost = 0;
        this.goods.forEach(good => {
            totalCost += this.price;
            return totalCost;
        });
    }

    filterGoods(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        this.render();
    }
};



let searchButton = document.querySelector('.search-button');
let searchInput = document.querySelector('.goods-search');

searchButton.addEventListener('click', () => {
    const value = searchInput.value;
    list.filterGoods(value);
}) ;


const list = new GoodsList();

list.fetchGoods();
list.render();

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

