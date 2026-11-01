<script setup lang="ts">
defineProps<{
  rows: { no: number; time: string; title: string; topics: string; handson: string; output: string; owner?: string }[]
  schedule?: boolean
}>()
</script>
<template>
  <div class="session-table" :class="{ schedule }">
    <div class="st-head">
      <template v-if="schedule">
        <span>시간</span><span>강의명 · 주요 내용</span><span>산출물 → Next Input</span><span>사전 준비 / Skill</span><span>담당</span>
      </template>
      <template v-else>
        <span>시간</span><span>Session · 주요 내용</span><span>Hands-on</span><span>산출물</span>
      </template>
    </div>
    <div v-for="r in rows" :key="r.no" class="st-row">
      <span class="st-time">{{ r.time }}</span>
      <div class="st-main">
        <strong><em>{{ r.no }}</em>{{ r.title }}</strong>
        <p>{{ r.topics }}</p>
      </div>
      <template v-if="schedule">
        <strong class="st-out">{{ r.output }}</strong>
        <span class="st-hands">{{ r.handson }}</span>
        <strong class="st-owner">{{ r.owner }}</strong>
      </template>
      <template v-else>
        <span class="st-hands">{{ r.handson }}</span>
        <strong class="st-out">{{ r.output }}</strong>
      </template>
    </div>
  </div>
</template>
<style scoped>
.session-table { margin-top: 22px; }
.st-head, .st-row { display: grid; grid-template-columns: 150px minmax(0, 1fr) 290px 230px; gap: 0 24px; align-items: center; word-break: keep-all; overflow-wrap: anywhere; }
.st-head { padding: 0 0 8px; border-bottom: 2px solid var(--ink); font-size: 15px; font-weight: 700; letter-spacing: .06em; color: var(--muted); }
.st-row { padding: 13px 0; border-bottom: 1px solid var(--line); }
.st-time { font-size: 18px; color: var(--muted); font-variant-numeric: tabular-nums; }
.st-main strong { font-size: 23px; line-height: 1.35; }
.st-main em { font-style: normal; color: var(--accent); margin-right: 10px; }
.st-main p { margin: 4px 0 0; font-size: 18px; line-height: 1.45; color: var(--muted); }
.st-hands { font-size: 19px; line-height: 1.45; }
.st-out { font-size: 20px; line-height: 1.35; color: var(--accent); }
.schedule .st-head, .schedule .st-row { grid-template-columns: 130px minmax(0, 1fr) 190px 175px 150px; gap: 0 16px; }
.schedule .st-row { padding: 12px 0; }
.schedule .st-main strong { font-size: 21px; }
.schedule .st-main p { font-size: 18px; line-height: 1.35; }
.schedule .st-hands, .schedule .st-out, .schedule .st-owner { font-size: 18px; line-height: 1.4; }
</style>
