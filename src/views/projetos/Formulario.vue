<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label"></label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">Salvar</button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { myUseStore } from '@/store'
import { TipoNotificacao } from '@/enums/tipo-notificacao';
import useNotificador from '@/hooks/notificador'
import { CADASTRAR_PROJETO, ALTERAR_PROJETO } from '@/store/tipo-acoes';

export default defineComponent({
    name: 'Formulario',
    props: {
        id: {
            type: String
        }
    },
    data() {
        return {
            nomeDoProjeto: ''
        }
    },
    methods: {
        salvar() {
            if(this.id) {
                this.store.dispatch(ALTERAR_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                }).then(() => this.lidarComSucesso())
            } else {
                this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
                    .then(() => this.lidarComSucesso())
            }
            
        },
        lidarComSucesso() {
            this.nomeDoProjeto = '';
            this.$router.push('/projetos');
            this.notificar(
                TipoNotificacao.SUCCESS, 
                'FEITO!',
                'Seu projeto foi salvo com sucesso'
            )
        }
    },
    setup() {
        const store = myUseStore()
        const { notificar } = useNotificador()
        return {
            store,
            notificar
        }
    },
    mounted() {
        if (this.id) {
            const projeto = this.store.state.projeto.projetos.find(projeto => projeto.id == this.id)
            this.nomeDoProjeto = projeto?.nome || '';
        }
    }
})
</script>