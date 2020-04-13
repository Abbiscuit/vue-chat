import Vue from 'vue';
import App from './App.vue';
import { firestorePlugin } from 'vuefire';
import VueRouter from 'vue-router';
import VueCompositionApi from '@vue/composition-api';
import Home from '@/components/Home';
import ChatRoom from '@/components/ChatRoom';

Vue.use(firestorePlugin);
Vue.use(VueRouter);
Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes: [
    { path: '/', component: Home, name: 'Home' },
    {
      path: '/chats/:id',
      component: ChatRoom,
      name: 'ChatRoom'
    }
  ]
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
