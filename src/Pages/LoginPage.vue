<script setup>
import userAuthorization from "@/composables/userAuthorization.js";

const {formData, submitForm, error} = userAuthorization();

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const errorMessage = ref(null);

onMounted(() => {
  const errorMessage = route.query.error;

  if (errorMessage === 'blocked') {
    error.value = 'You are block';
  } else if (error === 'unauthorized') {
    error.value = 'You are unauthorized';
  } else if (errorMessage === 'incorrect status') {
    error.value = 'You are blocked or deleted';
  }
});
</script>

<template>
  <main class="form-signin">
    <form @submit.prevent="submitForm">
      <h1 class="h3 mb-3 fw-normal">Вход</h1>

      <div class="form-floating">
        <input type="email" class="form-control" id="floatingEmail" placeholder="name@example.com" v-model="formData.email" required>
        <label for="floatingEmail">Электронная почта</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="formData.password" required>
        <label for="floatingPassword">Пароль</label>
      </div>

      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Войти</button>

      <p class="mt-3 text-center">
        Нет аккаунта?
        <router-link to="/registration">Зарегистрируйтесь</router-link>
      </p>
    </form>
  </main>
</template>

<style scoped>
.form-signin {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 350px;
  padding: 15px;
  margin: auto;
  min-height: 100vh;
}

.form-signin form{
  width: 100%;
  background-color: #f5f5f5;
  padding: 30px;
  border-radius: 25px;
}

.form-signin div{
  margin-bottom: 10px;
}

.form-signin .checkbox {
  font-weight: 400;
}

</style>