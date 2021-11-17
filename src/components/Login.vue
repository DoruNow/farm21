<template>
  <div>
    <v-container>
      <v-row>
        <v-col class="d-flex flex-column login__buttons--wrapper">
          <v-btn color="success" @click="login">Login</v-btn>
          <v-btn color="success" @click="logout">logout</v-btn>
          <v-btn color="success" @click="getAllProducts">getAllProducts</v-btn>
          <v-btn color="success" @click="getProductById">getProductById</v-btn>
          <v-btn color="success" @click="getUserData">getUserData</v-btn>
          <v-btn color="success" @click="updateUserData">updateUserData</v-btn>
        </v-col>
        <v-col>
          <v-container> {{ isLoggedIn }}</v-container>
          <v-container>
            <v-list>
              <v-list-item v-for="product in data" :key="product.id">
                {{ product.name }} {{ product.description }}
              </v-list-item>
            </v-list>
          </v-container>
          <v-container> {{ oneProduct.id }} {{ oneProduct.name }}</v-container>
          <v-container> {{ user.name }}</v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FarmAPIHelper from "@/services/api.service";
import IProduct from "@/types/product";
import IUser from "@/types/user";
import { mapMutations, mapState } from "vuex";

export default Vue.extend({
  data: () => ({
    api: new FarmAPIHelper("api/"),
    data: [] as IProduct[],
    oneProduct: {} as IProduct,
    user: {} as IUser,
  }),

  computed: {
    ...mapState(["isLoggedIn"]),
  },

  created() {
    localStorage.clear();
  },

  methods: {
    ...mapMutations(["setLoggedIn"]),
    login(): void {
      this.api
        .login("assessment@farm21.com", "8aCdG2f!*LH#")
        .then(() => this.setLoggedIn({ isLoggedIn: true }))
        .catch((err) => console.log(err));
    },

    logout(): void {
      this.api
        .logout()
        .then(() => this.setLoggedIn({ type: Boolean, isLoggedIn: false }))
        .catch((err) => console.log(err));
    },

    getAllProducts(): void {
      this.api
        .getAllProducts()
        .then((data: IProduct[]): IProduct[] => {
          return (this.data = data);
        })
        .catch((err) => console.log(err));
    },

    getProductById(): void {
      this.api
        .getProductById("1")
        .then((data: IProduct): IProduct => (this.oneProduct = data))
        .catch((err) => console.log(err));
    },

    getUserData(): void {
      this.api
        .getUserData()
        .then((data: IUser): IUser => (this.user = data))
        .catch((err) => console.log(err));
    },

    updateUserData(body: IUser) {
      body = {
        name: "lorem",
        email: "lorem@ipsum",
        password: "8aCdG2f!*la#",
        password_confirmation: "8aCdG2f!*la#",
      };

      this.api
        .updateUserData(body)
        .then((data: IUser): IUser => (this.user = data))
        .catch((err) => console.log(err));
    },
  },
});
</script>

<style scoped lang="scss">
.login {
  &__buttons {
    &--wrapper {
      // not a good idea in itself, just some scss with BEM demo
      & button {
        margin: 10px;
      }
    }
  }
}
</style>
