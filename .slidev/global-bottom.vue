<template>
  <footer class="absolute bottom-4 left-13 right-13 flex justify-between text-sm" style="color: #475569">
    <span>{{ $slidev.configs.themeConfig.courseLabel || 'Unterricht' }}</span>
    <span>{{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}</span>
  </footer>
</template>
