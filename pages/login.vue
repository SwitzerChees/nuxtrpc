<template>
  <div class="flex flex-col items-center justify-center gap-2 grow">
    <div class="flex flex-col gap-2 p-8 rounded bg-stone-700 w-80">
      <h1 class="text-lg font-bold text-center">Login</h1>
      <img src="~/assets/images/logo.png" alt="Logo" class="w-24 h-24 mx-auto my-2" />
      <div class="flex flex-col gap-2">
        <label for="username" class="font-bold">Username</label>
        <InputText id="username" v-model="username" aria-describedby="username-help" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="password" class="font-bold">Password</label>
        <InputText id="password" v-model="password" type="password" aria-describedby="username-help" />
      </div>
      <Button class="mt-2"><span class="w-full text-center">Login</span></Button>
      <small class="font-bold text-center">or</small>
      <NuxtLink to="/registration" class="text-sm font-bold text-center text-blue-400">Create New Account</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  const username = ref('')
  const password = ref('')
</script>
