export class Counter {
  public data: { [name: string]: number } = {};

  public count(label: string = "default"): void {
    if (!(label in this.data)) {
      this.clear(label);
    }
    this.data[label]++;
    console.log(`${label}.renders: ${this.data[label]}`);
  }

  public get(label: string = "default"): number | undefined {
    if (label in this.data) {
      return this.data[label];
    }
    return undefined;
  }
  public clear(label: string = "default"): void {
    this.data[label] = 0;
  }
  public clearAll(): void {
    this.data = {};
  }
}
