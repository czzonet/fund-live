import { TreeDataProvider, EventEmitter, Event } from "vscode";
import { FundInfo } from "./FundInfo";
import { FundTreeItem } from "./FundTreeItem";
import { Config } from "./Config";
import { total } from "./fundapi";

export class FundTreeDataProvider implements TreeDataProvider<FundInfo> {
  private favConfig: Config;
  refreshEvent: EventEmitter<FundInfo | null>;
  readonly onDidChangeTreeData: Event<FundInfo | null>;

  constructor() {
    this.favConfig = new Config("fund-live.favorites");
    this.refreshEvent = new EventEmitter<FundInfo | null>();
    this.onDidChangeTreeData = this.refreshEvent.event;
  }

  async getChildren() {
    const codes = this.favConfig.getData([]);
    const funds = await total(codes);
    const res = funds.map(
      (d) =>
        new FundInfo(
          d.name,
          d.fundcode,
          d.gsz,
          d.dwjz,
          d.gszzl,
          (d.gsz - d.dwjz).toFixed(4)
        )
    );

    return res;
  }

  getTreeItem(element: FundInfo) {
    console.log("getTreeItem");
    return new FundTreeItem(element);
  }

  addCode(code: string) {
    const codes = this.favConfig.getData([]);
    codes.push(code);
    this.favConfig.setData(codes);
  }

  removeCode(code: string) {
    const codes = this.favConfig.getData([]);
    const index = codes.indexOf(code);
    codes.splice(index, 1);
    this.favConfig.setData(codes);
  }

  refresh() {
    console.log("refresh");
    setTimeout(() => {
      this.refreshEvent.fire(null);
    }, 200);
  }
}
