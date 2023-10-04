<template>
  <div class="container d-flex flex-column mb-5">
    <products ref="products_modal" />
    <button
      class="btn btn-success mt-5 mb-3 align-self-end"
      @click="createItem"
    >
      Create Product
    </button>
    <div class="row">
      <div class="col-4 my-2" v-for="(item, index) in items" :key="index">
        <div class="card" :style="{ zIndex: item.zIndex }">
          <div class="card-header">
            <h1 class="text-center">{{ item.name }}</h1>
          </div>
          <div class="card-body d-flex flex-column justify-content-between">
            <h4>Price: ${{ item.price }}</h4>
            <div class="text">
              <p>Brand: {{ item.brand }}</p>
              <p>Description: {{ item.description }}</p>
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
import products from "../../components/pages/products.vue";
const products_modal = ref();
import Notification from "../../components/plugins/notification";

const getProducts = () => {
  http
    .get("/products")
    .then((res) => {
      console.log(res.data.products);
      items.value = res.data.products;
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
  products_modal.value.openModal();
  products_modal.value.$el.style.zIndex = 1;
};

const editItem = (item) => {
  setCardZIndex();
  products_modal.value.openModal(item);
  products_modal.value.$el.style.zIndex = 1;
};

const deleteItem = (id) => {
  http
    .delete(`/products/${id}`)
    .then((res) => {
      localStorage.setItem(
        "notification",
        JSON.stringify({
          message: "Product is deleted",
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
getProducts();
</script>

<style lang="scss" scoped>
.container {
  height: auto;
}

.card {
  height: 380px;
}
</style>
