import axios from "axios";
import {ref} from "vue";

export function useSinglePost() {
    const post = ref({id:0, title:'', body: ''})
    const isPostLoading = ref(true)

    const loadPost = (id) => {
        axios.get(`http://127.0.0.1:8000/api/posts/${id}`).then(data => {
            post.value = data.data
            isPostLoading.value = false
        })
    }

    return {
        post,
        loadPost,
        isPostLoading,
    }
}