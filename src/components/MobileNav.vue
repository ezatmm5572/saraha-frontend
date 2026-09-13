<template>
  <nav class="mobile-nav">
    Mobile Navigation
  </nav>
</template>

<style scoped>
.mobile-nav {
  display: none;
}

@media (max-width: 768px) {
  .mobile-nav {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background: #1c1c24;
    color: white;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
}
</style>