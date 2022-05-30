<template>
  <div class="container">
    <h1 class="header">Forgot Password?</h1>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="resetPassword"
      lazy-validation
    >
      <v-card class="mx-auto px-14 py-8 card">
        
        <v-alert v-if="this.$store.state.forgotnoti2" type="error">
          {{ this.$store.state.forgotnoti2 }}
          <button class="cross-btn" @click="cancelAlert">X</button>
        </v-alert>
        <v-text-field
          v-model="forgot.email"
          :counter="100"
          label="Email"
          required
          :rules="emailRules"
          type="email"
        ></v-text-field>
      </v-card>

      <div class="btn">
        <v-btn
          type="submit"
          @click="validate"
          :disabled="!valid"
          color="#198754"
          class="mr-4"
          style="color: white"
        >
          Reset Password
        </v-btn>
      </div>
    </v-form>
  </div>
</template>


<script src="../../services/pages/user/forget.js"></script>

<style scoped src="../../assets/css/pages/user/forget.css"></style>
