<template>
  <div id="app">
    <MevnHeader :categories="categories"
                :cartCount="cartCount"/>
<!--    <router-view/>-->
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <h1 class="my-4">Categories</h1>
          <div class="list-group">
            <router-link
                v-for="({ id, title }, key) in categories"
                :key="key"
                :to="`/category/${id}`"
                class="list-group-item"
            >
              {{ title }}
            </router-link>
          </div>
        </div>
        <div class="col-lg-9 margin-s">
          <router-view />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    MevnHeader: () => import("@/components/layouts/Header")
  },
  data: () => ({}),
  mounted() {
    this.fetchCategories()
  },
  methods: {
    ...mapActions({
      fetchCategories: 'fetchCategories'
    })
  },
  computed: {
    ...mapGetters({
      categories: 'categories',
      cartCount: 'cartCount'
    })
  }
}
</script>

<style lang="scss">
body, html {
  padding: 0;
  margin: 0;
}

body {
  padding-top: 56px;
}

.margin-s {
  margin-top: 95px;
}


#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
