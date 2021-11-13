<template>
  <v-card flat>
    <v-form ref="form" @submit.prevent="submit">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6">
            <template>
              <v-row justify="center">
                <v-date-picker v-model="tanggalMulaiBekerja"></v-date-picker>
              </v-row>
            </template>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Tanggal Mulai Bekerja"
              v-model="tanggalMulaiBekerja"
              :rules="textNotNullRules"
              required>    
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <template>
              <v-row justify="center">
                <v-date-picker v-model="tanggalPengangkatan"></v-date-picker>
              </v-row>
            </template>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Tanggal Pengangkatan"
              v-model="tanggalPengangkatan"
              :rules="textNotNullRules"
              required>    
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Level"
              v-model="level"
              :rules="textNotNullRules"
              required>    
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Divisi"
              :rules="textNotNullRules"
              v-model="divisi"
              required>
              </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="seksi"
              :rules="textNotNullRules"
              label="Seksi"
              required>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="bagian"
              :rules="textNotNullRules"
              label="Bagian"
              required>    
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select 
              v-model="status_karyawan"
              :items="statusKaryawan"
              :rules="textNotNullRules"
              label="Status Karyawan"
              required>
            </v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="nomor_rekening"
              :rules="textNotNullRules"
              label="Nomor Rekening"
              type="number"
              required>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="no_bpjs_kesehatan"
              :rules="textNotNullRules"
              label="No. BPJS Kesehatan"
              type="number"
              required>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="no_bpjs_ketenagakerjaan"
              :rules="textNotNullRules"
              label="No. BPJS Ketenagakerjaan"
              type="number"
              required>
            </v-text-field>
          </v-col>            
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>
<script>
  export default {
      props: {
        source: String,
      },
      data: () => ({
        textNotNullRules: [
          (v) => !!v || "Data isian tidak valid",
          (v) =>(v && v.length > 0) || "Data isian tidak bisa kosong",
        ],
        statusKaryawan: [
          "PKWTT", 
          "PKWT PRODUK BARU", 
          "PKWT MUSIMAN", 
          "PKWT", 
          "KONTRAK", 
          "HARIAN LEPAS"
        ],

        tanggalMulaiBekerja: null,
        
        level: "",

        divisi: "",

        seksi: "",

        bagian: "",

        status_karyawan: "",
        
        tanggalPengangkatan: null,

        nomor_rekening: "",

        no_bpjs_kesehatan: "",

        no_bpjs_ketenagakerjaan: "",
      }),
      methods: {
        save (date) {
          this.$refs.menu.save(date)
        },
        save1 (date) {
          this.$refs.menu1.save1(date)
        },
      },
      created () { },
      computed: { },
      watch: { }
  };
</script>