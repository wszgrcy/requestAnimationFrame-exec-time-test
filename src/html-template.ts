import { Injectable } from "static-injector";
import { Config } from "./config";

@Injectable()
export class HtmlTemplate {
  private template = `<table>
    <thead>
      <tr>
        <th>测试12</th>
        <th>测试12</th>
        <th>测试12</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>内容</td>
        <td>内容</td>
        <td>内容</td>
      </tr>
      <tr>
        <td>内容</td>
        <td>内容</td>
        <td>内容</td>
      </tr>
      <tr>
        <td>内容</td>
        <td>内容</td>
        <td>内容</td>
      </tr>
      <tr>
        <td>内容</td>
        <td>内容</td>
        <td>内容</td>
      </tr>
    </tbody>
  </table>`;
  constructor(private config: Config) {
    if (this.config.htmlTemplate) {
      this.template = this.config.htmlTemplate;
    }
  }
  getTemplate() {
    return this.template;
  }
  generateTemplateList(listLength: number) {
    return new Array(listLength).fill(this.template).map((item) => () => {
      let fragment = document.createDocumentFragment();
      let el = document.createElement("div");
      el.insertAdjacentHTML("beforeend", item);
      fragment.appendChild(el);
      this.config.templateContainer.appendChild(fragment);
      // this.config.templateContainer.insertAdjacentHTML("beforeend", item);
    });
  }
}
