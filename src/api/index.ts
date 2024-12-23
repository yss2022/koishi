import { Request } from "../utils/request";
import { AxiosResponse } from "axios";

/**
 * 创建一个新的 api 实例。
 *
 * @param {Object} options - 请求的选项。
 * @param {string} options.token - jx3api的token。
 * @param {string} options.ticket - 推栏ticket。
 * @param {string} [url="https://www.jx3api.com"] - 请求的 URL。默认为 "https://www.jx3api.com"。
 */
export class api extends Request {
  constructor(options: any, url: string = "https://www.jx3api.com") {
    super(options, url);
  }

  /***********
   * FREE API *
   ************/

  active_calendar(data: any): Promise<any> {
    return this.getAxios().request({
      url: "/data/active/calendar",
      method: "post",
      data,
    });
  }
}
