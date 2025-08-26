<template>
  <b-container>
    <b-row class="justify-content-center">
      <b-col cols="12" md="6">
        <b-alert variant="success" v-model="showOkAlert" fade
          >Дані збережені</b-alert
        >
        <h2 class="text-center mb-4">Картка даних про водія</h2>
        <b-form @submit.prevent="onSubmit">
          <b-form-group label="Номер авто" label-for="carNumber">
            <b-form-input
              id="carNumber"
              v-model.number="form.carNumber"
              required
            />
          </b-form-group>

          <b-form-group label="Ім'я водія" label-for="driver-Name">
            <b-form-input id="driver-Name" v-model="form.driverName" required />
          </b-form-group>

          <b-form-group label="Вага авто" label-for="carWeight">
            <b-form-input
              id="carWeight"
              v-model.number="form.carWeight"
              required
            />
          </b-form-group>
<b-form-checkbox id="Checkbox-1" v-model="stat" name="checkbox-1" > Виїзд в ночі</b-form-checkbox>

          <b-col class="mt-3 text-center">
            <b-button type="submit" variant="primary"> Підтвердити </b-button>
          </b-col>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      showOkAlert: false,
      stat: false,
      form: {
        carNumber: null,
        driverName: "",
        carWeight: null,
      },
    };
  },
  methods: {
    ...mapActions("vehicles", ["addVehicle"]),

    async onSubmit() {
      const payload = {
        driver_number: this.form.carNumber,
        driver_name: this.form.driverName,
        car_weight: this.form.carWeight,
        isNight :this.stat,
      };

      try {
        await this.addVehicle(payload);
        this.showOkAlert = true;
        setTimeout(() => {
          this.showOkAlert = false;
        }, 1500);

        this.form.carNumber = null;
        this.form.driverName = "";
        this.form.carWeight = null;
        this.stat=false;
      } catch (error) {
        console.error("Помилка", error);
      }
    },
  },
};
</script>
<style scoped></style>
