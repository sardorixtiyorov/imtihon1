export default {
  path: "/admin",
  name: "admin",
  component: () => {
    return import("../views/Admin/Admin.vue");
  },
  children: [
    {
      path: "/products",
      name: "products",
      component: () => {
        return import("../views/Admin/Products");
      },
    },
  ],
};
