<template>
	<div id="app">
		{{bookings}}
		<h1>My Calendar</h1>
		<calendar-view
			:show-date="showDate"
			class="theme-default holiday-us-traditional holiday-us-official">
			<template #header="{ headerProps }">
				<calendar-view-header
					:header-props="headerProps"
					@input="setShowDate"
					:items="bookings" />
			</template>
		</calendar-view>
	</div>
</template>
<script>
	import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"

	import "vue-simple-calendar/dist/style.css"
	// The next two lines are optional themes
	import "vue-simple-calendar/static/css/default.css"
	import "vue-simple-calendar/static/css/holidays-us.css"

	import axios from 'axios';

	export default {
		name: 'app',
		data: function() {
			return { 
				showDate: new Date(),
				bookings:[], 
				services:[]
			}
		},
		mounted(){
			this.loadBookings()
		},
		components: {
			CalendarView,
			CalendarViewHeader,
		},
		methods: {
			setShowDate(d) {
				this.showDate = d;
			},
			loadBookings(){
				var ref = this;
				$.ajax("http://localhost:8010/api/services").then(function(d){
					ref.services = d.data
					$.ajax({url:'http://localhost:8010/api/bookings'
							,beforeSend: function(request) {
								request.setRequestHeader("Authorization", "Bearer "+JSON.parse(localStorage.getItem("userinfo")).jwt);
							},
						}).then(function(bookings){
							console.log(bookings)
							debugger;
							$.ajax({url:'http://localhost:8010/api/service-bookings'
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
										debugger;
										if(objService)
										{
											objService['startDate'] = new Date(d.startDate)
											objService['endDate'] = new Date(d.endDate)
											var returnObj = objService.attributes
											returnObj['id'] = objService.id
											return objService
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
								alert("toast<success>")
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
		height: 67vh;
		width: 90vw;
		margin-left: auto;
		margin-right: auto;
	}
</style>