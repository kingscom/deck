<script setup lang="ts">
const props = defineProps<{
  columns: { key: string; label: string }[]
  rows: Record<string, string>[]
  cols?: string
  accentKey?: string
}>()
const template = props.cols ?? `repeat(${props.columns.length}, 1fr)`
</script>
<template>
  <div class="spec-table">
    <div class="sp-head" :style="{ gridTemplateColumns: template }">
      <span v-for="c in columns" :key="c.key">{{ c.label }}</span>
    </div>
    <div v-for="(r, i) in rows" :key="i" class="sp-row" :style="{ gridTemplateColumns: template }">
      <template v-for="(c, j) in columns" :key="c.key">
        <strong v-if="j === 0" class="sp-first">{{ r[c.key] }}</strong>
        <span v-else :class="{ 'sp-accent': c.key === accentKey }">{{ r[c.key] }}</span>
      </template>
    </div>
  </div>
</template>
<style scoped>
.spec-table { margin-top: 24px; }
.sp-head, .sp-row { display: grid; gap: 0 24px; align-items: center; }
.sp-head { padding-bottom: 8px; border-bottom: 2px solid var(--ink); font-size: 15px; font-weight: 700; letter-spacing: .06em; color: var(--muted); }
.sp-row { padding: 11px 0; border-bottom: 1px solid var(--line); font-size: 21px; line-height: 1.4; word-break: keep-all; }
.sp-first { font-size: 22px; }
.sp-accent { color: var(--accent); font-weight: 700; }
</style>
