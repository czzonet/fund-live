export class FundInfo {
  /** 基金名称 */
  name: string;
  /** 基金代码 */
  code: string;
  /** 当前净值 */
  now: string;
  /** 昨日净值 */
  lastClose: string;
  /** 涨跌幅 */
  changeRate: string;
  /** 涨跌额 */
  changeAmount: string;

  constructor(
    name: string,
    code: string,
    now: string,
    lastClose: string,
    changeRate: string,
    changeAmount: string
  ) {
    this.name = name;
    this.code = code;
    this.now = now;
    this.lastClose = lastClose;
    this.changeRate = changeRate;
    this.changeAmount = changeAmount;
  }
}
