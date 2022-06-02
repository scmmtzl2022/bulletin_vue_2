<template>
  <v-card class="mx-auto card">
    <v-card-title class="login-title">
      <span class="title font-weight-light">Login</span>
    </v-card-title>
    <v-form ref="form" v-model="valid" @submit.prevent="login">
        <v-alert v-if="this.$store.state.loginnoti" type="error">
          {{ this.$store.state.loginnoti }}
          <button class="cross-btn" @click="cancelAlert">X</button>
        </v-alert>
      <v-card-text>
        <v-alert v-if="this.$store.state.forgotnoti" type="info">
          {{ this.$store.state.forgotnoti.data.data }}
          <button class="cross-btn" @click="cancelAlert">X</button>
        </v-alert>
        <v-alert v-if="this.$store.state.pwsetnoti" type="info">
          {{ this.$store.state.pwsetnoti.data.data }}
          <button class="cross-btn" @click="cancelAlert">X</button>
        </v-alert>
        <div class="login-error">{{ error }}</div>
        <div class="login-input">
          <v-text-field
            v-model="email"
            type="text"
            label="Email"
            :rules="emailRules"
            hide-details="auto"
          ></v-text-field>
        </div>
        <div class="login-input">
          <v-text-field
            v-model="password"
            type="password"
            label="Password"
            :rules="pwdRules"
            hide-details="auto"
          ></v-text-field>
        </div>

        <v-checkbox
          v-model="remember"
              label="Remember me"
              color="success"
              hide-details
              class="checkbox"
            ></v-checkbox>
      </v-card-text>
      
      <v-card-actions style="display: 0">
        <div class="login-action mt-5">
          <v-spacer></v-spacer>

          <v-btn type="submit" :disabled="!valid" large color="#459DB3" class="login"
            >Login</v-btn
          >
          
        </div>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script src="../../services/pages/user/login.js"></script>

<style scoped src="../../assets/css/pages/user/login..css"></style>
