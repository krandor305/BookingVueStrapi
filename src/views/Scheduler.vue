<template>
	<div id="app">
		{{bookings}}
		<h1>My Calendar</h1>
		   <div id="menu">
				<span id="menu-navi">
					<button type="button" class="btn btn-default btn-sm move-today" data-action="move-today">Today</button>
					<button type="button" class="btn btn-default btn-sm move-day" data-action="move-prev">
					<i class="calendar-icon ic-arrow-line-left" data-action="move-prev"></i>
					</button>
					<button type="button" class="btn btn-default btn-sm move-day" data-action="move-next">
					<i class="calendar-icon ic-arrow-line-right" data-action="move-next"></i>
					</button>
				</span>
				<span id="renderRange" class="render-range"></span>
			</div>
		<div id="calendar" style="height: 800px;"></div>
	</div>
</template>
<script>

	import axios from 'axios';
	import Calendar from 'tui-calendar'; /* ES6 */
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
				calendar:null
			}
		},
		watch:{
			'bookings':function(newFlag){
				this.calendar.createSchedules(newFlag);
			}
		},
		mounted(){
			
			this.calendar = new Calendar('#calendar', {
			defaultView: 'month',
			// taskView: true,
			});
			this.loadBookings()
		},
		components: {
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
										
										if(objService)
										{
											// objService.attributes['start'] = new Date(d.startDate)
											// objService.attributes['endDate'] = new Date(d.endDate)
											objService.attributes['start'] = new Date(d.startDate)
											objService.attributes['end'] = new Date(d.endDate)
											objService.attributes['title'] = objService.attributes.Title
											debugger;
											var returnObj = objService.attributes
											returnObj['id'] = objService.id
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