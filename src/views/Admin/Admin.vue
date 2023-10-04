<template>
  <div>
    <section class="sidebar">
      <div class="sidebar_left">
        <SidebarVue :items="sidebar_items" />
      </div>
      <div class="sidebar_right">
        <!-- <div class="d-flex align-items-center justify-content-center vh-100">
          <div class="text-center">
            <h1 class="display-1 fw-bold">Admin Page</h1>
          </div>
        </div> -->
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SidebarVue from "../../components/layout/Sidebar.vue";
const sidebar_items = ref([{ id: 1, title: "Products", path: "/products" }]);
</script>

<style lang="scss" scoped>
.sidebar {
  width: 100%;
  display: flex;
}
.sidebar_left {
  width: 300px;
  height: 100vh;
}
.sidebar_right {
  width: calc(100% - 300px);
}
@media (max-width: 860px) {
  .sidebar_left {
    height: 100vh;
  }
  .sidebar_right {
    width: calc(100% - 220px);
  }
}
@media (max-width: 576px) {
  .sidebar_left {
    width: 200px;
  }
}
</style>
