import axios from "axios"

export const postsModule = {
    state: () => ({
        posts: [],
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
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => {
                return state.selectedSort !== "id"
                    ? post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
                    : +post2[state.selectedSort] - +post1[state.selectedSort];
            });
        },
        sortedAndFilteredPosts(state, getters) {
            return getters.sortedPosts.filter((post) =>
                post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
        },
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setPostLoading(state, bool) {
            state.isPostsLoading = bool
        },
        setCurrentPage(state, page) {
            state.current_page = page
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setTotalPages(state, pages) {
            state.total_pages = pages
        },
        setSearchQuery(state, query) {
            state.searchQuery = query
        }
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setPostLoading', true);
                const response = await axios.get(`http://127.0.0.1:8000/api/posts`, {
                    params: {
                        page: state.current_page,
                        limit: state.limit,
                    },
                });
                commit('setPosts', response.data.data)
                commit('setTotalPages', response.data.last_page)
            } catch (e) {
                alert(e.message, "error");
            } finally {
                commit('setPostLoading', false);
            }
        },
        async loadMorePosts({state, commit}) {
            try {
                if (state.current_page >= state.total_pages) return null
                commit('setCurrentPage', state.current_page + 1);
                const response = await axios.get(`http://127.0.0.1:8000/api/posts`, {
                    params: {
                        page: state.current_page,
                        limit: state.limit,
                    },
                });
                commit('setPosts', [...state.posts, ...response.data.data]);
            } catch (e) {
                alert(e.message, "error");
            }
        },
    },
    namespaced: true,
}