<template>
  <div class="flex flex-col gap-4">
    <h2 class="font-semibold truncate">{{ user?.username }}</h2>
    <Transition>
      <UserRoles v-if="!isLoading && roles && user?.roles" v-model="user.roles" :roles :user-id="user.id" />
    </Transition>
    <Transition>
      <UserSessions v-if="user?.id" :user-id="user.id" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
  const user = defineModel({
    type: Object as PropType<(typeof APIRoutes.User.Get.Output.users)[0]>,
    default: null,
  })
  const { data: roles, isLoading } = useAPI(APIRoutes.Auth.Roles)
</script>
