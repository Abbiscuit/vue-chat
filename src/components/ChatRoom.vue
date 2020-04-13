<template>
  <main class="chat-room">
    <h3 class="chat-room__title">No. {{ chatId }}</h3>

    <User #user="{user}">
      <div v-if="user">
        <ul>
          <li v-for="message of messages" :key="message.id">
            <ChatMessage :message="message" :owner="user.uid === message.sender" />
          </li>
        </ul>

        <!-- Audio -->
        <h5 class="chat-room__audio-title">ボイスメッセージ</h5>

        <button v-if="!recorder" @click="record()" class="btn chat-room__audio-button">録音 🎬</button>

        <button v-else @click="stop()" class="button is-danger">Stop</button>

        <br />

        <audio v-if="newAudio" :src="newAudioURL" controls></audio>

        <hr />

        <input v-model="newMessageText" class="validate" />

        <button
          class="btn btn-small pink"
          :disabled="!newMessageText || loading"
          type="text"
          @click="addMessage(user.uid)"
        >送信</button>
      </div>

      <Login v-else />
    </User>

    <router-link :to="{ name: 'Home' }">Back</router-link>
  </main>
</template>

<script>
import User from "./User";
import Login from "./Login";
import ChatMessage from "./ChatMessage";
import { db, storage } from "../firebase";

export default {
  name: "ChatRoom",
  components: {
    User,
    Login,
    ChatMessage
  },
  data() {
    return {
      newMessageText: "",
      loading: false,
      messages: [],
      newAudio: null,
      recorder: null
    };
  },
  computed: {
    chatId() {
      return this.$route.params.id;
    },
    messagesCollection() {
      return db.doc(`chats/${this.chatId}`).collection("messages");
    },
    newAudioURL() {
      return URL.createObjectURL(this.newAudio);
    }
  },
  firestore() {
    return {
      messages: this.messagesCollection.orderBy("createdAt").limitToLast(10)
    };
  },
  methods: {
    async record() {
      this.newAudio = null;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });

      const options = { mimeType: "audio/webm" };
      const recordedChunks = [];
      this.recorder = new MediaRecorder(stream, options);

      this.recorder.addEventListener("dataavailable", e => {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      });

      this.recorder.addEventListener("stop", () => {
        this.newAudio = new Blob(recordedChunks);
        console.log(this.newAudio);
      });

      this.recorder.start();
    },
    async stop() {
      this.recorder.stop();
      this.recorder = null;
    },
    async addMessage(uid) {
      this.loading = true;
      let audioURL = null;

      const { id: messageId } = this.messagesCollection.doc();

      if (this.newAudio) {
        const storageRef = storage
          .ref("chats")
          .child(this.chatId)
          .child(`${messageId}.wav`);

        await storageRef.put(this.newAudio);
        audioURL = await storageRef.getDownloadURL();
      }

      await this.messagesCollection.doc(messageId).set({
        text: this.newMessageText,
        sender: uid,
        createdAt: Date.now(),
        audioURL
      });
      this.loading = false;
      this.newMessageText = "";
      this.newAudio = null;
    }
  }
};
</script>

<style scoped>
.chat-room__title {
  font-size: 24px;
  margin-bottom: 16px;
}

.chat-room__audio-title {
  font-size: 24px;
  margin-bottom: 16px;
}

.chat-room__audio-button {
  margin-bottom: 8px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-width: 500px;
  background-color: #efefef;
  padding: 10px;
  border-radius: 0;
}

li {
  display: flex;
}
</style>