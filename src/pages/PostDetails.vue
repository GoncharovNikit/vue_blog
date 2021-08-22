<template>
  <div v-if="!isPostLoading">
    <h1>Post Details ({{ post.id }})</h1>
    <div class="post-details">
      <div><strong>Title: </strong>{{ post.title }}</div>
      <div><strong>Body: </strong>{{ post.body }}</div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useSinglePost } from "@/hooks/useSinglePost";

export default {
  setup(props) {
    const route = useRoute();
    const { post, loadPost, isPostLoading } = useSinglePost();
    const id = route.params.id;
    loadPost(id);

    return {
      loadPost,
      post,
      id,
      isPostLoading,
    };
  },
};
</script>

<style scoped>
h1 {
  width: 100%;
  text-align: center;
}
.post-details {
  font-size: 17pt;
  line-height: 50px;
  margin-top: 20px;
}
</style>