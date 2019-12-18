'use strict'

const API_URL = 'https://raw.githubusercontent.com/Vogusov/store_API/master';
const image = 'https://place-hold.it/150x200';
const cartImage = 'https://place-hold.it/100x100';

let  app = new Vue ({
	el: '#app',
	data: {
		image: 'https://place-hold.it/150x200',
		products: [],
		url: '/catalog.json'
	},
	methods: {
		getJSON(url) {
			return fetch(url)
				.then(resolve => resolve.json())
				.catch(error => {
					console.log(error)
				})
		},
		addProduct (product) {
			console.log(product.id_product);
		}
	},
	mounted() {
		this.getJSON(`${API_URL + this.url}`)
			.then(data => {
				for (let el of data) {
					this.products.push (el)
				}
			})
	}

});

 