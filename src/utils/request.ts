import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

/**
 * Request 类，用于封装 axios 实例，并统一处理请求和响应。
 */
export class Request {
  private _axios: AxiosInstance | null = null; // Axios 实例

  /**
   * 创建一个新的 Request 实例。
   *
   * @param options - 请求的选项。
   * @param options.token - jx3api 的 token。
   * @param options.ticket - 推栏的 ticket。
   * @param url - 请求的 URL，默认为 "https://api.jx3api.com"。
   */
  constructor(
    options: { token?: string; ticket?: string },
    url: string = "https://api.jx3api.com"
  ) {
    if (!options.ticket) {
      console.log("未指定 ticket，部分功能可能受限");
    }
    if (!options.token) {
      console.log("未指定 token，将只可使用免费功能");
    }
    this._createAxios(options, url);
  }

  /**
   * 创建一个 Axios 实例，并配置拦截器。
   *
   * @param options - 请求的选项。
   * @param url - 请求的基础 URL。
   */
  private _createAxios(
    options: { token?: string; ticket?: string },
    url: string
  ): void {
    console.log(url);

    // 创建 Axios 实例
    const _axios = axios.create({
      timeout: 6000, // 请求超时（单位：毫秒）
      baseURL: url, // 设置基础 URL
    });

    // 请求拦截器，用于在请求头或请求体中添加 token 和 ticket
    _axios.interceptors.request.use(
      (apiconfig: InternalAxiosRequestConfig) => {
        const infos = {
          token: options.token,
          ticket: options.ticket,
        };
        if (apiconfig.data) {
          apiconfig.data = { ...apiconfig.data, ...infos }; // 合并请求体数据
        } else {
          apiconfig.data = infos; // 设置默认数据
        }
        return apiconfig;
      },
      (error) => {
        // 处理请求错误
        return Promise.reject(error);
      }
    );

    // 响应拦截器，用于统一处理响应数据
    _axios.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data; // 返回响应中的数据部分
      },
      (error) => {
        // 处理响应错误
        return Promise.reject(error);
      }
    );

    this._axios = _axios;
  }

  /**
   * 获取 Axios 实例。
   *
   * @returns 返回创建的 Axios 实例。
   */
  public getAxios(): AxiosInstance | null {
    return this._axios;
  }
}
