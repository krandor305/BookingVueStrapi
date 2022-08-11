<template>
   <VueSwing
  @throwout="throwout"
  @throwin="throwin"
  :config="config"
>
  <div class="box">
    <img src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' />
    <br/>
    Throw me!
    </div>
</VueSwing>
</template>

<script>
import VueSwing from 'vue-swing'

export default {
  name: 'Home',
  components: {
    VueSwing
  },
  props:['id'],
  data() {
        return {
            config:{},

        }
    },
    computed:
    {
        isMobile()
        {
            return window.screen.width <= 1024
        }
    },
    mounted()
    {
       
    },
    
  methods:{
     throwout()
     {
        console.log("out")
     },
     throwin()
     {
        console.log("in")
     }
  }
}

</script>
