<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-img
        max-height="50"
        max-width="150"
        contain
        :src="require('./assets/farm21.png')"
      ></v-img>
    </v-app-bar>

    <v-main>
      <router-view />
      <Login />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Login from "@/components/Login.vue";

export default Vue.extend({
  name: "App",
  components: {
    Login,
  },
});
</script>
