<script setup lang="ts">
defineProps<{ phases: { title: string; subtitle?: string; range?: string }[] }>()
</script>
<template>
  <div class="phase-band">
    <div v-for="phase in phases" :key="phase.title" class="phase-item">
      <span class="eyebrow">{{ phase.range }}</span>
      <strong>{{ phase.title }}</strong>
      <p>{{ phase.subtitle }}</p>
    </div>
  </div>
</template>
