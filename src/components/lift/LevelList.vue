<template>
    <div class="level-list">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import { provide, ref, watch } from 'vue';

const emits = defineEmits(['change'])
const props = defineProps<{ selectedLevel: number, buildingId: number }>()
const internalValue = ref<null | number>(null);

watch(() => props.selectedLevel, (value) => {
    internalValue.value = value
}, { immediate: true })

provide(`level-${props.buildingId}`, internalValue);

watch(internalValue, (value) => emits('change', value),)
</script>

<style>
.level-list {
    display: flex;
    flex-direction: column;
}
</style>