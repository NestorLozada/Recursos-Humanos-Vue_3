import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import CentroCosto from 'src/pages/CentroCostosCRUD.vue'
import TableList from 'src/pages/LogginAuth.vue'
import Trabajadores from 'src/pages/Trabajadores.vue'
import Icons from 'src/pages/Icons.vue'
import Movplantillas from 'src/pages/ListaPlantillaCRUD.vue'
import Parametros from 'src/pages/Parametros.vue'
import Upgrade from 'src/pages/Notifications.vue'
import Log from 'src/pages/Log.vue'
import clientes from 'src/pages/ClientesCRUD.vue'
const routes = [
  {
    path: '/',
    component: Log,
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    meta: {
      requiresAuth: true, // Agrega el metadato 'requiresAuth' a la ruta padre
    },
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview,
        meta: {
          requiresAuth: true, // Agrega el metadato 'requiresAuth' a la ruta padre
        },
      },
      {
        path: 'centrocosto',
        name: 'CentroCosto',
        component: CentroCosto,
        meta: {
          requiresAuth: true, // Agrega el metadato 'requiresAuth' a la ruta padre
        },
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList,
        meta: {
          requiresAuth: true, // Agrega el metadato 'requiresAuth' a la ruta padre
        },
      },
      {
        path: 'trabajadores',
        name: 'Trabajadores',
        component: Trabajadores,
        meta: {
          requiresAuth: true, // Agrega el metadato 'requiresAuth' a la ruta padre
        },
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons,
        meta: {
          requiresAuth: true, // Agrega el metadato 'requiresAuth' a la ruta padre
        },
      },
      {
        path: 'movplantillas',
        name: 'Movplantillas',
        component: Movplantillas,
        meta: {
          requiresAuth: true, // Agrega el metadato 'requiresAuth' a la ruta padre
        },
      },
      {
        path: 'parametros',
        name: 'Parametros',
        component: Parametros,
        meta: {
          requiresAuth: true, // Agrega el metadato 'requiresAuth' a la ruta padre
        },
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade,
        meta: {
          requiresAuth: true, // Agrega el metadato 'requiresAuth' a la ruta padre
        },
      },
      {
        path: 'clientes',
        name: 'Clientes',
        component: clientes,
        meta: {
          requiresAuth: true, // Agrega el metadato 'requiresAuth' a la ruta padre
        },
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
