import Vue from 'vue';
import App from './App.vue';
import VueTableView, { defineVueTableViewGlobalOption } from 'vue-table-view';
import "vue-table-view/dist/style.css";
import { setupProdMockServer } from './mock'
import { AvailableLanguage } from 'vue-table-view/src/config/common'

setupProdMockServer();

Vue.use(VueTableView, defineVueTableViewGlobalOption({
  language: AvailableLanguage.ZhCn
}));

new Vue({
  render: h => h(App)
}).$mount('#app');
