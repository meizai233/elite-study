import { message } from "ant-design-vue";
import { defineStore } from "pinia";
import { getUserInfo } from "~/api/account";

// 对user信息进行管理
// 持久化存储 自动把user作为key 存放在cookies中
export const useUser = defineStore(
  "user",
  () => {
    const token = ref("");
    const isLogin = ref(false);
    const personalInfo = ref({
      id: null,
      username: "",
      head_img: "",
      phone: "",
      pwd: "",
      position: null,
      slogan: "",
      sex: "1",
      city: null,
      learn_time: null,
      openid: null,
    });
    //  切换登录状态
    const switchLoginState = async (_token: string) => {
      token.value = _token;
      await asyncUserInfo();
    };
    // 同步登录信息
    const asyncUserInfo = async () => {
      if (token.value === "") {
        isLogin.value = false;
        return;
      }
      const userInfo = await getUserInfo();
      if (userInfo.code === 0) {
        isLogin.value = true;
        personalInfo.value = { ...userInfo.data };
      }
    };

    // github第三方登录 切换状态
    const switchGithubLoginState = async (username: string) => {
      isLogin.value = true;
      personalInfo.value.username = username;
    };

    // 退出登录
    const logout = () => {
      clearInfo();
      message.success("退出登录成功！");
    };
    /**
     * 清空用户信息
     */
    const clearInfo = function () {
      token.value = "";
      isLogin.value = false;
      personalInfo.value = {} as any;
      // nextTick(() => navigateTo('/'))
    };
    return {
      switchLoginState,
      switchGithubLoginState,
      token,
      isLogin,
      personalInfo,
      asyncUserInfo,
      logout,
    };
  },
  //持久化储存
  { persist: true }
);
