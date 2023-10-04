<template>
  <AppModal v-model="dialog">
    <Form @submit="save">
      <h1 v-if="!form._id">Add User</h1>
      <h1 v-else>Edit User</h1>
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
        :modelValue="form.surname"
        v-slot="{ errors }"
        name="Surname"
      >
        <input
          type="text"
          v-model="form.surname"
          class="form-control my-2"
          placeholder="Surname"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <Field
        rules="required"
        :modelValue="form.age"
        v-slot="{ errors }"
        name="Age"
      >
        <input
          type="number"
          v-model="form.age"
          class="form-control my-2"
          placeholder="Age"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>
      <select v-model="form.is_diploma" class="form-control my-2">
        <option value="yes">yes</option>
        <option value="no">no</option>
      </select>

      <Field
        rules="required"
        :modelValue="form.address"
        v-slot="{ errors }"
        name="Description"
      >
        <input
          type="text"
          v-model="form.address"
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
  surname: "",
  age: "",
  is_diploma: false,
  address: "",
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
        .post("/users/add", {
          name: form.value.name,
          surname: form.value.surname,
          age: form.value.age,
          is_diploma: form.value.is_diploma == "yes" ? true : false,
          address: form.value.address,
        })
        .then((res) => {
          localStorage.setItem(
            "notification",
            JSON.stringify({
              message: "User added successfully",
              type: "success",
            })
          );
          location.reload();
        });
    } else {
      console.log("id:", form.value._id);
      http
        .patch(`/users/update/${form.value._id}`, {
          name: form.value.name,
          surname: form.value.surname,
          age: form.value.age,
          is_diploma: form.value.is_diploma == "yes" ? true : false,

          address: form.value.address,
        })
        .then((res) => {
          localStorage.setItem(
            "notification",
            JSON.stringify({
              message: "User changed",
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
