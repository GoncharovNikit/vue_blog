import { ref } from "vue";

export function useState() {
    return {
        limit: 4,
        currentPage: ref(1),

    }
}