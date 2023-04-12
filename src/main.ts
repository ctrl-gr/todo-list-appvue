import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import BaseButton from "./components/BaseButton.vue";
import BaseInput from "./components/BaseInput.vue";
import TodoList from "./view/TodoList.vue";
import BaseCheckBox from "./components/BaseCheckBox.vue";

createApp(App)
    .component('BaseButton', BaseButton)
    .component('BaseCheckBox', BaseCheckBox)
    .component('BaseInput', BaseInput)
    .component('TodoList', TodoList)
    .mount('#app');
