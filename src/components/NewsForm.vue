<template>
  <div class="news-form-container">
    <h2>发布新闻</h2>
    <form @submit.prevent="submitNews">
      <div class="form-group">
        <label for="topic">新闻标题</label>
        <input 
          type="text" 
          id="topic" 
          v-model="newsForm.topic" 
          required 
          placeholder="请输入新闻标题"
        />
      </div>
      
      <div class="form-group">
        <label for="shortDetail">简短描述</label>
        <textarea 
          id="shortDetail" 
          v-model="newsForm.shortDetail" 
          required 
          rows="3" 
          placeholder="请输入简短的新闻描述"
        ></textarea>
      </div>
      
      <div class="form-group">
        <label for="fullDetail">详细内容</label>
        <textarea 
          id="fullDetail" 
          v-model="newsForm.fullDetail" 
          required 
          rows="8" 
          placeholder="请输入新闻的详细内容"
        ></textarea>
      </div>
      
      <div class="form-group">
        <label for="imageUrl">图片链接（可选）</label>
        <input 
          type="url" 
          id="imageUrl" 
          v-model="newsForm.imageUrl" 
          placeholder="请输入图片的URL地址"
        />
      </div>
      
      <div class="form-actions">
        <button type="button" @click="cancel" class="cancel-btn">取消</button>
        <button type="submit" class="submit-btn">发布新闻</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const emit = defineEmits(['submit', 'cancel']);

// 新闻表单数据
const newsForm = reactive({
  topic: '',
  shortDetail: '',
  fullDetail: '',
  imageUrl: ''
});

// 提交新闻
const submitNews = () => {
  emit('submit', { ...newsForm });
  // 重置表单
  resetForm();
};

// 取消发布
const cancel = () => {
  resetForm();
  emit('cancel');
};

// 重置表单
const resetForm = () => {
  newsForm.topic = '';
  newsForm.shortDetail = '';
  newsForm.fullDetail = '';
  newsForm.imageUrl = '';
};
</script>

<style scoped>
.news-form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: var(--primary-color);
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: var(--text-color);
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus, textarea:focus {
  border-color: var(--secondary-color);
  outline: none;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
}

.cancel-btn {
  padding: 10px 20px;
  background-color: #f5f5f5;
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
}

.submit-btn {
  padding: 10px 20px;
  background-color: var(--success-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: #27ae60;
}
</style>