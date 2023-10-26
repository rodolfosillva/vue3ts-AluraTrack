<template>
    <section class="projetos">
        <h1 class="title">Projetos</h1>
        <router-view></router-view>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { myUseStore } from '@/store'

export default defineComponent({
    name: 'Projetos',
    setup() {
        const store = myUseStore()
        return {
            projetos: computed(() => store.state.projetos)
        }
    }
})
</script>

<style scoped>
.projetos {
    padding: 1.25rem;
}
</style>