<template>
	<div id="app">
		<!-- {{bookings}} -->
		<!-- <h1>My Calendar</h1>
		   <div id="menu" style="padding:20px">
				<Button icon="pi pi-arrow-left" class="p-button-rounded p-button-secondary" label="previous" @click="previousMonth"/>
				&nbsp;
				<Button icon="pi pi-home" class="p-button-rounded p-button-secondary" label="today" @click="calendar.today()"/>
				&nbsp;
				<Button icon="pi pi-arrow-right" class="p-button-rounded p-button-secondary" label="next" @click="nextMonth"/>
				&nbsp;
				<br>
				<br>
				{{ calendar?(monthNames[new Date(calendar.getDate()).getMonth()]):"" }}
			</div>
		<div id="calendar" style="height: 800px;"></div> -->
		<DataView :value="bookings.filter(function(d){if(d && d.Title){return d.Title}})" :paginator="true" :rows="10">
          <template #paginatorend>
            <Button type="button" icon="pi pi-search" />
          </template>
          <template #list="slotProps" >
            <Card style="background-color:white;width: 100%;">
              <template #header>
                  <!-- <img alt="user header" src="demo/images/usercard.png"> -->
              </template>
              <template #title>
                  {{slotProps.data.Title}}
              </template>
              <template #content>
                  {{slotProps.data.Description}}
                  <br/>
				  <b>{{new Date(slotProps.data.DateDebut).toLocaleDateString()}} {{new Date(slotProps.data.DateDebut).getHours()}}:{{new Date(slotProps.data.DateDebut).getMinutes()}} - {{new Date(slotProps.data.DateFin).toLocaleDateString()}} {{new Date(slotProps.data.DateFin).getHours()}}:{{new Date(slotProps.data.DateFin).getMinutes()}}</b>
                  <!-- {{slotProps.data.ActualDescription}} -->
              </template>
              <template #footer>
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
</template>
<script>

	import axios from 'axios';
	import Calendar from 'tui-calendar'; /* ES6 */
	import DataView from 'primevue/dataview';
	import Card from 'primevue/card';
	import "tui-calendar/dist/tui-calendar.css";

	// If you use the default popups, use this.
	import 'tui-date-picker/dist/tui-date-picker.css';
	import 'tui-time-picker/dist/tui-time-picker.css';

	export default {
		name: 'app',
		data: function() {
			return { 
				showDate: new Date(),
				bookings:[], 
				services:[],
				actualDate:new Date(),
				calendar:null,
				monthNames:["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]

			}
		},
		watch:{
			// 'bookings':function(newFlag){
			// 	this.calendar.clear()
			// 	this.calendar.createSchedules(newFlag,true);
			// 	console.log(this.calendar)
			// }
		},
		mounted(){
			
			// this.calendar = new Calendar('#calendar', {
			// defaultView: 'month',
			// // taskView: true,
			//  //useCreationPopup: true,
      		//  useDetailPopup: true,
			// });
			this.loadBookings()
		},
		components: {
			DataView:DataView,
			Card:Card
		},
		methods: {
			formatDate()
			{
				var d='dd/mm/yy hh:MM:ss';
				var d1=d.split(" ");
				var date=d1[0].split("/");
				var time=d1[1].split(":");
				var dd=date[0];
				var mm=date[1]-1;
				var yy=date[2];
				var hh=time[0];
				var min=time[1];
				var ss=time[2];
				var fromdt= new Date("20"+yy,mm-1,dd,hh,min,ss);
			},
			previousMonth(){
				// var d = this.actualDate
				// this.actualDate = new Date(d.setMonth(d.getMonth()-1))
				// debugger;
				// this.calendar.invoke('setDate', this.actualDate);
				this.calendar.prev()
			},
			nextMonth(){
				// var d = this.actualDate
				// this.actualDate = new Date(d.setMonth(d.getMonth()+1))
				// this.calendar.invoke('setDate', this.actualDate);
				this.calendar.next()
			},
			setShowDate(d) {
				this.showDate = d;
			},
			loadBookings(){
				var ref = this;
				$.ajax(window.GLOBALVARS.VUE_APP_BACKENDURL+"/api/services").then(function(d){
					ref.services = d.data
					$.ajax({url:window.GLOBALVARS.VUE_APP_BACKENDURL+'/api/bookings'
							,beforeSend: function(request) {
								request.setRequestHeader("Authorization", "Bearer "+JSON.parse(localStorage.getItem("userinfo")).jwt);
							},
						}).then(function(bookings){
							console.log(bookings)
							
							$.ajax({url:window.GLOBALVARS.VUE_APP_BACKENDURL+'/api/service-bookings'
								,beforeSend: function(request) {
									request.setRequestHeader("Authorization", "Bearer "+JSON.parse(localStorage.getItem("userinfo")).jwt);
								},
							}).then(function(serviceBookings){
								console.log(serviceBookings)

								ref.bookings=serviceBookings.map(function(d){
									var obj = bookings.find(function(booking){
										return booking.id == parseInt(d.BookingId)
									})

									if(obj)
									{
										var objService = ref.services.find(function(service){
											return service.id == parseInt(d.serviceId)
										})
										
										if(objService)
										{
											// objService.attributes['start'] = new Date(d.startDate)
											// objService.attributes['endDate'] = new Date(d.endDate)
											objService.attributes['start'] = new Date(d.startDate)
											objService.attributes['end'] = new Date(d.endDate)
											objService.attributes['title'] = objService.attributes.Title
											// debugger;
											var returnObj = objService.attributes
											returnObj['id'] = objService.id
											returnObj['category'] = 'time'
											return returnObj
										}
										else
										{
											return;
										}
									}
									else
									{
										return;
									}
								})
								// 

								// alert("toast<success>")
							})
						})
				})
			}
		}
	}
</script>
<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		color: #2c3e50;
		/* height: 67vh;
		width: 90vw; */
		margin-left: auto;
		margin-right: auto;
	}
</style>