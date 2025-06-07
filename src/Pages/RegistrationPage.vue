<template>
  <main class="form-signin">
    <form @submit.prevent="submitForm">
      <h1 class="h3 mb-3 fw-normal">Регистрация</h1>

      <div class="form-floating">
        <input type="text" class="form-control" id="floatingInput" placeholder="Username" v-model="formData.username">
        <label for="floatingInput">Имя</label>
      </div>

      <div class="form-floating">
        <input type="email" class="form-control" id="floatingEmail" placeholder="name@example.com" v-model="formData.email">
        <label for="floatingEmail">Электронная почта</label>
      </div>

      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="formData.password">
        <label for="floatingPassword">Пароль</label>
      </div>
      
      <button class="w-100 btn btn-lg btn-primary" type="submit">Регистрация</button>
    </form>
  </main>
</template>

<script setup>
import userRegistration from "@/composables/userRegistration.js";

const {formData, submitForm} = userRegistration();
</script>

<style scoped>
.form-signin {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 450px;
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

.form-group select{
  height: 58px;
  border-radius: 5px;
  border-style: hidden;
  padding: 16px 12px;
}


.form-group select{
  height: 58px;
  border-radius: 5px;
  border-style: hidden;
}
</style>