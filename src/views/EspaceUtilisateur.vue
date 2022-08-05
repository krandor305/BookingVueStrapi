<template>

  <br/>
  <TabView>
	<TabPanel header="Profil">
		<div class="grid">
    <div class="col-12">
      <h1 style="float:left">&nbsp;Bienvenue {{user.username}}</h1>
      </div>
    </div>
    <div class="col-12">
            <div class="card">
                <h5>Amis (3)</h5>
                <br/>
                <Avatar icon="pi pi-user" class="mr-2" size="xlarge" shape="circle" />
                <Avatar icon="pi pi-user" class="mr-2" size="xlarge" shape="circle" />
                <Avatar icon="pi pi-user" class="mr-2" size="xlarge" shape="circle" />
            </div>
    </div>
    <br/>
	</TabPanel>
	<TabPanel header="Réglages">
		<div class="grid">
    <div class="col-6" >
      <label for="username" class="block text-900 font-medium mb-2" style="float:left;">username</label>
      <InputText id="username" type="text" class="w-full mb-3" style="width:200px;float:left;" v-model="user.username" disabled/>
      
      <label for="email" class="block text-900 font-medium mb-2" style="float:left;">email</label>
      <InputText id="email" type="text" class="w-full mb-3" style="width:200px;float:left;" v-model="user.email" disabled/>
    </div>
    <div class="col-6">
      <FileUpload name="demo[]" mode="basic" :customUpload="true" @uploader="sendMedia" label="Changer photo"/>
      <br/>
      <img :src="profileImg" height="100" width="100" style="border-radius: 50%;">
    </div>
    <div class="col-3"></div>
  </div>
	</TabPanel>
</TabView>
  
</template>

<script>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import FileUpload from 'primevue/fileupload';
import Avatar from 'primevue/avatar'

import axios from 'axios';

// import {UploadMedia, UpdateMedia} from "vue-media-upload";


export default {
  name: 'Home',
  components: {
    TabView,
    TabPanel,
    FileUpload,
    Avatar
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
      url: 'http://localhost:8010/api/assetUpload/GetUserProfilePic/'+ref.user.id,
      success: function(msg) {
        debugger;
        console.log(msg)
        if(msg.length>0)
        { 
          ref.profileImg = msg[0].Media.Data
        }
       
      },
      error: function(msg) {
        console.log(msg)
       
      }
    });
  },
  data() {
        return {
            user:JSON.parse(localStorage.userinfo).user,
            profileImg:"../assets/img/DefaultImgAdd.png"
        }
    },
  methods:
  {
    // async getBase64(file) {
    //   var reader = new FileReader();
    //   reader.onload = function () {
    //     return reader.result;
    //   };

    //   reader.onerror = function (error) {
    //     console.log('Error: ', error);
    //   };
    //   return await reader.readAsDataURL(file);
    // },
    async sendMedia(e)
    {
      var ref = this;
      var reader = new FileReader();
      reader.readAsDataURL(e.files[0]);

      reader.onload = async function () {
        var body = {
        "data":{
        "Media":{
          Name:e.files[0].name,
          Type:e.files[0].type,
          Size:e.files[0].size,
          Data:reader.result,
        }}
      }

      var result = await axios.post('http://localhost:8010/api/assetUpload/UploadUserProfilePic',body,{
        headers:{
          'content-type': 'text/plain',
          "Authorization": "Bearer "+JSON.parse(localStorage.getItem("userinfo")).jwt
          }
      })
      ref.profileImg = result.data.Media.Data
      debugger;
      };

      reader.onerror = function (error) {
        console.log('Error: ', error);
      };

    }
  }
}
</script>
