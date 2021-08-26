<template>
  <div>
    <div class="code-editor" ref="editor"></div>
    <div class="code-preview">
      <iframe
        src="http://localhost:9998"
        frameborder="0"
        style="width:100%;height:100%"
        ref="iframe"
      ></iframe>
    </div>
    <div class="btn" @click="runBuild">
      编译
    </div>
  </div>
</template>

<script>
import * as monaco from "monaco-editor";
import { Base64 } from "js-base64";

export default {
  name: "CodeEditor",
  components: {},
  data() {
    return {
      // 主要配置
      defaultOpts: {
        value: "", // 编辑器的值
        autoIndent: true, // 自动缩进
        language: "vue",
        theme: "vs-dark",
        automaticLayout: true
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

      this.editorOptions = Object.assign(this.defaultOpts, { value: this.setValue() });
      // 生成编辑器对象
      this.monacoEditor = monaco.editor.create(this.$refs.editor, this.editorOptions);
      // 编辑器内容发生改变时触发
      this.monacoEditor.onDidChangeModelContent(() => {
        this.$emit("change", this.monacoEditor.getValue());
      });
    },
    //编译
    runBuild() {
      // this.axios.post(
      //   "http://localhost:9998/api/runfile",
      //   {
      //     data: JSON.stringify({
      //       fileContent: this.getValue()
      //     })
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json;charset=utf-8"
      //     }
      //   }
      // );
      fetch("http://localhost:9998/api/runfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
          fileContent: this.getValue()
        })
      })
        .then(result => {
          window.console.log(result);
          this.$refs.iframe.contentWindow.postMessage({}, "*");
          // this.$refs.iframe.contentWindow.location.reload();
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    getValue() {
      return this.monacoEditor.getValue();
    },
    setValue() {
      return Base64.decode(
        "PHRlbXBsYXRlPgogIDxkaXYgY2xhc3M9Im1zZyI+CiAgICB7eyBtc2cgfX0KICA8L2Rpdj4KPC90ZW1wbGF0ZT4KCjxzY3JpcHQ+CmV4cG9ydCBkZWZhdWx0IHsKICBuYW1lOiAib25saW5lVmlldyIsCiAgY29tcG9uZW50czoge30sCiAgZGF0YSgpIHsKICAgIHJldHVybiB7CiAgICAgIG1zZzogImhlbGxvIHdvcmxk77yBIgogICAgfTsKICB9LAogIG1ldGhvZHM6IHt9Cn07Cjwvc2NyaXB0Pgo8c3R5bGUgbGFuZz0ibGVzcyI+Ci5tc2cgewogIGZvbnQtc2l6ZTogMjRweDsKfQo8L3N0eWxlPgo="
      );
    }
  }
};
</script>
<style lang="less" scoped>
.code-editor {
  width: 50%;
  height: 500px;
  border: 1px solid;
  float: left;
}
.code-preview {
  width: 49%;
  height: 500px;
  border: 1px solid;
  float: left;
}
.btn {
  cursor: pointer;
  line-height: 40px;
  margin-top: 50px;
  border-radius: 4px;
  float: left;
  width: 80px;
  height: 40px;
  border: 1px solid deeppink;
  background: pink;
  text-align: center;
}
</style>
