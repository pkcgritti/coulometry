import Vue from 'vue';
import Router from 'vue-router';

import DefaultLayout from '@/layouts/default.vue';
import ManagementPage from '@/pages/management.vue';
import AnalysisPage from '@/pages/analysis.vue';
import SettingsPage from '@/pages/settings.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        { path: '', name: 'Gerenciamento de arquivos', component: ManagementPage },
        { path: 'analysis', name: 'Analise de dados', component: AnalysisPage },
        { path: 'settings', name: 'Configurações', component: SettingsPage }
      ]
    }
  ]
});
