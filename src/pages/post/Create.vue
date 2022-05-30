<template>
  <div class="container">
    <h1 class="header">Create Post</h1>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="createPost"
      lazy-validation
    >
      <v-card class="mx-auto px-14 py-8 card">
          <div v-if="this.$store.state.posterror" class="errMsg">
             Title {{this.$store.state.posterror[0]}}
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
      </v-card>

      <div class="btn">
        <v-btn style="background: #F72222; color: white;" class="mr-4" @click="clear">
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
          Create
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script src="../../services/post/create.js"></script>

<style scoped src="../../assets/css/pages/post/create.css"></style>
