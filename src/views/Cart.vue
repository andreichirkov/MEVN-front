<template>
 <div class="container">
   <template v-if="cartItems.length > 0">
     <ul class="list-group">
       <li class="list-group-item" v-for="(item, key) in cartItems" :key="key">
         {{ item.title }} - {{ item.price }}
       </li>
     </ul>
     <div class="panel">
       Quantity: {{ cartCount }} Total: {{ cartTotalPrice }}
     </div>

     <button class="btn btn-success" @click="handleGetPaymentIndent">Купить</button>

     <template v-if="paymentIndent">
       <card class='stripe-card'
             :class='{ complete }'
             stripe='pk_test_51IOPsbCxyJSINBfHsZISkCXDSvwtuCwpetQMtLI3LqXeZMSPyaPjOC2M1AwsCoDZsQIjKWXHHMXu2Z8WfW33Eo1N00Qy2Z23WM'
             :options='stripeOptions'
             @change='complete = $event.complete'
       />
       <button class='btn btn-success' @click='pay' :disabled='!complete'>Pay with credit card</button>
     </template>

   </template>
   <template v-else>
     Your cart is empty
   </template>
 </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { Card, handleCardPayment } from 'vue-stripe-elements-plus'

export default {
  name: "Cart",
  components: { Card },
  data: () => ({
    complete: false,
    stripeOptions: {
      // see https://stripe.com/docs/stripe.js#element-options for details
    },
    paymentIndent: null
  }),
  computed: {
    ...mapGetters({
      cartItems: 'cartItems',
      cartTotalPrice: 'cartTotalPrice',
      cartCount: 'cartCount'
    })
  },
  methods: {
    ...mapActions({
      handleBuy: 'handleBuy'
    }),
    ...mapMutations({
      clearCart: 'clearCart'
    }),
    async handleGetPaymentIndent() {
      const indent = await this.handleBuy()
      console.log(indent)
      this.paymentIndent = indent.client_secret
    },
    async pay(card) {
      try {
        //если будет ошибка -> корзина не очистится
        await handleCardPayment(this.paymentIndent)
        this.clearCart()
      } catch(e) {
        console.log(e)
      }


    }
  }
}
</script>

<style scoped>

.stripe-card {
  width: 300px;
  border: 1px solid grey;
}
.stripe-card.complete {
  border-color: green;
}

</style>
