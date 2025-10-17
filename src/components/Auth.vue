<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>选择您的角色</h2>
      <p class="auth-description">请选择您在系统中的角色以继续</p>
      
      <div class="role-options">
        <button 
          class="role-button user-role" 
          @click="selectRole('user')"
        >
          <span class="role-icon">👁️</span>
          <span class="role-title">普通用户</span>
          <span class="role-desc">查看新闻、投票和评论</span>
        </button>
        
        <button 
          class="role-button reporter-role" 
          @click="selectRole('reporter')"
        >
          <span class="role-icon">📝</span>
          <span class="role-title">新闻发布者</span>
          <span class="role-desc">发布新闻和查看反馈</span>
        </button>
      </div>
      
      <button class="logout-button" @click="logout" v-if="isLoggedIn">
        退出登录
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { 
  loginAsRole, 
  USER_ROLES, 
  clearCurrentUser, 
  isAuthenticated 
} from '../services/authService';

const emit = defineEmits(['login', 'logout']);

const isLoggedIn = computed(() => isAuthenticated());

// 选择角色
const selectRole = (role) => {
  const userRole = role === 'user' ? USER_ROLES.USER : USER_ROLES.REPORTER;
  const user = loginAsRole(userRole);
  emit('login', user);
};

// 退出登录
const logout = () => {
  clearCurrentUser();
  emit('logout');
};

// 组件挂载时检查登录状态
onMounted(() => {
  const currentUser = isAuthenticated();
  if (currentUser) {
    // 可以在这里触发登录事件
  }
});
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 20px;
}

.auth-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 100%;
  max-width: 500px;
  text-align: center;
}

h2 {
  color: var(--primary-color);
  margin-bottom: 10px;
}

.auth-description {
  color: var(--light-text);
  margin-bottom: 30px;
}

.role-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.role-button {
  display: flex;
  align-items: center;
  padding: 20px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.role-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.user-role:hover {
  border-color: var(--secondary-color);
}

.reporter-role:hover {
  border-color: var(--success-color);
}

.role-icon {
  font-size: 2rem;
  margin-right: 20px;
  min-width: 40px;
}

.role-title {
  font-weight: bold;
  font-size: 1.1rem;
  flex: 1;
}

.role-desc {
  font-size: 0.9rem;
  color: var(--light-text);
}

.logout-button {
  margin-top: 30px;
  padding: 10px 20px;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background-color: #c0392b;
}
</style>