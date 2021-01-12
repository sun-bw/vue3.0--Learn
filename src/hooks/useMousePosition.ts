import { ref, onMounted, onUnmounted} from 'vue'
function useMousePosition() {
    const x = ref(0)
    const y = ref(0)
    const updatteMouse = (e: MouseEvent) => {
        x.value = e.pageX
        y.value = e.pageY
    }
    onMounted(() => {
        document.addEventListener('click', updatteMouse)
    })
    onUnmounted(() => {
        document.removeEventListener('click', updatteMouse)
    })
    return {x, y}
}
export default useMousePosition