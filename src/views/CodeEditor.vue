<template>
  <div class="code-editor" ref="editor"></div>
</template>

<script>
import * as monaco from "monaco-editor";

export default {
  name: "CodeEditor",
  components: {},
  data() {
    return {
      // 主要配置
      defaultOpts: {
        value: "", // 编辑器的值
        theme: "vs-dark", // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
        autoIndent: true, // 自动缩进
        language: "javascript"
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 初始化container的内容，销毁之前生成的编辑器
      this.$refs.editor.innerHTML = "";

      this.editorOptions = Object.assign(this.defaultOpts);
      // 生成编辑器对象
      this.monacoEditor = monaco.editor.create(this.$refs.editor, this.editorOptions);
      // 编辑器内容发生改变时触发
      this.monacoEditor.onDidChangeModelContent(() => {
        this.$emit("change", this.monacoEditor.getValue());
      });
    },
    // 供父组件调用手动获取值
    getVal() {
      return this.monacoEditor.getValue();
    }
  }
};
</script>
<style lang="less" scoped>
.code-editor {
  width: 100%;
  height: 1000px;
  border: 1px solid;
}
</style>
