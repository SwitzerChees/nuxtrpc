<template>
  <div class="flex flex-col gap-2">
    <label for="roles">Roles</label>
    <MultiSelect
      v-model="selectedRoles"
      :options="roles"
      placeholder="Select Roles"
      :option-disabled="isMyUserAndAdmin"
      class="w-full md:w-20rem">
      <template #option="{ option }">
        <span class="truncate">{{ $t(option.name) }}</span>
      </template>
      <template #value="{ value }">
        <span v-if="value.length === 0">No Roles...</span>
        <span v-else class="truncate">{{ value.map((r: any) => $t(r.name)).join(', ') }}</span>
      </template>
    </MultiSelect>
    <small id="roles-help">The system roles of this user.</small>
  </div>
</template>

<script setup lang="ts">
  import { UserRoles, type UserRole } from '~/definitions'
  type Role = { id: string; name: UserRole }

  const props = defineProps<{ userId: string; roles: Role[] }>()
  const myUser = useMyUser()

  const isMyUserAndAdmin = (role: Role) => myUser.value.id === props.userId && role.name === UserRoles.Admin

  const selectedRoles = defineModel({
    type: Array<Role>,
    default: [],
  })

  // useAPI(APIRoutes.User.Roles, {
  //   watch: [() => selectedRoles],
  //   immediate: false,
  // })
</script>
