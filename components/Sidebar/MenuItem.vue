<template>
  <li>
    <Transition>
      <NuxtLink
        :to="to"
        class="flex items-center gap-2 p-2 px-4 transition-colors hover:bg-stone-400 rounded-2xl"
        :class="{
          'bg-stone-500': isActive,
          'shadow-inner': isActive,
          'justify-center': !expanded,
        }">
        <Icon v-if="icon" :name="icon" class="flex-shrink-0" size="1.5rem" />
        <span v-if="expanded" :class="{ 'font-semibold': isActive }">{{ title }}</span></NuxtLink
      >
    </Transition>
  </li>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
    expanded: {
      type: Boolean,
      default: true,
    },
  })
  const route = useRouter()

  const isActive = computed(() => route.currentRoute.value.path === props.to)
</script>
