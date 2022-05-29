import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'primeflex/primeflex.css'
import PrimeVue from 'primevue/config';
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import 'primeicons/primeicons.css'
import jquery from 'jquery'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import BlockUI from 'primevue/blockui';
import ProgressSpinner from 'primevue/progressspinner';
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import MegaMenu from 'primevue/megamenu';
import DropDown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import Dialog from 'primevue/dialog';
import Calendar from 'primevue/calendar';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

window.$ = jquery

const app = createApp(App)

app.use(store).use(router).mount('#app')

app.use(PrimeVue);
app.use(ToastService);

app.component('DataTable',DataTable)
app.component('Column',Column)
app.component('Button',Button)
app.component('Dialog',Dialog)
app.component('BlockUI',BlockUI)
app.component('ProgressSpinner',ProgressSpinner)
app.component('Password',Password)
app.component('InputText',InputText)
app.component('Checkbox',Checkbox)
app.component('MegaMenu',MegaMenu)
app.component('DropDown',DropDown)
app.component('Calendar',Calendar)
app.component('Toast',Toast)
