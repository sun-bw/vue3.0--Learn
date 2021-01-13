<template>
<div>
<button @click="openModal">打开</button>
<p>{{error}}</p>
    <Suspense>
        <template #default>
            <div>
                <async-show/>
            <dog-show/>
            </div>
        </template>
        <template #fallback>
            <h1>loading....</h1>
        </template>
    </Suspense>
	<!-- <Modal :isOpen="modalIsOpen" @close-modal="onModalClose"></Modal> -->
</div>
	
</template>
<script>
import { ref, onErrorCaptured } from 'vue'
import Modal from './components/Modal.vue'
import AsyncShow from './components/AsyncShow.vue'
import DogShow from './components/DogShow.vue'
export default ({
	components: {
        // Modal,
        AsyncShow,
        DogShow,
	},
	setup() {
        const error  = ref(null)
        onErrorCaptured((e) => {
            error.value = e
            return true
        })
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
            error
		}
	}
})
</script>