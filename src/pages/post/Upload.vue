<template>
  <div class="container">
    <h1 class="header">Upload CSV file</h1>
    <v-form ref="form" @submit.prevent="upload" lazy-validation>
      <v-card class="mx-auto px-14 py-8 card">
        <v-alert v-if="this.errorMsg != null" type="error">
          <span v-if="this.errorMsg1 != null">
            "{{ this.errorMsg1 }}" in import file</span
          >
          {{ this.errorMsg }}
          <button class="cross-btn" @click="close">X</button>
        </v-alert>
        <v-alert v-if="this.noti != null" type="success">
          {{ this.noti.data }}
          <button class="cross-btn" @click="close">X</button>
        </v-alert>
        <v-file-input
          label="CSV file"
          prepend-icon="attachment"
          v-model="csvfile"
          :rules="csvRules"
          class="file"
        ></v-file-input>
        <div class="btn">
          <v-btn color="error" class="clear-btn" @click="clear">Clear</v-btn>
          <v-btn
            color="#198754"
            type="submit"
            style="color: white"
            @click="validate"
            >Submit</v-btn
          >
        </div>
      </v-card>
    </v-form>
  </div>
</template>

<script src="../../services/post/upload.js"></script>

<style scoped src="../../assets/css/pages/post/upload.css"></style>
