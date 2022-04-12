<template>
  <div class="grid">
    <div class="col-12">
      <h1 style="float:left">&nbsp;Bienvenue {{user.username}}</h1>
    </div>
  </div>
  <br/>
  <div class="grid">
    <div class="col-6" style='border: solid 1px;margin-left: 10px;'>
      <h5>Informations utilisateur</h5>
      <label for="username" class="block text-900 font-medium mb-2">username</label>
      <InputText id="username" type="text" class="w-full mb-3" v-model="user.username"/>
      
      <label for="email" class="block text-900 font-medium mb-2">email</label>
      <InputText id="email" type="text" class="w-full mb-3" v-model="user.email"/>
    </div>
    <div class="col-3"></div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data() {
        return {
            user:JSON.parse(localStorage.userinfo).user
        }
    },
}
</script>
