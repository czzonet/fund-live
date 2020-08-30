import { workspace, WorkspaceConfiguration } from "vscode";

export class Config {
  private readonly config: WorkspaceConfiguration;

  constructor(public name: string) {
    this.config = workspace.getConfiguration();
    this.name = name;
  }

  getData(defaultValue: string): string;
  getData(defaultValue: number): number;
  getData(defaultValue: Array<string>): Array<string>;
  getData(defaultValue: Array<number>): Array<number>;
  getData(defaultValue: Array<any>): Array<any>;
  getData(defaultValue: any): any {
    return this.config.get(this.name, defaultValue);
  }

  setData(data: any): void {
    this.config.update(this.name, data, true);
  }
}
