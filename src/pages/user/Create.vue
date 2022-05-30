<template>
  <div class="container">
    <h1 class="header">Register</h1>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="createUser"
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
        <div v-if="this.$store.state.unique" style="color: red">
          Email {{this.$store.state.unique[0]}}
        </div>
        <v-text-field
          v-model="users.email"
          :counter="100"
          label="Email"
          required
          :rules="emailRules"
          type="email"
        ></v-text-field>

        <v-text-field
          v-model="users.password"
          :counter="100"
          label="Password"
          type="password"
          required
          :rules="passRules"
        ></v-text-field>
        <div
          v-if="this.confirm && this.confirm != this.users.password"
          class="errMsg"
        >
          {{ this.errorConfirm }}
        </div>
        <v-text-field
          v-model="confirm"
          :counter="100"
          label="Password Confirmation"
          :rules="cpassRules"
          type="password"
          required
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

        <v-file-input
          v-model="users.profile"
          label="upload Profile"
          prepend-icon="mdi-camera"
          :rules="profileRules"
          @change="addFile"
        ></v-file-input>
      </v-card>

      <div class="btn">
        <v-btn color="error" class="mr-4" @click="reset">
          Reset
        </v-btn>
        <v-btn
          type="submit"
          @click="validate"
          :disabled="!valid || this.confirm != this.users.password"
          color="#198754"
          class="mr-4"
          style="color: white"
        >
          Register
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script src="../../services/pages/user/create.js"></script>

<style scoped src="../../assets/css/pages/user/create.css"></style>
