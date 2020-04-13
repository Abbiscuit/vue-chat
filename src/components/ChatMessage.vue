<template>
  <div class="message" :class="{'from-user': owner}">
    {{ message.text }}
    <br />
    <span class="sender">from UID {{ message.sender }}</span>
  </div>
</template>


<script>
export default {
  name: "ChatMessage",
  props: ["message", "owner"]
};
</script>

<style scoped>
.message {
  margin-right: 10px;
  margin-left: auto;
  background-color: #91bbff;

  color: rgba(black, 0.8);
  border-radius: 5px;
  padding: 12px;
  display: inline-block;
}

.from-user {
  margin-left: 10px;
  margin-right: auto;
  background-color: #ddd;
}

.sender {
  font-size: 0.5rem;
}
</style>