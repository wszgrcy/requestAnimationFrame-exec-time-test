import { Injectable } from "static-injector";

@Injectable()
export class Config {
  htmlTemplate!: string;
  templateLength!: number;
  templateContainer: HTMLElement = document.querySelector(".template-container") as any;
  execTime!: number;
  private list: Record<string, any>[] = [];

  generateConfigList(templateLengthRange: number[], execTimeList: number[]) {
    for (let i = 0; i < templateLengthRange.length; i++) {
      const templateLength = templateLengthRange[i];
      for (let j = 0; j < execTimeList.length; j++) {
        const execTime = execTimeList[j];
        this.list.push({
          templateLength,
          execTime,
        });
      }
    }
  }
  nextConfig() {
    let item = this.list.pop()!;
    this.templateLength = item.templateLength;
    this.execTime = item.execTime;
    return !!this.list.length;
  }
}
