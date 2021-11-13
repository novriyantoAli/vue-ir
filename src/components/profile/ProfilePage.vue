<template>
  <v-container>
      <div>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-forward</v-icon>
      </template>
    </v-breadcrumbs>

    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </div>
    <div v-if="!submitted">
      <v-card class="mx-auto">
        <v-card-text>
        <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="tutorial.title"
          :rules="[(v) => !!v || 'Title is required']"
          label="Title"
          required
        ></v-text-field>

        <v-text-field
          v-model="tutorial.description"
          :rules="[(v) => !!v || 'Description is required']"
          label="Description"
          required
        ></v-text-field>
      </v-form>  
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" class="mt-3" @click="saveTutorial">Submit</v-btn>
          
        </v-card-actions>
      </v-card>
    </div>
    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add new Tutorial.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newTutorial">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
  export default {
    name: "add-tutorial",
    data() {
      return {
        tutorial: {
          id: null,
          title: "",
          description: "",
          published: false,
        },
        submitted: false,
      };
    },
    methods: {
      saveTutorial() {
        // var data = {
        //   title: this.tutorial.title,
        //   description: this.tutorial.description,
        // };
      },

      newTutorial() {
        this.submitted = false;
        this.tutorial = {};
      },
    },
  };
</script>

<style>
  .submit-form {
    max-width: 300px;
  }
</style>