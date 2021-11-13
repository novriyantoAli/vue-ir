<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :options.sync="options"
    :server-items-length="totalItems"
    sort-by="fullname"
    class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>PPPoE</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="itemDialog" max-width="700px">
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
                    <v-select 
                      v-model="itemEditedItem.package"
                      :items="packages"
                      :rules="textNotNullRules"
                      item-text="name"
                      item-value="id"
                      label="Paket"
                      required>    
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select 
                     v-model="itemEditedItem.promo"
                     :items="promos"
                     :rules="textNotNullRules"
                     item-text="promo_name"
                     item-value="id"
                     label="Promo"
                     required>    
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="itemEditedItem.howmany"
                      label="Berapa banyak"
                      type="number">
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
  import { pppoeService} from '@/_services';

  export default {
      props: {
        source: String,
      },
      data: () => ({
        textNotNullRules: [
          (v) => !!v || "Data isian tidak valid",
        ],
        menu: false,
        value: [
        423,
        446,
        675,
        510,
        590,
        610,
        760,
        313,
        213,
        578,
        900,
        231,
        103,
      ],
        headers: [
        {
          text: 'Nama Lengkap',
          align: 'start',
          sortable: false,
          value: 'fullname',
        },
        { text: 'Profile', value: 'profile', sortable: false, },
        { text: 'Username', value: 'username', sortable: false, },
        { text: 'Password', value: 'password', sortable: false, },
        { text: 'Tagihan', value: 'bill', sortable: false, },
        { text: 'Dibuat', value: 'created_at', sortable: false, },
        ],
        loadingBatch: false,
        items: [],
        totalItems: 0,
        options: {},
        pageNow: 0,
        itemLastID: 0,
        itemNextID: 0,
        itemForwardID: 0,
        itemEditedIndex: -1,
        itemDialog: false,
        itemEditedItem: {
          promo: '',
          package: '',
          howmany: "1",
        },
        itemDefaultItem: {
          promo: '',
          package: '',
          howmany: "1",
        },
      }),
      mounted () {
         this.getDataFromApi().then(data => {
            this.items = data.items.data;
            if (Array.isArray(data.items.data) && data.items.data.length > 0) {
              this.itemForwardID = data.items.data[0].id;
              this.itemNextID = data.items.data[data.items.data.length-1].id
            }
            this.totalItems = data.items.total_page;
         })
      },
      methods: {
        saveToLocal () {
          // voucherService.saveDataKontakDarurat(this.voucher);
        },

        save(date) {
          this.$refs.menu.save(date)
        },
        // DATA KELUARGA TABLE OPERATION
        initialize () {
          this.items = [];
        },
        saveItem () {
          // voucherService.generateBatch(this.voucherEditedItem.promo, this.voucherEditedItem.package, this.voucherEditedItem.howmany).then(
          //   response => {
          //     console.log(response);
          //     pdf(response);
          // }, error => { console.log(error) });
          // this.close();
        },
        editItem (item) {
          this.itemEditedIndex = this.items.indexOf(item)
          this.itemEditedItem = Object.assign({}, item)
          this.itemDialog = true
        },
        close () {
          this.itemDialog = false
          this.$nextTick(() => {
            this.itemEditedItem = Object.assign({}, this.itemDefaultItem)
            this.itemEditedIndex = -1
          })
        },
        closeDelete () {
          this.$nextTick(() => {
            this.itemEditedItem = Object.assign({}, this.itemDefaultItem)
            this.itemEditedIndex = -1
          })
        },
        searchPrint() {
          // voucherService.getBatchPrint(this.batchCode).then(response => {
          //   pdf(response);
          // }, error => { console.log(error) })
        },
        // //
        getDataFromApi(){
          return new Promise((resolve, reject) => {
            const { sortBy, sortDesc, page, itemsPerPage  } = this.options
            
            console.log("sortBy: "+sortBy);
            console.log("sortDesc: "+sortDesc);
            console.log("page: "+page);
            console.log("itemsPerPage: "+itemsPerPage);

            
            this.getDesserts(page, itemsPerPage).then(function(items){
              // if (sortBy) {
              //   items.data = items.data.sort((a, b) => {
              //     const sortA = a[sortBy]
              //     const sortB = b[sortBy]

              //     if (sortDesc) {
              //       if (sortA < sortB) return 1
              //       if (sortA > sortB) return -1
              //       return 0
              //     } else {
              //       if (sortA < sortB) return -1
              //       if (sortA > sortB) return 1
              //       return 0
              //     }
              //   })
              // }

              // if (itemsPerPage > 0) {
              //   items.data = items.data.slice((page - 1) * itemsPerPage, page * itemsPerPage)
              // }
              console.log(reject);

              setTimeout(() => { resolve({ items }) }, 1000)
            })
          })
        },
        
        getDesserts(pageRequest, page) {
          var sentID = 0;
          if (this.pageNow > pageRequest) {
            sentID = this.itemForwardID;
          } else if (this.pageNow < pageRequest) {
            sentID = this.itemNextID;
          } 

          this.pageNow = pageRequest;
          // jika page telah bertambah
           return pppoeService.get(sentID, page).then(response => {
             return response
           }, error => { console.log(error) })
         }
      },
      computed: { 
        formTitle () {
          return this.itemEditedIndex === -1 ? 'New Item' : 'Edit Item'
        },
      },

      watch: {
        menu (val) {
          val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
        },
        options: {
          handler(){
            this.getDataFromApi().then(data => {
              this.items = data.items.data

              if (Array.isArray(data.items.data) && data.items.data.length > 0) {
                this.itemNextID = data.items.data[data.items.data.length-1].id
              }
              this.totalItems = data.items.total_page
            })
          },
          deep: true
        }
      }
  };
</script>