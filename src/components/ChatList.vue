<template>
  <div class="chat-list">
    <p class="menu-label">
      Chat Rooms
    </p>
    <ul class="menu-list">
      <li v-for="chat of chats" :key="chat.id">
        <router-link :to="{ name: 'ChatRoom', params: { id: chat.id } }">
          {{ chat.id }}
        </router-link>
      </li>
    </ul>

    <button @click="createChatRoom()" class="button">
      Create New Chat Room
    </button>
  </div>
</template>

<script>
import { db } from '../firebase';
export default {
  name: 'ChatList',
  data() {
    return {
      chats: []
    };
  },
  firestore() {
    return {
      chats: db.collection('chats').where('owner', '==', this.uid)
    };
  },
  methods: {
    async createChatRoom() {
      const newChat = await db.collection('chats').add({
        createdAt: Date.now(),
        owner: this.uid,
        members: [this.uid]
      });
      console.log(newChat);
    }
  },
  props: ['uid']
};
</script>

<style style="css" scoped>
.chat-list .menu-list {
  margin: 0;
}
</style>
