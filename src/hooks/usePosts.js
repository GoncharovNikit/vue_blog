import axios from "axios";
import { ref } from "vue";

export function usePosts(limit = 10, currentPage = 1) {
    const posts = ref([])
    const totalPages = ref(0)
    const isPostsLoading = ref(true)
    const createFormVisible = ref(false)
    const fetching = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/posts`, {
                params: {
                    page: currentPage.value,
                    limit,
                },
            });
            posts.value = response.data.data;
            totalPages.value = response.data.last_page
        } catch (e) {
            console.log(e.message)
        } finally {
            isPostsLoading.value = false;
        }
    }
    const removePost = async post => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/posts/${post.id}`)
                .then(value => {
                    fetching()
                    console.log(value)
                })
        } catch (e) {
            console.log(e.message)
        } finally {
            isPostsLoading.value = false;
        }

    }
    const createPost = async post => {
        try {
            createFormVisible.value = false

            await axios.post('http://127.0.0.1:8000/api/posts', {
                title: post.title,
                body: post.body,
            }).then(value => {
                fetching()
                console.log(value)
            })
        } catch (e) {
            console.log(e.message)
        }
    }
    const editPost = async post => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/posts/${post.id}`, {
                title: post.title,
                body: post.body,
            }).then(value => {
                fetching()
                console.log(value);
            })
        } catch (e) {
            console.log(e.message);
        }
    }

    return {
        posts,
        totalPages,
        isPostsLoading,
        fetching,
        removePost,
        createFormVisible,
        createPost,
        editPost,
    }
}