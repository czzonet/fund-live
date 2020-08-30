import * as https from "https";

//  `https://fundgz.1234567.com.cn/js/${code}.js?rt=${time}`;
const urlPrefix = `https://fundgz.1234567.com.cn/js/`;

/**
 * 拼接基金的请求地址和当前时间
 * @param code 基金代码
 */
function urlFull(code: string) {
  const realTime = Date.now();
  const res = urlPrefix + code + ".js?rt=" + realTime;

  return res;
}

/**
 * 获取基金信息
 * @param code 基金代码
 */
export async function show(code: string): Promise<any> {
  return new Promise((resolve, reject) => {
    https.get(urlFull(code), (res) => {
      let buffer: any;

      if (!res || res.statusCode !== 200) {
        reject(new Error("网络请求错误!"));
      }

      res.on("data", (d) => (buffer += d));

      res.on("end", () => {
        const jsonp = buffer.toString("utf8");

        const match = jsonp.match(/jsonpgz\((.+)\)/);
        if (!match || !match[1]) {
          reject(new Error("接口格式错误!"));
        }
        const str = match[1];
        const obj = JSON.parse(str);

        resolve(obj);
      });
    });
  });
}

/**
 * 并行获取多个基金信息
 * @param codes 基金代码数组
 */
export async function total(codes: string[]): Promise<any[]> {
  const parallel: Promise<any>[] = [];
  for (let i = 0; i < codes.length; i++) {
    parallel.push(show(codes[i]));
  }
  const resultArr: any[] = await Promise.all(parallel);

  return resultArr;
}
