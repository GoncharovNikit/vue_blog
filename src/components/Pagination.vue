<template>
    <div class="pagination-wrapper">
      <div 
        v-for="page in total_pages" 
        :key="page" 
        class="page-item"
        :class="{
            'active-item': page === currentPage
        }"
        @click="$emit('update:currentPage', page)"
        >
        {{ page }}
      </div>
    </div>
</template>
<script>
export default {
    props: {
        total_pages: {
            type: Number,
            required: true,
            default: 0,
        },
        currentPage: {
            type: Number,
            required: true,
            default: 1,
        },
    },
}
</script>
<style scoped>
.pagination-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, 40px);
  flex-direction: row-reverse;
  text-align: center;
  margin: 35px 20px;
  row-gap: 15px;
  column-gap: 3px;
}
.page-item {
  border: 1px solid black;
  padding: 10px 15px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  cursor: pointer;
}
.active-item {
  border: 3px solid teal;
}
</style>