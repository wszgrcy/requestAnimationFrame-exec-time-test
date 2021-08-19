import { Injectable, Injector } from "static-injector";
import { Config } from "./config";
import { FrameCompute } from "./frame-compute";
import { FrameSchedule } from "./frame-schedule";
import { HtmlTemplate } from "./html-template";

@Injectable()
export class Main {
  result = new Map<{ execTime: number; templateLength: number }, number>();
  constructor(private config: Config, private frameSchedule: FrameSchedule, private frameCompute: FrameCompute) {}
  async run() {
    this.config.generateConfigList([1200], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    let next = this.config.nextConfig();
    while (next) {
      let i = 10;
      let list = [];
      while (i--) {
        this.frameSchedule.schedule();
        list.push(await this.frameSchedule.onComplete());
      }
      let varianceList = list.map((item) => this.frameCompute.computeVariance(item));
      let variance = this.frameCompute.sum(varianceList) / varianceList.length;
      this.result.set({ execTime: this.config.execTime, templateLength: this.config.templateLength }, variance);
      next = this.config.nextConfig();
    }
    this.result.forEach((value, key) => {
      console.log(`执行${key.execTime}ms,${key.templateLength}次插入时,平均方差为${value}`);
    });
  }
  addListener() {
    let btnEl = document.getElementById("run-btn") as HTMLButtonElement;
    btnEl.addEventListener("click", () => {
      this.run();
    });
  }
}

let injector = Injector.create({
  providers: [{ provide: Main }, { provide: FrameCompute }, { provide: FrameSchedule }, { provide: HtmlTemplate }, { provide: Config }],
});
let instance = injector.get(Main);
instance.addListener();
