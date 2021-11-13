
<template>
  <div>
    <v-expansion-panels multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>PPPoE</v-expansion-panel-header>
        <v-expansion-panel-content>
          <PaymentPPPoE></PaymentPPPoE>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>Reseller</v-expansion-panel-header>
        <v-expansion-panel-content>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>Voucher</v-expansion-panel-header>
        <v-expansion-panel-content>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
  import PaymentPPPoE from "@/components/payment/PaymentPPPoE.vue";

  export default {
    components: {
      PaymentPPPoE,
    },
  };
</script>