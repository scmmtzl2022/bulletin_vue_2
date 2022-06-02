<template>
    <div class="container">
    <div class="header">
    <h3>Profile</h3>
    </div>
      <v-card class="mx-auto px-14 py-8 card">
        <v-btn color="#198754" class="btn-profile mr-4" style="color: white" @click="editProfile">
          Edit Profile
        </v-btn>
        <div>
          <img
              v-if="this.image"
              :src="this.image"
              style="height: 50px;"
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
  </div>
</template>

<script src="../../services/pages/user/profile.js"></script>

<style scoped src="../../assets/css/pages/user/profile.css"></style>