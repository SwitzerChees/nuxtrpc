<template>
  <div class="flex flex-col items-center justify-center gap-2 grow">
    <div class="flex flex-col gap-2 p-8 rounded bg-stone-700 w-80">
      <h1 class="text-lg font-bold text-center">Registration</h1>
      <img src="~/assets/images/logo.png" alt="Logo" class="w-24 h-24 mx-auto my-2" />
      <div class="flex flex-col gap-2">
        <label for="username" class="font-bold">Username</label>
        <InputText id="username" v-model="user.username" aria-describedby="username-help" @keydown.enter="registration" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="password" class="font-bold">Password</label>
        <InputText id="password" v-model="user.password" type="password" aria-describedby="password-help" @keydown.enter="registration" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="passwordConfirmation" class="font-bold">Password Confirmation</label>
        <InputText
          id="passwordConfirmation"
          v-model="user.passwordConfirmation"
          type="password"
          aria-describedby="passwordconfirm-help"
          @keydown.enter="registration" />
      </div>
      <Button class="mt-2" :disabled="registrationLoading" @click="registration"
        ><span class="w-full text-center">Create Account</span></Button
      >
      <small class="text-red-400">{{ registrationErrors }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { trpc, isLoading, onSuccess, formatedErrors } = useTRPC()
  const router = useRouter()

  const user = reactive({
    username: '',
    password: '',
    passwordConfirmation: '',
  })

  const registrationMutation = trpc.auth.registration.useMutation()
  const registrationLoading = isLoading(registrationMutation)
  const registrationErrors = formatedErrors(registrationMutation)
  onSuccess(registrationMutation, () => {
    router.replace(`/login?username=${user.username}`)
  })

  const registration = async () => {
    await registrationMutation.mutate(user)
  }
</script>
