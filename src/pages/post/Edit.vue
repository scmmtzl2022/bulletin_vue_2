<template>
  <div class="container">
    <h1 class="header">Edit Post</h1>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="editPost"
      lazy-validation
    >
      <v-card class="mx-auto px-14 py-8 card">
          <div v-if="this.$store.state.error" class="errMsg">
            Title {{this.$store.state.error.title[0]}}
        </div>
        <v-text-field
          v-model="posts.title"
          :counter="255"
          label="Title"
          :rules="titleRules"
        ></v-text-field>

        <v-textarea
          v-model="posts.description"
          name="input-7-1"
          filled
          label="Description"
          auto-grow
          class="mt-5"
          :rules="descriptRules"
        ></v-textarea>

        <template>
          <v-container class="px-0" fluid>
            <v-switch
            color="success"
              v-model="switch1"
              :label="`Status`"
            ></v-switch>
          </v-container>
        </template>
      </v-card>
        
      <div class="btn">
        <v-btn color="error" class="mr-4" @click="clear">
          Clear
        </v-btn>
        <v-btn
          type="submit"
          @click="validate"
          :disabled="!valid"
          color="#198754"
          class="mr-4"
          style="color: white"
        >
          Edit
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script src="../../services/post/edit.js"></script>

<style scoped src="../../assets/css/pages/post/edit.css"></style>