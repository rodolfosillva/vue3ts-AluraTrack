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
import { defineComponent, ref } from 'vue';
import { myUseStore } from '@/store'
import { TipoNotificacao } from '@/enums/tipo-notificacao';
import useNotificador from '@/hooks/notificador'
import { CADASTRAR_PROJETO, ALTERAR_PROJETO } from '@/store/tipo-acoes';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'Formulario',
    props: {
        id: {
            type: String
        }
    },
    setup(props) {
        const router = useRouter();

        const store = myUseStore();
        const { notificar } = useNotificador();
        const nomeDoProjeto = ref("");

        if (props.id) {
            const projeto = store.state.projeto.projetos.find(projeto => projeto.id == props.id)
            nomeDoProjeto.value = projeto?.nome || '';
        }

        const lidarComSucesso = () =>  {
            nomeDoProjeto.value = '';
            router.push('/projetos');
            notificar(
                TipoNotificacao.SUCCESS, 
                'FEITO!',
                'Seu projeto foi salvo com sucesso'
            )
        }

        const salvar = () => {
            if(props.id) {
                store.dispatch(ALTERAR_PROJETO, {
                    id: props.id,
                    nome: nomeDoProjeto.value
                }).then(() => lidarComSucesso())
            } else {
                store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
                    .then(() => lidarComSucesso())
            }
            
        }

        return {
            nomeDoProjeto,
            salvar
        }
    }
})
</script>