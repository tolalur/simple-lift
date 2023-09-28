import { useStorage } from "@vueuse/core";

const initState = {
  selectedLevel: 0,
  levelStack: [] as number[],
}
export function useBuilding(id: number) {
  const state = useStorage(`building-store-${1}`, initState, sessionStorage);

  return {
    state
  }
}