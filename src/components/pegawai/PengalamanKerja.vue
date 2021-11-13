<template>
  <v-data-table
    :headers="headersPengalamanKerja"
    :items="pengalamanKerja"
    sort-by="calories"
    class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>PENGALAMAN KERJA DILUAR PERUSAHAAN</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="700px">
          <template v-slot:activator="{ on, attrs }">
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-btn color="success" dark class="mb-2" v-bind="attrs" v-on="on">Buat Baru</v-btn>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-btn color="primary" :disabled="pengalamanKerja.length <= 0" @click="saveToLocal" >Simpan</v-btn>
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
                    <v-text-field v-model="editedItem.dari_tahun" label="Dari Tahun">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.sampai_tahun" label="Sampai Tahun">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.perusahaan" label="Perusahaan">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.jabatan" label="Jabatan">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.alasan_berhenti" label="Alasan Berhenti">
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
                @click="close">
                Batal
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="saveItem">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Apakah anda yakin ingin menghapus baris ini?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Batal</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Hapus</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                  Reset
                </v-btn>
    </template>
        <template v-slot:item.aksi="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
  import {pegawaiService} from '@/_services';

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
        // DATA KONTAK DARURAT
        headersPengalamanKerja: [
        {
          text: 'Dari Tahun',
          align: 'start',
          sortable: false,
          value: 'dari_tahun',
        },
        { text: 'Sampai Tahun', value: 'sampai_tahun' },
        { text: 'Perusahaan', value: 'perusahaan' },
        { text: 'Jabatan', value: 'jabatan' },
        { text: 'Alasan Berhenti', value: 'alasan_berhenti' },
        { text: 'Aksi', value: 'aksi', sortable: false },
        ],
        pengalamanKerja: [],
        editedIndex: -1,
        dialog: false,
        dialogDelete: false,
        editedItem: {
          dari_tahun: '',
          sampai_tahun: '',
          perusahaan: '',
          jabatan: '',
          alasan_berhenti: '',
        },
        defaultItem: {
          dari_tahun: '',
          sampai_tahun: '',
          perusahaan: '',
          jabatan: '',
          alasan_berhenti: '',
        },
      }),
      
      methods: {
        saveToLocal () {
          pegawaiService.saveDataPengalamanKerja(this.pengalamanKerja);
        },
        save (date) {
          this.$refs.menu.save(date)
        },
        initialize () {
          this.pengalamanKerja = [];
        },
        saveItem () {
          if (this.editedIndex > -1) {
            Object.assign(
              this.pengalamanKerja[this.editedIndex], this.editedItem
            );
          } else {
            this.pengalamanKerja.push(this.editedItem);
          }
          this.close();
        },
        editItem (item) {
          this.editedIndex = this.pengalamanKerja.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
        close () {
          this.dialog = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
        closeDelete () {
          this.dialogDelete = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
        deleteItem (item) {
          this.editedIndex = this.pengalamanKerja.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
        deleteItemConfirm () {
          this.pengalamanKerja.splice(this.editedIndex, 1);
          this.closeDelete();
        },
        // END DATA KELUARGA TABLE OPERATION
      },

      created () {
        pegawaiService.currentDataPengalamanKerja.subscribe( x => {
          if (Array.isArray(x) && x.length > 0) {
            this.pengalamanKerja = x;
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