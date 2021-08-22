import { ref, computed } from "vue"

export function useSortedAndFiltered(sortedPosts) {
    const searchQuery = ref('')

    const sortedAndFilteredPosts = computed(() => {
        return sortedPosts.value.filter((post) =>
            post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    })

    return {
        sortedAndFilteredPosts,
        searchQuery,
    }
}