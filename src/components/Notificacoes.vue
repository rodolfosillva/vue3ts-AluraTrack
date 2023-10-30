<template>
    <div class="notificacoes">
        <article v-for="notificacao in notificacoes" :key="notificacao.id" class="message" :class="'is-' + notificacao.tipo">
            <div class="message-header">
                {{ notificacao.titulo }}
            </div>
            <div class="message-body">
                {{ notificacao.texto }}
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { myUseStore } from '@/store'

export default defineComponent({
    name: 'Notificacoes',
    setup() {
        const store = myUseStore();
        return {
            notificacoes: computed(() => store.state.notificacoes)
        }
    }
})
</script>

<style scoped>
.notificacoes{
    position: absolute;
    right: 0;
    width: 300px;
    padding: .5rem;
    z-index: 500;
}
</style>