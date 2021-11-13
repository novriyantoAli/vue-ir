<template>
  <v-data-table
    :headers="headersRiwayatPendidikan"
    :items="riwayatPendidikan"
    sort-by="tahun"
    class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>PENDIDIKAN</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="700px">
          <template v-slot:activator="{ on, attrs }">
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-btn color="success" dark class="mb-2" v-bind="attrs" v-on="on">Buat Baru</v-btn>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-btn color="primary" :disabled="riwayatPendidikan.length <= 0" @click="saveToLocal" >Simpan</v-btn>
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
                      v-model="editedItem.tingkat_pendidikan" 
                      label="Tingkat Pendidikan">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.nama_sekolah" label="Nama Sekolah">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.tempat" label="Tempat">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.jurusan" label="Jurusan">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.tahun_lulus" label="Tahun Lulus">
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
        headersRiwayatPendidikan: [
        {
          text: 'Tingkat Pendidikan',
          align: 'start',
          sortable: false,
          value: 'tingkat_pendidikan',
        },
        { text: 'Nama Sekolah', value: 'nama_sekolah' },
        { text: 'Tempat', value: 'tempat' },
        { text: 'Jurusan', value: 'jurusan' },
        { text: 'Tahun Lulus', value: 'tahun_lulus' },
        { text: 'Aksi', value: 'aksi', sortable: false },
        ],
        riwayatPendidikan: [],
        editedIndex: -1,
        dialog: false,
        dialogDelete: false,
        editedItem: {
          tingkat_pendidikan: '',
          nama_sekolah: '',
          tempat: '',
          jurusan: '',
          tahun_lulus: '',
        },
        defaultItem: {
          tingkat_pendidikan: '',
          nama_sekolah: '',
          tempat: '',
          jurusan: '',
          tahun_lulus: '',
        },
        // END DATA KONTAK DARURAT

        // END DATA KELUARGA
      }),
      
      methods: {
        saveToLocal () {
          pegawaiService.saveDataRiwayatPendidikan(this.riwayatPendidikan);
        },
        save (date) {
          this.$refs.menu.save(date)
        },
        // DATA KELUARGA TABLE OPERATION
        initialize () {
          this.riwayatPendidikan = [];
        },
        saveItem () {
          if (this.editedIndex > -1) {
            Object.assign(
              this.riwayatPendidikan[this.editedIndex], this.editedItem
            );
          } else {
            this.riwayatPendidikan.push(this.editedItem);
          }
          this.close();
        },
        editItem (item) {
          this.editedIndex = this.riwayatPendidikan.indexOf(item)
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
          this.editedIndex = this.riwayatPendidikan.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
        deleteItemConfirm () {
          this.riwayatPendidikan.splice(this.editedIndex, 1);
          this.closeDelete();
        },
        // END DATA KELUARGA TABLE OPERATION
      },

      created () {
        pegawaiService.currentDataRiwayatPendidikan.subscribe(x => {
          if (Array.isArray(x) && x.length > 0) {
            this.riwayatPendidikan = x;
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