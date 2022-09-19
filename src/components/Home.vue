<template>
			<div>
        <div class="menuBar">
				<Menubar :model="items" style="background:#ff7200;color:white !important">
               <!-- <template #item="{item}">
                  <router-link :to="item.to">
                     {{item.name}}
                     <a :href="href" @click="navigate">{{route.fullPath}}</a> 
                  </router-link> 
               </template> -->
               <template #end>
                  <Button icon="pi pi-user" class="p-button-rounded" @click="$router.push('/EspaceUtilisateur')" style="color: black;background-color: #d8d8d8;"/>
					</template>
            </Menubar>
        </div>
			</div>

</template>

<script>
// @ is an alias to /src
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';

export default {
  name: 'Home',
  components: {
    Menubar,
    Button
  },
  data() {
        return {
            items:[
            {label:'Accueil',icon:'pi pi-fw pi-home',name:"Accueil",to:"/"},
            {label:"Fil d'actualité",icon:'pi pi-fw pi-calendar',name:"feed",to:"/ContentFeed"},
            {label:'Mes évenements',icon:'pi pi-fw pi-calendar',name:"Scheduler",to:"/Scheduler"},
            // {label:'Espace utilisateur',icon:'pi pi-fw pi-sitemap',name:"EspaceUtilisateur",to:"/EspaceUtilisateur"}
            ]
        }
    },
}
</script>

<style>
  #app > div:nth-child(2) > div > div .p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link .p-menuitem-text {
    /* color: white !important; */
  }

  #app > div:nth-child(2) > div > div .p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link .p-menuitem-icon {
    /* color:#d8d8d8 !important */
  }

</style>
