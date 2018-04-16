/*
 * 封装el-upload，上传自动补充占位，含图片压缩
 * @Author: liangzc 
 * @Date: 2018-04-13 17:50:42 
 * @Last Modified by: liangzc
 * @Last Modified time: 2018-04-13 17:53:24
 */
<template>
  <div class="uploader-scss">
    <label v-if="title"
      class="el-form-item__label">{{ title }}</label>
    <el-upload ref="upload"
      :action="action"
      :data="data"
      :headers="headers"
      :accept="accept"
      :multiple="multiple"
      :list-type="listType"
      :file-list="fileList"
      :auto-upload="autoUpload"
      :before-upload="beforeUpload"
      :on-change="fileChange"
      :on-remove="fileRemove"
      :on-preview="onPreview || (isChooseImage ? filePreview : null)"
      :on-success="fileSuccess"
      :on-error="fileError"
      :show-file-list="limit !== 1 || (limit === 1 && !isChooseImage)"
      :http-request="isChooseImage ? httpRequest : null">
      <div v-if="limit === 1 && isChooseImage && files.length > 0"
        slot="tip"
        @mouseenter="mouseEnter"
        @mouseleave="mouseLeave"
        :class="['hover-area', title ? 'top-37' : '']">
        <img :src="files[0].url"
          class="avatar">
        <span v-show="actionShow"
          class="hover-actions">
          <i v-if="isChooseImage"
            class="el-icon-view mr-10"
            @click="filePreview(files[0])" />
          <i class="el-icon-delete2"
            @click="fileRemove(files[0], [])" />
        </span>
      </div>
      <i v-else-if="showPlus"
        class="el-icon-plus" />
      <div v-if="$slots.length === 0 || $utils.isEmptyObject(this.$slots)"
        slot="tip"
        :class="uploadTipClass">
        {{ textTips }}
        <el-button v-if="!autoUpload && !hideSubmit"
          size="small"
          type="primary"
          @click="submit">点击上传</el-button>
      </div>
      <slot/>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible"
      size="tiny">
      <span v-if="previewFile">
        {{ previewFile.name }} &nbsp;&nbsp;&nbsp;&nbsp; {{ previewTips }}
      </span>
      <img v-if="previewFile"
        width="100%"
        :src="previewFile.url"
        alt="">
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'uploader',
  props: {
    /**
     * 上传地址
     */
    action: {
      type: String,
      default: ''
    },
    /**
     * 设置上传的请求头部
     */
    headers: {
      type: Object
    },
    /**
     * 上传时附带的额外参数
     */
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    /**
     * 上传提示语
     */
    tips: {
      type: String
    },
    /**
     * 允许上传个数
     */
    limit: {
      type: Number,
      default: 50
    },
    /**
     * 上传base64对应的键名
     */
    fileKey: {
      type: String,
      default: 'file'
    },
    /**
     * 图片文件大小限制，默认2M，单位 kb
     */
    fileSize: {
      type: Number,
      default: 1024 * 2
    },
    /**
     * 标题文字
     */
    title: {
      type: String
    },
    /**
     * 列表类型
     */
    listType: {
      type: String,
      default: 'picture-card'
    },
    /**
     * 接受上传的文件类型
     */
    accept: {
      type: String,
      default: 'image/*;'
    },
    /**
     * 文件列表
     */
    fileList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    /**
     * 是否自动上传
     */
    autoUpload: {
      type: Boolean,
      default: false
    },
    /**
     * 是否支持多选
     */
    multiple: {
      type: Boolean,
      default: false
    },
    /**
     * 是否隐藏提交按钮
     */
    hideSubmit: {
      type: Boolean,
      default: false
    },
    /**
     * 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
     */
    onChange: {
      type: Function
    },
    /**
     * 文件列表移除文件时的钩子
     */
    onRemove: {
      type: Function
    },
    /**
     * 点击已上传的文件链接时的钩子, 可以通过 file.response 拿到服务端返回数据
     */
    onPreview: {
      type: Function
    },
    /**
     * 文件上传成功时的钩子
     */
    onSuccess: {
      type: Function
    },
    /**
     * 文件上传失败时的钩子
     */
    onError: {
      type: Function
    },
    /**
     * 文件选择回调，传入此函数时，仅作为选择控件
     */
    onChoose: {
      type: Function
    },
    /**
     * 是否自动动处理错误
     */
    error: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      files: [],
      compressFile: null,
      previewFile: null,
      actionShow: false,
      dialogVisible: false
    };
  },
  created() {
    if (!window.lrz) {
      require('lrz/dist/lrz.all.bundle');
    }
  },
  watch: {
    fileList(val) {
      this.files = val;
    }
  },
  computed: {
    showPlus() {
      return (
        (this.$slots.length === 0 || this.$utils.isEmptyObject(this.$slots)) &&
        this.files.length < this.limit
      );
    },
    uploadTipClass() {
      return [
        'el-upload__tip',
        this.listType !== 'picture-card' ? 'text-style' : ''
      ];
    },
    limitSize() {
      return (this.fileSize / 1024).toFixed(1);
    },
    isChooseImage() {
      return this.accept && this.accept.indexOf('image/') !== -1;
    },
    textTips() {
      return this.tips ?
        this.tips :
        this.isChooseImage ?
          `只能上传jpg/png文件，且不超过 ${this.limitSize} MB` :
          '';
    },
    sizeText() {
      let size = (
        (this.compressFile ?
          this.compressFile.fileLen :
          this.previewFile.size) / 1024
      ).toFixed(2);
      return size && !isNaN(size) ? size + 'KB' : '';
    },
    previewTips() {
      return `${this.compressFile ? 'compress：' : ''}${this.sizeText}`;
    }
  },
  methods: {
    /**
     * 上传前判断
     */
    beforeUpload(file) {
      const isJPG = /image.(png|PNG|jpg|JPG|jpeg|JPEG)/.test(file.type);
      const isLt2M = file.size / 1024 < this.fileSize;

      if (this.isChooseImage && !isJPG) {
        this.$message.error('上传文件只能是 JPG、JPEG、PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error(
          '上传文件大小不能超过 {0}MB!'.format(this.limitSize)
        );
      }
      return this.isChooseImage ? isJPG && isLt2M : isLt2M;
    },
    /**
     * 状态改变监听
     */
    fileChange(file, fileList) {
      this.files = this.limit === 1 ? [file] : fileList;
      if (!this.onChoose) {
        this.onChange && this.onChange(file, fileList, this.data);
        return;
      }
      if (fileList.length === 0) this.onChoose(file, fileList, this.data);
      this.isChooseImage ?
        this.compress(file.raw).then(rst => {
          file.base64 = rst.base64;
          this.onChoose(file, fileList, this.data);
        }) :
        this.onChoose(file, fileList, this.data);
    },
    /**
     * 文件移除监听
     */
    fileRemove(file, fileList) {
      this.files = this.limit === 1 ? [] : fileList;
      this.previewFile = this.previewFile === file ? null : this.previewFile;
      this.onRemove && this.onRemove(file, fileList, this.data);
    },
    /**
     * 预览
     */
    filePreview(file) {
      this.previewFile = file;
      this.dialogVisible = true;
    },
    /**
     * 文件上传成功
     */
    fileSuccess(res, file, fileList) {
      this.files = this.limit === 1 ? [file] : fileList;
      this.onSuccess && this.onSuccess(res, file, fileList, this.data);
    },
    /**
     * 文件上传失败
     */
    fileError(err, file, fileList) {
      this.files = this.limit === 1 ? [] : fileList;
      this.onError && this.onError(err, file, fileList, this.data);
    },
    /**
     * 鼠标放上去时，显示预览及删除按钮
     */
    mouseEnter() {
      this.actionShow = true;
    },
    /**
     * 鼠标离开时隐藏
     */
    mouseLeave() {
      this.actionShow = false;
    },
    /**
     * 自定义上传逻辑
     */
    httpRequest(options) {
      return new Promise((resolve, reject) => {
        if (this.$utils.isEmpty(options.action)) {
          this.error && this.$message.warning('上传地址不能为空');
          reject({ message: '上传地址不能为空' });
          return;
        }
        this.compress(options.file).then(rst => {
          this.data[this.fileKey] = [rst.base64];
          this.axios({
            url: options.action,
            headers: options.headers,
            withCredentials: options.withCredentials,
            silence: true,
            data: this.data,
            onUploadProgress: e => {
              if (e.total > 0) {
                e.percent = e.loaded / e.total * 100;
              }
              options.onProgress(e);
            }
          })
            .then(resp => {
              resolve(resp);
            })
            .catch(err => {
              reject(err);
            });
        });
      });
    },
    /**
     * 压缩图片
     */
    compress(file) {
      return new Promise((resolve, reject) => {
        if (window.lrz) {
          lrz(file, { width: 1024 })
            .then(rst => {
              let fileType =
                file.type ||
                ((rst.base64 || '').split(';')[0] || '').split(':')[1];
              if (!/image.(png|PNG|jpg|JPG|jpeg|JPEG)/.test(fileType)) {
                this.error &&
                  this.$message.warning('不支持的文件类型：' + fileType);
                reject({ message: '不支持的文件类型：' + fileType });
                return;
              }
              this.compressFile = {
                name: file.name,
                url: file.url,
                size: file.size,
                raw: file.raw,
                fileLen: rst.fileLen
              };
              rst.formData.append('fileType', (fileType || '').split('/')[1]);
              console.log(
                '压缩前：',
                (rst.origin.size / 1024).toFixed(2),
                'KB'
              );
              console.log('压缩后：', (rst.fileLen / 1024).toFixed(2), 'KB');
              return rst;
            })
            .then(rst => {
              resolve(rst);
            })
            .catch(err => {
              console.error(err);
              this.error && this.$message.error('压缩图片失败');
              reject(err);
            });
        } else {
          this.error && this.$message.warning('缺少图片压缩组件');
          reject({ message: '缺少图片压缩组件' });
        }
      });
    },
    submit() {
      this.$refs.upload.submit();
    }
  }
};
</script>
<style lang="scss">
.uploader-scss {
  .el-upload--text,
  .avatar {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    cursor: pointer;
    line-height: 146px;
    vertical-align: top;
    text-align: center;
    i {
      font-size: 28px;
      color: #8c939d;
    }
  }

  .el-upload__tip.text-style {
    width: 148px;
    line-height: 20px;
  }
  .hover-area {
    position: absolute;
    left: 0;
    top: 0;
    .hover-actions {
      position: absolute;
      width: 148px;
      height: 148px;
      left: 0;
      top: 0;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        top: 35%;
        position: relative;
      }
    }
  }
  .hover-area.top-37 {
    top: 37px;
  }
  .el-dialog__body {
    padding: 0 20px 30px 20px;
  }
}
</style>



