<template>
  <div class="messageTab">
    <div
      class="messageItem card"
      v-for="(item, index) in arrangeMessageList"
      :key="item._id + 'massageItem' + index"
      @click="choseChat(item)"
    >
      <div class="avatar">
        <el-avatar :src="getAvatar()" shape="square"></el-avatar>
      </div>
      <div class="info">
        <div class="title">
          <div>{{ item.userName }}</div>
          <span> {{ timeFormat(item.update_time) }} </span>
        </div>
        <div class="msg">{{ item.content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["messageList"],
  data() {
    return {
      userInfo: this.$store.state.userInfo,
    };
  },
  watch: {
    "$store.state.userInfo": function(val) {
      this.userInfo = val;
      this.$socket.emit("updataMessage", this.userInfo.account);
      this.$socket.emit("updataRequest", this.userInfo.account);
    },
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
    timeFormat(time) {
      if (
        new Date().toString().substr(0, 15) ===
        new Date(time).toString().substr(0, 15)
      )
        return new Date(time).toLocaleTimeString();
      else return new Date(time).toLocaleDateString();
    },
    choseChat(chat) {
      this.$emit("choseChat", {
        name: chat.userName,
        number: chat.from,
        isGroup: chat.isGroup,
      });
    },
  },
  mounted() {
    console.log("messageTab", this.messageList);
  },
  computed: {
    arrangeMessageList() {
      const msgList = {};

      // 人对人 from 和 to 都可以是自己，要注意处理
            // {
            //   _id: item._id,
            //   fromName: "裴钱",
            //   from: "admin2",
            //   toName: "陈平安"
            //   to: "admin3",
            //   content: "这应该是发送的第一条数据吧\n",
            //   careat_time: 1599293084752,
            //   update_time: 1599293084752,
            //   status: 1,
            //   isGroup: false,
            // };

            // {
            //   _id: item._id,
            //   fromName: "裴钱",
            //   from: "admin2",
            //   toName: "相亲相爱一家人"
            //   to: "356235235",
            //   content: "这应该是发送的第一条数据吧\n",
            //   careat_time: 1599293084752,
            //   update_time: 1599293084752,
            //   status: 1,
            //   isGroup: true,
            // };
      return msgList;
    },
  },
};
</script>

<style lang="scss">
.messageTab {
  .card {
    width: 100%;
    height: 60px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    margin-bottom: 5px;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      transform: translate(6px, -2px);
    }
  }
  .messageItem {
    width: 270px;
    margin: 5px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 24px;

    .avatar {
      width: 50px;
      height: 50px;
      padding: 5px;
    }
    .info {
      width: 100px;
      flex: 1;
      padding-left: 10px;

      .title {
        font-size: 15px;
        font-weight: 600;
        display: flex;

        div {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        span {
          margin-left: auto;
          margin-right: 10px;
          font-size: 12px;
          line-height: 20px;
          white-space: nowrap;
        }
      }
      .msg {
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
