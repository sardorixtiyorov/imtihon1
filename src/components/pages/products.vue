<template>
  <AppModal v-model="dialog">
    <Form @submit="save">
      <h1 v-if="!form._id">Add Product</h1>
      <h1 v-else>Edit Product</h1>
      <Field
        rules="required"
        :modelValue="form.name"
        v-slot="{ errors }"
        name="Name"
      >
        <input
          type="text"
          v-model="form.name"
          class="form-control my-2"
          placeholder="Name"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <Field
        rules="required"
        :modelValue="form.brand"
        v-slot="{ errors }"
        name="Brand"
      >
        <input
          type="text"
          v-model="form.brand"
          class="form-control my-2"
          placeholder="Brand"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <Field
        rules="required"
        :modelValue="form.group"
        v-slot="{ errors }"
        name="Group"
      >
        <input
          type="text"
          v-model="form.group"
          class="form-control my-2"
          placeholder="Group"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <Field
        rules="required"
        :modelValue="form.price"
        v-slot="{ errors }"
        name="Price"
      >
        <input
          type="number"
          v-model="form.price"
          class="form-control my-2"
          placeholder="Price"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <Field
        rules="required"
        :modelValue="form.arrival_price"
        v-slot="{ errors }"
        name="Arrival_price"
      >
        <input
          type="number"
          v-model="form.arrival_price"
          class="form-control my-2"
          placeholder="Arrival_price"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <Field
        rules="required"
        :modelValue="form.selling_price"
        v-slot="{ errors }"
        name="Selling_price"
      >
        <input
          type="number"
          v-model="form.selling_price"
          class="form-control my-2"
          placeholder="Selling_price"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <Field
        rules="required"
        :modelValue="form.description"
        v-slot="{ errors }"
        name="Description"
      >
        <input
          type="text"
          v-model="form.description"
          class="form-control my-2"
          placeholder="Description"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <button class="btn btn-primary" @click="saveForm">Save</button>
    </Form>
  </AppModal>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import Notification from "@/components/plugins/notification";
import http from "../plugins/axios";
import AppModal from "../ui/app-modal.vue";
import { Form, Field } from "vee-validate";

const dialog = ref(false);
const form = ref({
  name: "",
  brand: "",
  group: "",
  price: "",
  selling_price: "",
  arrival_price: "",
  description: "",
});

watch(dialog, (value) => {
  if (!value) {
    form.value = {};
  }
});

const openModal = (value) => {
  if (value) form.value = { ...value };
  dialog.value = true;
};

const saveForm = async (e) => {
  e.preventDefault();
  try {
    if (!form.value._id) {
      http
        .post("/products/add", {
          name: form.value.name,
          brand: form.value.brand,
          group: form.value.group,
          price: form.value.price,
          selling_price: form.value.selling_price,
          arrival_price: form.value.arrival_price,
          description: form.value.description,
        })
        .then((res) => {
          localStorage.setItem(
            "notification",
            JSON.stringify({
              message: "Product added successfully",
              type: "success",
            })
          );
          location.reload();
        });
    } else {
      console.log("id:", form.value._id);
      http
        .patch(`/products/update/${form.value._id}`, {
          name: form.value.name,
          brand: form.value.brand,
          group: form.value.group,
          price: form.value.price,
          selling_price: form.value.selling_price,
          arrival_price: form.value.arrival_price,
          description: form.value.description,
        })
        .then((res) => {
          localStorage.setItem(
            "notification",
            JSON.stringify({
              message: "Product changed",
              type: "warning",
            })
          );
          location.reload();
        });
    }
  } catch (error) {
    console.log("Error:", error?.response?.data || "");
  }
};

onMounted(() => {
  const notification = JSON.parse(localStorage.getItem("notification"));
  if (notification) {
    Notification(notification.message, notification.type);
    localStorage.removeItem("notification");
  }
});

defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
