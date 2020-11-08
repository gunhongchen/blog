<template>
  <div class="upload">
    <div class="el-upload">
      <input
        :multiple="multiple"
        ref="fileInput"
        type="file"
        name="file"
        @change="fileChange"
      />
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <ul class="filelist">
      <li class="p-20 mb-10" v-for="(item, index) in fileList" :key="item.name">
        <div>
          <img width="60" :src="item.imgUrl" alt="" />
          <p class="ml-20" :class="{ 'color-danger': item.uploadError }">
            {{ item.name }}
          </p>
        </div>
        <i
          class="el-icon-close cursor-pointer size-main color-2"
          @click="remove(index)"
        ></i>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import * as albumHttp from "../http/api/console/album";
import * as qiniu from "qiniu-js";
import { Message } from "element-ui";

@Component({
  components: {},
})
export default class Upload extends Vue {
  @Prop() multiple;
  @Prop() fileList;
  upfileList = this.fileList;
  @Watch("fileList")
  fileListChange() {}
  @Watch("upfileList")
  upfileListChange() {
    this.$emit("update:fileList", this.upfileList);
  }
  fileChange(e) {
    const that = this;
    this.upfileList = Array.from(e.target.files);
    this.upfileList = this.upfileList.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        file.imgUrl = reader.result;
      };
      return file;
    });
    if (!this.checkFile(this.upfileList)) {
      this.upfileList = Array.from([]);
      this.$emit("update:fileList", this.upfileList);
      return;
    }
    albumHttp.albumToken().then((token) => {
      const promises = this.upfileList.map((file, key) => {
        return new Promise((resolve, reject) => {
          qiniu
            .upload(
              file,
              file.name,
              token,
              {
                fname: "",
                params: {},
                mimeType: null,
              },
              {
                useCdnDomain: true,
                disableStatisticsReport: false,
                retryCount: 6,
                region: qiniu.region.z2,
              }
            )
            .subscribe({
              next(res) {},
              error(err) {
                Message.error("图片上传失败");
                that.upfileList[key].uploadError = true;
                reject(err);
              },
              complete(res) {
                that.upfileList.splice(key, 1, res);
                resolve();
              },
            });
        });
      });
      Promise.all(promises).then(
        (res) => {
          this.$emit("update:fileList", this.upfileList);
        },
        (err) => {}
      );
    });
  }
  checkFile(fileList) {
    const isJPG = fileList.every((file) => {
      return file.type.indexOf("image/") >= 0;
    });
    const isLt10M = fileList.every((file) => {
      return file.size / 1024 / 1024 < 10;
    });

    if (!isJPG) {
      this.$message.error("上传图片只能是 JPG 格式!");
    }
    if (!isLt10M) {
      this.$message.error("上传图片大小不能超过 10MB!");
    }
    return isJPG && isLt10M;
  }
  remove(index) {
    this.upfileList.splice(index, 1);
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/styles/public.scss";
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
input {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
}
.filelist {
  li {
    display: flex;
    justify-content: space-between;
    height: 80px;
    border: 1px solid $color-1;
    border-radius: 5px;
    box-shadow: 0 0 5px #ddd;
    div {
      display: flex;
      align-items: center;
    }
    img {
      max-height: 60px;
    }
  }
}
</style>
