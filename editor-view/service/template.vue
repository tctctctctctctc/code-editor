<template>
  <div class="msg">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: "onlineView",
  components: {},
  data() {
    return {
      msg: "hello world！"
    };
  },
  methods: {}
};
</script>
<style lang="less">
.msg {
  font-size: 24px;
}
</style>
