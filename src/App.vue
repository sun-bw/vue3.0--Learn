<template>
	<button @click="openModal">打开</button>
	<Modal :isOpen="modalIsOpen" @close-modal="onModalClose"></Modal>
</template>
<script>
import { ref } from 'vue'
import Modal from './components/Modal.vue'
export default ({
	components: {
		Modal
	},
	setup() {
		const modalIsOpen = ref(false)
		const openModal = () => {
			modalIsOpen.value = true
		}
		const onModalClose = () => {
			modalIsOpen.value = false
		}
		return {
			modalIsOpen,
			openModal,
			onModalClose,
		}
	}
})
</script>