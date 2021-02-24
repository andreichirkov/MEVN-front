import Vue from 'vue'
import Vuex from 'vuex'
import product from "@/store/product";
import category from "@/store/category";
import cart from "@/store/cart";

Vue.use(Vuex)

//если у стора нет нейма запись в компонентах будет такая
// ...mapActions({fetchCategories: '!пусто!/fetchCategories'})
export default new Vuex.Store({
  modules: {
    cart,
    product,
    category,
  }
})
