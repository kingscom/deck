<script setup lang="ts">
defineProps<{
  rows: { role: string; expertise: string; duties: string[]; days: number[] }[]
}>()
</script>
<template>
  <div class="team-matrix">
    <div class="tm-head">
      <span>전문가 · 필요한 전문성</span><span>주요 역할</span>
      <span class="tm-days"><i>Day 1</i><i>Day 2</i><i>Day 3</i></span>
    </div>
    <div v-for="r in rows" :key="r.role" class="tm-row">
      <div class="tm-who"><strong>{{ r.role }}</strong><p>{{ r.expertise }}</p></div>
      <ul class="tm-duties"><li v-for="d in r.duties" :key="d">{{ d }}</li></ul>
      <span class="tm-days"><i v-for="d in [1, 2, 3]" :key="d" :class="{ on: r.days.includes(d) }" /></span>
    </div>
  </div>
</template>
<style scoped>
.team-matrix { margin-top: 20px; }
.tm-head, .tm-row { display: grid; grid-template-columns: 430px 1fr 210px; gap: 0 28px; align-items: center; }
.tm-head { padding-bottom: 8px; border-bottom: 2px solid var(--ink); font-size: 15px; font-weight: 700; letter-spacing: .06em; color: var(--muted); }
.tm-row { padding: 7px 0; border-bottom: 1px solid var(--line); }
.tm-who strong { font-size: 22px; }
.tm-who p { margin: 2px 0 0; font-size: 17px; line-height: 1.4; color: var(--muted); }
.tm-duties { margin: 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 0 16px; }
.tm-duties li { font-size: 18px; line-height: 1.45; margin: 0; }
.tm-duties li::before { content: '· '; color: var(--accent); }
.tm-days { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.tm-days i { display: block; height: 26px; font-style: normal; font-size: 14px; line-height: 26px; text-align: center; }
.tm-head .tm-days i { height: auto; line-height: 1.4; }
.tm-row .tm-days i { background: var(--surface); }
.tm-row .tm-days i.on { background: var(--accent); }
</style>
