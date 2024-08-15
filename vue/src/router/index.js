import { createRouter as createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex'

// Import components
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import LogoutView from '../views/LogoutView.vue';
import RegisterView from '../views/RegisterView.vue';
import MyLibraryView from '../views/MyLibraryView.vue';
import CollectionsView from '../views/CollectionsView.vue';
import AddAlbumView from '../views/AddAlbumView.vue';
import ViewAlbumCollection from '../components/ViewAlbumCollection.vue';
import MyCollectionsView from '../views/MyCollectionsView.vue';
import AddCollectionView from '../views/AddCollectionView.vue';
import AlbumDetails from '../components/AlbumDetails.vue';
import ModifyCollection from '../components/ModifyCollection.vue';

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/mylibrary",
    name: "my-library",
    component: MyLibraryView,
    meta: {
      requiresAuth: true
    }
  },
  // {
  //   path: "/albums",
  //   name: "add-album",
  //   component: AddAlbumView,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  {
    path: "/album/:album_id",
    name: "album-details",
    component: AlbumDetails,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/album/:album_id/edit",
    name: "add-album",
    component: AddAlbumView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/addcollections",
    name: "add-collection",
    component: AddCollectionView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/collections",
    name: "collections",
    component: CollectionsView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/mycollections",
    name: "my-collections",
    component: MyCollectionsView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/collections/:collection_id/albums",
    name: "modify-collection",
    component: ModifyCollection,
    meta: {
      requiresAuth: true

    }
  },
  {
    path: "/albumcollection/:collection_id",
    name: "album-collection",
    component: ViewAlbumCollection,
    meta: {
      requiresAuth: false
    }
  }
];


// Create the router
const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

router.beforeEach((to) => {

  // Get the Vuex store
  const store = useStore();

  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === '') {
    return { name: "login" };
  }
  // Otherwise, do nothing and they'll go to their next destination
});

export default router;
