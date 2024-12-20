import { Context, Schema } from "koishi";
import { api } from "./api";

export const name = "jx3";

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

export function apply(ctx: Context) {
  // write your plugin here
  const options = {
    token: "",
    ticket: "",
  };
  // 创建 api 实例
  const apiInstance = new api(options);
  ctx.command("xx <num:number>").action(async (_, num) => {
    const response = await apiInstance.active_calendar("", num); // 传递需要的参数
    const data = response.data;
    console.log(data, "data");

    return `今天是${data.date},周${data.week}`;
  });
}
