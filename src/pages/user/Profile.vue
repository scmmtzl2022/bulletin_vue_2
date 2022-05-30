<template>
    <div class="container">
    <h1 class="header">Profile</h1>
    
      <v-card class="mx-auto px-14 py-8 card">
        <div>
          <img
              v-if="this.image"
              :src="this.image"
              style="width: 250px"
          />
        </div>
        <v-text-field
        label="Name"
        :value="profileData.name"
          readonly
        ></v-text-field>

        <v-text-field
        :value="this.type"
        label="Type"
          readonly
        ></v-text-field>

        <v-text-field
        :value="profileData.email"
        label="Email"
          readonly
        ></v-text-field>

        <v-text-field
        :value="profileData.phone"
        label="Phone"
          readonly
        ></v-text-field>

        <v-text-field
        :value="profileData.dob"
        label="Date Of Birth"
          readonly
        ></v-text-field>

        <v-text-field
        :value="profileData.address"
        label="Address"
          readonly
        ></v-text-field>       
        
      </v-card>

      <div class="btn">
        <v-btn color="#198754" class="mr-4" style="color: white" @click="editProfile">
          Edit Profile
        </v-btn>
        
      </div>
  </div>
</template>

<script src="../../services/pages/user/profile.js"></script>

<style scoped src="../../assets/css/pages/user/profile.css"></style>