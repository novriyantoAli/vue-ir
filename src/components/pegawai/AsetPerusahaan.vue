<template>
            <v-data-table
              :headers="headersAsetPerusahaan"
              :items="asetPerusahaan"
              sort-by="jenis"
              class="elevation-1">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>ASET PERUSAHAAN YANG DIPINJAMKAN</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="700px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on">
                        Buat Baru
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.jenis" label="Jenis">
                              </v-text-field>
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
                            v-model="editedItem.tanggal_diberikan"
                            label="Tanggal Diterima"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on">
                          </v-text-field>
                        </template>
                        <v-date-picker
                          ref="picker"
                          v-model="editedItem.tanggal_diberikan"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          @change="save">    
                        </v-date-picker>
                      </v-menu>
                    </template>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.nomor" label="Nomor">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.jumlah" label="Jumlah">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
<template>
                      <v-menu
                        ref="menu1"
                        v-model="menu1"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field 
                            v-model="editedItem.tanggal_berakhir"
                            label="Tanggal Diterima"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on">
                          </v-text-field>
                        </template>
                        <v-date-picker
                          ref="picker"
                          v-model="editedItem.tanggal_berakhir"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          @change="save1">    
                        </v-date-picker>
                      </v-menu>
                    </template>

                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.keterangan" label="Keterangan">
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
                          Cancel
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="saveItem">
                          Save
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
        menu1: false,
        // DATA KONTAK DARURAT
        headersAsetPerusahaan: [
        {
          text: 'Jenis',
          align: 'start',
          sortable: false,
          value: 'jenis',
        },
        { text: 'Tanggal Diberikan', value: 'tanggal_diberikan' },
        { text: 'Nomor', value: 'nomor' },
        { text: 'Jumlah', value: 'jumlah' },
        { text: 'Tanggal Berakhir', value: 'tanggal_berakhir' },
        { text: 'Aksi', value: 'aksi', sortable: false },
        ],
        asetPerusahaan: [],
        editedIndex: -1,
        dialog: false,
        dialogDelete: false,
        editedItem: {
          jenis: '',
          tanggal_diberikan: '',
          nomor: '',
          jumlah: '',
          tanggal_berakhir: '',
        },
        defaultItem: {
          jenis: '',
          tanggal_diberikan: '',
          nomor: '',
          jumlah: '',
          tanggal_berakhir: '',
        },
      }),
      
      methods: {
        save (date) {
          this.$refs.menu.save(date)
        },
        save1 (date) {
          this.$refs.menu1.save1(date)
        },
        initialize () {
          this.asetPerusahaan = [];
        },
        saveItem () {
          if (this.editedIndex > -1) {
            Object.assign(
              this.asetPerusahaan[this.editedIndex], this.editedItem
            );
          } else {
            this.asetPerusahaan.push(this.editedItem);
          }
          this.close();
        },
        editItem (item) {
          this.editedIndex = this.asetPerusahaan.indexOf(item)
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
          this.editedIndex = this.asetPerusahaan.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
        deleteItemConfirm () {
          this.asetPerusahaan.splice(this.editedIndex, 1);
          this.closeDelete();
        },
        // END DATA KELUARGA TABLE OPERATION
      },

      created () {

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