export default {
  path: "/superadmin",
  name: "superadmin",
  component: () => {
    return import("../views/SuperAdmin/SuperAdmin.vue");
  },
  children: [
    
    {
      path: "/users",
      name: "users",
      component: () => {
        return import("../views/SuperAdmin/Users");
      },
    },
  ],
};
