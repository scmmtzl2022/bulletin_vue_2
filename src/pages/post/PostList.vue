<template>
  <v-card>
    <h1 class="header">Post List</h1>
    <v-alert v-if="this.$store.state.postnoti" type="success">
      {{ this.$store.state.postnoti.data.noti }}
      <button class="cross-btn" @click="cancelAlert">X</button>
    </v-alert>
    <v-alert v-if="this.noti != null" type="success">
      {{ this.noti }}
      <button class="cross-btn" @click="cancelAlert3">X</button>
    </v-alert>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-form ref="form" @submit.prevent="filterPosts">
        <v-row class="filter-bar">
          <v-col md="2.5">
            <v-text-field
              label="Search keyword"
              v-model="keyword"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-btn type="submit" class="post-list-btn mr-4" color="#459DB3" style="color: white">Search</v-btn>
          <v-btn class="post-list-btn mr-4" color="#459DB3" style="color: white">
            <router-link :to="{ name: 'post-create' }" class="link"
              >Create</router-link
            >
          </v-btn>
          <v-btn class="post-list-btn mr-4" color="#459DB3" style="color: white">
            <router-link :to="{ name: 'upload' }" class="link"
              >Upload</router-link
            >
          </v-btn>
          <v-btn class="post-list-btn mr-4" color="#459DB3" style="color: white" @click="download">Download</v-btn>
        </v-row>
      </v-form>
    </v-card-title>
    <v-container>
      <v-data-table :headers="headers" :items="showList">
        <template v-slot:[`item.title`]="{ item }" >
          <template>
            <v-row >
              <v-col cols="auto">
                <v-dialog
                  transition="dialog-bottom-transition"
                  max-width="700"
                  heigit="90vh"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <a color="#459DB3" v-bind="attrs" v-on="on" class="subtitle">{{
                      item.title
                    }}</a>
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-toolbar color="#459DB3" dark>Post Detail</v-toolbar>
                      <v-card-text class="clearFix">
                        <div class="right clearFix">
                          <div class="right-left">
                            <h2>Title</h2>
                            <h2>Description</h2>
                            <h2>Status</h2>
                            <h2>Created Date</h2>
                            <h2>Created User</h2>
                            <h2>Updated Date</h2>
                            <h2>Updated User</h2>
                          </div>
                          <div class="right-right">
                            <h3>{{ item.title }}</h3>
                            <h3>{{ item.description }}</h3>
                            <h3 v-if="item.status === 1">Active</h3>
                            <h3 v-if="item.status === 0">Unactive</h3>
                            <h3>{{ item.created_date }}</h3>
                            <h3>{{ item.create_user }}</h3>
                            <h3>{{ item.updated_date }}</h3>
                            <h3>{{ item.update_user }}</h3>
                          </div>
                        </div>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="dialog.value = false">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </v-col>
            </v-row>
          </template>
        </template>
        <template v-slot:[`item.created_at`]="{ item }">
          {{ item.created_date }}
        </template>
        <template v-slot:[`item.operation`]="{ item }">
          <v-row>
            <div class="operation-btn">
              <template>
                <v-row justify="space-around">
                  <v-btn
                    color="#198754"
                    class="post-list-btn"
                    style="color: white"
                  >
                    <router-link
                      :to="`/post-edit/${item.id}`"
                      :key="item.id"
                      class="link"
                      >Edit</router-link
                    >
                  </v-btn>
                  <v-col cols="auto">
                    <v-dialog
                      transition="dialog-bottom-transition"
                      max-width="700"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          style="background: #F72222; color: white;"
                          class="post-list-btn"
                          >Delete</v-btn
                        >
                      </template>
                      <template v-slot:default="dialog">
                        <v-card>
                          <v-toolbar color="#459DB3" dark
                            >Delete Confirm</v-toolbar
                          >
                          <div style="color: #459DB3; margin: 20px; font-size:20px">
                            Are you sure to delete Post?
                          </div>
                          <v-card-text class="clearFix">
                            <div class="right1 clearFix">
                              <div class="right-left1">
                                <h2>ID</h2>
                                <h2>Title</h2>
                                <h2>Description</h2><br>
                                <h2>Status</h2>
                              </div>
                              <div class="right-right1">
                                <h3>{{ item.id }}</h3>
                                <h3>{{ item.title }}</h3>
                                <h3>{{ item.description }}</h3><br>
                                <h3 v-if="item.status === 1">Active</h3>
                                <h3 v-if="item.status === 0">Deactive</h3>
                              </div>
                            </div>
                          </v-card-text>
                          <v-card-actions class="justify-end">
                            <v-btn
                              text
                              @click="dialog.value = false"
                              style="background: #6C757D; color:white;"
                              >Close</v-btn
                            >
                            <v-btn
                              text
                              @click="deletePost(item), (dialog.value = false)"
                              style="background: #F72222; color: white;"
                              >Delete</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-dialog>
                  </v-col>
                </v-row>
              </template>
            </div>
          </v-row>
        </template>
      </v-data-table>
    </v-container>
  </v-card>
</template>

<script src="../../services/post/post-list.js"></script>

<style scoped src="../../assets/css/pages/post/post-list.css"></style>
