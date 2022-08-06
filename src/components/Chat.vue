<template>
<div class="chatbox-holder">
  <div class="chatbox group-chat">
    <div class="chatbox-top">
      <!-- <div class="chatbox-avatar">
        <a target="_blank" href="#"><img src="https://source.unsplash.com/600x400/?new,user,icon" /></a>
      </div> -->
      
      <!-- <div class="chat-group-name">
        <span class="status away"></span>
        Group name comes here
      </div> -->
      <!-- <div class="chatbox-icons">
        <label for="chkSettings"><i class="fa fa-gear"></i></label><input type="checkbox" id="chkSettings" />
        <div class="settings-popup">
          <ul>
            <li><a href="#">Group members</a></li>
            <li><a href="#">Add members</a></li>
            <li><a href="#">Delete members</a></li>
            <li><a href="#">Leave group</a></li>
          </ul>
        </div>
        <a href="javascript:void(0);"><i class="fa fa-minus"></i></a>
        <a href="javascript:void(0);"><i class="fa fa-close"></i></a>       
      </div>       -->
      <Button icon="pi pi-minus" class="p-button-rounded p-button-text p-button-secondary" @click="$emit('closeChat')"/>
    </div>
    
    <div class="chat-messages">
       
       <div>
       <div v-for="Message in messageList" class="message-box-holder" style="float:right">
        <div class="message-box" v-if="Message.UserId == UserId">
          {{Message.Content}}
        </div>
        <div class="message-sender" v-if="Message.UserId != UserId" style="float:left">
          <!-- <a href="#">{{Message.UserId}}</a> -->
         </div>
        <div class="message-box message-partner" v-if="Message.UserId != UserId" style="float:left">
          {{Message.Content}}
        </div>
      </div>


    </div>

    </div>
    
    <div class="chat-input-holder">
      <textarea class="chat-input"></textarea>
      <input type="submit" value="Send" class="message-send" />
    </div>
    
  </div>
</div>
</template>

<script>
export default {
  name: 'app',
  props:['id'],
  data() {
    return {
      UserId:JSON.parse(localStorage.userinfo).user.id,
      messageList: [], 
    }
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
      url: window.GLOBALVARS.VUE_APP_BACKENDURL+'/api/messageGetByService/'+ref.id,
      success: function(msg) {
        debugger;
        console.log(msg)
        msg = msg.results
        if(msg.length>0)
        { 
          ref.messageList = msg
        }
       
      },
      error: function(msg) {
        console.log(msg)
       
      }
    });
  },
  emits:['closeChat'],
  methods: {
    sendMessage (text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({ author: 'support', type: 'text', data: { text } })
      }
    },
    onMessageWasSent (message) {
      // called when the user sends a message
      this.messageList = [ ...this.messageList, message ]
    },
    openChat () {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat () {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    },
    handleScrollToTop () {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType () {
      console.log('Emit typing event')
    },
    editMessage(message){
      const m = this.messageList.find(m=>m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i');

* {
	margin: 0;
	padding: 0;
  box-sizing: border-box;
}

body {
	font-family: 'Lato', sans-serif;
	font-size: 14px;
	color: #999999;
	word-wrap: break-word;
}

ul {
	list-style: none;
}

.chatbox-holder {
  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  height: 0;
}

.chatbox {
  width: 400px;
  height: 400px;
  /* margin: 0 20px 0 0; */
  position: relative;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, .2);
  display: flex;
  flex-flow: column;
  border-radius: 10px 10px 0 0;
  background: white;
  bottom: 0;
  transition: .1s ease-out;
}

.chatbox-top {
  position: relative;
  display: flex;
  padding: 10px 0;
  border-radius: 10px 10px 0 0;
  background: rgba(0, 0, 0, .05);
}

.chatbox-icons {
  padding: 0 10px 0 0;
  display: flex;
  position: relative;
}

.chatbox-icons .fa {
  background: rgba(220, 0, 0, .6);
  padding: 3px 5px;
  margin: 0 0 0 3px;
  color: white;
  border-radius: 0 5px 0 5px;
  transition: 0.3s;
}

.chatbox-icons .fa:hover {
  border-radius: 5px 0 5px 0;
  background: rgba(220, 0, 0, 1);
}

.chatbox-icons a, .chatbox-icons a:link, .chatbox-icons a:visited {
  color: white;
}

.chat-partner-name, .chat-group-name {
  flex: 1;
  padding: 0 0 0 95px;
  font-size: 15px;
  font-weight: bold;
  color: #30649c;
  text-shadow: 1px 1px 0 white;
  transition: .1s ease-out;
}

.status {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: #cacaca;
  margin: 0 3px 0 0;
}

.online {
  background: #b7fb00;
}

.away {
  background: #ffae00;
}

.donot-disturb {
  background: #ff4343;
}

.chatbox-avatar {
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 50%;
  background: white;
  padding: 3px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, .2);
  position: absolute;
  transition: .1s ease-out;
  bottom: 0;
  left: 6px;
}

.chatbox-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.chat-messages {
  border-top: 1px solid rgba(0, 0, 0, .05);
  padding: 10px;
  overflow: auto;
  flex-flow: row wrap;
  align-content: flex-start;
  flex: 1;
}

.message-box-holder {
  width: 100%;
  margin: 0 0 15px;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
}

.message-sender {
  font-size: 12px;
  margin: 0 0 15px;
  color: #30649c;
  align-self: flex-start;
}

.message-sender a, .message-sender a:link, .message-sender a:visited, .chat-partner-name a, .chat-partner-name a:link, .chat-partner-name a:visited {
  color: #30649c;
  text-decoration: none;
}

.message-box {
  padding: 6px 10px;
  border-radius: 6px 0 6px 0;
  position: relative;
  background: rgba(100, 170, 0, .1);
  border: 2px solid rgba(100, 170, 0, .1);
  color: #6c6c6c;
  font-size: 12px;
}

.message-box:after {
  content: "";
  position: absolute;
  border: 10px solid transparent;
  border-top: 10px solid rgba(100, 170, 0, .2);
  border-right: none;
  bottom: -22px;
  right: 10px;
}

.message-partner {
  background: rgba(0, 114, 135, .1);
  border: 2px solid rgba(0, 114, 135, .1);
  align-self: flex-start;
}

.message-partner:after {
  right: auto;
  bottom: auto;
  top: -22px;
  left: 9px;
  border: 10px solid transparent;
  border-bottom: 10px solid rgba(0, 114, 135, .2);
  border-left: none;
}

.chat-input-holder {
  display: flex;
  border-top: 1px solid rgba(0, 0, 0, .1);
}

.chat-input {
  resize: none;
  padding: 5px 10px;
  height: 40px;
  font-family: 'Lato', sans-serif;
	font-size: 14px;
  color: #999999;
  flex: 1;
  border: none;
  background: rgba(0, 0, 0, .05);
   border-bottom: 1px solid rgba(0, 0, 0, .05);
}

.chat-input:focus, .message-send:focus {
  outline: none;
}

.message-send::-moz-focus-inner {
	border:0;
	padding:0;
}

.message-send {
  -webkit-appearance: none;
  background: #9cc900;
  background: -moz-linear-gradient(180deg, #00d8ff, #00b5d6);
  background: -webkit-linear-gradient(180deg, #00d8ff, #00b5d6);
  background: -o-linear-gradient(180deg, #00d8ff, #00b5d6);
  background: -ms-linear-gradient(180deg, #00d8ff, #00b5d6);
  background: linear-gradient(180deg, #00d8ff, #00b5d6);
  color: white;
  font-size: 12px;
  padding: 0 15px;
  border: none;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.3);
}

.attachment-panel {
  padding: 3px 10px;
  text-align: right;
}

.attachment-panel a, .attachment-panel a:link, .attachment-panel a:visited {
  margin: 0 0 0 7px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);
}

.chatbox-min {
  margin-bottom: -362px;
/*   height: 46px; */
}

.chatbox-min .chatbox-avatar {
  width: 60px;
  height: 60px;
}

.chatbox-min .chat-partner-name, .chatbox-min .chat-group-name {
  padding: 0 0 0 75px;
}

.settings-popup {
  background: white;
	border-radius: 20px/10px;
	box-shadow: 0 3px 5px 0 rgba(0, 0, 0, .2);
  font-size: 13px;
	opacity: 0;
	padding: 10px 0;
	position: absolute;
	right: 0;
	text-align: left;
	top: 33px;
	transition: .15s;
	transform: scale(1, 0);
	transform-origin: 50% 0;
	width: 120px;
  z-index: 2;
  border-top: 1px solid rgba(0, 0, 0, .2);
  border-bottom: 2px solid rgba(0, 0, 0, .3);
}

.settings-popup:after, .settings-popup:before {
  border: 7px solid transparent;
	border-bottom: 7px solid white;
	border-top: none;	
	content: "";
	position: absolute;
	left: 45px;
	top: -10px;
  border-top: 3px solid rgba(0, 0, 0, .2);
}

.settings-popup:before {
  border-bottom: 7px solid rgba(0, 0, 0, .25);
  top: -11px;
}

.settings-popup:after {
  border-top-color: transparent;
}

#chkSettings {
	display: none;
}

#chkSettings:checked + .settings-popup {
	opacity: 1;
	transform: scale(1, 1);
}

.settings-popup ul li a, .settings-popup ul li a:link, .settings-popup ul li a:visited {
  color: #999;
  text-decoration: none;
  display: block;
  padding: 5px 10px;
}

.settings-popup ul li a:hover {
  background: rgba(0, 0, 0, .05);
}

</style>