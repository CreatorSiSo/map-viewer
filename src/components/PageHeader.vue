<template>
  <aside class="PageHeader">
    <button class="SidebarToggle">Open Sidebar</button>
    <input type="search" name="" id="" />
    <span class="SidebarToggle"></span>
  </aside>
</template>

<style scoped>
.PageHeader {
  display: flex;
  justify-content: space-between;
  padding-block: 0.5rem;
  background-color: #c2ab91;
}

.PageHeader > .SidebarToggle {
  width: 2rem;
  height: 2rem;
  background-color: red;
}
</style>
