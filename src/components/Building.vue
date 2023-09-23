<template>
  <main class="building">
    <h1>Здание. Выбран этаж номер {{ selectedLevel ? selectedLevel : '_' }}</h1>
    <h3>Стек вызовов этажей {{ levelStack }}</h3>
    <section class="building__lift">
      <Lift
      :next-floor="selectedLevel"
       />
      <LevelList class="building__levels" @change="onLevelChange">
        <Level :level="level" v-for="(level) of computedFloorNum" />
      </LevelList>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { LevelList, Level, Lift } from './lift';


interface Props {
  floorNum: number
}

const props = withDefaults(defineProps<Props>(), {
  floorNum: 5,
})

const selectedLevel = ref<number>(0)
const levelStack = ref<number[]>([])
const computedFloorNum = computed(() => {
  return Array(props.floorNum).fill(null).map((_el, index) => props.floorNum - index)
});

function onLevelChange(level: number) {
  selectedLevel.value = level;
  levelStack.value.push(level)
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