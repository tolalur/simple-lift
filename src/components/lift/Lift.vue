<template>
    <div class="lift">
        <LiftCab :shift="state.cabState.shift" :time="state.cabState.time" @cab-ready="onReady" />
    </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import LiftCab from './LiftCab.vue';
import { CabProps } from './LiftCab.vue';
import { useStorage } from '@vueuse/core';


interface Props {
    nextFloor: number,
    id: number
}

const props = defineProps<Props>();
watch(() => props.nextFloor, (nextFloor) => {
    putInqueue(nextFloor);
    processQueue();
})

const FLOOR_HEIGHT = 100;
enum LiftState {
    idle, run
}

const state = useStorage(`lift-store-${props.id}`, {
    queueIndex: 0,
    previousFloor: 1,
    liftState: LiftState.idle,
    queue: [] as CabProps[],
    cabState: { shift: 0, time: 1 } as CabProps
}, sessionStorage);

function putInqueue(nextFloor: number) {
    const data = dataTransform(nextFloor);
    state.value.queue.push(data);
}

function dataTransform(nextFloor: number) {
    const previousaCabState = state.value.queue[state.value.queue.length - 1];
    const previousShift = previousaCabState
        ? previousaCabState.shift
        : 0;

    const shift = ((state.value.previousFloor - nextFloor) * FLOOR_HEIGHT) + previousShift;
    const time = Math.abs(state.value.previousFloor - nextFloor);

    state.value.previousFloor = nextFloor;

    return { shift, time }
}

function processQueue() {
    if (state.value.liftState === LiftState.run) {
        return
    }
    const nextElInQueue = state.value.queue[state.value.queueIndex];

    if (nextElInQueue) {
        state.value.liftState = LiftState.run;
        state.value.cabState = state.value.queue[state.value.queueIndex]
        state.value.queueIndex += 1;
    }
}

function onReady() {
    state.value.liftState = LiftState.idle;
    processQueue();
}
</script>

<style>
.lift {
    position: relative;
    height: 100px;
    width: 80px;
}
</style>