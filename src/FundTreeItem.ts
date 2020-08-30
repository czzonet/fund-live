import { TreeItem } from "vscode";
import { FundInfo } from "./FundInfo";

export class FundTreeItem extends TreeItem {
  constructor(info: FundInfo) {
    const rate = Number(info.changeRate);
    const icon = rate >= 0 ? "📈" : "📉";
    const prev = rate >= 0 ? "+" : "-";
    const rage = `${prev}${Math.abs(rate)}%`;

    const title = icon + rage + "\t" + `[${info.code}]${info.name}`;

    /** 构造继承 */
    super(title);

    /** Tooltip鼠标悬停提示 */
    let sliceName = info.name;
    if (sliceName.length > 8) {
      sliceName = `${sliceName.slice(0, 8)}...`;
    }
    const tips = [
      `代码:　${info.code}`,
      `名称:　${sliceName}`,
      `--------------------------`,
      `单位净值:　　　　${info.now}`,
      `涨跌幅:　　　　　${info.changeRate}%`,
      `涨跌额:　　　　　${info.changeAmount}`,
      `昨收:　　　　　　${info.lastClose}`,
    ];

    this.tooltip = tips.join("\r\n");
  }
}
