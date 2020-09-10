<template>
  <div id="chatList">
    <el-tabs class="tabBox" v-model="activeName" @tab-click="tabSwitch" stretch>
      <el-tab-pane
        class="tabItem beautifulScrollbar"
        label="消息"
        name="message"
      >
        <messageTab :messageList="messageList" @choseChat="choseChat" />
      </el-tab-pane>
      <el-tab-pane
        class="tabItem beautifulScrollbar"
        label="好友"
        name="friend"
      >
        <friendTab :friendTreeList="friendTreeList" @choseChat="choseChat" />
      </el-tab-pane>
      <el-tab-pane class="tabItem beautifulScrollbar" label="群聊" name="room">
        <roomTab :roomList="roomList" @choseChat="choseChat" />
      </el-tab-pane>
    </el-tabs>
    <footer>
      <el-row class="footerBtnBox">
        <el-button
          circle
          size="medium"
          icon="el-icon-user"
          @click="userDrawer = true"
        ></el-button>
        <el-button
          circle
          size="medium"
          icon="el-icon-plus"
          @click="addFriend = true"
        ></el-button>
        <el-button
          circle
          size="medium"
          icon="el-icon-zoom-in"
          @click="joinGroup = true"
        ></el-button>
      </el-row>
    </footer>

    <el-drawer
      title="用户信息及相关操作"
      :visible.sync="userDrawer"
      direction="rtl"
    >
      <el-card class="box-card" style="box-shadow:none">
        <div slot="header" class="clearfix">
          <span>个人信息</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >编辑</el-button
          >
        </div>
        <p><span>昵称：</span>{{ userInfo.nickName }}</p>
        <p><span>账号：</span>{{ userInfo.account }}</p>
        <p><span>邮箱：</span>{{ userInfo.email }}</p>
      </el-card>

      <el-card class="box-card" style="box-shadow:none;border:none">
        <div slot="header" class="clearfix">
          <span>好友请求</span>
        </div>
        <el-table :data="requestList" style="width: 100%">
          <el-table-column prop="nickName" label="昵称" width="130">
          </el-table-column>
          <el-table-column prop="from" label="账号" width="130">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="agreeRequest(scope.row, scope.$index)"
                >同意</el-button
              >
              <el-button
                size="mini"
                @click="rejectRequest(scope.row, requestList, scope.$index)"
                >拒绝</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-drawer>

    <el-dialog title="添加好友" :visible.sync="addFriend" width="30%" center>
      <el-input
        v-model="number"
        placeholder="请输入目标账号/昵称"
        @keyup.enter.native="tryAddFriend"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFriend = false">取 消</el-button>
        <el-button type="primary" @click="tryAddFriend">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="joinGroup" width="30%" center>
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="joinGroup = false">取 消</el-button>
        <el-button type="primary" @click="joinGroup = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import friendTab from "./friendTab";
import roomTab from "./roomTab";
import messageTab from "./messageTab";
export default {
  components: { friendTab, roomTab, messageTab },
  props: ["messageList", "friendList", "roomList", "userInfo", "requestList"],
  data() {
    return {
      activeName: "message",
      friendTreeList: [],
      addFriend: false,
      joinGroup: false,
      userDrawer: false,
      number: "",
    };
  },
  methods: {
    tabSwitch(tab, event) {
      console.log(tab.label, event);
    },
    getRoomsList() {
      const groupDic = {};
      const treeList = [];
      let cnt = 0;
      this.friendList.forEach((item) => {
        item.id = `friendList-${cnt++}-leafNode`;
        if (groupDic[item.groupName]) {
          groupDic[item.groupName].push(item);
        } else {
          groupDic[item.groupName] = [item];
        }
      });
      Object.keys(groupDic).forEach((key) => {
        treeList.push({
          id: `friendList-${cnt++}-node`,
          label: key,
          children: groupDic[key],
        });
      });
      this.friendTreeList = treeList;
      console.log(this.friendTreeList);
    },
    choseChat(chat) {
      this.$emit("choseChat", chat);
    },
    tryAddFriend() {
      this.$socket.emit("addFriend", {
        nickName: this.userInfo.nickName,
        account: this.userInfo.account,
        friendAccount: this.number,
      });
      this.addFriend = false;
      this.number = "";
    },
    agreeRequest(request, index) {
      this.$socket.emit("agreeFriendRequest", request);
      this.$emit("requestListRemoveItem", index);
    },
    rejectRequest(request, index) {
      this.$socket.emit("rejectFriendRequest", request);
      this.$emit("requestListRemoveItem", index);
    },
  },
  watch: {
    friendList: function() {
      alert("friendListChange")
      this.getRoomsList();
    },
  },
  mounted() {
    console.log(this.messageList);
    this.getRoomsList();
  },
};
</script>

<style lang="scss" scope>
#chatList {
  width: 300px;
  height: 700px;
  background-color: #9fc7f0;
  border-top: solid 4px #9fc7f0;
  display: flex;
  flex-direction: column;
  border-radius: 5px;

  .tabBox {
    flex: 9;
    background-color: rgb(234, 234, 241);

    .el-tabs__item {
      background-color: rgba(255, 255, 255, 0.466);
    }

    .tabItem {
      height: 556px;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
  footer {
    flex: 1;

    .footerBtnBox {
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
}
</style>
