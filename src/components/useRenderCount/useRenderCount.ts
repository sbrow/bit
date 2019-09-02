import { Counter } from "./Counter";

export const renders = new Counter();

export function useRenderCounter(label: string = "default") {
  renders.count(label);
}
