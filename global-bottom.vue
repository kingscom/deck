<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

// 슬라이드 frontmatter의 `detail` / `back`은 대상 슬라이드의 `routeAlias` 값입니다.
// 번호가 아니라 별칭으로 찾으므로 페이지가 추가·삭제되어도 링크가 유지됩니다.
const { slides, currentSlideRoute, isPrintMode } = useNav()
const fm = computed<Record<string, any>>(() => currentSlideRoute.value?.meta?.slide?.frontmatter ?? {})

function resolve(alias?: string) {
  if (!alias) return undefined
  const route = slides.value.find(s => s.meta?.slide?.frontmatter?.routeAlias === alias)
  return route ? { alias, no: route.no } : undefined
}

const detail = computed(() => resolve(fm.value.detail))
const back = computed(() => resolve(fm.value.back))
</script>

<template>
  <footer class="page-number" aria-label="페이지 번호">
    <template v-for="btn in [{ key: 'detail', link: detail, label: '상세 보기 →' }, { key: 'back', link: back, label: '← 돌아가기' }]" :key="btn.key">
      <template v-if="btn.link">
        <a v-if="isPrintMode" class="nav-btn" :data-link-to="btn.link.no" :href="`#${btn.link.no}`">{{ btn.label }}</a>
        <RouterLink v-else class="nav-btn" :to="btn.link.alias">{{ btn.label }}</RouterLink>
      </template>
    </template>
    <span class="no"><SlideCurrentNo /> / <SlidesTotal /></span>
  </footer>
</template>

<style scoped>
.page-number {
  position: absolute;
  right: 32px;
  bottom: 16px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.5;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
}
.nav-btn {
  pointer-events: auto;
  padding: 2px 12px;
  border: 1px solid var(--accent);
  border-radius: 999px;
  color: var(--accent);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  text-decoration: none;
  background: #fff;
  cursor: pointer;
}
.nav-btn:hover {
  background: var(--accent);
  color: #fff;
}
</style>
