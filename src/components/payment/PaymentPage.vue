
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
          <PaymentReseller/>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>Voucher</v-expansion-panel-header>
        <v-expansion-panel-content>
          <PaymentVoucher />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
  import PaymentPPPoE from "@/components/payment/PaymentPPPoE.vue";
  import PaymentReseller from "@/components/payment/PaymentReseller.vue";
  import PaymentVoucher from "@/components/payment/PaymentVoucher.vue";

  export default {
    components: { PaymentPPPoE, PaymentReseller, PaymentVoucher },
  };
</script>