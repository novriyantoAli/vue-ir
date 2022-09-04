<template>
  <v-data-table
   :headers="headers"
   :items="items"
   :options.sync="options"
   :server-items-length="totalItems"
   sort-by="id_batch"
   class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
      <v-toolbar-title>Pembayaran Voucher</v-toolbar-title>
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
                   v-model="itemEditedItem.batch"
                   :items="batch"
                   :rules="textNotNullRules"
                   item-text="batch_code"
                   item-value="batch_code"
                   label="Batch"
                    @change="changeTransaction"
                   required>    
                  </v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                   v-model="itemEditedItem.value"
                   label="Rp"
                   type="number">
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                   v-model="itemEditedItem.bill_batch"
                   :readonly="selected === 'yes'"
                   label="Tagihan"
                   disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                   v-model="itemEditedItem.created_at"
                   :readonly="selected === 'yes'"
                   label="Tanggal Transaksi"
                   disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                   v-model="itemEditedItem.total_batch"
                   :readonly="selected === 'yes'"
                   label="Total Batch"
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
              BATAL
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
      <v-btn color="primary" @click="initialize">Reset</v-btn>
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
        
        headers: [
        {
          text: 'Batch',
          align: 'start',
          sortable: false,
          value: 'id_batch',
        },
        { text: 'Total Voucher', value: 'total_voucher', sortable: false, },
        { text: 'Rp', value: 'value', sortable: false, },
        { text: 'Tanggal Dibuat', value: 'created_at', sortable: false, },
        ],
        loadingBatch: false,
        selected: false,
        items: [],
        batch: [],
        totalItems: 0,
        options: {},
        pageNow: 0,
        itemLastID: 0,
        itemNextID: 0,
        itemForwardID: 0,
        itemEditedIndex: -1,
        itemDialog: false,
        itemEditedItem: {
          batch: '',
          value: "0",
          created_at: '',
          bill_batch: '',
          total_batch: '',
        },
        itemDefaultItem: {
          batch: '',
          value: "0",
          created_at: '',
          bill_batch: '',
          total_batch: '',
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
         this.getUnpaidVoucherFromAPI();
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
          
          this.getUnpaidVoucherFromAPI();
        },
        save(date) {
          this.$refs.menu.save(date)
        },
        initialize () {
          this.items = [];
        },
        saveItem () {
          paymentService.postPaymentVoucher(this.itemEditedItem.batch, this.itemEditedItem.value).then(
            response => {
              // should be show message 
              console.log(response);
              this.refreshData();
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
        // //
        changeTransaction() {
          this.selected = false;

          const x = this.batch.find(element => element.batch_code == this.itemEditedItem.batch)
          this.itemEditedItem.bill_batch = x.bill_batch;
          this.itemEditedItem.created_at = x.print_date;
          this.itemEditedItem.total_batch = x.total_batch;

          this.selected = true;
        },
        getUnpaidVoucherFromAPI() {
          this.loadingBatch = true;
          return paymentService.getPendingPaymentVoucher().then(response => {
            this.loadingBatch = false;
            this.batch = response;
          }, error => {
            console.log(error);
            this.loadingBatch = false;
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
           return paymentService.getPaymentVoucher(sentID, page).then(response => {
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