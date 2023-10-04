<template>
  <div id="viewport">
    <div id="sidebar">
      <div>
        <header>Menu</header>
        <router-link
          class="link"
          :to="item.path"
          v-for="(item, index) in items"
          :key="index"
        >
          <span>{{ item.title }}</span>
        </router-link>
      </div>
      <button class="btn" @click="logout">Log Out</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
  },
});
const logout = () => {
  localStorage.removeItem("token");
  location.reload();
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500");

body {
  overflow-x: hidden;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
}

/* Toggle Styles */

#viewport {
  padding-left: 250px;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

#sidebar {
  // z-index: 10;
  position: fixed;
  left: 250px;
  width: 250px;
  height: 100%;
  margin-left: -250px;
  overflow-y: auto;
  background: #37474f;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#sidebar header {
  background-color: #263238;
  font-size: 20px;
  line-height: 52px;
  text-align: center;
  color: #fff;
}

#sidebar .link span {
  background: none;
  border-bottom: 1px solid #455a64;
  color: #cfd8dc;
  font-size: 18px;
  padding: 16px 24px;
}

#sidebar .link span:hover {
  background: none;
  color: #eceff1;
  background-color: #2d3f477c;
}

.link {
  text-decoration: none;
  display: flex;
  flex-direction: column;
}
.btn {
  background: none;
  color: #eceff1;
  background-color: #263238;
  border-radius: 0;
}

@media (max-width: 576px) {
  #sidebar {
    width: 170px;
  }
  #sidebar .link span {
    font-size: 14px;
  }
  #sidebar header {
    font-size: 18px;
  }
}
</style>
