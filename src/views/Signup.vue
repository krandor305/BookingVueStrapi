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
            <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
        </div>

        <div>
          <label for="name" class="block text-900 font-medium mb-2">Password</label>
          <InputText id="name" class="w-full mb-3" />

            <label for="email1" class="block text-900 font-medium mb-2">Email</label>
            <InputText id="email1" type="text" class="w-full mb-3" />

            <label for="password1" class="block text-900 font-medium mb-2">Password</label>
            <InputText id="password1" type="password" class="w-full mb-3" />

            <div class="flex align-items-center justify-content-between mb-6">
                <div class="flex align-items-center">
                    <Checkbox id="rememberme1" :binary="true" v-model="checked" class="mr-2"></Checkbox>
                    <label for="rememberme1">Remember me</label>
                </div>
                <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a>
            </div>

            <Button label="Sign In" icon="pi pi-user" class="w-full"></Button>
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
        }
    },
}
</script>
