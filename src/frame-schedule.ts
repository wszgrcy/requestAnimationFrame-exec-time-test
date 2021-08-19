import { firstValueFrom, Subject, take } from "rxjs";
import { Injectable } from "static-injector";
import { Config } from "./config";
import { HtmlTemplate } from "./html-template";

@Injectable()
export class FrameSchedule {
  private templateList: (() => void)[] = [];
  private frameTimeList: number[] = [];
  private complete$ = new Subject<number[]>();
  constructor(private htmlTemplate: HtmlTemplate, private config: Config) {}
  schedule() {
    this.config.templateContainer.innerHTML = "";
    this.templateList = this.htmlTemplate.generateTemplateList(this.config.templateLength);
    this._schedule(performance.now());
  }
  private _schedule(lastFrameTime: number) {
    requestAnimationFrame(() => {
      let frameStartTime = performance.now();
      while (true) {
        let fn = this.templateList.pop()!;
        fn();
        let taskEndTime = performance.now();
        if (!this.templateList.length) {
          this.frameTimeList.push(taskEndTime - lastFrameTime);
          this.complete$.next(this.frameTimeList);
          this.config.templateContainer.innerHTML = "";
          break;
        }
        if (taskEndTime - frameStartTime > this.config.execTime) {
          this.frameTimeList.push(taskEndTime - lastFrameTime);
          this._schedule(taskEndTime);
          break;
        }
      }
    });
  }

  onComplete() {
    return firstValueFrom(this.complete$);
  }
}
