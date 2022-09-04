
<template>
  <v-data-table
   :headers="headers"
   :items="items"
   :options.sync="options"
   :server-items-length="totalItems"
   sort-by="username"
   class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Pembayaran Reseller</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="itemDialog" max-width="700px">
          <template v-slot:activator="{ on, attrs }">
            <div class="text-center pt-4">
              <v-btn 
               color="primary"
               class="mr-2"
               v-bind="attrs" v-on="on">Buat Pembayaran
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
                     v-model="itemEditedItem.transaction"
                     :items="transactions"
                     :rules="textNotNullRules"
                     item-text="reseller.username"
                     item-value="transaction_code"
                     label="Transaksi"
                     @change="changeTransaction"
                     required>
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                     v-model="itemEditedItem.rp"
                     label="Rp"
                     type="number">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                     v-model="itemEditedItem.bill"
                     :readonly="selected === 'yes'"
                     label="Tagihan"
                     disabled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                     v-model="itemEditedItem.transaction_date"
                     :readonly="selected === 'yes'"
                     label="Tanggal Transaksi"
                     disabled></v-text-field>
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
  import { paymentService } from '@/_services';

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
          text: 'Nama',
          align: 'start',
          sortable: false,
          value: 'users.username',
        },
        { text: 'Kode Transaksi', value: 'transaction_code', sortable: false, },
        { text: 'Tagihan', value: 'transaction.value', sortable: false, },
        { text: 'Bayar', value: 'value', sortable: false, },
        { text: 'Tanggal Transaksi', value: 'transaction.created_at', sortable: false, },
        { text: 'Tanggal Bayar', value: 'created_at', sortable: false, },
        { text: 'Informasi', value: 'transaction.information', sortable: false, },
        ],
        loadingBatch: false,
        selected: true,
        items: [],
        transactions: [],
        totalItems: 0,
        options: {},
        pageNow: 0,
        itemLastID: 0,
        itemNextID: 0,
        itemForwardID: 0,
        itemEditedIndex: -1,
        itemDialog: false,
        itemEditedItem: {
          transaction: '',
          rp: '',
          bill: '0',
          transaction_date: '',
        },
        itemDefaultItem: {
          transaction: '',
          rp: '',
          bill: '0',
          transaction_date: '',
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
         this.getResellerPendingPaymentDataFromAPI();
      },
      methods: {
        refreshData() {
          this.getDataFromApi().then(data => {
            this.items = data.items.data;
            if (Array.isArray(data.items.data) && data.items.data.length > 0) {
              this.itemForwardID = data.items.data[0].id;
              this.itemNextID = data.items.data[data.items.data.length-1].id
            }
            this.totalItems = data.items.total_page;
          })

          this.getResellerPendingPaymentDataFromAPI();
        },

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
          paymentService.postPaymentReseller(this.itemEditedItem.transaction, this.itemEditedItem.rp).then(
            response => {
              this.refreshData();
              console.log(response);
          }, error => { console.log(error) });
          this.close();
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
        changeTransaction() {
          this.selected = false;

          const x = this.transactions.find(element => element.transaction_code == this.itemEditedItem.transaction)
          this.itemEditedItem.bill = x.value;
          this.itemEditedItem.transaction_date = x.created_at;

          this.selected = true;
        },
        // //
        getResellerPendingPaymentDataFromAPI(){
          return paymentService.getPendingPaymentReseller().then( response => {
            this.transactions = response;
          });
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
            sentID = this.itemForwardID;
          } else if (this.pageNow < pageRequest) {
            sentID = this.itemNextID;
          } 

          this.pageNow = pageRequest;
          // jika page telah bertambah
           return paymentService.getPaymentReseller(sentID, page).then(response => {
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