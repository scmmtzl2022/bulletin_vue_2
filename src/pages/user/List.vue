<template>
  <v-card>
    <h1 class="header">User List</h1>
    <v-alert v-if="this.$store.state.noti" type="success">
      {{ this.$store.state.noti.data.noti}}
      <button class="cross-btn" @click="cancelAlert">X</button>
    </v-alert>
    <v-alert v-if="this.$store.state.editnoti" type="success">
      {{ this.$store.state.editnoti.data }}
      <button class="cross-btn" @click="cancelAlert2">X</button>
    </v-alert>
    <v-alert v-if="this.noti != null" type="success">
      {{ this.noti }}
      <button class="cross-btn" @click="cancelAlert3">X</button>
    </v-alert>
    <v-alert v-if="this.$store.state.pwsuccess" type="success">
      {{ this.$store.state.pwsuccess }}
      <button class="cross-btn" @click="cancelAlert4">X</button>
    </v-alert>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-form ref="form" @submit.prevent="filtername">
        <v-row class="filter-bar">
          <v-text-field
            label="Name"
            v-model="keyword"
            hide-details="auto"
            class="mr-5"
          >
          </v-text-field>

          <v-text-field label="Email" v-model="ekeyword" hide-details="auto">
          </v-text-field>

          <div>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="startDate"
                  label="From"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="startDate" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </div>
          <div>
            <v-dialog
              ref="dialog2"
              v-model="modal2"
              :return-value.sync="date2"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="endDate"
                  label="To"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="endDate" scrollable>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="(modal2 = false), ($refs.dialog2.date2 = null)"
                >
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog2.save(date2)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </div>
          <v-btn
            type="submit"
            class="post-list-btn mr-4"
            color="#459DB3"
            style="color: white"
            >Search</v-btn
          >
        </v-row>
      </v-form>
    </v-card-title>
    <v-container>
      <v-flex style="overflow: auto">
        <v-data-table
          :headers="headers"
          :items="showList"
          :image="image"
          :role="role"
        >
          <template v-slot:[`item.name`]="{ item }">
            <template>
              <v-row justify="space-around">
                <v-col cols="auto">
                  <v-dialog
                    transition="dialog-bottom-transition"
                    max-width="700"
                    heigit="90vh"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <a
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                        @click="getImage(item.id)"
                        >{{ item.name }}</a
                      >
                    </template>
                    <template v-slot:default="dialog">
                      <v-card>
                        <v-toolbar color="primary" dark>User Detail</v-toolbar>
                        <v-card-text class="clearFix">
                          <div class="left clearFix">
                            <img :src="image" style="width: 150px" alt="" />
                          </div>
                          <div class="right clearFix">
                            <div class="right-left">
                              <h2>name</h2>
                              <h2>Type</h2>
                              <h2>email</h2>
                              <h2>Phone</h2>
                              <h2>Date Of Birth</h2>
                              <h2>Address</h2>
                              <h2>Created Date</h2>
                              <h2>Created User</h2>
                              <h2>Updated Date</h2>
                              <h2>Updated User</h2>
                            </div>
                            <div class="right-right">
                              <h3>{{ item.name }}</h3>
                              <h3>{{ role }}</h3>
                              <h3>{{ item.email }}</h3>
                              <h3>{{ item.phone }}</h3>
                              <h3>{{ item.dob }}</h3>
                              <h3>{{ item.address }}</h3>
                              <h3>{{ item.created_at }}</h3>
                              <h3>{{ item.user_name }}</h3>
                              <h3>{{ item.updated_at }}</h3>
                              <h3>{{ item.update_name }}</h3>
                              <!-- <h3>{{item.role}}</h3> -->
                            </div>
                          </div>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                          <v-btn text @click="dialog.value = false"
                            >Close</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-col>
              </v-row>
            </template>
          </template>
          <template v-slot:[`item.role`]="{ item }">
            <div v-if="item.role === 0">
              Admin
            </div>
            <div v-if="item.role === 1">
              User
            </div>
          </template>
          <template v-slot:[`item.operation`]="{ item }">
            <v-row>
              <div class="operation-btn">
                <!-- <v-btn
                  color="error"
                  @click="deleteUser(item)"
                  class="post-list-btn"
                  >Delete</v-btn
                > -->
                <template>
                  <v-row justify="space-around">
                    <v-col cols="auto">
                      <v-dialog
                        transition="dialog-bottom-transition"
                        max-width="600"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <!-- <btn
                            color="primary"
                            v-bind="attrs"
                            v-on="on"
                            @click="getImage(item.id)"
                            >{{ item.name }}</btn
                          > -->
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            color="error"
                            class="post-list-btn"
                            @click="getImage(item.id)"
                            >Delete</v-btn
                          >
                        </template>
                        <template v-slot:default="dialog">
                          <v-card>
                            <v-toolbar color="primary" dark
                              >Delete Confirm</v-toolbar
                            >
                            <div
                              style="color: red; margin: 20px; font-size:20px"
                            >
                              Are you sure to delete user?
                            </div>
                            <v-card-text class="clearFix">
                              <div class="right1 clearFix">
                                <div class="right-left1">
                                  <h2>ID</h2>
                                  <h2>name</h2>
                                  <h2>Type</h2>
                                  <h2>email</h2>
                                  <h2>Phone</h2>
                                  <h2>Date Of Birth</h2>
                                  <h2>Address</h2>
                                </div>
                                <div class="right-right1">
                                  <h3>{{ item.id }}</h3>
                                  <h3>{{ item.name }}</h3>
                                  <h3>{{ role }}</h3>
                                  <h3>{{ item.email }}</h3>
                                  <h3>{{ item.phone }}</h3>
                                  <h3>{{ item.dob }}</h3>
                                  <h3>{{ item.address }}</h3>
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
                                @click="
                                  deleteUser(item), (dialog.value = false)
                                "
                                style="background: #FF6060; color: white;"
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
      </v-flex>
    </v-container>
  </v-card>
</template>

<script src="../../services/pages/user/list.js"></script>

<style scoped src="../../assets/css/pages/user/list.css"></style>
