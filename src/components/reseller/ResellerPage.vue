<template>
  <v-data-table
    :headers="headersReseller"
    :items="reseller"
    :options.sync="options"
    :server-items-length="totalResellers"
    sort-by="reseller"
    class="elevation-1">
    <template v-slot:top>
      <template>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-overflow-btn
                 filled
                 :items="batch"
                 item-text="batch_name"
                 item-value="batch_name"
                 v-model="batchCode">
                  <template v-slot:prepend>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">
                          mdi-help-circle-outline
                        </v-icon>
                      </template>
                      silahkan pilih salah satu kode batch
                    </v-tooltip>
                  </template>
                  <template v-slot:append>
                    <v-fade-transition leave-absolute>
                      <v-progress-circular
                       v-if="loadingBatch"
                       size="24"
                       color="info"
                       indeterminate>
                      </v-progress-circular>
                      <img
                       v-else
                       width="24"
                       height="24"
                       src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
                       alt="">
                    </v-fade-transition>
                  </template>
                  <template v-slot:append-outer>
                    <v-menu
                     style="top: -12px"
                     offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        color="success"
                         v-bind="attrs"
                         v-on="on">
                          <v-icon left>mdi-menu</v-icon>
                          Batch Menu
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-text class="pa-6">
                          <v-btn
                           large
                           text
                           color="primary"
                           @click="searchPrint"
                           :disabled="batchCode==''">
                            <v-icon left>mdi-pencil</v-icon>Cetak
                          </v-btn>
                        </v-card-text>
                      </v-card>
                    </v-menu>
                  </template>
                </v-overflow-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </template>
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
                Buat Batch
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
                      v-model="resellerEditedItem.package"
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
                     v-model="resellerEditedItem.promo"
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
                      v-model="resellerEditedItem.howmany"
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
  import { resellerService } from '@/_services';
  import { pdf } from '@/_helpers';

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
          text: 'Voucher',
          align: 'start',
          sortable: false,
          value: 'username',
        },
        { text: 'Profile', value: 'profile', sortable: false, },
        { text: 'Kode Batch', value: 'batch_code', sortable: false, },
        { text: 'Tanggal Cetak', value: 'print_date', sortable: false, },
        { text: 'Kadarluarsa', value: 'value', sortable: false, },
        { text: 'Berlaku', value: 'active', sortable: false, },
        ],
        loadingBatch: false,
        voucher: [],
        promos: [],
        packages: [],
        batch: [],
        batchCode: '',
        totalVouchers: 0,
        options: {},
        pageNow: 0,
        voucherLastID: 0,
        voucherNextID: 0,
        voucherForwardID: 0,
        voucherEditedIndex: -1,
        voucherDialog: false,
        voucherEditedItem: {
          promo: '',
          package: '',
          howmany: "1",
        },
        voucherDefaultItem: {
          promo: '',
          package: '',
          howmany: "1",
        },
      }),
      mounted () {
         this.getDataFromApi().then(data => {
            this.voucher = data.items.data;
            if (Array.isArray(data.items.data) && data.items.data.length > 0) {
              this.voucherForwardID = data.items.data[0].id;
              this.voucherNextID = data.items.data[data.items.data.length-1].id
            }
            this.totalVouchers = data.items.total_page;
         })
         this.getBatchDataFromAPI();

         this.getPromoDataFromAPI();

         this.getPackageDataFromAPI();
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
          this.voucher = [];
        },
        saveItem () {
          voucherService.generateBatch(this.voucherEditedItem.promo, this.voucherEditedItem.package, this.voucherEditedItem.howmany).then(
            response => {
              console.log(response);
              pdf(response);
          }, error => { console.log(error) });
          this.close();
        },
        editItem (item) {
          this.voucherEditedIndex = this.voucher.indexOf(item)
          this.voucherEditedItem = Object.assign({}, item)
          this.voucherDialog = true
        },
        close () {
          this.voucherDialog = false
          this.$nextTick(() => {
            this.voucherEditedItem = Object.assign({}, this.voucherDefaultItem)
            this.voucherEditedIndex = -1
          })
        },
        closeDelete () {
          this.$nextTick(() => {
            this.voucherEditedItem = Object.assign({}, this.voucherDefaultItem)
            this.voucherEditedIndex = -1
          })
        },
        searchPrint() {
          voucherService.getBatchPrint(this.batchCode).then(response => {
            pdf(response);
          }, error => { console.log(error) })
        },
        // //
        getBatchDataFromAPI() {
          this.loadingBatch = true;
          return voucherService.getBatch().then(response => {
            this.loadingBatch = false;
            this.batch = response;
          }, error => {
            console.log(error);
            this.loadingBatch = false;
          });
        },
        getPromoDataFromAPI(){
          return promoService.get(0, 999).then( response => {
            console.log(response.data);
            this.promos = response.data;
          });
        },
        getPackageDataFromAPI(){
          return packageService.get(0, 999).then( response => {
            console.log(response.data);
            this.packages = response.data;
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
            sentID = this.voucherForwardID;
          } else if (this.pageNow < pageRequest) {
            sentID = this.voucherNextID;
          } 

          this.pageNow = pageRequest;
          // jika page telah bertambah
           return voucherService.get(sentID, page).then(response => {
             return response
           }, error => { console.log(error) })
         }
      },
      computed: { 
        formTitle () {
          return this.voucherEditedIndex === -1 ? 'New Item' : 'Edit Item'
        },
      },

      watch: {
        menu (val) {
          val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
        },
        options: {
          handler(){
            this.getDataFromApi().then(data => {
              this.voucher = data.items.data

              if (Array.isArray(data.items.data) && data.items.data.length > 0) {
                this.voucherNextID = data.items.data[data.items.data.length-1].id
              }
              this.totalVouchers = data.items.total_page
            })
          },
          deep: true
        }
      }
  };
</script>