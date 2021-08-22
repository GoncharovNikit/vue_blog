<template>
  <div>
    <h1>Posts</h1>
    <span :title="'hovered'">Hover me</span>
    <my-input v-focus v-model="searchQuery" placeholder="Search..." />
    <div class="app__btns">
      <my-select v-model="selectedSort" :options="sortOptions" />
      <my-button @click="createFormVisible = true">Add Post</my-button>
    </div>
    <my-dialog v-model:show="createFormVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list
      @remove="removePost"
      @edit="editPost"
      :posts="sortedAndFilteredPosts"
      v-if="!isPostsLoading"
    />
    <h2 v-else>Post loading...</h2>
    <pagination v-model:currentPage="currentPage" :total_pages="totalPages" />
  </div>
</template>
<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import Pagination from "@/components/Pagination";
import { usePosts } from "@/hooks/usePosts";
import { useSorted } from "@/hooks/useSorted";
import { useState } from "@/hooks/useState";
import { useSortedAndFiltered } from "@/hooks/useSortedAndFiltered";

export default {
  components: {
    PostForm,
    PostList,
    Pagination,
  },
  data() {
    return {
      limit: 15,
      sortOptions: [
        { value: "title", name: "By title" },
        { value: "body", name: "By body" },
        { value: "id", name: "Newest" },
      ],
    };
  },
  methods: {},
  setup(props) {
    const { limit, currentPage } = useState();
    const {
      posts,
      totalPages,
      isPostsLoading,
      fetching,
      removePost,
      createPost,
      editPost,
      createFormVisible,
    } = usePosts(limit, currentPage);
    const { sortedPosts, selectedSort } = useSorted(posts);
    const { sortedAndFilteredPosts, searchQuery } =
      useSortedAndFiltered(sortedPosts);

    return {
      posts,
      totalPages,
      isPostsLoading,
      sortedPosts,
      selectedSort,
      sortedAndFilteredPosts,
      searchQuery,
      currentPage,
      fetching,
      createFormVisible,
      removePost,
      createPost,
      editPost,
    };
  },
  watch: {
    currentPage() {
      this.fetching();
    },
  },
  mounted() {
    this.fetching();
  },
};
</script>
<style>
.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}
.observer {
  height: 30px;
  background: teal;
}
</style>