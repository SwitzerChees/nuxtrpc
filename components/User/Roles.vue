<template>
  <div class="flex flex-col gap-2">
    <label for="roles">{{ $t('roles') }}</label>
    <MultiSelect
      v-model="selectedRoles"
      :options="roles"
      :placeholder="$t('selectRoles')"
      :option-disabled="isMyUserAndAdmin"
      :show-toggle-all="false"
      @change="debouncedExecute">
      <template #option="{ option }">
        <span class="truncate">{{ $t(option.name) }}</span>
      </template>
      <template #value="{ value }">
        <span v-if="value.length === 0">{{ $t('noRoles') }}</span>
        <span v-else class="truncate">{{ value.map((r: any) => $t(r.name)).join(', ') }}</span>
      </template>
    </MultiSelect>
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

  const { execute } = useAPI(APIRoutes.User.Roles, {
    input: () => ({
      userId: props.userId,
      roles: selectedRoles.value,
    }),
    immediate: false,
  })
  const debouncedExecute = debounce(execute, 0)
</script>
