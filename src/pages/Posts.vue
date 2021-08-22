<template>
  <div>
    <h1>Posts</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Search..." />
    <div class="app__btns">
      <my-button @click="showCreateForm"> Create Post </my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="createFormVisible">
      <post-form @create="postCreate" />
    </my-dialog>
    <post-list
      @remove="removePost"
      :posts="sortedAndFilteredPosts"
      v-if="!isPostsLoading"
    />
    <h2 v-else>Post loading...</h2>
    <!-- <pagination v-model:current_page="current_page" :total_pages="total_pages" /> -->
    <div
      v-intersection="loadMorePosts"
      class="observer"
    ></div>
  </div>
</template>
<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
// import Pagination from '@/components/Pagination';
import axios from "axios";

export default {
  components: {
    PostForm,
    PostList,
    // Pagination,
  },
  data() {
    return {
      posts: [],
      createFormVisible: false,
      isPostsLoading: false,
      selectedSort: "id",
      searchQuery: "",
      current_page: 1,
      limit: 15,
      total_pages: 0,
      sortOptions: [
        { value: "title", name: "By title" },
        { value: "body", name: "By body" },
        { value: "id", name: "Newest" },
      ],
    };
  },
  methods: {
    postCreate(post) {
      this.posts.push(post);
      this.createFormVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showCreateForm() {
      this.createFormVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get(`http://127.0.0.1:8000/api/posts`, {
          params: {
            page: this.current_page,
            limit: this.limit,
          },
        });
        this.posts = response.data.data;
        this.total_pages = response.data.last_page;
      } catch (e) {
        alert(e.message, "error");
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        if (this.current_page >= this.total_pages) return null
        this.current_page += 1;
        const response = await axios.get(`http://127.0.0.1:8000/api/posts`, {
          params: {
            page: this.current_page,
            limit: this.limit,
          },
        });
        this.posts = [...this.posts, ...response.data.data];
      } catch (e) {
        alert(e.message, "error");
      }
    },
    // changePage(page) {
    //     this.current_page = page
    // },
  },
  mounted() {
    this.fetchPosts();
  },
  //   watch: {
  //     selectedSort(newValue) {
  //       this.posts.sort((post1, post2) => {
  //         return post1[this.selectedSort]?.localeCompare(
  //           post2[this.selectedSort]
  //         );
  //       });
  //     },
  //   },
  watch: {
    //   current_page() {
    //     this.fetchPosts()
    //   }
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return this.selectedSort !== "id"
          ? post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
          : +post2[this.selectedSort] - +post1[this.selectedSort];
      });
    },
    sortedAndFilteredPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
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