<template>
  <div class="container d-flex flex-column mb-5">
    <users ref="users_modal" />
    <button
      class="btn btn-success mt-5 mb-3 align-self-end"
      @click="createItem"
    >
      Create User
    </button>
    <div class="row">
      <div class="col-4 my-2" v-for="(item, index) in items" :key="index">
        <div class="card" :style="{ zIndex: item.zIndex }">
          <div class="card-header">
            <h1 class="text-center">{{ item.name }}</h1>
          </div>
          <div class="card-body d-flex flex-column justify-content-between">
            <h4>Surname: {{ item.surname }}</h4>
            <div class="text">
              <p>Age: {{ item.age }}</p>
              <p>Address: {{ item.address }}</p>
              <p>Diplom: {{ item.is_diploma }}</p>
            </div>
          </div>
          <div class="card-footer d-flex justify-content-between gap-2">
            <button class="btn btn-primary" @click="editItem(item)">
              Edit
            </button>
            <button class="btn btn-danger" @click="deleteItem(item._id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import http from "../../components/plugins/axios";
import { ref, onMounted } from "vue";
const items = ref([]);
import users from "../../components/pages/users.vue";
const users_modal = ref();
import Notification from "../../components/plugins/notification";

const getUsers = () => {
  http
    .get("/users")
    .then((res) => {
      console.log(res.data.users);
      items.value = res.data.users;
    })
    .catch((err) => {
      console.log("error", err);
    });
};

const setCardZIndex = () => {
  items.value.forEach((item) => {
    item.zIndex = 0;
  });
};

const createItem = () => {
  setCardZIndex();
  users_modal.value.openModal();
  users_modal.value.$el.style.zIndex = 1;
};

const editItem = (item) => {
  setCardZIndex();
  users_modal.value.openModal(item);
  users_modal.value.$el.style.zIndex = 1;
};

const deleteItem = (id) => {
  http
    .delete(`/users/${id}`)
    .then((res) => {
      localStorage.setItem(
        "notification",
        JSON.stringify({
          message: "User is deleted",
          type: "danger",
        })
      );
      location.reload();
    })
    .catch((err) => {
      console.log("error", err);
    });
};
onMounted(() => {
  const notification = JSON.parse(localStorage.getItem("notification"));
  if (notification) {
    Notification(notification.message, notification.type);
    localStorage.removeItem("notification");
  }
});
getUsers();
</script>

<style lang="scss" scoped>
.container {
  height: auto;
}

.card {
  height: 400px;
}
</style>
