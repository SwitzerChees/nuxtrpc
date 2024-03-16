<template>
  <div class="flex flex-col gap-0.5">
    <span v-for="(issue, i) in issues" :key="i" class="text-balance">
      {{ issueToTranslation(issue) }}
    </span>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    issues: { code: string; path: string[]; minimum?: number }[]
  }>()

  const { t } = useI18n()

  const issueToTranslation = (issue: { code: string; path: string[]; minimum?: number }) => {
    if (issue.code === 'too_small') {
      return t('zod.too_small', { path: t(issue.path[0]), minimum: issue.minimum })
    }
  }
</script>
