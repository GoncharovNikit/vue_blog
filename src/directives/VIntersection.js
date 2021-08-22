export default {
    mounted(el, binding) {
        const observer = new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) 
                binding.value()
        }, {
            rootMargin: '0px',
            treshold: 1.0,
        })
        observer.observe(el)
    },
    name: 'intersection',
}