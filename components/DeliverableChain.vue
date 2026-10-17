<script setup lang="ts">
defineProps<{ items: { step: string; output: string }[] }>()
</script>
<template>
  <div class="deliverable-chain">
    <div v-for="(item, i) in items" :key="item.step" class="deliverable-row">
      <span class="step-pill">{{ item.step }}</span><strong>{{ item.output }}</strong><span v-if="i < items.length-1" class="chain-arrow">↓</span>
    </div>
  </div>
</template>
