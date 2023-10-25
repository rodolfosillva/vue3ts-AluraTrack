<template>
    <div class="box has-text-weight-bold">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BoxTarefaFinalizada',
})
</script>

<style scoped>
.box{
    background-color: rgb(249, 238, 211);
}
</style>