<template>
  <div class="row">
    <div
        v-for="(product, key) in products"
        :key="key"
        class="col-lg-4 col-md-6 mb-4"
    >
      <ProductCard
          :title="product.title"
          :price="product.price"
          :imageUrl="product.imageUrl"
          @add-to-cart="addToCart(product)"
          :inCart="cartItemsIds.includes(product._id)"
          :description="product.description"
      />
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Home',
  components: {
    ProductCard: () => import('@/components/ProductCard')
  },
  mounted() {
    this.fetchProducts()
  },
  computed: {
    ...mapGetters({
      products: 'products',
      cartItems: 'cartItems'
    }),
    //принимаем деструктурированный cartItems
    //проходимся ВНУТРИ него мапом, каждый _id добавляется в новый массив
    //а includes проверит присутстует ли конкр айди в массиве
    cartItemsIds: ({ cartItems }) => cartItems.map(item => item._id)
  },
  methods: {
    ...mapActions({
      fetchProducts: 'fetchProducts'
    }),
    ...mapMutations({
      addToCart: 'addToCart'
    }),
  }
}
</script>

<style lang="scss" scoped>

</style>
