<template>
  <div id="chatForm">
    <div class="title">编程小组</div>
    <main>
      <div class="chat">
        <el-tabs type="border-card" closable @tab-remove="tabsRemove">
          <el-tab-pane
            class="tebBox"
            v-for="item in chatFormList"
            :key="item.number"
            :label="item.name"
            :name="item.number"
          >
            <chat class="chatBody" :to="item" :messageList="messageList" @addMessage="addMessage" />
            <userList class="userList" v-if="item.isGroup" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </main>
  </div>
</template>

<script>
import chat from "./chat";
import userList from "../userList/userList";
export default {
  components: { chat, userList },
  props: ["chatFormList", "messageList"],
  methods: {
    tabsRemove(targetNumber) {
      this.chatFormList.some((item, index) => {
        if (item.number === targetNumber)
          this.$emit("chatFormListRemoveItem", index);
        return item.number === targetNumber;
      });
    },
    addMessage(message) {
      this.$emit("addMessage", message);
    },
  },
};
</script>

<style lang="scss" scoped>
#chatForm {
  width: 800px;
  height: 600px;
  border: #9fc7f0 solid 2px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-left: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;

  .title {
    height: 30px;
    text-align: center;
    font-size: 14px;
    line-height: 30px;
    background-color: #9fc7f0;
  }
  main {
    flex: 1;
    background-color: #233;
    .chat {
      width: 100%;
      height: 100%;

      .tebBox {
        display: flex;

        .chatBody {
          flex: 1;
          height: 495px;
        }
        .userList {
          width: 160px;
          height: 495px;
          border-left: 1px solid #eee;
          padding-left: 15px;
        }
      }
    }
  }
}
</style>
