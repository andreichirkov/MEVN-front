import { getProduct, getProducts } from "@/services/products.service";

const mutations = {
  setProduct(state, product) {
    state.product = product
  },
  setProducts(state, products) {
    state.products = products
  },
  setProductError(state, error) {
    state.productError = error
  }
}

const actions = {
  async fetchProduct({ commit }, id) {
    try {
      const product = await getProduct(id)
      commit('setProduct', product)
    } catch (err) {
      commit('setProductError', err)
    }
  },
  async fetchProducts({ commit }) {
    try {
      const products = await getProducts()
      commit('setProducts', products)
    } catch (err) {
      commit('setProductError', err)
    }
  }

}

const getters = {
  //геттер получает колбек, внутрь к нему приходит объект стейта,
  //поэтому деструктуризацией можно вытащить например product
  product: ({product}) => product,
  //запись без деструктуризации
  products: (state) => state.products,
  productError: ({productError}) => productError,
}

const state = () => ({
  product: {},
  products: [],
  productError: null
})

export default {
  mutations,
  getters,
  actions,
  state
}
