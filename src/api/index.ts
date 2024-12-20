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

  /**
   * 活动日历
   *
   * 今天、明天、后天、日常任务。
   * 只有星期三、星期五、星期六、星期日 才有美人画图，星期三、星期五 才有世界首领，若非活动时间不返回相关键与值。
   *
   * @param {string} [server] - 区服名称，查找该区服的记录。
   * @param {number} [num=0] - 预测时间，预测指定时间的日常，默认值为0（即当天），1为明天，以此类推。
   * @returns {Object} - 包含今天、明天、后天、日常任务的对象。
   */
  active_calendar(server: string, num: number = 0): Promise<AxiosResponse> {
    return this.getAxios().request({
      url: "/data/active/calendar",
      method: "post",
      data: {
        server,
        num,
      },
    });
  }
}
