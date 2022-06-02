<template>
  <div class="container">
    <h1 class="header">Register Confirm</h1>
    <v-form
      ref="form"
      @submit.prevent="createUser"
      lazy-validation
    >
      <v-card class="mx-auto px-14 py-8 card">
        <v-text-field
        label="Name"
          :value="usersData.name"
          readonly
        ></v-text-field>

        <v-text-field
        label="Email"
          :value="usersData.email"
          readonly
        ></v-text-field>

        <v-text-field
        label="Password"
        type="password"
          :value="usersData.password"
          readonly
        ></v-text-field>
        <v-text-field
        label="Type"
          :value="type"
          readonly
        ></v-text-field>

        <v-text-field
        label="Phone"
          :value="usersData.phone"
          readonly
        ></v-text-field>

        <v-text-field
        label="Date Of Birth"
          :value="usersData.dob"
          readonly
        ></v-text-field>
        <v-text-field
        label="Address"
          :value="usersData.address"
          readonly
        ></v-text-field>
        <div>
          <img
              v-if="
                this.$store.state.photofile &&
                  this.$store.state.photofile.length
              "
              :src="this.$store.state.photofile"
              style="width: 250px"
          />
        </div>
        
      </v-card>

      <div class="btn">
        <v-btn style="background: #F72222; color: white;" class="mr-4" @click="cancelUser">
          Cancel
        </v-btn>
        <v-btn
          type="submit"
          color="#198754"
          class="mr-4"
          style="color: white"
        >
          Confirm
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script src="../../services/pages/user/confirm.js"></script>

<style scoped src="../../assets/css/pages/user/confirm.css"></style>