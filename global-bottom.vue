<template>
  <footer class="page-number" aria-label="페이지 번호">
    <SlideCurrentNo /> / <SlidesTotal />
  </footer>
</template>

<style scoped>
.page-number {
  position: absolute;
  right: 32px;
  bottom: 16px;
  z-index: 10;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.5;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
}
</style>
