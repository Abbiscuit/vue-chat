<template>
  <div>
    <User #user="{ user }">
      <div class="section" v-if="user">
        <UserProfile :user="user" />
        <ChatList :uid="user.uid" />
      </div>
      <Login v-else />
    </User>
  </div>
</template>

<script>
import Login from "./Login";
import User from "./User";
import UserProfile from "./UserProfile";
import ChatList from "./ChatList";

export default {
  name: "Home",
  components: {
    Login,
    User,
    UserProfile,
    ChatList
  }
};
</script>
