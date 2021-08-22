<template>
  <div class="post">
    <div>
      <div><strong>Id: </strong>{{ post.id }}</div>
      <div><strong>Title: </strong>{{ post.title }}</div>
      <div><strong>Body: </strong>{{ post.body }}</div>
    </div>
    <div class="post__btns">
      <my-button @click="editFormVisible=true"
        >Edit</my-button
      >
      <my-button @click="$router.push(`/posts/${post.id}`)">Details</my-button>
      <my-button @click="$emit('remove', post)">Delete</my-button>
    </div>
    <my-dialog v-model:show="editFormVisible">
      <post-form @create="editPost" :post="post" />
    </my-dialog>
  </div>
</template>
<script>
import PostForm from '@/components/PostForm'

export default {
  
  components: {
    PostForm,
  },
  data() {
    return {
      editFormVisible: false,
    }
  },
  methods: {
    editPost(post) {
      this.$emit('edit', post)
      this.editFormVisible = false
    },
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scope>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post__btns {
  display: flex;
}
.post__btns button {
  margin-left: 10px;
  min-width: 70px;
}
</style>