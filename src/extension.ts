import * as vscode from "vscode";
import { FundTreeDataProvider } from "./FundTreeDataProvider";
import { FundInfo } from "./FundInfo";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "fund-live" is now active!');

  const fundProvider = new FundTreeDataProvider();
  vscode.window.registerTreeDataProvider("fund-favorite", fundProvider);

  let add = vscode.commands.registerCommand("fund.add", () => {
    async function handler() {
      const code = await inputFund();

      if (code) {
        console.log("input", code);
        fundProvider.addCode(code);
        fundProvider.refresh();
      } else {
        console.log("input empty,ignore.", code);
      }
    }

    handler().then();
  });

  let remove = vscode.commands.registerCommand(
    "fund.item.remove",
    (fund: FundInfo) => {
      fundProvider.removeCode(fund.code);
      fundProvider.refresh();
    }
  );

  let refresh = vscode.commands.registerCommand("fund.refresh", () => {
    fundProvider.refresh();
  });

  context.subscriptions.push(add, refresh, remove);
}

// this method is called when your extension is deactivated
export function deactivate() {}

async function inputFund() {
  const res = await vscode.window.showInputBox({
    value: "",
    valueSelection: [5, -1],
    prompt: "添加基金到自选",
    placeHolder: "Add Fund To Favorite",
    validateInput: (inputCode: string) => {
      const codeArray = inputCode.split(/[\W]/);
      const hasError = codeArray.some((code) => {
        return code !== "" && !/^\d+$/.test(code);
      });

      return hasError ? "基金代码输入有误" : null;
    },
  });

  return res;
}
