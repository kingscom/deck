<script setup lang="ts">
defineProps<{ beforeTitle: string; beforeItems: string[]; afterTitle: string; afterItems: string[] }>()
</script>
<template>
  <div class="before-after">
    <section><span class="eyebrow">BEFORE</span><h3>{{ beforeTitle }}</h3><ul><li v-for="x in beforeItems" :key="x">{{ x }}</li></ul></section>
    <div class="big-arrow">→</div>
    <section class="accent-panel"><span class="eyebrow">AFTER</span><h3>{{ afterTitle }}</h3><ul><li v-for="x in afterItems" :key="x">{{ x }}</li></ul></section>
  </div>
</template>
