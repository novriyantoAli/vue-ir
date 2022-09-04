<template>
  <v-data-table
    :headers="headersReseller"
    :items="resellers"
    :options.sync="options"
    :server-items-length="totalResellers"
    sort-by="name"
    class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>RESELLER</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="resellerDialog" max-width="700px">
          <template v-slot:activator="{ on, attrs }">
            <div class="text-center pt-4">
              <v-btn
               color="primary"
               class="mr-2"
               v-bind="attrs" v-on="on">
                Buat Baru
              </v-btn>
            </div>
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
                      v-model="resellerEditedItem.name"
                      label="Nama"
                      type="text">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="resellerEditedItem.phone"
                      label="No. HP"
                      type="text">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="resellerEditedItem.information"
                      label="Informasi"
                      type="text">
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
      </v-toolbar>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
  import { resellerService } from '@/_services';

  export default {
      props: {
        source: String,
      },
      data: () => ({
        textNotNullRules: [
          (v) => !!v || "Data isian tidak valid",
        ],
        menu: false,
        // DATA KONTAK DARURAT
        headersReseller: [
        {
          text: 'Nama',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Nomor HP', value: 'phone', sortable: false, },
        { text: 'Informasi', value: 'information', sortable: false, },
        { text: 'Tanggal dibuat', value: 'created_at', sortable: false, },
        ],
        loadingBatch: false,
        resellers: [],
        totalResellers: 0,
        options: {},
        pageNow: 0,
        resellerLastID: 0,
        resellerNextID: 0,
        resellerForwardID: 0,
        resellerEditedIndex: -1,
        resellerDialog: false,
        resellerEditedItem: {
          name: '',
          phone: '',
          information: '',
        },
        resellerDefaultItem: {
          name: '',
          phone: '',
          information: '',
        },
      }),
      mounted () {
         this.getDataFromApi().then(data => {
            this.resellers = data.items.data;
            if (Array.isArray(data.items.data) && data.items.data.length > 0) {
              this.resellerForwardID = data.items.data[0].id;
              this.resellerNextID = data.items.data[data.items.data.length-1].id
            }
            this.totalResellers = data.items.total_page;
         })
      },
      methods: {
        save(date) {
          this.$refs.menu.save(date)
        },
        // DATA KELUARGA TABLE OPERATION
        initialize () {
          this.resellers = [];
        },
        saveItem () {
          resellerService.save(this.resellerEditedItem.name, this.resellerEditedItem.phone, this.resellerEditedItem.information).then(
            response => {
              console.log(response);
          }, error => { console.log(error) });
          this.close();
        },
        editItem (item) {
          this.resellerEditedIndex = this.reseller.indexOf(item)
          this.resellerEditedItem = Object.assign({}, item)
          this.resellerDialog = true
        },
        close () {
          this.resellerDialog = false
          this.$nextTick(() => {
            this.resellerEditedItem = Object.assign({}, this.resellerDefaultItem)
            this.resellerEditedIndex = -1
          })
        },
        closeDelete () {
          this.$nextTick(() => {
            this.resellerEditedItem = Object.assign({}, this.resellerDefaultItem)
            this.resellerEditedIndex = -1
          })
        },
        getDataFromApi(){
          return new Promise((resolve, reject) => {
            const { sortBy, sortDesc, page, itemsPerPage  } = this.options
            
            console.log("sortBy: "+sortBy);
            console.log("sortDesc: "+sortDesc);
            console.log("page: "+page);
            console.log("itemsPerPage: "+itemsPerPage);

            this.getDesserts(page, itemsPerPage).then(function(items){
              console.log(reject);
              setTimeout(() => { resolve({ items }) }, 1000)
            })
          })
        },
        
        getDesserts(pageRequest, page) {
          var sentID = 0;
          if (this.pageNow > pageRequest) {
            sentID = this.resellerForwardID;
          } else if (this.pageNow < pageRequest) {
            sentID = this.resellerNextID;
          } 

          this.pageNow = pageRequest;
          // jika page telah bertambah
           return resellerService.get(sentID, page).then(response => {
             return response
           }, error => { console.log(error) })
         }
      },
      computed: { 
        formTitle () {
          return this.resellerEditedIndex === -1 ? 'New Item' : 'Edit Item'
        },
      },

      watch: {
        menu (val) {
          val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
        },
        options: {
          handler(){
            this.getDataFromApi().then(data => {
              this.resellers = data.items.data

              if (Array.isArray(data.items.data) && data.items.data.length > 0) {
                this.resellerNextID = data.items.data[data.items.data.length-1].id
              }
              this.totalResellers = data.items.total_page
            })
          },
          deep: true
        }
      }
  };
</script>