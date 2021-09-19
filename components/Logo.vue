<template>
  <div class="logo rounded">
    {{ $config.projectName }}
  </div>
</template>

<script>
export default {
  name: "Logo"
}
</script>

<style scoped lang="scss">
.logo {
  padding: 4px 10px;
  background: var(--nav-hover-bg-color);
  cursor: default;
}
</style>
