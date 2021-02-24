import { sum } from 'ramda'

const mutations = {
  addToCart(state, product) {
    //есть ли этот продукт в корзине
    const productInCart = state.cartItems.find(item => item._id === product._id)
    if (productInCart) {
      const currentProductsInCart = state.cartItems
      state.cartItems = currentProductsInCart.filter(item => item._id !== product._id)
    } else {
      state.cartItems.push(product)
    }
  }
}
const actions = {}

const getters = {
  //приходит объект state и сразу деструктуризация
  cartCount: ({cartItems}) => cartItems.length,
  cart: ({cart}) => cart,
  cartItems: ({cartItems}) => cartItems,
  //sum сложить все цены которые вернет map в виде массива
  cartTotalPrice: ({cartItems}) => sum(cartItems.map(item => item.price))
}

const state = () => ({
  cart: {
    total: 0
  },
  cartItems: []
})

export default {
  mutations,
  getters,
  actions,
  state
}
