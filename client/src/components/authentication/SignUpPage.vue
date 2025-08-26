<script>
import {register} from '@/services/authentication'
export default {
  data(){
    return {
      email:'',
      password:'',
      error:'',
      loading:false
    }
  },
  methods:{
    async onRegister(){
      this.loading=true;
      this.error='';
      try{
       await register({email:this.email,password:this.password})

      }
      catch (err){
        this.error=err.response.data.message|| "Ошибка"
      }
finally{
        this.loading=false;
      }
    }
  }

}

</script>

<template>
<b-container>
    <b-row class="justify-content-center">
      <b-col cols="12" md="6">
<b-form @submit.prevent="onRegister">
     <b-form-group label="Email" label-for="email">
       <b-form-input id="email" type="email" required v-model="email"></b-form-input>
     </b-form-group>
      <b-form-group label="Password" label-for="password">
        <b-form-input id="password" type="password" required v-model="password"></b-form-input>
      </b-form-group>
        <b-button type="submit" variant="primary" :disabled="loading" >{{loading? 'Registering': 'sign up'}}</b-button>
</b-form>
      </b-col>
    </b-row>
</b-container>
</template>

<style scoped>

</style>