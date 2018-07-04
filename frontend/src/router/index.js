import Vue from 'vue';
import Router from 'vue-router';
import routes from './router.config.json';

function importComponent (name) {
  return () => import(`@/views/${name}`);
}

function transformRoutes (routes) {
  routes.forEach(route => {
    route.component = importComponent(route.component);
    if (route.children) transformRoutes(route.children);
  });
}

transformRoutes(routes);

Vue.use(Router);

export default new Router({ routes });
