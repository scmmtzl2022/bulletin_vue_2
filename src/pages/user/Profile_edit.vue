<template>
  <div class="container">
    <h1 class="header">Profile Edit</h1>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="editProfile"
      lazy-validation
    >
      <v-card class="mx-auto px-14 py-8 card">
        <v-text-field
          v-model="users.name"
          :counter="100"
          label="Name"
          required
          :rules="nameRules"
        ></v-text-field>

        <div v-if="this.$store.state.unique != null" class="errMsg">
          Email {{ this.$store.state.unique.email[0] }}
        </div>
        <v-text-field
          v-model="users.email"
          :counter="100"
          label="Email"
          required
          :rules="emailRules"
          type="email"
        ></v-text-field>

        <v-select :items="items" v-model="users.role" label="User"></v-select>

        <v-text-field
          v-model="users.phone"
          :counter="11"
          label="Phone"
          required
          :rules="phoneRules"
        ></v-text-field>
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
                v-model="users.dob"
                label="Picker in dialog"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="users.dob"
              scrollable
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              min="1995-01-01"
            >
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
        <v-textarea
          v-model="users.address"
          name="input-7-1"
          filled
          label="Address"
          auto-grow
        ></v-textarea>
        <div v-if="this.invi == false">
          <img
            v-if="this.image"
            :src="this.image"
            alt=""
            style="width: 250px"
          />
        </div>
        <v-file-input
          v-model="profile"
          label="upload New Profile"
          prepend-icon="mdi-camera"
          @change="changeProfile"
        ></v-file-input>
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
          Edit
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script src="../../services/pages/user/profile_edit.js"></script>

<style scoped src="../../assets/css/pages/user/profile_edit.css"></style>
