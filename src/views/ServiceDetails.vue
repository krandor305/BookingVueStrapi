<template>
    <div class="flex justify-content-center flex-wrap card-container yellow-container">
            <div class="flex align-items-center justify-content-center"></div>
            <div class="flex align-items-center justify-content-center">
                <div class="grid" style="width:60%;padding:20px">
                    <div class="col-6">
                        <h2>{{service.Title}}</h2>
                        <p style="text-align:left">{{service.Description}}</p>
                        <br/>
                        <Button type="button" @click="$router.push('/Chat/'+id)">Voir la discussion</Button>
                    </div>
                    <div class="col-6">
                        
                        <iframe v-if="service.Coordinates && service.Coordinates.X && service.Coordinates.Y" width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" :src="'https://www.openstreetmap.org/export/embed.html?bbox='+service.Coordinates.Y+'%2C'+service.Coordinates.X+'%2C'+service.Coordinates.Y+'%2C'+service.Coordinates.X+'&amp;layer=mapnik&amp;marker='+service.Coordinates.X+'%2C'+service.Coordinates.Y" style="border: 1px solid black"></iframe>
                        <!-- <iframe v-if="service.Coordinates && service.Coordinates.X && service.Coordinates.Y" width="100%" height="400" :src="'https://www.openstreetmap.org/#map=19/'+service.Coordinates.X+'/'+service.Coordinates.Y" scrolling="no" frameborder="0"></iframe> -->
                        <iframe v-else width="100%" height="400" src="https://www.google.com/maps?output=embed" scrolling="no" frameborder="0"></iframe>

                    </div>
                    <div class="col-12">
                        <Carousel v-if="images && images.length>0" :images="images"/>
                    </div>
                </div>
            </div>
            <div class="flex align-items-center justify-content-center"></div>
    </div>
    
    <Button @click="hiddenChat=false" v-if="hiddenChat" icon="pi pi-telegram" class="p-button-rounded p-button-primary" style="position:fixed;bottom:20px;right:20px"/>
    <Chat v-else :id="id" @closeChat="hiddenChat=true"/>
    
</template>

<script>
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Carousel from '../components/Carousel.vue'
import Chat from '../components/Chat'

export default {
  name: 'Home',
  components: {
    Checkbox,
    InputText,
    Button,
    Carousel,
    Chat
  },
  props:['id'],
  data() {
        return {
            service:{},
            images:[],
            hiddenChat:true
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

        $.ajax({
        type: "Get",
        beforeSend: function(request) {
            request.setRequestHeader('content-type', 'text/plain')
            request.setRequestHeader("Authorization", "Bearer "+JSON.parse(localStorage.getItem("userinfo")).jwt)
        },
        url: 'http://localhost:8010/api/assetUpload/GetEventPics/'+ref.id,
        success: function(msg) {
                debugger;
                console.log(msg)
            if(msg.length>0)
            { 
                ref.images = msg.map(function(d){
                    return d.Media.Data
                })
                
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
