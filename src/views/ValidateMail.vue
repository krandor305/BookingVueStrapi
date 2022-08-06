<template>
  Votre mail a été validé veuillez vous connecter
  <Button label="Login" type="button" class="mr-3 p-button-raised" @click="$router.push('/Login')"></Button>
</template>

<script>
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
  name: 'Home',
  components: {
    Checkbox,
    InputText,
    Button
  },
  data() {
        return {
          username:'',
          password:'',
        }
    },
  methods:{
     Login(){
      var ref = this;
      //0-add components in root + service
      //1-verifications username and password required
      //2- 
      if(this.username && this.password)
      {
         
        $.post(window.GLOBALVARS.VUE_APP_BACKENDURL+'/api/auth/local', {
        identifier: this.username,
        password: this.password,
        }, 
            function(returnedData){
                console.log(returnedData);
                localStorage.setItem("userinfo",JSON.stringify(returnedData))
                ref.$router.push('/')
        });
      }
    }
  }
}

</script>
