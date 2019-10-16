export const state = () => {
    return{
        userInfo: {}
    }
} 

export const mutations = {
    setUserInfo(state, data){
        state.userInfo = data;
    },
};


export const actions = {
    // 封装登录的方法
    // store是固定必须要有的参数，执行当前的store == 组件内this.$store
    async login(store, data){
        var res = await this.$axios({
            url: "/accounts/login",
            method: "POST",
            data
        })

        if(res.status === 200){
            store.commit("setUserInfo", res.data);
        }

        return res;
    },
    async register(store, data){
        var res = await this.$axios({
            url: "/accounts/register",
            method: "POST",
            data
          });

        if(res.status === 200){
            store.commit("setUserInfo", res.data);
        }

        return res;
    },

    // 发送手机验证码, tel是传入的手机号码
    async sendCaptcha(store, tel){
        const res = await this.$axios({
            url: "/captchas",
            method: "POST",
            data: {
                tel // 手机号码
            }
        });

        return res;
    }
}