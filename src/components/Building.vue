<template>
  <main class="building">
    <h1>Здание. Выбран этаж номер {{ state.selectedLevel ? state.selectedLevel : '_' }}</h1>
    <h3>Стек вызовов этажей {{ state.levelStack }}</h3>
    <section class="building__lift">
      <Lift :next-floor="state.selectedLevel" :id="id" />
      <LevelList :selectedLevel="state.selectedLevel" :building-id="id" class="building__levels" @change="onLevelChange">
        <Level :level="level" :building-id="id" v-for="(level) of computedFloorNum" />
      </LevelList>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { LevelList, Level, Lift } from './lift';
import { useStorage } from "@vueuse/core";


interface Props {
  floorNum: number,
  id: number
}

const props = withDefaults(defineProps<Props>(), {
  floorNum: 5,
  id: 1
})

const state = useStorage(`building-store-${props.id}`, {
  selectedLevel: 1,
  levelStack: [] as number[]
}, sessionStorage);

const computedFloorNum = computed(() => {
  return Array(props.floorNum).fill(null).map((_el, index) => props.floorNum - index)
});

function onLevelChange(level: number) {
  state.value.selectedLevel = level;
  state.value.levelStack.push(level)
}
</script>

<style>
.building {
  background-color: aqua;
  width: 100%;
  height: 100%;
  padding: 4px;
}

.building__lift {
  display: flex;
  justify-content: stretch;
  align-items: flex-end;
  border: 1px solid palevioletred;
}

.building__levels {
  flex-grow: 1;
}
</style>