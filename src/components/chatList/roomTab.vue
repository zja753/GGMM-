<template>
  <div class="roomList">
    <span
      class="roomItem"
      v-for="(item, index) in roomList"
      :key="item.roomNumber + index + 'roomItem'"
      @click="choseChat(item)"
    >
      <el-avatar :src="getAvatar()" :size="30"></el-avatar>
      <span class="roomName">{{ item.roomName }}</span>
    </span>
  </div>
</template>

<script>
export default {
  props: ["roomList"],
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
    choseChat(chat) {
      console.log(chat);
      this.$emit("choseChat", {
        name: chat.roomName,
        number: chat.roomNumber,
        isGroup: true,
      });
    },
  },
};
</script>

<style lang="scss">
.roomList {
  height: 100%;
  display: flex;
  flex-direction: column;

  .roomItem {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 5px;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #f5f7fa;
    }
    .roomName {
      font-weight: bold;
      padding-left: 10px;
    }
  }
}
</style>
