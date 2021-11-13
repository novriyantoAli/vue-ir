<template>
  <v-card flat>
    <v-form ref="form" v-model="valid">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="data.nik"
              :rules="nikRules"
              label="Nomor Induk Karyawan"
              type="number"
              required>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field 
              v-model="data.nktp"
              :rules="noKTPRules"
              label="No. KTP"
              type="number"
              >    
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="data.nama_lengkap"
              :rules="textNoNullRules"
              label="Nama Lengkap"
              >    
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="data.nama_panggilan"
              :rules="textNoNullRules"
              label="Nama Panggilan"
              >    
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="data.alamat" color="teal" :rules="textNoNullRules" >
              <template v-slot:label>
                <div>Alamat <small>(diperinci)</small></div>
              </template>
            </v-textarea>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              v-model="data.provinsi"
              :items="items"
              :loading="isLoading"
              :search-input.sync="search"
              hide-no-data
              hide-selected
              item-text="nama_kabupaten"
              item-value="provinsi"
              label="Kabupaten"
              placeholder="Nama Kabupaten"
              prepend-icon="mdi-database-search"
              return-object>    
            </v-autocomplete>
            <v-divider></v-divider>
            <v-expand-transition>
              <v-list v-if="data.provinsi" class="red lighten-3">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{data.provinsi.nama_kabupaten}}</v-list-item-title>
                    <v-list-item-subtitle>Kabupaten</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{data.provinsi.provinsi.nama_provinsi}}</v-list-item-title>
                    <v-list-item-subtitle>Provinsi</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-expand-transition>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="NO HP"
              type="number"
              v-model="data.nohp"
              :rules="noHPRules">    
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-radio-group v-model="data.jenis_kelamin" data.jenis_kelamin>
              <v-radio label="LAKI-LAKI" value="Pria"></v-radio>
              <v-radio label="PEREMPUAN" value="Wanita"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="data.tempat_lahir"
              :rules="textNoNullRules"
              label="Tempat Lahir"
              >    
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <template>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="data.tanggal_lahir"
                    label="Tanggal Lahir"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on">    
                  </v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="data.tanggal_lahir"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  @change="save">    
                </v-date-picker>
              </v-menu>
            </template>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select 
              v-model="data.agama"
              :items="agamaItems"
              :rules="textNoNullRules"
              label="Agama"
              >    
            </v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select 
              v-model="data.status_perkawinan"
              :items="statusPerkawinanItems"
              :rules="textNoNullRules"
              label="Status Perkawinan"
              >    
            </v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-radio-group v-model="data.kewarganegaraan" data.kewarganegaraan>
              <v-radio label="WNI" value="WNI"></v-radio>
              <v-radio label="WNA" value="WNA"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select 
              v-model="data.golongan_darah"
              :items="golonganDarahItems"
              :rules="textNoNullRules"
              label="Golongan Darah"
              >    
            </v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="data.bahasa"
              :rules="textNoNullRules"
              label="Bahasa"
              >    
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Suku"
              v-model="data.suku"
              :rules="textNoNullRules"
              >    
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Daerah Asal"
              v-model="data.daerah_asal"
              :rules="textNoNullRules"
              >      
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-file-input label="Foto" :rules="imageRules" v-model="image" @change="onFileChange"/>
          </v-col>
          <v-col cols="12" sm="3">
            <v-img :src="pegawaiImageUrl" />
          </v-col>
          <v-col cols="12" sm="3">
            <v-btn color="primary" :disabled="!valid" @click="saveLocal">
              Simpan
            </v-btn>
          </v-col>
        </v-row>
      </v-container>        
    </v-form>
  </v-card>
</template>
<script>
  // import { validationMixin } from 'vuelidate'
  // import { required, maxLength, email } from 'vuelidate/lib/validators'

  import { kabupatenService } from '@/_services';
  import { pegawaiService } from '@/_services';

  export default {
      props: {
        source: String,
      },
      data: () => ({
        menu: false,
        valid: true,

        // FOR AUTO COMPLETE PROVINSI
        descriptionLimit: 60,
        entries: [],
        isLoading: false,
        provinsi: null,
        search: null,
        // END AUTO COMPLETE

        data: {
          id: null,
          id_kabupaten: null,
          nik: "",
          nama_lengkap: "",
          nama_panggilan: "",
          alamat: "",
          nktp: "",
          nohp: "",
          jenis_kelamin: "",
          tempat_lahir: "",
          tanggal_lahir: "",
          agama: "",
          status_perkawinan: "",
          kewarganegaraan: "",
          golongan_darah: "",
          bahasa: "",
          suku: "",
          daerah_asal: "",
          tanggal_mulai_bekerja: "",
          jabatan_sekarang: null,
          level: "",
          divisi: "",
          departemen: null,
          seksi: "",
          bagian: "",
          status_karyawan: "",
          tanggal_pengangkatan: "",
          masa_kerja: null,
          no_rekening: "",
          no_bpjs_kesehatan: "",
          no_bpjs_ketenagakerjaan: "",
          provinsi: null,
        },

        nik: "",
        nikRules: [
          (v) => v.length > 4 || "Isian angka yang anda masukkan tidak valid",
          (v) => Number.isInteger(Number(v)) || "Isian ini harus berupa angka",
          (v) => v > 0 || "Isian angka yang anda masukkan tidak valid ",
        ],

        noktp: "",
        noKTPRules: [
          (v) => v.length > 4 || "Isian angka yang anda masukkan tidak valid",
          (v) => Number.isInteger(Number(v)) || "Isian ini harus berupa angka",
          (v) => v > 0 || "Isian angka yang anda masukkan tidak valid ",
        ],

        namalengkap: "",
        namaPanggilan: "",
        alamat: "",
        textNoNullRules: [
          (v) => !!v || "Data isian tidak valid",
          (v) =>(v && v.length > 0) || "Data isian tidak bisa kosong",
        ],

        nohp: "",
        noHPRules: [
                  (v) => v.length == 12  || "Data Isian yang anda masukkan tidak valid",
          (v) => Number.isInteger(Number(v)) || "Isian ini harus berupa angka",
          (v) => v > 0 || "Isian angka yang anda masukkan tidak valid ",
        ],
        
        jenis_kelamin: "Pria",
        
        tempatLahir: "",
        
        tanggalLahir: null,

        agamaItems: ["Islam", "Protestan", "Katolik", "Hindu", "Budha", "Lainnya"],
        agama: "",

        statusPerkawinanItems: ["Kawin", "Belum Kawin", "Cerai Hidup", "Cerai Mati"],
        kawin: "",

        kewarganegaraan: "WNI",
        
        golonganDarahItems: ["A", "AB", "B", "O"],
        golonganDarah: "",

        bahasa: "",

        suku: "",

        daerahasal: "",

        imageRules: [
          value => !value || value.size < 2000000 || 'Avatar size should be le'
        ],
        image: undefined,
        pegawaiImageUrl: "",
      }),
      methods: {
        save (date) {
          this.$refs.menu.save(date)
        },
        saveLocal(){
          pegawaiService.saveDataUmum(this.data);
        },
        createImage(file) {
          const reader = new FileReader();
          reader.onload = e => {
            this.pegawaiImageUrl = e.target.result;
          };
          reader.readAsDataURL(file);
        },
        onFileChange(file) {
          if (!file) { return; }
          this.createImage(file);
        },
      },
      created () {
        pegawaiService.currentDataUmum.subscribe( x => {
          if (x != null) {
            this.data.id = x.id
            this.data.id_kabupaten = x.id_kabupaten
            this.data.nik = x.nik
            this.data.nama_lengkap = x.nama_lengkap
            this.data.nama_panggilan = x.nama_panggilan
            this.data.alamat = x.alamat
            this.data.nktp = x.nktp
            this.data.nohp = x.nohp
            this.data.jenis_kelamin = x.jenis_kelamin
            this.data.tempat_lahir = x.tempat_lahir
            this.data.tanggal_lahir = x.tanggal_lahir
            this.data.agama = x.agama
            this.data.status_perkawinan = x.status_perkawinan
            this.data.kewarganegaraan = x.kewarganegaraan
            this.data.golongan_darah = x.golongan_darah
            this.data.bahasa = x.bahasa
            this.data.suku = x.suku
            this.data.daerah_asal = x.daerah_asal
            this.data.provinsi = x.provinsi
          }
        });
      },

      computed: {
        // auto complete feature
        fields () {
          if (!this.data.provinsi) return []
          return Object.keys(this.data.provinsi).map(key => {
            return {key, value: this.data.provinsi[key] || 'n/a'}
          })
        },
        items () {
          if (this.entries == null) {
            return;
          }

          return this.entries.map( entry => {
            var lengthDesc = entry.nama_kabupaten + " -> " + entry.provinsi.nama_provinsi
            const Description = lengthDesc.length > this.descriptionLimit
              ? lengthDesc.slice(0, this.descriptionLimit) + '...'
              : lengthDesc

            return Object.assign({}, entry, { Description })
          })
        },
        // end of auto complete feature
      },
      watch: {
        search (val) {

          // Items have already been requested
          if (this.isLoading) return

          this.isLoading = true
          kabupatenService.searchAll(val).then(
            prov => {
              this.isLoading = false;
              this.entries = prov; 
            },
            error => {
              this.errors = error
              this.isLoading = false;
            }
          );
        }
      }
  };
</script>