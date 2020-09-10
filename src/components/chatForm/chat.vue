<template>
  <div class="chat">
    <div class="messageBox">
      <div
        class="messageItem"
        :class="item.from === userInfo.account ? 'mine' : ''"
        v-for="(item, index) in messageList"
        :key="item.from + 'messageItem' + index"
      >
        <div class="avatar">
          <el-avatar class="avatar" :size="30" :src="item.avatar"></el-avatar>
        </div>
        <div class="message">
          <span class="userName" v-if="item.from !== userInfo.account">{{
            item.fromName
          }}</span>
          <p class="msg">{{ item.msg }}</p>
        </div>
      </div>
    </div>
    <div class="messageSendBox">
      <el-input
        type="textarea"
        placeholder="请输入内容"
        rows="4"
        v-model="sendMessage"
        resize="none"
        @keyup.enter.native="submitMsg"
      >
      </el-input>
      <el-button
        class="sendBtn"
        type="primary"
        style="padding:6px 20px"
        @click="submitMsg"
        >发送</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["to"],
  data() {
    return {
      sendMessage: "",
      messageList: [],
      userInfo: this.$store.state.userInfo,
    };
  },
  methods: {
    getAvatar() {
      const avatarList = [
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598116553874&di=b850830f7a96dbdf5e4e83104e65d956&imgtype=0&src=http%3A%2F%2Fimg0.pconline.com.cn%2Fpconline%2F1401%2F15%2F4172339_touxiang%2F20_thumb.jpg",
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1671247724,3484152546&fm=26&gp=0.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598116554497&di=6cc6a718cb5c8417245a8721e7c1d49f&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201503%2F04%2F20150304003037_MLEJu.jpeg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598116554497&di=6869b7d32e5db2f105a58a907e6fac8a&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201505%2F04%2F20150504013225_XZNCu.thumb.700_0.jpeg",
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1027245443,3552957153&fm=26&gp=0.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598116554496&di=dfed2d970376f2a40b58c3be050299d0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201410%2F09%2F20141009224754_AswrQ.jpeg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598116554496&di=231673602f3d8fb21c8f1331c47e4f4d&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201803%2F16%2F20180316213032_cielg.jpg",
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1077287175,1506372161&fm=26&gp=0.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598116554496&di=e07a977359ef4a8bc7f2c9439bb58cba&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117230425_eofqv.thumb.700_0.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598116554495&di=cb636880d7aa66aea252f33f78a91609&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F04%2F20190104222555_Rvvyu.thumb.700_0.jpeg",
      ];
      const randomNumber = Math.floor(Math.random() * avatarList.length);
      return avatarList[randomNumber];
    },
    fetchMessageList() {
      this.messageList = [
        {
          fromName: "陈灵均",
          toName: "相亲相爱一家人",
          from: "admin3",
          to: "15515611561",
          msg: "测试测试",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
        {
          fromName: "裴钱",
          toName: "相亲相爱一家人",
          from: "admin2",
          to: "15515611561",
          msg:
            "测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
        {
          fromName: "陈灵均",
          toName: "相亲相爱一家人",
          from: "admin3",
          to: "15515611561",
          msg: "测试测试",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
        {
          fromName: "陈如初",
          toName: "相亲相爱一家人",
          from: "admin4",
          to: "15515611561",
          msg: "测试测试个啥呀",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
        {
          fromName: "陈灵均",
          toName: "相亲相爱一家人",
          from: "admin3",
          to: "15515611561",
          msg: "测试测试",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
        {
          fromName: "陈如初",
          toName: "相亲相爱一家人",
          from: "admin4",
          to: "15515611561",
          msg: "测试测试个啥呀",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
        {
          fromName: "裴钱",
          toName: "相亲相爱一家人",
          from: "admin2",
          to: "15515611561",
          msg: "测试测试",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
        {
          fromName: "陈如初",
          toName: "相亲相爱一家人",
          from: "admin4",
          to: "15515611561",
          msg:
            "测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
        {
          fromName: "陈灵均",
          toName: "相亲相爱一家人",
          from: "admin3",
          to: "15515611561",
          msg: "测试测试",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
        {
          fromName: "裴钱",
          toName: "相亲相爱一家人",
          from: "admin2",
          to: "15515611561",
          msg: "测试测试个啥呀",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
        {
          fromName: "陈灵均",
          toName: "相亲相爱一家人",
          from: "admin3",
          to: "15515611561",
          msg: "测试测试",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
        {
          fromName: "陈如初",
          toName: "相亲相爱一家人",
          from: "admin4",
          to: "15515611561",
          msg: "测试测试个啥呀",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
        {
          fromName: "陈灵均",
          toName: "相亲相爱一家人",
          from: "admin3",
          to: "15515611561",
          msg: "测试测试",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
        {
          fromName: "陈如初",
          toName: "相亲相爱一家人",
          from: "admin4",
          to: "15515611561",
          msg:
            "测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
        {
          fromName: "陈灵均",
          toName: "相亲相爱一家人",
          from: "admin3",
          to: "15515611561",
          msg: "测试测试",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
        {
          fromName: "陈如初",
          toName: "相亲相爱一家人",
          from: "admin4",
          to: "15515611561",
          msg: "测试测试个啥呀",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
        {
          fromName: "陈灵均",
          toName: "相亲相爱一家人",
          from: "admin3",
          to: "15515611561",
          msg: "测试测试",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
        {
          fromName: "陈如初",
          toName: "相亲相爱一家人",
          from: "admin4",
          to: "15515611561",
          msg: "测试测试个啥呀",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
        {
          fromName: "陈灵均",
          toName: "相亲相爱一家人",
          from: "admin3",
          to: "15515611561",
          msg: "测试测试",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
        {
          fromName: "陈如初",
          toName: "相亲相爱一家人",
          from: "admin4",
          to: "15515611561",
          msg:
            "测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀测试测试个啥呀",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
        {
          fromName: "陈灵均",
          toName: "相亲相爱一家人",
          from: "admin3",
          to: "15515611561",
          msg: "测试测试",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
        {
          fromName: "陈如初",
          toName: "相亲相爱一家人",
          from: "admin4",
          to: "15515611561",
          msg: "测试测试个啥呀",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
        {
          fromName: "陈灵均",
          toName: "相亲相爱一家人",
          from: "admin3",
          to: "15515611561",
          msg: "测试测试",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
        {
          fromName: "陈如初",
          toName: "相亲相爱一家人",
          from: "admin4",
          to: "15515611561",
          msg: "测试测试个啥呀",
          time: Date.now(),
          avatar: this.getAvatar(),
        },
      ];
    },
    submitMsg() {
      console.log("sendMessage", this.sendMessage);
      this.$socket.emit("sendMessage", {
        fromName: this.userInfo.nickName,
        from: this.userInfo.account,
        toName: this.to.name,
        to: this.to.number,
        content: this.sendMessage,
        isGroup: this.to.isGroup,
      });
      this.sendMessage = "";
    },
  },
  watch: {
    "$store.state.userInfo": function(val) {
      this.userInfo = val;
    },
  },
  mounted() {
    this.fetchMessageList();
  },
};
</script>

<style lang="scss">
.chat {
  height: 100%;
  display: flex;
  flex-direction: column;

  .messageBox {
    flex: 3;
    padding-right: 20px;
    overflow-y: auto;

    .messageItem {
      display: flex;
      margin-bottom: 10px;
      max-width: 300px;

      .avatar {
        margin: 0 5px;
      }
      .message {
        .userName {
          color: #666;
          font-size: 12px;
        }
        .msg {
          font-size: 13px;
          line-height: 20px;
          color: #222;
          padding: 7px;
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 5px;
        }
      }
    }
    .mine {
      flex-direction: row-reverse;
      margin-left: auto;

      .msg {
        background-color: #a9d3fce8 !important;
      }
    }
  }
  .messageSendBox {
    flex: 1;

    .sendBtn {
      float: right;
    }
  }
}
</style>
