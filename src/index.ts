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
  ctx
    .command("日常 [server] [num:number]", "查询剑网3指定服务器的日常活动信息") //指令：查询日常
    .usage(
      "查询剑网3指定服务器的日常活动信息，区服和数字可省略采用默认值，例如：日常 天鹅坪 0"
    )
    .option("server", "指定区服名称")
    .option("num", "预测时间,0为当天,1为明天", { fallback: 0 })
    .action(async ({}, server: string, num: number) => {
      try {
        const res = await apiInstance.active_calendar({ server, num });
        console.log(res);
        if (res.code === 200) {
          const dailyInfo = res.data;
          let leaderInfo = dailyInfo.leader ?? "当日无世界BOSS"; //判定当日是否有世界BOSS，如果返回值为undefined替换文本
          let drawInfo = dailyInfo.draw ?? "当日无美人图活动"; //判定当日是否有美人图活动，如果返回值为undefined替换文本
          let publicTasksInfo: string[] = dailyInfo.team[0].split(";"); //拆分返回值并存为数组，武林通鉴·公共任务（共2个）
          let dungeonInfo: string[] = dailyInfo.team[1].split(";"); //拆分返回值并存为数组，武林通鉴·秘境（共3个）
          let groupDungeonInfo: string[] = dailyInfo.team[2].split(";"); //拆分返回值并存为数组，团队秘境（共3个）
          const message =
            `区服：${server}\n` +
            `日期：${dailyInfo.date}\n` +
            `星期：${dailyInfo.week}\n` +
            `大战：${dailyInfo.war}\n` +
            `战场：${dailyInfo.battle}\n` +
            `矿车：${dailyInfo.orecar}\n` +
            `世界首领：${leaderInfo}\n` +
            `门派任务：${dailyInfo.school}\n` +
            `驰援任务：${dailyInfo.rescue}\n` +
            `美人画图：${drawInfo}\n` +
            `福缘宠物：${dailyInfo.luck.join(", ")}\n` +
            `声望加倍卡：${dailyInfo.card.join(", ")}\n\n` +
            `※武林通鉴·公共任务:\n` + //武林通鉴·公共任务分三行显示
            `${publicTasksInfo[0]}\n` +
            `${publicTasksInfo[1]}\n\n` +
            `※武林通鉴·秘境:\n` + //武林通鉴·秘境分四行显示
            `${dungeonInfo[0]}\n` +
            `${dungeonInfo[1]}\n` +
            `${dungeonInfo[2]}\n\n` +
            `※团队秘境:\n` + //团队秘境分四行显示
            `${groupDungeonInfo[0]}\n` +
            `${groupDungeonInfo[1]}\n` +
            `${groupDungeonInfo[2]}\n`;
          return message;
        } else {
          return `查询失败，错误代码：${res.code}，信息：${res.msg}`;
        }
      } catch (error) {
        return "查询日常活动时出错，请稍后再试。";
      }
    });
}
