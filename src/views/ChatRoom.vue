<template>
  <div id="chatRoom">
    <chatList
      class="chatList"
      :roomList="roomList"
      :friendList="friendList"
      :userInfo="userInfo"
      :messageList="messageList"
      :requestList="requestList"
      @choseChat="choseChat"
      @requestListRemoveItem="requestListRemoveItem"
      v-if="chatListRefresh"
    />
    <chatForm
      class="chatForm"
      :chatFormList="chatFormList"
      @chatFormListRemoveItem="chatFormListRemoveItem"
    />
  </div>
</template>

<script>
import chatForm from "../components/chatForm/chatForm";
import chatList from "../components/chatList/chatList";
import { mapActions } from "vuex";
export default {
  components: {
    chatForm,
    chatList,
  },
  data() {
    return {
      friendList: [
        {
          nickName: "陈灵均",
          account: "admin3",
          profile: "这个人很懒，还没有写个人简介。",
          groupName: "我的好友",
        },
        {
          nickName: "陈如初",
          account: "admin4",
          profile: "这个人很懒，还没有写个人简介。",
          groupName: "我的好友",
        },
        {
          nickName: "小米粒",
          account: "admin5",
          profile: "哑巴湖大大大大大大水怪",
          groupName: "我的好友",
        },
        {
          nickName: "香火小人",
          account: "admin6",
          profile: "这个人很懒，还没有写个人简介。",
          groupName: "我的好友",
        },
        {
          nickName: "陈灵均",
          account: "admin3",
          profile: "这个人很懒，还没有写个人简介。",
          groupName: "亲戚",
        },
        {
          nickName: "陈如初",
          account: "admin4",
          profile: "这个人很懒，还没有写个人简介。",
          groupName: "亲戚",
        },
        {
          nickName: "小米粒",
          account: "admin5",
          profile: "哑巴湖大大大大大大水怪",
          groupName: "亲戚",
        },
        {
          nickName: "香火小人",
          account: "admin6",
          profile: "这个人很懒，还没有写个人简介。",
          groupName: "亲戚",
        },
        {
          nickName: "陈灵均",
          account: "admin3",
          profile: "这个人很懒，还没有写个人简介。",
          groupName: "同事",
        },
        {
          nickName: "陈如初",
          account: "admin4",
          profile: "这个人很懒，还没有写个人简介。",
          groupName: "同事",
        },
        {
          nickName: "小米粒",
          account: "admin5",
          profile: "哑巴湖大大大大大大水怪",
          groupName: "同事",
        },
        {
          nickName: "香火小人",
          account: "admin6",
          profile: "这个人很懒，还没有写个人简介。",
          groupName: "同事",
        },
      ],
      roomList: [
        {
          roomName: "相亲相爱一家人",
          roomNumber: "15515611561",
        },
        {
          roomName: "screeps编程游戏小组",
          roomNumber: "15515634561",
        },
        {
          roomName: "学校班级群",
          roomNumber: "15535311561",
        },
      ],
      userInfo: this.$store.state.userInfo,
      messageList: [
        {
          from: "陈灵均",
          number: "admin3",
          msg: "你啥时候回落魄山？",
          isGroup: false,
          time: Date.now(),
        },
        {
          from: "相亲相爱一家人",
          number: "15515611561",
          lastNickName: "朱敛",
          msg: "？？？？？？",
          isGroup: true,
          time: Date.now(),
        },
        {
          from: "陈灵均",
          number: "admin3",
          msg: "你啥时候回落魄山？",
          isGroup: false,
          time: Date.now(),
        },
        {
          from: "相亲相爱一家人",
          number: "15515611561",
          lastNickName: "朱敛",
          msg: "？？？？？？",
          isGroup: true,
          time: Date.now(),
        },
        {
          from: "陈灵均",
          number: "admin3",
          msg: "你啥时候回落魄山？",
          isGroup: false,
          time: Date.now(),
        },
        {
          from: "相亲相爱一家人",
          number: "15515611561",
          lastNickName: "朱敛",
          msg: "？？？？？？",
          isGroup: true,
          time: Date.now(),
        },
        {
          from: "陈灵均",
          number: "admin3",
          msg: "你啥时候回落魄山？",
          isGroup: false,
          time: Date.now(),
        },
        {
          from: "相亲相爱一家人",
          number: "15515611561",
          lastNickName: "朱敛",
          msg: "？？？？？？",
          isGroup: true,
          time: Date.now(),
        },
        {
          from: "陈灵均",
          number: "admin3",
          msg: "你啥时候回落魄山？",
          isGroup: false,
          time: Date.now(),
        },
        {
          from: "相亲相爱一家人",
          number: "15515611561",
          lastNickName: "朱敛",
          msg: "？？？？？？",
          isGroup: true,
          time: Date.now(),
        },
        {
          from: "陈灵均",
          number: "admin3",
          msg: "你啥时候回落魄山？",
          isGroup: false,
          time: Date.now(),
        },
        {
          from: "相亲相爱一家人",
          number: "15515611561",
          lastNickName: "朱敛",
          msg: "？？？？？？",
          isGroup: true,
          time: Date.now(),
        },
        {
          from: "陈灵均",
          number: "admin3",
          msg: "你啥时候回落魄山？",
          isGroup: false,
          time: Date.now(),
        },
        {
          from: "相亲相爱一家人",
          number: "15515611561",
          lastNickName: "朱敛",
          msg: "？？？？？？",
          isGroup: true,
          time: Date.now(),
        },
        {
          from: "陈灵均",
          number: "admin3",
          msg: "你啥时候回落魄山？",
          isGroup: false,
          time: Date.now(),
        },
        {
          from: "相亲相爱一家人",
          number: "15515611561",
          lastNickName: "朱敛",
          msg: "？？？？？？",
          isGroup: true,
          time: Date.now(),
        },
        {
          from: "陈灵均",
          number: "admin3",
          msg: "你啥时候回落魄山？",
          isGroup: false,
          time: Date.now(),
        },
        {
          from: "相亲相爱一家人",
          number: "15515611561",
          lastNickName: "朱敛",
          msg: "？？？？？？",
          isGroup: true,
          time: Date.now(),
        },
        {
          from: "陈灵均",
          number: "admin3",
          msg: "你啥时候回落魄山？",
          isGroup: false,
          time: Date.now(),
        },
        {
          from: "相亲相爱一家人",
          number: "15515611561",
          lastNickName: "朱敛",
          msg: "？？？？？？",
          isGroup: true,
          time: Date.now(),
        },
        {
          from: "陈灵均",
          number: "admin3",
          msg: "你啥时候回落魄山？",
          isGroup: false,
          time: Date.now(),
        },
        {
          from: "相亲相爱一家人",
          number: "15515611561",
          lastNickName: "朱敛",
          msg: "？？？？？？",
          isGroup: true,
          time: Date.now(),
        },
      ],
      requestList: [],
      chatFormList: [],
      chatListRefresh: true,
    };
  },
  methods: {
    ...mapActions(["getUserInfo"]),
    choseChat(chat) {
      const already = this.chatFormList.some(
        (item) => item.isGroup === chat.isGroup && item.number === chat.number
      );
      if (!already) this.chatFormList.push(chat);
      console.log(this.chatFormList);
    },
    chatFormListRemoveItem(index) {
      this.chatFormList.splice(index, 1);
    },
    requestListRemoveItem(index) {
      this.requestList.splice(index, 1);
    },
    relordChatList() {
      this.chatListRefresh = false;
      this.$nextTick(() => {
        this.chatListRefresh = true;
      });
    },
    async fetchFriendList() {
      const res = await this.$axios.get("/chat/fetchFriends", {
        account: this.$store.state.account,
      });
      if (res.status === 1) {
        this.friendList = res.data.friends.map((item) => {
          return {
            nickName: item.friendNickName,
            account: item.friendAccount,
            profile: item.friendProfile,
            groupName: item.groupName,
          };
        });
        console.log("account ", this.$store.state.account);
        console.log("friendList", this.friendList);
        this.relordChatList();
      } else {
        this.$message({
          message: "获取用户列表失败",
          type: "error",
        });
      }
    },
  },
  watch: {
    "$store.state.userInfo": function(val) {
      this.userInfo = val;
      this.$socket.emit("updataMessage", this.userInfo.account);
      this.$socket.emit("updataRequest", this.userInfo.account);
    },
  },
  async created() {
    this.sockets.subscribe("tips", function(msg) {
      this.$message({
        message: msg,
        // type: "warning",
      });
    });
    this.sockets.subscribe("updata-message", function(messageList) {
      console.log("updataMessage");
      console.log(this.messageList, messageList);
      this.messageList = messageList;
    });
    this.sockets.subscribe("updata-request", function(requestList) {
      console.log("updataRequest");
      console.log(this.requestList, requestList);
      this.requestList = requestList;
    });
    this.sockets.subscribe("updata-friend", function(friendList) {
      console.log("updataFriend");
      console.log(this.friendList, friendList);
      this.friendList = friendList.map((item) => {
        return {
          nickName: item.friendNickName,
          account: item.friendAccount,
          profile: item.friendProfile,
          groupName: item.groupName,
        };
      });
      this.relordChatList();
    });
    this.sockets.subscribe("add-friend-request", function(request) {
      this.$message(`收到用户:${request.account} 的好友请求`);
    });

    this.getUserInfo();
    this.fetchFriendList();
  },
  mounted() {
    this.userInfo = this.$store.state.userInfo;
    this.$socket.emit("updataMessage", this.userInfo.account);
    this.$socket.emit("updataRequest", this.userInfo.account);
  },
};
</script>

<style lang="scss" scope>
#chatRoom {
  width: 80vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  .chatList {
    flex: 0 0 300px;
  }
  .chatForm {
    flex: 0 0 800px;
    margin-left: auto;
  }
}
</style>
