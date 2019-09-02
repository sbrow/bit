export class Counter {
  data: {
    [name: string]: number;
  } = {};
  count(label: string = "default") {
    if (!(label in this.data)) {
      this.clear(label);
    }
    this.data[label]++;
    console.log(`${label}.renders: ${this.data[label]}`);
  }
  get(label: string = "default"): number | undefined {
    if (label in this.data) {
      return this.data[label];
    }
    return undefined;
  }
  clear(label: string = "default") {
    this.data[label] = 0;
  }
  clearAll() {
    this.data = {};
  }
}
