<template>
  <div class="news-list-container">
    <div class="controls">
      <div class="page-size-control">
        <h3>每页显示数量:</h3>
        <select v-model="pageSize" @change="handlePageSizeChange">
          <option value="6">6 / page</option>
          <option value="10">10 / page</option>
          <option value="0">All</option>
        </select>
      </div>
      
      <div class="filter-control">
        <h3>Filter:</h3>
        <select v-model="filter" @change="handleFilterChange">
          <option value="all">All news</option>
          <option value="fake">fake news</option>
          <option value="non-fake">non-fake news</option>
        </select>
      </div>
    </div>
    
    <div class="news-cards">
      <div 
        v-for="item in paginatedNews" 
        :key="item.id" 
        class="news-card"
        :class="{ 'own-news': isOwnNews(item.reporter) }"
        @click="selectNews(item.id)"
      >
        <div class="card-header">
          <h2>{{ item.topic }}</h2>
          <span v-if="isOwnNews(item.reporter)" class="own-badge">我发布的</span>
        </div>
        <p class="short-detail">{{ item.shortDetail }}</p>
        <p class="status">Status: <span :class="item.status">{{ item.status === 'fake' ? 'Fake' : 'Not Fake' }}</span></p>
        <p class="reporter">Reporter: {{ item.reporter }}</p>
        <p class="date">{{ formatDate(item.date) }}</p>
        <button class="details-btn">查看详情</button>
      </div>
    </div>
    
    <div class="pagination" v-if="showPagination">
      <button 
        v-for="page in totalPages" 
        :key="page"
        :class="{ active: currentPage === page }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getCurrentUser, USER_ROLES } from '../services/authService';

const props = defineProps({
  news: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['select-news']);

// 获取当前用户信息
const currentUser = ref(null);

onMounted(() => {
  currentUser.value = getCurrentUser();
});

// 检查是否是当前用户发布的新闻
const isOwnNews = (reporterName) => {
  return currentUser.value && 
         currentUser.value.role === USER_ROLES.REPORTER && 
         currentUser.value.name === reporterName;
};

const pageSize = ref(6);
const currentPage = ref(1);
const filter = ref('all');

// 根据过滤条件过滤新闻
const filteredNews = computed(() => {
  if (filter.value === 'all') {
    return props.news;
  }
  return props.news.filter(item => item.status === filter.value);
});

// 计算总页数
const totalPages = computed(() => {
  if (pageSize.value === 0) return 1;
  return Math.ceil(filteredNews.value.length / pageSize.value);
});

// 是否显示分页
const showPagination = computed(() => {
  return pageSize.value !== 0 && totalPages.value > 1;
});

// 计算当前页显示的新闻
const paginatedNews = computed(() => {
  if (pageSize.value === 0) {
    return filteredNews.value;
  }
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredNews.value.slice(start, end);
});

// 处理页码大小变化
const handlePageSizeChange = () => {
  currentPage.value = 1;
};

// 处理过滤条件变化
const handleFilterChange = () => {
  currentPage.value = 1;
};

// 跳转到指定页
const goToPage = (page) => {
  currentPage.value = page;
};

// 选择新闻
const selectNews = (id) => {
  emit('select-news', id);
};

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>

<style scoped>
.news-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.page-size-control, .filter-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

h3 {
  margin: 0;
  font-size: 16px;
}

select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
}

.news-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.news-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  background-color: white;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.news-card h2 {
  margin: 0;
  color: #333;
  font-size: 18px;
  flex: 1;
  padding-right: 10px;
}

.own-badge {
  background-color: var(--success-color);
  color: white;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  white-space: nowrap;
}

.news-card.own-news {
  border-left: 4px solid var(--success-color);
}

.short-detail {
  color: #666;
  margin-bottom: 15px;
}

.status {
  font-weight: bold;
}

.status .fake {
  color: #e74c3c;
}

.status .non-fake {
  color: #2ecc71;
}

.reporter, .date {
  color: #777;
  font-size: 14px;
}

.details-btn {
  margin-top: 15px;
  padding: 8px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.details-btn:hover {
  background-color: #2980b9;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination button {
  padding: 8px 15px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.pagination button:hover {
  background-color: #f5f5f5;
}

.pagination button.active {
  background-color: #3498db;
  color: white;
  border-color: #3498db;
}
</style>