<template>
 <div class="container">
   <template v-if="cartItems">
     <ul class="list-group">
       <li class="list-group-item" v-for="(item, key) in cartItems" :key="key">
         {{ item.title }} - {{ item.price }}
       </li>
     </ul>
     <div class="panel">
       Quantity: {{ cartCount }}
       Total: {{ cartTotalPrice }}
     </div>
   </template>
   <template v-else>
     Your cart is empty
   </template>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Cart",
  computed: {
    ...mapGetters({
      cartItems: 'cartItems',
      cartTotalPrice: 'cartTotalPrice',
      cartCount: 'cartCount'
    })
  }
}
</script>

<style scoped>

</style>
