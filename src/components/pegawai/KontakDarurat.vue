<template>
  <v-data-table
    :headers="headersKontakDarurat"
    :items="kontakDarurat"
    sort-by="nama_lengkap"
    class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>DARURAT</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="kontakDaruratDialog" max-width="700px">
          <template v-slot:activator="{ on, attrs }">
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-btn color="success" dark class="mb-2" v-bind="attrs" v-on="on">Buat Baru</v-btn>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-btn color="primary" :disabled="kontakDarurat.length <= 0" @click="saveToLocal" >Simpan</v-btn>
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
                    <v-text-field 
                      v-model="kontakDaruratEditedItem.nama_lengkap" 
                      label="Nama Lengkap">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="kontakDaruratEditedItem.hubungan" label="Hubungan">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                      v-model="kontakDaruratEditedItem.alamat_rumah" 
                      label="Alamat Rumah">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                      v-model="kontakDaruratEditedItem.no_telp_rumah" 
                      label="No. Telp Rumah">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                      v-model="kontakDaruratEditedItem.no_telp_kantor" 
                      label="No. Telp Kantor">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                      v-model="kontakDaruratEditedItem.keterangan" 
                      label="Keterangan">
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
                SIMPAN
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="kontakDaruratDialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Apakah anda yakin ingin menghapus baris ini?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">BATAL</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
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
        // DATA KONTAK DARURAT
        headersKontakDarurat: [
        {
          text: 'Nama Lengkap',
          align: 'start',
          sortable: false,
          value: 'nama_lengkap',
        },
        { text: 'Hubungan', value: 'hubungan' },
        { text: 'Alamat Rumah', value: 'alamat_rumah' },
        { text: 'No. Telp Rumah', value: 'no_telp_rumah' },
        { text: 'No. Telp Kantor', value: 'no_telp_kantor' },
        { text: 'Keterangan', value: 'keterangan' },
        { text: 'Aksi', value: 'aksi', sortable: false },
        ],
        kontakDarurat: [],
        kontakDaruratEditedIndex: -1,
        kontakDaruratDialog: false,
        kontakDaruratDialogDelete: false,
        kontakDaruratEditedItem: {
          nama_lengkap: '',
          hubungan: '',
          alamat_rumah: '',
          no_telp_rumah: '',
          no_telp_kantor: '',
          keterangan: '',
        },
        kontakDaruratDefaultItem: {
          nama_lengkap: '',
          hubungan: '',
          alamat_rumah: '',
          no_telp_rumah: '',
          no_telp_kantor: '',
          keterangan: ''
        },
        // END DATA KONTAK DARURAT

        // END DATA KELUARGA
      }),
      
      methods: {
        saveToLocal () {
          pegawaiService.saveDataKontakDarurat(this.kontakDarurat);
        },

        save (date) {
          this.$refs.menu.save(date)
        },
        // DATA KELUARGA TABLE OPERATION
        initialize () {
          this.kontakDarurat = [];
        },
        saveItem () {
          if (this.kontakDaruratEditedIndex > -1) {
            Object.assign(
              this.kontakDarurat[this.kontakDaruratEditedIndex], this.kontakDaruratEditedItem
            );
          } else {
            this.kontakDarurat.push(this.kontakDaruratEditedItem);
          }
          this.close();
        },
        editItem (item) {
          this.kontakDaruratEditedIndex = this.kontakDarurat.indexOf(item)
          this.kontakDaruratEditedItem = Object.assign({}, item)
          this.kontakDaruratDialog = true
        },
        close () {
          this.kontakDaruratDialog = false
          this.$nextTick(() => {
            this.kontakDaruratEditedItem = Object.assign({}, this.kontakDaruratDefaultItem)
            this.kontakDaruratEditedIndex = -1
          })
        },
        closeDelete () {
          this.kontakDaruratDialogDelete = false
          this.$nextTick(() => {
            this.kontakDaruratEditedItem = Object.assign({}, this.kontakDaruratDefaultItem)
            this.kontakDaruratEditedIndex = -1
          })
        },
        deleteItem (item) {
          this.kontakDaruratEditedIndex = this.kontakDarurat.indexOf(item)
          this.kontakDaruratEditedItem = Object.assign({}, item)
          this.kontakDaruratDialogDelete = true
        },
        deleteItemConfirm () {
          this.kontakDarurat.splice(this.kontakDaruratEditedIndex, 1);
          this.closeDelete();
        },
        // END DATA KELUARGA TABLE OPERATION
      },

      created () {
        pegawaiService.currentDataKontakDarurat.subscribe( x => {
          if (Array.isArray(x) && x.length > 0) {
            this.kontakDarurat = x;
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