<template>
  <div class="container">
    <h1 class="header">Forgot Password?</h1>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="updatePassword"
      lazy-validation
    >
      <v-card class="mx-auto px-14 py-8 card">
        <!-- <v-alert v-if="this.$store.state.forgotnoti" type="info">
          {{ this.$store.state.forgotnoti.data.data }}
          <button class="cross-btn" @click="cancelAlert">X</button>
        </v-alert>
        <v-alert v-if="this.$store.state.forgotnoti2" type="error">
          {{ this.$store.state.forgotnoti2.error }}
          <button class="cross-btn" @click="cancelAlert">X</button>
        </v-alert> -->
        <v-text-field
          v-model="password.new"
          :counter="100"
          label="New Password"
          type="password"
          required
          :rules="passRules"
        ></v-text-field>

        <div
          v-if="
            this.password.confirm && this.password.confirm != this.password.new
          "
          class="errMsg"
        >
          {{ this.errorConfirm }}
        </div>

        <v-text-field
          v-model="password.confirm"
          :counter="100"
          label="Password Confirmation"
          :rules="cpassRules"
          type="password"
          required
        ></v-text-field>
      </v-card>

      <div class="btn">
        <v-btn
          type="submit"
          @click="validate"
          :disabled="!valid || this.password.confirm != this.password.new"
          color="#198754"
          class="mr-4"
          style="color: white"
        >
          Update Password
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script src="../../services/pages/user/reset.js"></script>

<style scoped src="../../assets/css/pages/user/reset.css"></style>

<style scoped></style>
