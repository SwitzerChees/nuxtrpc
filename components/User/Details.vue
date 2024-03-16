<template>
  <div class="flex flex-col gap-2">
    <h2 class="font-semibold truncate">{{ user?.username }}</h2>
    <UserRoles v-if="isAdmin && user?.roles" v-model="user.roles" />
    <UserSessions v-if="user?.id" :user-id="user.id" />
  </div>
</template>

<script setup lang="ts">
  const { isAdmin } = useAuth()
  const user = defineModel({
    type: Object as PropType<(typeof APIRoutes.User.Get.Output.users)[0]>,
    default: null,
  })
</script>
