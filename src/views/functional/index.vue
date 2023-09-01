<script setup lang="ts">
import { computed, reactive } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import { ElMessageBox, ElLoading, UploadFile } from "element-plus";
import { formFunction } from "@/api/function";
import { message } from "@/utils/message";

enum FileUploadEnum {
  input = "input",
  operation = "operation",
  standard = "standard",
  valve_characteristic = "valve_characteristic",
  cv = "cv"
}

defineOptions({
  name: "Functional"
});

interface UplaodForm {
  name: string;
  input: UploadFile;
  operation: UploadFile;
  standard: UploadFile;
  valve_characteristic: UploadFile;
  cv: UploadFile;
}

const form: UplaodForm = reactive({
  name: "输出.xlsx",
  input: undefined,
  operation: undefined,
  standard: undefined,
  valve_characteristic: undefined,
  cv: undefined
});

const isFormValid = computed(() => {
  for (const key in form) {
    if (form[key] === undefined) {
      return false;
    }
  }
  return true;
});

function handleExceed(files, fileList) {
  ElMessageBox.confirm(`当前已选择一个文件, 确定要替换吗？`, "提示", {
    confirmButtonText: "确定",
    type: "warning",
    callback: action => {
      if (action === "confirm") {
        fileList.splice(0, fileList.length, files[0]);
      }
    }
  });
}

function handleChange(file, file_upload: FileUploadEnum) {
  form[file_upload] = file;
}

function handleRemove(file_upload: FileUploadEnum) {
  form[file_upload] = undefined;
}

function submitUpload() {
  const formData = new FormData();
  const loading = ElLoading.service({
    lock: true,
    text: "正在上传文件...",
    background: "rgba(0, 0, 0, 0.7)"
  });
  formData.append("name", form.name);
  formData.append("input", form.input.raw, form.input.name);
  formData.append("operation", form.operation.raw, form.operation.name);
  formData.append("standard", form.standard.raw, form.standard.name);
  formData.append(
    "valve_characteristic",
    form.valve_characteristic.raw,
    form.valve_characteristic.name
  );
  formData.append("cv", form.cv.raw, form.cv.name);
  formFunction(formData, form.name)
    .then(() => {
      message("上传成功", { type: "success" });
    })
    .catch(error => {
      message(`上传失败 ${error}`, { type: "error" });
    })
    .finally(() => {
      loading.close();
    });
}
</script>

<template>
  <el-form :model="form" label-width="200px">
    <el-form-item label="输入输出文件名">
      <el-input class="input-style" v-model="form.name" />
    </el-form-item>
    <el-form-item label="选择引入模版文件">
      <el-upload
        class="upload-style"
        accept=".xlsx,.xls"
        drag
        :limit="1"
        :on-exceed="handleExceed"
        :on-change="file => handleChange(file, FileUploadEnum.input)"
        :on-remove="() => handleRemove(FileUploadEnum.input)"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :auto-upload="false"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-form-item>
    <el-form-item label="选择操作力计算数据表文件">
      <el-upload
        class="upload-style"
        drag
        accept=".xlsx,.xls"
        :limit="1"
        :on-exceed="handleExceed"
        :on-change="file => handleChange(file, FileUploadEnum.operation)"
        :on-remove="() => handleRemove(FileUploadEnum.operation)"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :auto-upload="false"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-form-item>
    <el-form-item label="选择标准格式文件">
      <el-upload
        class="upload-style"
        accept=".xlsx,.xls"
        drag
        :limit="1"
        :on-exceed="handleExceed"
        :on-change="file => handleChange(file, FileUploadEnum.standard)"
        :on-remove="() => handleRemove(FileUploadEnum.standard)"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :auto-upload="false"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-form-item>
    <el-form-item label="选择阀门特征系数">
      <el-upload
        class="upload-style"
        accept=".xlsx,.xls"
        drag
        :limit="1"
        :on-exceed="handleExceed"
        :on-change="
          file => handleChange(file, FileUploadEnum.valve_characteristic)
        "
        :on-remove="() => handleRemove(FileUploadEnum.valve_characteristic)"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :auto-upload="false"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-form-item>
    <el-form-item label="选择cv表">
      <el-upload
        class="upload-style"
        drag
        accept=".xlsx,.xls"
        :limit="1"
        :on-exceed="handleExceed"
        :on-change="file => handleChange(file, FileUploadEnum.cv)"
        :on-remove="() => handleRemove(FileUploadEnum.cv)"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :auto-upload="false"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitUpload" :disabled="!isFormValid"
        >Submit</el-button
      >
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.upload-style {
  display: inline-block;
  width: 100%;
}
</style>
