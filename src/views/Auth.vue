<template>
  <role ref="modal" />
  <section class="vh-100">
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="img-fluid"
            alt="Sample image"
          />
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1 mt-5">
          <div>
            <Form @submit="save">
              <Field
                rules="required"
                :modelValue="form.username"
                v-slot="{ errors }"
                name="username"
              >
                <input
                  type="text"
                  v-model="form.username"
                  placeholder="Name"
                  class="form-control my-2"
                />
                <p class="text-danger" v-if="errors && errors.length">
                  {{ errors[0] }}
                </p>
              </Field>
              <Field
                rules="required"
                :modelValue="form.password"
                v-slot="{ errors }"
                name="Password"
              >
                <input
                  type="password"
                  v-model="form.password"
                  placeholder="Password"
                  class="form-control my-2"
                />
                <p class="text-danger" v-if="errors && errors.length">
                  {{ errors[0] }}
                </p>
              </Field>

              <div class="d-flex justify-content-between align-items-center">
                <!-- Checkbox -->
                <div class="form-check mb-0">
                  <input
                    class="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3"
                  />
                  <label class="form-check-label" for="form2Example3">
                    Remember me
                  </label>
                </div>
                <a href="#!" class="text-body">Forgot password?</a>
              </div>

              <div class="text-center text-lg-start mt-4 pt-2">
                <Button :title="'login'" type="submit">Login</Button>
                <p class="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?
                  <router-link to="/registration" class="link-danger"
                    >Register</router-link
                  >
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import role from "../components/pages/role.vue";
import Button from "../components/ui/Button.vue";
import $http from "../components/plugins/axios";
import Notification from "../components/plugins/notification";
import { Field, Form } from "vee-validate";

const form = ref({
  username: "",
  password: null,
});
const modal = ref();

const save = () => {
  $http
    .post("/admins/login", {
      username: form.value.username,
      password: form.value.password,
    })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      if (res.data.roles[1]) {
        modal.value.openModal(res.data.roles[0], res.data.roles[1]);
      }
      modal.value.openModal(res.data.roles[0]);
    })
    .catch((err) => {
      console.log("error", err);
      Notification("username or password is incorrect", "danger");
    });
};
</script>

<style lang="scss" scoped>
.divider:after,
.divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
}
.h-custom {
  height: calc(100% - 73px);
}
@media (max-width: 450px) {
  .h-custom {
    height: 100%;
  }
}
</style>
