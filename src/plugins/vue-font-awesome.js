import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'



import { faBars, faHome, faTrash, faPen, faTimes, faPlus, faThList } from '@fortawesome/free-solid-svg-icons'
library.add(faBars);
library.add(faHome);
library.add(faTrash);
library.add(faPen);
library.add(faTimes);
library.add(faPlus);
library.add(faThList)


Vue.component('fa-icon', FontAwesomeIcon)