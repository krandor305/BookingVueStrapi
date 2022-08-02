<template>

  <Toast/>
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
      <Button type="button" @click="Validation(selectedService)">Ajouter à mon emploi du temps</Button> &nbsp; <span v-if="selectedService.attributes.Price"><b>Prix:</b> {{selectedService.attributes.Price}}</span>
    </div>
  </template>
</Dialog>

 <div class="homeContent">
   <div class="grid" style="min-height:30vh">
      <div :class="'col-'+searchDiv" style='background-color:white;padding:50px;margin:20px;height:50%;border-radius:75px;transition: width 1s'>
        <div class="grid">
          <!-- <div class="col-4" >
          <span>Type: <Dropdown v-model="selectedTypes" :options="Types" optionLabel="name" style="width:5rem"/></span>
          </div> -->
          <div class="col-12" >
            <span>
              <b style="float:left;font-size:30px">Planifiez votre evening en quelques clicks:</b>
              <br/>
              <br/>
              <div class="p-inputgroup">
                    <InputText placeholder="Recherche" v-model="searchTerm" style="height: 75px;"/>
                </div>
                <br/>
                <br/>
                <!-- <div class="p-inputgroup">
                  <i style="font-size:0.7rem;margin-bottom:2px;margin-top: -10px;">Recherche avancée: </i>
                    <span><Dropdown v-model="selectedTypes" :options="Types" optionLabel="name" style="width:10rem"/></span>
                </div> -->
            </span>
          </div>
        </div>
      </div>
      <Transition name="fade">
      <div v-if="this.searchTerm && resultDiv!=false" :class="'col-'+resultDiv">
        <!-- {{resultDiv}} -->
        <DataView :value="searchElements" :paginator="true" :rows="3" :style="'background-color:white;opacity:'+opacityResults">
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
                   &nbsp;
                  <Button label="Voir la fiche de l'évenement" @click="$router.push('/ServiceDetails/'+slotProps.data.id)"/>
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
      <div v-else-if="recentEvents.length>0" style="padding:20px">
        <div class="text-6xl text-primary font-bold mb-3">Evenements prochains:</div>
        <DataView :value="recentEvents" :paginator="true" :rows="3" :style="'background-color:white;opacity:'+opacityResults">
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
                   &nbsp;
                  <Button label="Voir la fiche de l'évenement" @click="$router.push('/ServiceDetails/'+slotProps.data.id)"/>
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
   <br/>
   <div class="grid grid-nogutter surface-section text-800">
    <div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
        <section>
            <span class="block text-6xl font-bold mb-1">Planifiez votre Week-end en toute sérénité</span>
            <div class="text-6xl text-primary font-bold mb-3">Pour planifier votre journée,Inscrivez-vous au plus vite</div>
            <p class="mt-0 mb-4 text-700 line-height-3">Notre equipe ne cesse d'accroitre son catalogue d'activités et de fonctionalités</p>
            
            <Button label="Inscription/Login" type="button" class="mr-3 p-button-raised" @click="$router.push('/Login')"></Button>
            <Button label="Recherche d'activité" type="button" class="p-button-outlined" @click="scrollTop"></Button>
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
    },
    searchElements:function(newFlag)
    {
      var ref = this;
      if(newFlag.length>0)
      {
        ref.opacityResults = 1
      }
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
    recentEvents()
    {
      var ref = this;
      return this.searchElements.filter(function(d){
        return ref.isDateInThisWeek(new Date(d.attributes.DateDebut))
        })
    },
    searchDiv()
    {
      debugger;
      if(this.resultDiv == false && (!this.searchTerm || this.searchTerm==""))
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
        $('#app > div.homeContent > div:nth-child(1)').css("min-height","100vh")
        setTimeout(function(){
          if(ref.resultDiv == false && (!this.searchTerm || this.searchTerm==""))
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
          selectedTypes: {name: 'Tout', code: ''},
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
          opacityResults:0,

        }
    },
  methods:{
    isDateInThisWeek(date) {
      const todayObj = new Date();
      const todayDate = todayObj.getDate();
      const todayDay = todayObj.getDay();

      // get first date of week
      const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));

      // get last date of week
      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

      // if date is equal or within the first and last dates of the week
      return date >= firstDayOfWeek && date <= lastDayOfWeek;
    },
    openReservation(service)
    {
      var ref=this;
      this.selectedService = service
      this.showDialog = true
    },
    scrollTop()
    {
      window.scrollTo(0,0)
    },
    Validation(service)
    {
      var ref=this;
      this.showDialog = false

      var body = {
          data:{
            UserId:1,
            OutcomeId:1,
            StatusId:1,
            Travel_Agency_Id:1,
            Booking_Date:new Date(),
            Booking_Details:"",
          }
        }

      axios.post('http://localhost:8010/api/bookings',body,{
        headers:{
          'content-type': 'text/plain',
          "Authorization": "Bearer "+JSON.parse(localStorage.getItem("userinfo")).jwt
          }
      }).then(function(msg){
        console.log(msg)
        debugger;
        axios.post('http://localhost:8010/api/service-bookings',{
          data:{
            serviceId:service.id,
            BookingId:msg.data.id,
            startDate:ref.dateDebut,
            endDate:ref.dateFin,
          }
        },{
        headers:{
            'content-type': 'text/plain',
            "Authorization": "Bearer "+JSON.parse(localStorage.getItem("userinfo")).jwt
            }
          }).then(function(msg){
            console.log(msg)
            //alert("toast<success>")
            ref.$toast.add({severity:'success', summary: 'Réservation envoyée'});
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
    transition: opacity 1s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
