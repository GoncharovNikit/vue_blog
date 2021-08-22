<template>
  <div class="navbar">
      <div @click="$router.push('/')" class="logo">SPA</div>
      <div class="nav-btns">
          <my-button @click="$router.push('/')">Main</my-button>
          <my-button @click="$router.push('/posts')">Posts</my-button>
          <my-button @click="$router.push('/about')">About</my-button>
          <my-button @click="$router.push('/store')">Store</my-button>
          <my-button @click="$router.push('/composition-api')">Composition</my-button>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar {
    height: 50px;
    background-color: lightyellow;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
}
.nav-btns {
    margin-left: auto;
}
.nav-btns button {
    margin-left: 20px;
    min-width: 70px;
}
.logo {
    letter-spacing: 3px;
    font-weight: 700;
    font-size: 26pt;
    font-family: Arial;
    cursor: pointer;
}
</style>