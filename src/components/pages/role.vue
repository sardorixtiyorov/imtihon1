<template>
  <AppModal v-model="dialog" class="text-center">
    <select
      v-model="selectedRole"
      class="selectpicker"
      data-style="btn-primary"
    >
      <option disabled value="" hidden>Select role</option>
      <option>{{ role1 }}</option>
      <option v-if="role2">{{ role2 }}</option>
    </select>
    <button class="btn btn-primary" @click="save">Save</button>
  </AppModal>
</template>

<script setup>
import { ref, watch } from "vue";
import Notification from "@/components/plugins/notification";
import http from "../plugins/axios";
import AppModal from "../ui/app-modal.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const dialog = ref(false);
const role1 = ref("");
const role2 = ref("");
const selectedRole = ref("");
watch(dialog, (value) => {
  if (!value) {
    selectedRole.value = "";
  }
});
const openModal = (r1, r2) => {
  if (r2) {
    role1.value = r1;
    role2.value = r2;
  } else {
    role1.value = r1;
  }

  dialog.value = true;
};
const save = () => {
  console.log(selectedRole.value);
  const token = localStorage.getItem("token");
  console.log(token);

  http
    .post("admins/set-role", {
      token: token,
      role: selectedRole.value,
    })
    .then((res) => {
      console.log("response", res.data);
      localStorage.setItem('role',selectedRole.value)
      router.push({ name: selectedRole.value });
    })
    .catch((err) => {
      console.error({ err });
    });
};

defineExpose({ openModal });
</script>

<style lang="scss" scoped>
.selectpicker {
  width: 400px;
  max-width: 400px;
  min-width: 180px;
  margin: 0 auto;
  border: 1px solid #1c2578;
  border-radius: 5px;
  background: #ffffff;
}

.btn {
  margin-left: 10px;
}
</style>
