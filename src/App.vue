<template>
  <Toast />
  <Header/>
  <router-view/>
</template>

<script>
// @ is an alias to /src
import Header from './components/Home.vue'

export default {
  name: 'Home',
  components: {
    Header
  },
  data() {
        return {
        }
    },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

button
{
  background:rgb(255, 114, 0) !important;
  /* color:white !important; */
  border:0px !important

}

.p-menuitem
{
  color:black !important
}
</style>
