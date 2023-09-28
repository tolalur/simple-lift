<template>
    <label class="level">
        <input type="radio" :name="buildingIdGroup" :value="level" v-model="internalValue"
            :checked="internalValue == level">
        <span>{{ level }}</span>
    </label>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';

interface Props {
    level: number,
    buildingId: number,
}
const props = defineProps<Props>();
const buildingIdGroup = computed(() => `level-${props.buildingId}`)

const internalValue = inject(buildingIdGroup.value)
</script>

<style>
.level {
    display: flex;
    gap: 4px;
    align-items: center;
    border: 1px solid palevioletred;
    height: 100px;
}
</style>