<template>
    <div :style="computedShift" class="lift-cab" :class="{ 'lift-cab--wait': cabWait }" />
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { wait } from '../../utils';

export interface CabProps {
    shift: number,
    time: number
}

const proprs = withDefaults(defineProps<CabProps>(), {
    shift: 0,
    time: 1
})
const emits = defineEmits(['cab-ready']);
const computedShift = computed(() => {
    return {
        transform: `translateY(${proprs.shift}px)`,
        transition: `transform ${proprs.time}s ease-out`,
    } as Record<string, any>
})

const cabWait = ref(false)
const onLiftStop = async () => {
    cabWait.value = true;
    await wait(3000)
    cabWait.value = false;
    emits('cab-ready');
}

onMounted(() => {
    addEventListener("transitionend", onLiftStop);
});

onUnmounted(() => {
    removeEventListener('transitionend', onLiftStop)
})
</script>

<style>
.lift-cab {
    height: 100px;
    width: 80px;
    background-color: aquamarine;
    position: absolute;
}

.lift-cab--wait {
    background-color: blueviolet;
}
</style>