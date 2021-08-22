<template>
  <form @submit.prevent class="post-create-form">
    <h2>Post</h2>
    <my-input v-focus v-model="b_post.title" placeholder="Title" />
    <my-input v-model="b_post.body" placeholder="Post body" />
    <br>
    <my-button style="align-self: flex-end" @click="createPost">Submit</my-button>
  </form>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: false,
    }
  },
  data() {
    return {
      b_post: this.post ?? {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.$emit('create', this.b_post)
      this.b_post = {
          title: '',
          body: ''
      }
    },
  },
};
</script>
<style scoped>
.post-create-form {
  display: flex;
  flex-direction: column;
}

</style>