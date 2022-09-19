<template>

  <Toast/>
  <Dialog v-model:visible="showDialog" header="Ajouter un publication" :style="{width:'800px'}">
    <Editor v-model="dataPublish" editorStyle="height: 100px"/>
    <template #header>
      <div>
        <Button type="button" @click="Validation(selectedService)">Publier</Button> &nbsp; 
      </div>
  </template>
  </Dialog>

  <div v-for="i in [1,2,3,4,5]" key="i" style="padding:10px">
    <br/>
    <Panel>
      <br/>
      <template #header>
          <Avatar label="P" /> Personne X a publié le 15/09/2016
      </template>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            
      <Timeline :value="events">
        <template #content="slotProps">
          <Avatar label="X" /> &nbsp;{{slotProps.item.status}}
        </template>
      </Timeline>
      <br/> 
      <InputText style="width:80%" placeholder="Commentaire..."/>
      &nbsp;
      <Button icon="pi pi-telegram" class="p-button-rounded p-button-primary" />
    </Panel>
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
import Editor from 'primevue/editor';
import Panel from 'primevue/panel';

import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import Timeline from 'primevue/timeline';

export default {
  name: 'Home',
  components: {
    Dropdown,
    InputText,
    DataView,
    Button,
    Card,
    Editor,
    Panel,
    Avatar,
    AvatarGroup,
    Timeline
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
    $.ajax(window.GLOBALVARS.VUE_APP_BACKENDURL+"/api/services").then(function(d){
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
          dataPublish:"",
           events: [
                {status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg'},
                {status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7'},
                {status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800'},
                {status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B'}
            ],

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

  .p-timeline-event-opposite
  {
    display:none
  }

  .p-timeline-event-marker
  {
    display:none
  }
</style>
