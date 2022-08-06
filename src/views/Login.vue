<template>
<br/>
 <div class="flex card-container blue-container overflow-hidden" style="padding:10px">
    <div class="flex-none flex align-items-center justify-content-center"></div>
    <div class="flex-grow-1 flex align-items-center justify-content-center">
      <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
    <div class="text-center mb-5">
            <img src='~@/assets/logo.png' alt="Image" height="50" class="mb-3">
            <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
            <span class="text-600 font-medium line-height-3">Don't have an account?</span>
            <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" @click="$router.push('/Register')">Create today!</a>
        </div>

        <div>
            <label for="email1" class="block text-900 font-medium mb-2">Username</label>
            <InputText id="email1" type="text" class="w-full mb-3" v-model="username"/>

            <label for="password1" class="block text-900 font-medium mb-2">Password</label>
            <InputText id="password1" type="password" class="w-full mb-3" v-model="password"/>

            <div class="flex align-items-center justify-content-between mb-6">
                <div class="flex align-items-center">
                    <Checkbox id="rememberme1" :binary="true" v-model="checked" class="mr-2"></Checkbox>
                    <label for="rememberme1">Remember me</label>
                </div>
                <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a>
            </div>

            <Button label="Sign In" icon="pi pi-user" class="w-full" @click="Login"></Button>
        </div>
    </div> 
    </div>
    <div class="flex-none flex align-items-center justify-content-center"></div>
  </div>
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
