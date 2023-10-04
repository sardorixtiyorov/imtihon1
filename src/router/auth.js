export default {
  path: "/",
  name: "auth",
  component: () => {
    return import("../views/Auth.vue");
  },
};
