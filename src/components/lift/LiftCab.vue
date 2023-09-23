<template>
    <div :style="computedShift" class="lift-cab">
        {{ shift }}
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from 'vue';
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

async function onLiftStop() {
    wait(1000)
    emits('cab-ready');
}

onMounted(() => {
    addEventListener("transitionend", () => {
        onLiftStop()
    });
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
</style>