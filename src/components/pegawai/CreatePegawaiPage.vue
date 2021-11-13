<template>
  <v-container>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header v-if="dataUmum == null" disable-icon-rotate>
          DATA UMUM
          <template v-slot:actions>
            <v-icon color="error">mdi-alert-circle</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-header v-else>
          <template v-slot:default="{ open }">
            <v-row no-gutters>
              <v-col cols="4">
                DATA UMUM
              </v-col>
              <v-col cols="8" class="text--secondary">
                <v-fade-transition leave-absolute>
                  <span v-if="open" key="0">
                    RAHASIA
                  </span>
                  <span v-else key="1">
                    {{ trip.name }}
                  </span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <DataUmum v-on:childToParent="onDataUmumClick"></DataUmum>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              KELUARGA
            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open" key="0">
                  Silahkan Masukkan Data Keluarga
                </span>
                <span v-else key="1">
                  Terdapat {{ dataKeluarga }} data
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <DataKeluarga></DataKeluarga>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              KONTAK DARURAT
            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open">Silahkan Masukkan Data Kontak Darurat</span>
                <v-row v-else no-gutters style="width: 100%">
                  <v-col cols="6">
                    ORANG KE I : <span v-if="dataKontakDarurat1 != null">{{ dataKontakDarurat1.nama_lengkap }}</span> 
                    <span v-else>Belum di isi</span>
                  </v-col>
                  <v-col cols="6">
                    ORANG KE II : <span v-if="dataKontakDarurat2 != null">{{ dataKontakDarurat2.nama_lengkap }}</span> 
                    <span v-else>Belum di isi</span>
                  </v-col>
                </v-row>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <KontakDarurat></KontakDarurat>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              RIWAYAT PENDIDIKAN
            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open" key="0">
                  Silahkan Masukkan Data Riwayat Pendidikan
                </span>
                <span v-else key="1">
                  Terdapat {{ riwayatPendidikan }} data
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <RiwayatPendidikan></RiwayatPendidikan>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              LOKAKARYA
            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open" key="0">
                  Silahkan Masukkan Data Seminar/Kursus
                </span>
                <span v-else key="1">
                  Terdapat {{ lokakarya }} data
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <Lokakarya></Lokakarya>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              PENGALAMAN KERJA
            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open" key="0">
                  Silahkan Masukkan Data Pengalaman Kerja
                </span>
                <span v-else key="1">
                  Terdapat {{ pengalamanKerja }} data
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <PengalamanKerja></PengalamanKerja>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          <template v-slot:default="{ open }">
            <v-row no-gutters>
              <v-col cols="4">
                DATA KEPEGAWAIAN
              </v-col>
              <v-col cols="8" class="text--secondary">
                <v-fade-transition leave-absolute>
                  <span v-if="open" key="0">
                    RAHASIA
                  </span>
                  <span v-else key="1">
                    {{ trip.name }}
                  </span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <DataKepegawaian></DataKepegawaian>  
        </v-expansion-panel-content>
      </v-expansion-panel>
      
      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              RIWAYAT PEKERJAAN/JABATAN
            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open" key="0">
                  Silahkan Masukkan Data Riwayat Pekerjaan/Jabatan
                </span>
                <span v-else key="1">
                  Terdapat {{ trip.length }} data
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <RiwayatPekerjaan></RiwayatPekerjaan>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              PENGHARGAAN
            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open" key="0">
                  Silahkan Masukkan Data Riwayat Penghargaan
                </span>
                <span v-else key="1">
                  Terdapat {{ trip.length }} data
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <RiwayatPenghargaan></RiwayatPenghargaan>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              TEGURAN LISAN
            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open" key="0">
                  Silahkan Masukkan Data Teguran Lisan
                </span>
                <span v-else key="1">
                  Terdapat {{ trip.length }} data
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <TeguranLisan></TeguranLisan>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              SURAT PERINGATAN
            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open" key="0">
                  Silahkan Masukkan Data Surat Peringatan
                </span>
                <span v-else key="1">
                  Terdapat {{ trip.length }} data
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <SuratPeringatan></SuratPeringatan>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              PENILAIAN KARYAWAN
            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open" key="0">
                  Silahkan Masukkan Data Penilaian Karyawan
                </span>
                <span v-else key="1">
                  Terdapat {{ trip.length }} data
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <Penilaiian></Penilaiian>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              ASET DIPINJAMKAN
            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open" key="0">
                  Silahkan Masukkan Data Aset yang Dipinjamkan
                </span>
                <span v-else key="1">
                  Terdapat {{ trip.length }} data
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <AsetPerusahaan></AsetPerusahaan>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
  import DataUmum from "@/components/pegawai/DataUmum.vue";
  import DataKeluarga from "@/components/pegawai/DataKeluarga.vue";
  import KontakDarurat from "@/components/pegawai/KontakDarurat.vue";
  import RiwayatPendidikan from "@/components/pegawai/RiwayatPendidikan.vue";
  import Lokakarya from "@/components/pegawai/Lokakarya.vue";
  import PengalamanKerja from "@/components/pegawai/PengalamanKerja.vue";
  import DataKepegawaian from "@/components/pegawai/DataKepegawaian.vue";
  import RiwayatPekerjaan from "@/components/pegawai/RiwayatPekerjaan.vue";
  import RiwayatPenghargaan from "@/components/pegawai/RiwayatPenghargaan.vue";
  import TeguranLisan from "@/components/pegawai/TeguranLisan.vue";
  import SuratPeringatan from "@/components/pegawai/SuratPeringatan.vue";
  import Penilaiian from "@/components/pegawai/Penilaiian.vue";
  import AsetPerusahaan from "@/components/pegawai/AsetPerusahaan.vue";

  import { pegawaiService } from '@/_services';

  // import { kabupatenService } from '@/_services';
  export default {
    data () {
      const defaultForm = Object.freeze({
        first: '',
        last: '',
        bio: '',
        favoriteAnimal: '',
        age: null,
        terms: false,
      })
      return {
        dataUmumError: false,
        dataUmum: null,
        dataKeluarga: 0,
        dataKontakDarurat1: null,
        dataKontakDarurat2: null,
        riwayatPendidikan: 0,
        lokakarya: 0,
        pengalamanKerja: 0,

        // FOR AUTO COMPLETE
        descriptionLimit: 60,
        entries: [],
        isLoading: false,
        provinsis: null,
        search: null,
        // END AUTO COMPLETE

        menu: false,
        trip: {
          name: '',
          location: null,
          start: null,
          end: null,
        },
        locations: ['Australia', 'Barbados', 'Chile', 'Denmark', 'Ecuador', 'France'],
        form: Object.assign({}, defaultForm),
        rules: {
          age: [
            val => val < 10 || `I don't believe you!`,
          ],
          animal: [val => (val || '').length > 0 || 'This field is required'],
          name: [val => (val || '').length > 0 || 'This field is required'],
        },
        animals: ['Dog', 'Cat', 'Rabbit', 'Turtle', 'Snake'],
        conditions: false,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.',
        snackbar: false,
        terms: false,
        defaultForm,
        dialog: false,
        dialogDelete: false,
        headers: [
        {
          text: 'Nama Keluarga',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Hubungan', value: 'calories' },
        { text: 'Jenis Kelamin', value: 'fat' },
        { text: 'Tanggal Lahir', value: 'carbs' },
        { text: 'Pendidikan', value: 'protein' },
        { text: 'Pekerjaan', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false },
        ],
        headersTeguranLisan: [
        {
          text: 'Jenis Pelanggaran',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Tanggal Dikeluarkan', value: 'protein' },
        { text: 'Kesalahan', value: 'protein' },
        { text: 'Keterangan', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false },
        ],
        headersSuratPeringatan: [
        {
          text: 'Jenis Surat Peringatan',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Tanggal Dikeluarkan', value: 'protein' },
        { text: 'Masa Berlaku', value: 'protein' },
        { text: 'Kesalahan', value: 'protein' },
        { text: 'Keterangan', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false },
        ],
        headersPenilaiian: [
        {
          text: 'Tanggal',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Nilai', value: 'protein' },
        { text: 'Keterangan', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false },
        ],
        headersAsetPerusahaan: [
                {
          text: 'Jenis',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Tanggal Diberikan', value: 'protein' },
        { text: 'Nomor', value: 'protein' },
        { text: 'Jumlah', value: 'protein' },
        { text: 'Tanggal Berakhir', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false },
        ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      }
    },
    components: {
      DataUmum,
      DataKeluarga,
      KontakDarurat,
      RiwayatPendidikan,
      Lokakarya,
      PengalamanKerja,
      DataKepegawaian,
      RiwayatPekerjaan,
      RiwayatPenghargaan,
      TeguranLisan,
      SuratPeringatan,
      Penilaiian,
      AsetPerusahaan,
    },
    created () {
      pegawaiService.currentDataUmum.subscribe( x => {
        this.dataUmum = x;
      });
      pegawaiService.currentDataKeluarga.subscribe(x => {
        if (Array.isArray(x) && x.length > 0) {
          this.dataKeluarga = x.length;
        }
      });
      pegawaiService.currentDataKontakDarurat.subscribe(x => {
        if (Array.isArray(x) && x.length >= 1) {
          this.dataKontakDarurat1 = x[0];
        }
        if (Array.isArray(x) && x.length >= 2) {
          this.dataKontakDarurat2 = x[1];
        }
      });
      pegawaiService.currentDataRiwayatPendidikan.subscribe( x => { 
        if (Array.isArray(x) && x.length > 0) {
          this.riwayatPendidikan = x.length;
        }
      });
      pegawaiService.currentDataLokakarya.subscribe( x => { 
        if (Array.isArray(x) && x.length > 0) {
          this.lokakarya = x.length;
        }
      });
      pegawaiService.currentDataPengalamanKerja.subscribe( x => { 
        if (Array.isArray(x) && x.length > 0) {
          this.pengalamanKerja = x.length;
        }
      });
    },
    computed: {
      formIsValid () {
        return (
          this.form.first &&
          this.form.last &&
          this.form.favoriteAnimal &&
          this.form.terms
        )
      },
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },

      // auto complete feature
      // fields () {
      //   if (!this.provinsis) return []

      //   return Object.keys(this.provinsis).map(key => {
      //     return {
      //       key, value: this.provinsis[key] || 'n/a',
      //     }
      //   })
      // },

      // items () {
      //   return this.entries.map( entry => {
      //     var lengthDesc = entry.nama_kabupaten + " -> " + entry.provinsi.nama_provinsi
      //     const Description = lengthDesc.length > this.descriptionLimit
      //       ? lengthDesc.slice(0, this.descriptionLimit) + '...'
      //       : lengthDesc

      //     return Object.assign({}, entry, { Description })
      //   })
      // },
      // end of auto complete feature
    },
    methods: {
      onDataUmumClick (value) {
        this.dataUmum = value
      },
      // DATA KELUARGA TABLE OPERATION
      initializeDataKeluarga () {
        this.dataKeluarga = [];
      },
      saveDataKeluargaItem () {
        if (this.dataKeluargaEditedIndex > -1) {
          Object.assign(this.dataKeluarga[this.dataKeluargaEditedIndex], this.dataKeluargaEditedItem);
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

      resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      submit () {
        this.snackbar = true
        this.resetForm()
      },
      save (date) {
        this.$refs.menu.save(date)
      },

      // FOR UPLOAD IMAGE FORM
      createImage(file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.pegawaiImageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      },
    
      onFileChange(file) {
        
        console.log(this.tanggalLahir);

        if (!file) {
          return;
        }
        this.createImage(file);
      },
      // END FOR UPLOAD IMAGE FORM

      initialize () {
        this.desserts = [];
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
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

      saveItem () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
    watch: {
      // FOR GENERAL DATEPICKER FEATURE
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      // END GENERAL DATEPICKER FEATURE

      // FOR DATA KELUARGA FEATURE
      dataKeluargaDialogDelete(val) {
        val || this.closeDeleteDataKeluarga()
      },

      // END FOR DATA KELUARGA FEATURE
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },

      // feature auto complete
      // search (val) {

        // Items have already been requested
        // if (this.isLoading) return

        // this.isLoading = true
        // kabupatenService.searchAll(val).then(
        //   prov => {
        //     console.log(prov);
        //     this.isLoading = false;
        //     this.entries = prov; 
        //   },
        //   error => {
        //     this.errors = error
        //     this.isLoading = false;
        //   }
        // );
        // Lazily load input items
        // fetch('https://api.publicapis.org/entries')
        //   .then(res => res.json())
        //   .then(res => {
        //     const { count, entries } = res
        //     this.count = count
        //     this.entries = entries
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })
        //   .finally(() => (this.isLoading = false))
      // },
    },
  }
</script>