<template>
  <div class="flex flex-col gap-2">
    <label for="roles">Roles</label>
    <MultiSelect v-model="selectedRoles" :options="roles" :loading="isLoading" placeholder="Select Roles" class="w-full md:w-20rem">
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
  import type { UserRole } from '~/definitions'

  const props = defineProps<{ userId: string }>()

  const selectedRoles = defineModel({
    type: Array as PropType<UserRole[]>,
    default: [],
  })

  const { data: roles, isLoading } = useAPI(APIRoutes.Auth.Roles, {
    watch: [props],
  })
</script>
