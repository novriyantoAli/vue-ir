<template>
  <v-data-table
    :headers="headersDataKeluarga"
    :items="dataKeluarga"
    sort-by="Nama Keluarga"
    class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>DATA KELUARGA</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dataKeluargaDialog" max-width="700px">
          <template v-slot:activator="{ on, attrs }">
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-btn color="success" dark class="mb-2" v-bind="attrs" v-on="on">Buat Baru</v-btn>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-btn color="primary" :disabled="dataKeluarga.length <= 0" @click="saveToLocal" >Simpan</v-btn>
              </v-col>
            </v-row>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="dataKeluargaEditedItem.nama" label="Nama Keluarga">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-radio-group 
                      v-model="dataKeluargaEditedItem.jenis_kelamin"
                      dataKeluargaEditedItem.jenis_kelamin>
                      <v-radio label="LAKI-LAKI" value="Pria"></v-radio>
                      <v-radio label="PEREMPUAN" value="Wanita"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
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
                            v-model="dataKeluargaEditedItem.tanggal_lahir"
                            label="Tanggal Lahir"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on">
                          </v-text-field>
                        </template>
                        <v-date-picker
                          ref="picker"
                          v-model="dataKeluargaEditedItem.tanggal_lahir"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          @change="save">    
                        </v-date-picker>
                      </v-menu>
                    </template> 
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select 
                      v-model="dataKeluargaEditedItem.hubungan"
                      :items="hubungans"
                      :rules="textNotNullRules"
                      label="Hubungan"
                      required>    
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="dataKeluargaEditedItem.pendidikan"
                      label="Pendidikan">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="dataKeluargaEditedItem.pekerjaan"
                      :rules="textNotNullRules"
                      label="Pekerjaan"
                      required>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="closeDataKeluarga">
                BATAL
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="saveDataKeluargaItem">SIMPAN
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dataKeluargaDialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Apakah anda yakin ingin menghapus baris ini?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDeleteDataKeluarga">BATAL</v-btn>
              <v-btn color="blue darken-1" text @click="deleteDataKeluargaItemConfirm">
                HAPUS
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.aksi="{ item }">
      <v-icon small class="mr-2" @click="editDataKeluargaItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteDataKeluargaItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initializeDataKeluarga">
        Reset
      </v-btn>
    </template>
  </v-data-table>  
</template>

<script>
  import { pegawaiService } from '@/_services';

  export default {
      props: {
        source: String,
      },
      data: () => ({
        textNotNullRules: [
          (v) => !!v || "Data isian tidak valid",
          (v) =>(v && v.length > 0) || "Data isian tidak bisa kosong",
        ],
        menu: false,
        headersDataKeluarga: [
        {
          text: 'Nama Keluarga',
          align: 'start',
          sortable: false,
          value: 'nama',
        },
        { text: 'Hubungan', value: 'hubungan' },
        { text: 'Jenis Kelamin', value: 'jenis_kelamin' },
        { text: 'Tanggal Lahir', value: 'tanggal_lahir' },
        { text: 'Pendidikan', value: 'pendidikan' },
        { text: 'Pekerjaan', value: 'pekerjaan' },
        { text: 'Aksi', value: 'aksi', sortable: false },
        ],
        dataKeluarga: [],
        dataKeluargaEditedIndex: -1,
        dataKeluargaDialog: false,
        dataKeluargaDialogDelete: false,
        dataKeluargaEditedItem: {
          nama: '',
          jenisKelamin: 'Pria',
          tanggalLahir: null,
          hubungan: "",
          pendidikan: "",
          pekerjaan: "",
        },
        dataKeluargaDefaultItem: {
          nama: '',
          jenisKelamin: 'Pria',
          tanggalLahir: null,
          hubungan: "",
          pendidikan: "",
          pekerjaan: "",
        },
        hubungans: [
        "Ayah", "Ibu", "Saudara", "Suami", "Istri", "Anak"
        ],
        // END DATA KELUARGA
      }),
      
      methods: {
        saveToLocal () {
          pegawaiService.saveDataKeluarga(this.dataKeluarga);
        },

        save (date) {
          this.$refs.menu.save(date)
        },
        // DATA KELUARGA TABLE OPERATION
        initializeDataKeluarga () {
          this.dataKeluarga = [];
        },
        saveDataKeluargaItem () {
          if (this.dataKeluargaEditedIndex > -1) {
            Object.assign(
              this.dataKeluarga[this.dataKeluargaEditedIndex], this.dataKeluargaEditedItem
            );
          } else {
            this.dataKeluarga.push(this.dataKeluargaEditedItem);
          }
          this.closeDataKeluarga();
        },
        editDataKeluargaItem (item) {
          this.dataKeluargaEditedIndex = this.dataKeluarga.indexOf(item)
          this.dataKeluargaEditedItem = Object.assign({}, item)
          this.dataKeluargaDialog = true
        },
        closeDataKeluarga() {
          this.dataKeluargaDialog = false
          this.$nextTick(() => {
            this.dataKeluargaEditedItem = Object.assign({}, this.dataKeluargaDefaultItem)
            this.dataKeluargaEditedIndex = -1
          })
        },
        closeDeleteDataKeluarga () {
          this.dataKeluargaDialogDelete = false
          this.$nextTick(() => {
            this.dataKeluargaEditedItem = Object.assign({}, this.dataKeluargaDefaultItem)
            this.dataKeluargaEditedIndex = -1
          })
        },
        deleteDataKeluargaItem (item) {
          this.dataKeluargaEditedIndex = this.dataKeluarga.indexOf(item)
          this.dataKeluargaEditedItem = Object.assign({}, item)
          this.dataKeluargaDialogDelete = true
        },
        deleteDataKeluargaItemConfirm () {
          this.dataKeluarga.splice(this.dataKeluargaEditedIndex, 1);
          this.closeDeleteDataKeluarga();
        },
        // END DATA KELUARGA TABLE OPERATION
      },

      created () {
        pegawaiService.currentDataKeluarga.subscribe(x => {
          if (Array.isArray(x) && x.length > 0) {
            this.dataKeluarga = x;
          }
        });
      },

      computed: { 
        formTitle () {
          return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
      },

      watch: {
        menu (val) {
          val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
        },
      }
  };
</script>