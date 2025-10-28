<script setup>
import { ref, onMounted, computed } from 'vue';
import NewsList from './components/NewsList.vue';
import NewsDetail from './components/NewsDetail.vue';
import Auth from './components/Auth.vue';
import NewsForm from './components/NewsForm.vue';
import { getNewsFromStorage, updateNewsInStorage, clearNewsStorage } from './services/newsService';
import { getCurrentUser, USER_ROLES, isAuthenticated } from './services/authService';

// 应用状态
const news = ref([]);
const selectedNews = ref(null);
const showDetail = ref(false);
const showNewsForm = ref(false);
const user = ref(null);

// 计算属性
const isLoggedIn = computed(() => user.value !== null);
const isReporter = computed(() => user.value && user.value.role === USER_ROLES.REPORTER);

// 组件挂载时初始化
onMounted(() => {
  // 清理旧数据，确保所有新闻都有正确的配图
  clearNewsStorage();
  
  // 加载新闻数据
  news.value = getNewsFromStorage();
  
  // 检查用户登录状态
  const currentUser = getCurrentUser();
  if (currentUser) {
    user.value = currentUser;
  }
});

// 处理用户登录
const handleLogin = (loggedInUser) => {
  user.value = loggedInUser;
  showDetail.value = false;
};

// 处理用户登出
const handleLogout = () => {
  user.value = null;
  showDetail.value = false;
  showNewsForm.value = false;
};

// 处理选择新闻事件
const handleSelectNews = (id) => {
  selectedNews.value = news.value.find(item => item.id === id);
  showDetail.value = true;
  showNewsForm.value = false;
};

// 返回新闻列表
const handleBackToList = () => {
  showDetail.value = false;
  selectedNews.value = null;
  showNewsForm.value = false;
};

// 打开发布新闻表单
const openNewsForm = () => {
  showNewsForm.value = true;
  showDetail.value = false;
};

// 处理发布新闻
const handleSubmitNews = (newsData) => {
  const newNews = {
    id: Date.now(),
    ...newsData,
    reporter: user.value.name,
    date: new Date().toISOString(),
    status: 'non-fake' // 默认为非假新闻，由用户投票决定
  };
  
  news.value.unshift(newNews);
  updateNewsInStorage(news.value);
  showNewsForm.value = false;
};
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Fake or Not Fake</h1>
      <p>社交反假新闻系统</p>
      
      <div class="user-info" v-if="isLoggedIn">
        <span class="user-role" :class="user.role">
          {{ user.name }} ({{ user.role === USER_ROLES.REPORTER ? '新闻发布者' : '普通用户' }})
        </span>
        <button class="logout-btn" @click="handleLogout">退出</button>
      </div>
    </header>
    
    <main class="app-main">
      <!-- 未登录时显示角色选择 -->
      <Auth 
        v-if="!isLoggedIn" 
        @login="handleLogin" 
        @logout="handleLogout" 
      />
      
      <!-- 已登录用户界面 -->
      <template v-else>
        <!-- 新闻发布者专属按钮 -->
        <div class="actions-bar" v-if="isReporter && !showNewsForm">
          <button class="publish-btn" @click="openNewsForm">发布新闻</button>
        </div>
        
        <!-- 显示新闻发布表单 -->
        <NewsForm 
          v-if="showNewsForm" 
          @submit="handleSubmitNews" 
          @cancel="showNewsForm = false" 
        />
        
        <!-- 显示新闻列表 -->
        <NewsList 
          v-else-if="!showDetail" 
          :news="news" 
          @select-news="handleSelectNews" 
        />
        
        <!-- 显示新闻详情 -->
        <NewsDetail 
          v-else 
          :news="selectedNews" 
          @back="handleBackToList" 
        />
      </template>
    </main>
    
    <footer class="app-footer">
      <p>&copy; 2025 社交反假新闻系统 - 利用群体智慧识别假新闻</p>
    </footer>
  </div>
  <!-- 性能监控组件 -->
  <script setup>
  import { SpeedInsights } from '@vercel/speed-insights/vue'
  </script>
  <SpeedInsights />
</template>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 10px;
}

.user-role {
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.9rem;
}

.user-role.reporter {
  background-color: #e8f5e9;
  color: var(--success-color);
}

.user-role.user {
  background-color: #ebf5fb;
  color: var(--secondary-color);
}

.logout-btn {
  padding: 5px 10px;
  background-color: transparent;
  color: #95a5a6;
  border: 1px solid #95a5a6;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.logout-btn:hover {
  background-color: #95a5a6;
  color: white;
}

.actions-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.publish-btn {
  padding: 10px 20px;
  background-color: var(--success-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 5px;
}

.publish-btn:hover {
  background-color: #27ae60;
}
</style>

<style>
/* 全局样式重置 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Arial', 'Helvetica', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f0f2f5;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  margin-bottom: 5px;
  font-size: 2.5rem;
}

.app-header p {
  font-size: 1.1rem;
  opacity: 0.9;
}

.app-main {
  flex: 1;
  padding: 20px;
}

.app-footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 15px;
  margin-top: 30px;
}
</style>
