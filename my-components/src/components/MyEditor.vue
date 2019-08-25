<template>
  <div>
    <span
      style="disply:inline-block; width:50px;height:30px;font-size:24px;"
      @click="changeEnable"
    >切换编辑状态</span>
    <p>长度:{{quillLength-1}}</p>

    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
  </div>
</template>
<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      name: 'my-editor',
      content: '',
      enable: true,
      quillLength: 0,
      editorOption: {
        // , { 'header': [4, 5, 6, false] }
        modules: {
          toolbar: [
            ['bold', 'italic', { 'size': ['small', false, 'large'] }],        // toggled buttons
          ]
        }
      }
    }
  },
  components: {
    quillEditor
  },
  methods: {
    changeEnable () {
      this.enable = !this.enable
      this.$refs.myQuillEditor.quill.enable(this.enable);
    },
    onEditorReady (editor) { // 准备编辑器

    },
    onEditorBlur () { }, // 失去焦点事件
    onEditorFocus () { }, // 获得焦点事件
    onEditorChange () {
      // 获取长度
      // console.log(this.$refs.myQuillEditor.quill.getLength())
      // this.quillLength = this.$refs.myQuillEditor.quill.getLength();
      if (this.quillLength > 10) {
        // this.fullContent = this.$refs.myQuillEditor.quill.getContents()
        // this.$refs.myQuillEditor.quill.setContents(this.fullContent)
        // 用删除的方式来解决
        this.$refs.myQuillEditor.quill.deleteText(10, 1, this.$refs.myQuillEditor.quill.getContents());//保留 strValue 的 前 decimalNum 位字符，
      }
      this.quillLength = this.$refs.myQuillEditor.quill.getLength();
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill;
    }
  }
}
</script>

<style  scoped>
.quill-editor {
  width: 100%;
  height: 200px;
  position: relative;
  border: 1px solid #ededed;
}
/* 工具栏 */
/deep/ .ql-toolbar {
  width: 100%;
  height: 50px;
  float: left;
  position: absolute;
  bottom: 0;
}
/deep/ .ql-formats {
  width: 100%;
  vertical-align: top;
}
/deep/ .ql-picker-options {
  top: -400%;
}
/* 输入区域 */
/deep/ .ql-container {
  height: calc(100% - 0.5rem);
}
</style>