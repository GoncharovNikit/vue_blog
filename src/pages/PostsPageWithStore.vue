<template>
  <div>
    <!-- <h1><strong>Likes: </strong>{{ $store.state.likes }}</h1>
    <h1><strong>Double likes: </strong>{{ $store.getters.doubleLikes }}</h1>
    <div>
      <my-button @click="$store.commit('incrementLikes')">Like</my-button>
      <my-button @click="$store.commit('decrementLikes')">Dislike</my-button>
    </div>
    <br> -->
    <h1>Posts</h1>
    <my-input
      v-focus
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Search..."
    />
    <div class="app__btns">
      <my-button @click="showCreateForm">Create Post</my-button>
      <my-select
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="createFormVisible">
      <post-form @create="postCreate" />
    </my-dialog>
    <post-list
      @remove="removePost"
      :posts="sortedAndFiltered"
      v-if="!postsLoading"
    />
    <h2 v-else>Post loading...</h2>
    <!-- <pagination v-model:current_page="current_page" :total_pages="total_pages" /> -->
    <div v-intersection="loadPosts" class="observer"></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
// import Pagination from '@/components/Pagination';
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

export default {
  components: {
    PostForm,
    PostList,
    // Pagination,
  },
  data() {
    return {
      createFormVisible: false,
    };
  },
  methods: {
    ...mapActions({
      fetchPosts: "posts/fetchPosts",
      loadPosts: "posts/loadMorePosts",
    }),
    ...mapMutations({
      setSelectedSort: "posts/setSelectedSort",
      setSearchQuery: "posts/setSearchQuery",
    }),
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

    // changePage(page) {
    //     this.current_page = page
    // },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      postsLoading: (state) => state.posts.isPostsLoading,
      sortOptions: (state) => state.posts.sortOptions,
      searchQuery: state => state.posts.searchQuery,
    }),
    ...mapGetters({
      sortedAndFiltered: "posts/sortedAndFilteredPosts",
    }),
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