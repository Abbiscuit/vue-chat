<template>
  <div class="chat-list">
    <p class="chat-list__title">チャットルーム</p>
    <ul class="collection">
      <li v-for="chat of chats" :key="chat.id" class="collection-item">
        <router-link :to="{ name: 'ChatRoom', params: { id: chat.id } }">{{ chat.id }}</router-link>
      </li>
    </ul>

    <button @click="createChatRoom()" class="btn btn-small yellow accent-4 black-text">チャットルームを作成する</button>
  </div>
</template>

<script>
import { db } from "../firebase";
export default {
  name: "ChatList",
  data() {
    return {
      chats: []
    };
  },
  firestore() {
    return {
      chats: db.collection("chats").where("owner", "==", this.uid)
    };
  },
  methods: {
    async createChatRoom() {
      const newChat = await db.collection("chats").add({
        createdAt: Date.now(),
        owner: this.uid,
        members: [this.uid]
      });
      console.log(newChat);
    }
  },
  props: ["uid"]
};
</script>

<style style="css" scoped>
.chat-list .chat-list__title {
  font-size: 24px;
  margin-bottom: 8px;
}
</style>
