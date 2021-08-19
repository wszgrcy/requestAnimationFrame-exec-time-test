import { Injectable } from "static-injector";

@Injectable()
export class FrameCompute {
  private frameList!: number[];
  constructor() {}

  private computeAvg(sum: number, length: number) {
    return sum / length;
  }
  computeVariance(value: number[]) {
    this.frameList = value;
    let sum = this.sum(this.frameList);
    let avg = this.computeAvg(sum, this.frameList.length);
    return this.sum(this.frameList.map((item) => (item - avg) ** 2)) / this.frameList.length;
  }
  sum(list: number[]) {
    return list.reduce((pre, cur) => pre + cur, 0);
  }
}
