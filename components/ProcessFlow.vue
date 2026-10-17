<script setup lang="ts">
defineProps<{ items: { step?: string; title: string; text?: string }[] }>()
</script>
<template>
  <div class="process-flow">
    <template v-for="(item, i) in items" :key="item.title">
      <div class="process-node">
        <span v-if="item.step" class="eyebrow">{{ item.step }}</span>
        <strong>{{ item.title }}</strong>
        <p v-if="item.text">{{ item.text }}</p>
      </div>
      <div v-if="i < items.length - 1" class="process-arrow">→</div>
    </template>
  </div>
</template>
