<template>
  <section>
    <v-container class="pa-2" fluid>
      <v-row>
        <v-col>
          <v-alert v-if="errors" type="error" class="mt-4">{{errors}}</v-alert>
          <v-card color="#385F73" dark>
            <v-card-text class="white--text">
              <div class="headline mb-2" v-if="user">{{user}}</div>
              Listen to your favorite artists and albums whenever and wherever, online and offline.
            </v-card-text>
 
            <v-card-actions>
              <v-btn text>Listen Now</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
 
<script>
export default {
    data: () => ({
        user:null,
        result:null,
        errors:null
    }),
    mounted: function () {
        this.user=this.$store.state.user;
    },
    created: function () {
    authenticationService.currentUser.subscribe(x => this.currentUser = x);
  },
  mounted: function () {
    this.loading = true

    pegawaiService.getByNIK(this.currentUser.nik).then(
      pegawai => {
        console.log(pegawai);
        this.pegawaiResult = pegawai;
        this.loading = false;
      }, 
      error => {
        console.log(error);

        this.loading = false;
        this.errors = error;
        this.snackbar = true;
      }
    );
  },
}
</script>