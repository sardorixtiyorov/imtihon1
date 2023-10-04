import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import notFound from "./not-found";
import auth from "./auth";
import admin from "./admin";
import superadmin from "./superadmin";

const routes = [auth, notFound, admin, superadmin];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const name = to.name === "auth";
  console.log(to);
  if (!token && !name) {
    return next({ name: "auth" });
  } else {
    if (token && name == "admin" && role == "admin") {
      return next({ name: "admin" });
    } else if (token && name == "superadmin" && role == "superadmin") {
      return next({ name: "superadmin" });
    } else {
      next();
    }
  }
});

export default router;
