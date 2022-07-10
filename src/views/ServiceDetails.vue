<template>
    <div class="flex justify-content-center flex-wrap card-container yellow-container">
            <div class="flex align-items-center justify-content-center"></div>
            <div class="flex align-items-center justify-content-center">
                <div class="grid" style="width:60%;padding:20px">
                    <div class="col-6">
                        <h2>{{service.Title}}</h2>
                        <p style="text-align:left">{{service.Description}}</p>
                        <br/>
                        <Button type="button" @click="Validation(selectedService)">Intégrer l'évenement</Button>
                    </div>
                    <div class="col-6">

                        <iframe v-if="service.Coordinates && service.Coordinates.X && service.Coordinates.Y" width="100%" height="400" :src="'https://www.google.com/maps/@'+service.Coordinates.X+','+service.Coordinates.Y+'?output=embed'" scrolling="no" frameborder="0"></iframe>
                        <iframe v-else width="100%" height="400" src="https://www.google.com/maps?output=embed" scrolling="no" frameborder="0"></iframe>

                    </div>
                    <div class="col-12">
                        <Carousel/>
                    </div>
                </div>
            </div>
            <div class="flex align-items-center justify-content-center"></div>
    </div>
    
</template>

<script>
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Carousel from '../components/Carousel.vue'

export default {
  name: 'Home',
  components: {
    Checkbox,
    InputText,
    Button,
    Carousel
  },
  props:['id'],
  data() {
        return {
            service:{},
        }
    },
    mounted()
    {
        var ref = this;
        $.ajax({
        type: "Get",
        beforeSend: function(request) {
            request.setRequestHeader('content-type', 'text/plain')
            request.setRequestHeader("Authorization", "Bearer "+JSON.parse(localStorage.getItem("userinfo")).jwt)
        },
        url: 'http://localhost:8010/api/services/'+ref.id,
        success: function(msg) {
            debugger;
            console.log(msg)
            if(msg.data.attributes)
            { 
                ref.service = msg.data.attributes
            }
        
        },
        error: function(msg) {
            console.log(msg)
        
        }
        });
    },
    
  methods:{
     
  }
}

</script>
