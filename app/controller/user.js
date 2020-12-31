import userService from "../service/user";
import { unsupported, unauthorized } from "../constant";
import { merge } from "../utils";
class Controller {
  static async add(ctx, next) {
    // ctx.set("Content-Type", "application/json")
    const parameter = ctx.request.body; // 获取请求参数
    //添加service
    const data = await userService.add(ctx, next, parameter);
    const getMessage = (data) => {
      const { status } = data;
      const message = {
        1: () =>
          merge(unsupported, {
            msg: "该用户名已经被注册过,请重新输入用户名",
          }),
        2: () =>
          merge(unsupported, {
            msg: "该手机号码已经被注册过,请重新输入手机号码",
          }),
        3: () => ({
          code: 200,
          msg: "注册成功",
        }),
      };
      return message[status]();
    };
    ctx.response.body = getMessage(data);
  }
  static edit(ctx, next) {
    ctx.set("Content-Type", "application/json");

    var page = ctx.params.page; // 获取请求参数
    //添加service
    // const data = userService.list(page);

    // ctx.response.body = "d";
  }

  static async login(ctx, next) {
    // ctx.set("Content-Type", "application/json")
    var parameter = ctx.request.body; // 获取请求参数
    //添加service
    const data = await userService.login(ctx, next, parameter);
    const getMessage = (data) => {
      const { status, token, userInfo } = data;
      const message = {
        1: () =>
          merge(unauthorized, {
            msg: "用户名错误，请重新输入用户名",
          }),
        2: () =>
          merge(unauthorized, {
            msg: "密码错误请重新输入密码",
          }),
        3: () => ({
          code: 200,
          msg: "登录成功",
          data: {
            token,
            userInfo,
          },
        }),
      };
      return message[status]();
    };
    ctx.response.body = getMessage(data);
  }
}

export default Controller;
