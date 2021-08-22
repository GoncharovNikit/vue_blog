<template>
  <div>
    <navbar></navbar>
    <div class="app">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/UI/Navbar";
export default {
  components: { navbar },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}
</style>