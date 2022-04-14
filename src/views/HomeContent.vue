<template>

 <Dialog v-model:visible="showDialog" :style="{width:'800px'}">
   {{selectedService.attributes.Title}}
    <br/>
   {{selectedService.attributes.ActualDescription}}
    <br/>
    <br/>
    <div class="grid">
      <div class="col-1"></div>
      <div class="col-4">
        <label for="time24Debut"><b>Date début</b></label>
        <br/>
        <Calendar id="time24Debut" v-model="dateDebut" :showTime="true" :showSeconds="true" />
      </div>

      <div class="col-4">
        <label for="time24Fin"><b>Date fin</b></label>
        <br/>
        <Calendar id="time24Fin" v-model="dateFin" :showTime="true" :showSeconds="true" />
      </div>
    </div>
  <template #header>
    <div>
      <Button type="button" @click="Validation(selectedService)">Valider</Button> &nbsp; <span><b>Prix:</b> {{selectedService.attributes.Price}}</span>
    </div>
  </template>
</Dialog>

 <div class="homeContent">
   <div class="grid">
      <div :class="'col-'+searchDiv" style='background-color:white;padding:50px;margin:20px;height:50%;border-radius:75px;transition: width 1s;'>
        <div class="grid">
          <!-- <div class="col-4" >
          <span>Type: <Dropdown v-model="selectedTypes" :options="Types" optionLabel="name" style="width:5rem"/></span>
          </div> -->
          <div class="col-12" >
            <span>
              <b style="float:left">Planifiez votre evening en quelques clicks:</b>
              <br/>
              <div class="p-inputgroup">
                    <InputText placeholder="Keyword" v-model="searchTerm" style="height: 75px;"/>
                </div>
            </span>
          </div>
        </div>
      </div>
      <Transition name="fade">
      <div v-if="this.searchTerm && resultDiv!=false" :class="'col-'+resultDiv" style="transition: width 1s;">
        <!-- {{resultDiv}} -->
        <DataView :value="searchElements" :paginator="true" :rows="3" style='background-color:white;'>
          <template #paginatorend>
            <Button type="button" icon="pi pi-search" />
          </template>
          <template #list="slotProps" >
            <Card style="background-color:white;width: 100%;">
              <template #header>
                  <!-- <img alt="user header" src="demo/images/usercard.png"> -->
              </template>
              <template #title>
                  {{slotProps.data.attributes.Title}}
              </template>
              <template #content>
                  {{slotProps.data.attributes.Description}}
                  <br/>
                  {{slotProps.data.attributes.ActualDescription}}
              </template>
              <template #footer>
                  <Button label="Réserver" @click="openReservation(slotProps.data)"/>
                  <!-- <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" /> -->
              </template>
          </Card>
            <!-- <div>Place: <b>{{slotProps.data.element}}</b></div> -->
          </template>
          <!-- <template #grid="slotProps">
            <div>Place: <b>{{slotProps.data.element}}</b></div>
          </template> -->
        </DataView>

      </div>
      </Transition>
   </div>
   <div class="grid grid-nogutter surface-section text-800">
    <div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
        <section>
            <span class="block text-6xl font-bold mb-1">Create the screens your</span>
            <div class="text-6xl text-primary font-bold mb-3">your visitors deserve to see</div>
            <p class="mt-0 mb-4 text-700 line-height-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            
            <Button label="Learn More" type="button" class="mr-3 p-button-raised"></Button>
            <Button label="Live Demo" type="button" class="p-button-outlined"></Button>
        </section>
    </div>
    <div class="col-12 md:col-6 overflow-hidden">
        <img src="../assets/img/backgroundhome.jpg" height="250px" width="250px" alt="Image" class="md:ml-auto block md:h-full" style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)">
    </div>
    </div>
 </div>
 
</template>

<script>
// @ is an alias to /src
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import DataView from 'primevue/dataview';
import Button from 'primevue/button';
import Card from 'primevue/card';
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    Dropdown,
    InputText,
    DataView,
    Button,
    Card
  },
  watch:{
    searchTerm:function(newFlag){
      var ref = this;
      if(!newFlag){
        ref.searchElements = ref.baseElements
      }
      ref.searchElements = ref.baseElements.filter(function(d){
        return d.attributes.Title.indexOf(newFlag)!=-1
      })
    }
  },
  mounted()
  {
    var ref = this
    $.ajax("http://localhost:8010/api/services").then(function(d){
      ref.baseElements = d.data
      ref.searchElements = d.data
    })
  },
  computed:
  {
    searchDiv()
    {
      if(!this.searchTerm || this.searchTerm=="")
      {
        // this.resultDiv=false;
        var ref = this;
        ref.resultDiv = false;
        setTimeout(function(){
          ref.resultDiv = false;
        },1*1000)
        return 11;
      }
      else
      {
        var ref = this;
        setTimeout(function(){
          if(!this.searchTerm || this.searchTerm=="")
          {
            ref.resultDiv = 7;
          }
        },1*1000)
        return 4;
      }
    },

  },
  data() {
        return {
          selectedTypes: null,
          Types: [
            {name: 'Tout', code: ''},
            {name: 'Restaurants', code: 'Restaurant'},
            {name: 'Hotels', code: 'Hotels'},
            {name: 'Déplacement', code: 'Deplacements'},
            {name: 'Restaurants', code: 'Restaurants'},
            {name: 'Autres', code: 'Autres'},
          ],
          searchTerm:'',
          baseElements:[],
          searchElements:[],
          showDialog:false,
          selectedService:{},
          dateDebut:new Date(),
          dateFin:new Date(),
          resultDiv:false,

        }
    },
  methods:{
    openReservation(service)
    {
      var ref=this;
      this.selectedService = service
      this.showDialog = true
    },
    Validation(service)
    {
      var ref=this;
      this.showDialog = false
      var body = {data:{UserId:1,
        OutcomeId:1,
        StatusId:1,
        Travel_Agency_Id:1,
        Booking_Date:new Date(),
        Booking_Details:"",
        }}
      axios.post('http://localhost:8010/api/bookings',body,{
        'content-type': 'text/plain',
        "Authorization": "Bearer "+JSON.parse(localStorage.getItem("userinfo")).jwt
      }).then(function(msg){
        console.log(msg)
        axios.post('http://localhost:8010/api/service-bookings',{data:{
          serviceId:service.id,
          BookingId:msg.id,
          startDate:ref.dateDebut,
          endDate:ref.dateFin,
        }},{
        'content-type': 'text/plain',
        "Authorization": "Bearer "+JSON.parse(localStorage.getItem("userinfo")).jwt
          }).then(function(msg){
            console.log(msg)
          })
      })

    }
  }
}
</script>

<style>
  .homeContent{
    /* width:100vw; */
    /* height:100vh; */
    background-image: url('~@/assets/img/backgroundhome.jpg');
  }

  .homeContent .p-card{
    box-shadow: 0 !important;
    border-radius: 0px !important;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
