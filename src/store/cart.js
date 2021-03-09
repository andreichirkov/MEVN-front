import { getPaymentIntent } from '@/services/payment.service'
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
  },
  setPaymentError(state, error) {
    state.paymentError = error
  },
  clearCart(state) {
    state.cartItems = []
  }
}
const actions = {
  async handleBuy({ getters, commit }) {
    try {
      const intent = await getPaymentIntent({amount: getters.cartTotalPrice})
      return intent
    } catch(err) {
      commit('setPaymentError', err)
    }
  }
}

const getters = {
  //приходит объект state и сразу деструктуризация
  cartCount: ({cartItems}) => cartItems.length,
  cart: ({cart}) => cart,
  cartItems: ({cartItems}) => cartItems,
  //sum сложить все цены которые вернет map в виде массива
  cartTotalPrice: ({cartItems}) => sum(cartItems.map(item => item.price)),
  paymentError: ({ paymentError }) => paymentError
}

const state = () => ({
  cart: {
    total: 0
  },
  cartItems: [],
  paymentError: null
})

export default {
  mutations,
  getters,
  actions,
  state
}
