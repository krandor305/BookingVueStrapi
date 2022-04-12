<template>
			<div>
				<Menubar :model="items">
               <!-- <template #item="{item}">
                  <router-link :to="item.to">
                     {{item.name}}
                     <a :href="href" @click="navigate">{{route.fullPath}}</a> 
                  </router-link> 
               </template> -->
               <template #end>
                  <Button icon="pi pi-user" class="p-button-rounded p-button-secondary" @click="$router.push('/EspaceUtilisateur')"/>
					</template>
            </Menubar>
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
            // {label:'Espace utilisateur',icon:'pi pi-fw pi-sitemap',name:"EspaceUtilisateur",to:"/EspaceUtilisateur"}
            ]
        }
    },
}
</script>
