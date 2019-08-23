'use strict'
// ==== Глобальные сущности
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// end Глобальные сущности


// function makeGETRequest(url, callback) {

//     let xhr;
  
//     if (window.XMLHttpRequest) {
//       xhr = new XMLHttpRequest();
//     } else if (window.ActiveXObject) { 
//       xhr = new ActiveXObject("Microsoft.XMLHTTP");
//     }

//     xhr.open('GET', url, true);
//     xhr.send();

    
  
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4) {
//         callback(xhr.response);
//       }
//     }
// }

function makeGETRequest(url) {
    let xhr;
  
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open('GET', url, true);
    xhr.send();

    return new Promise ((resolve, reject) => {
        if (xhr.readyState === 4) {
            resolve(xhr.responseText);
        } else {
            reject(new Error(`Error!: ${xhr.status}; State: ${xhr.readyState}`));
        }
    })
}



class GoodsItem {
    constructor(title, price) {
        this.product_name = title;
        this.price = price;
    }
    render() {
        return `<div class='goods-item'>
                    <img src=https://place-hold.it/150x200 title='produc picture'>
                    <h3> ${this.product_name}</h3>
                    <p>${this.price + ' $'}</p>
                    <button class="product-button" type="button">Buy</button>
                </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods(cb) {
        makeGETRequest (`${API_URL}/catalogData.json`)
            .then(
                goods => {this.goods = JSON.parse(goods)},
                error => console.log(error)
                )
            .then(cb);
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        } );
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    findTotalCost() {
        let totalCost = 0;
        this.goods.forEach(good => {
            totalCost += this.price;
            return totalCost;
        });
    }
}

const list = new GoodsList();

list.fetchGoods(() => {
    list.render();
}) ;



//-----класс элемента корзины
class CartItem extends GoodsItem {
    constructor(qnt) {
        this.qnt = qnt;
    }
    render() {
        return `<div class='cart-item'>
                    <img src=https://place-hold.it/100x100 >
                    <h4> ${this.product_name}</h4>
                    <p>Цена: ${this.price}</p>
                    <p>Колличество: ${this.qnt}</p>
                    <p>Сумма: ${this.price * this.qnt}</p>
                </div>`
    }
    addItem() {qnt++};
    deleteItem() {qnt--};
}


//----------класс корзины
class CartList {
    constructor() {
        this.cartItems = [];
    }
    getCartItems() {   
        // список добавленных в карзину товаров
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const cartItem = new CartItem(good.title, good.price, good.qnt);
            listHtml += cartItem.render();
        } );
        document.querySelector('.cart').innerHTML = listHtml;
    }
}

