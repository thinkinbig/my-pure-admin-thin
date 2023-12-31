import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

export type UserResult = {
  success: boolean;
  data: {
    /** 用户名 */
    username: string;
    /** 当前登陆用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type CaptchasResult = {
  success: boolean;
  /** 验证码 */
  data: {
    text: string;
    svg: string;
  };
};

export type LoginHistoryResult = {
  success: boolean;
  data: Array<{
    /** 记录id */
    id: number;
    /** 用户名 */
    username: string;
    /** 登录时间 */
    login_time: string;
  }>;
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", baseUrlApi("login"), { data });
};

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/refreshToken", {
    data
  });
};

export const getCaptcha = () => {
  return http.request<string>("get", baseUrlApi("captcha"));
};

export const getUserLoginHistory = () => {
  return http.request<LoginHistoryResult>("get", baseUrlApi("loginHistory"));
};
