<template>
  <div class="container">
    <h1 class="header">Create Post</h1>
    <v-form ref="form" @submit.prevent="createPost" lazy-validation>
      <v-card class="mx-auto px-14 py-8 card">
        <v-text-field
          label="Title"
          :value="PostsData.title"
          readonly
        ></v-text-field>

        <v-textarea
          label="Description"
          :value="PostsData.description"
          name="input-7-1"
          filled
          auto-grow
          class="mt-5"
          readonly
        >
        </v-textarea>
      </v-card>

      <div class="btn">
        <v-btn color="error" class="mr-4" @click="cancelPost">
          Cancel
        </v-btn>
        <v-btn type="submit" color="#198754" class="mr-4" style="color: white">
          Confirm
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  computed: {
    PostsData() {
      return this.$store.state.posts;
    },
  },
  methods: {
      /**
       * This is Post Create when confirmed
       * @returns void
       */
      createPost(){
        this.$store.dispatch("createPosts", this.PostsData).then(()=>{
              this.$router.push({
                name: "post-list",
            });
        });
      },
      /**
       * This is Cancel Function
       * @returns void
       */
      cancelPost(){
          this.$router.push({name: "post-create"})
      }
  }
};
</script>

<style scoped src="../../assets/css/pages/post/confirm.css"></style>
