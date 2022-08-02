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

 <section class="blog-me pt-100 pb-100" id="blog">
         <div class="container">
            <div class="row">
               <div class="col-xl-6 mx-auto text-center">
                  <div class="section-title mb-100">
                  <h4>Cette semaine</h4>
                  </div>
               </div>
            </div>
            <div class="row">
               <div class="col-lg-4 col-md-6" v-for="elem in searchElements" :key="elem.id">
                  <!-- Single Blog -->
                  <div class="single-blog">
                     <div class="blog-img">
                        <img src="http://infinityflamesoft.com/html/abal-preview/assets/img/blog/blog1.jpg" alt="">
                        <div class="post-category">
                           <a href="#">{{elem.attributes.Type}}</a>
                        </div>
                     </div>
                     <div class="blog-content">
                        <div class="blog-title">
                           <h4><a href="#">{{elem.attributes.Title}}</a></h4>
                           <div class="meta">
                              <ul>
                                 <li>{{new Date(elem.attributes.DateDebut).toLocaleDateString()}} {{new Date(elem.attributes.DateDebut).getHours()}}:{{new Date(elem.attributes.DateDebut).getMinutes()}} - {{new Date(elem.attributes.DateFin).toLocaleDateString()}} {{new Date(elem.attributes.DateFin).getHours()}}:{{new Date(elem.attributes.DateFin).getMinutes()}}</li>
                              </ul>
                           </div>
                        </div>
                        <p>{{elem.attributes.Description}}</p>
                        <a href="#" class="box_btn" @click="openReservation(elem)">lire plus</a>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </section>
 
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
          selectedService:{attributes:{}},
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
  .pb-100 {
	padding-bottom: 100px;
}
.pt-100 {
	padding-top: 100px;
}
.mb-100 {
	margin-bottom: 100px;
}
a {
	text-decoration: none;
	color: #333;
	-webkit-transition: .4s;
	transition: .4s;
}
.section-title {
	position: relative;
}
.section-title p {
	font-size: 16px;
	margin-bottom: 5px;
	font-weight: 400;
}
.section-title h4 {
	font-size: 40px;
	font-weight: 600;
	text-transform: capitalize;
	position: relative;
	padding-bottom: 20px;
	display: inline-block;
}
.section-title h4::before {
	position: absolute;
	content: "";
	width: 80px;
	height: 2px;
	background-color: #d8d8d8;
	bottom: 0;
	left: 50%;
	margin-left: -40px;
}
.section-title h4::after {
	position: absolute;
	content: "";
	width: 50px;
	height: 2px;
	background-color: #FF7200;
	left: 0;
	bottom: 0;
	left: 50%;
	margin-left: -25px;
}
.blog-img {
	position: relative;
}
.blog-img img {
	width: 100%;
}
.post-category a {
	display: inline-block;
	background-color: #FF7200;
	color: #fff;
	font-size: 15px;
	padding: 5px 20px;
}
.single-blog:hover img {
	opacity: .85;
	-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=85)"
}
.post-category {
	position: absolute;
	left: 0;
	bottom: 0;
}
.blog-content {
	padding: 30px 20px;
}
.single-blog {
	border: 1px solid #eee;
}
.blog-title h4 {
	font-size: 20px;
	font-weight: 500;
	margin-bottom: 5px;
}
.meta ul {
	margin: 0;
	padding: 0;
	list-style: none;
}
.meta {
	margin-bottom: 20px;
	opacity: .85;
	-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=85)";
}
.blog-content a.box_btn {
	display: inline-block;
	background-color: #FF7200;
	padding: 5px 15px;
	color: #fff;
	text-transform: capitalize;
	margin-top: 20px;
}
a.box_btn::before {
	position: absolute;
	content: "";
	width: 100%;
	height: 100%;
	background-color: #CC5B00;
	left: -100%;
	top: 0;
	-webkit-transition: .5s;
	transition: .5s;
	z-index: -1;
}
a.box_btn {
	overflow: hidden;
	z-index: 2;
	-webkit-transition: .5s;
	transition: .5s;
	position: relative;
	text-decoration:none;
}
a.box_btn:hover::before {
	left: 0;
	z-index: -1;
}

</style>
