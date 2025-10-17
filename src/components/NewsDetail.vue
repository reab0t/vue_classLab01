<template>
  <div class="news-detail-container" v-if="news">
    <button class="back-btn" @click="goBack">返回列表</button>
    
    <div class="news-content">
      <div class="title-container">
        <h1>{{ news.topic }}</h1>
        <span v-if="isNewsReporter" class="reporter-badge">我发布的新闻</span>
      </div>
      
      <div class="meta-info">
        <p>Reporter: {{ news.reporter }}</p>
        <p>Date: {{ formatDate(news.date) }}</p>
        <p class="status">Status: <span :class="news.status">{{ news.status === 'fake' ? 'Fake' : 'Not Fake' }}</span></p>
      </div>
      
      <div class="full-detail">
        <p>{{ news.fullDetail }}</p>
        <img v-if="news.imageUrl" :src="news.imageUrl" :alt="news.topic" class="news-image" />
      </div>
      
      <div class="voting-section">
        <h2>投票结果</h2>
        <div class="voting-stats">
          <div class="vote-item fake">
            <span>Fake: {{ voteStats.fake }}</span>
            <div class="vote-bar">
              <div class="vote-progress" :style="{width: getVotesPercentage('fake') + '%'}"></div>
            </div>
          </div>
          <div class="vote-item non-fake">
            <span>Not Fake: {{ voteStats['non-fake'] }}</span>
            <div class="vote-bar">
              <div class="vote-progress" :style="{width: getVotesPercentage('non-fake') + '%'}"></div>
            </div>
          </div>
          <div class="vote-item total">
            <span>总投票数: {{ totalVotes }}</span>
          </div>
        </div>
      </div>
      
      <div class="vote-form" v-if="!isNewsReporter">
        <h2>投您的一票</h2>
        <form @submit.prevent="submitVote">
          <div class="vote-options">
            <label>
              <input type="radio" v-model="voteType" value="fake" />
              假新闻
            </label>
            <label>
              <input type="radio" v-model="voteType" value="non-fake" />
              不是假新闻
            </label>
          </div>
          <textarea v-model="voteComment" placeholder="请添加您的评论或理由..."></textarea>
          <input type="url" v-model="voteImageUrl" placeholder="添加图片链接（可选）" />
          <button type="submit" :disabled="!voteType">提交投票</button>
        </form>
      </div>
      
      <div class="reporter-notice" v-else>
        <p>作为新闻发布者，您无法对自己的新闻进行投票，但可以查看其他用户的评价。</p>
      </div>
      
      <div class="comments-section">
        <h2>评论列表 ({{ comments.length }})</h2>
        
        <div class="comments-controls">
          <div class="page-size-control">
            <h3>每页显示:</h3>
            <select v-model="commentsPageSize" @change="handleCommentsPageSizeChange">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
        
        <div class="comments-list">
          <div v-for="comment in paginatedComments" :key="comment.id" class="comment-item">
            <div class="comment-header">
              <span class="comment-vote" :class="comment.voteType" v-if="comment.voteType">
                {{ comment.voteType === 'fake' ? '假新闻' : '不是假新闻' }}
              </span>
              <span class="comment-user">{{ comment.user || '匿名用户' }}</span>
              <span class="comment-date">{{ formatDate(comment.date) }}</span>
            </div>
            <p class="comment-text">{{ comment.comment }}</p>
            <img v-if="comment.imageUrl" :src="comment.imageUrl" :alt="'Comment image'" class="comment-image" />
          </div>
        </div>
        
        <div class="comments-pagination" v-if="showCommentsPagination">
          <button 
            v-for="page in totalCommentsPages" 
            :key="page"
            :class="{ active: currentCommentsPage === page }"
            @click="goToCommentsPage(page)"
          >
            {{ page }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getCurrentUser, USER_ROLES } from '../services/authService';

const props = defineProps({
  news: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['back']);

// 用户信息
const currentUser = ref(null);

// 投票和评论相关数据
const voteType = ref('');
const voteComment = ref('');
const voteImageUrl = ref('');
const comments = ref([]);

onMounted(() => {
  currentUser.value = getCurrentUser();
  loadComments();
});

// 检查是否是新闻发布者
const isNewsReporter = computed(() => {
  return currentUser.value && 
         currentUser.value.role === USER_ROLES.REPORTER && 
         currentUser.value.name === props.news.reporter;
});

// 加载评论
const loadComments = () => {
  const savedComments = localStorage.getItem(`comments_${props.news.id}`);
  if (savedComments) {
    comments.value = JSON.parse(savedComments);
  } else {
    // 加载模拟评论数据
    comments.value = generateMockComments();
  }
};

// 评论分页相关
const commentsPageSize = ref(5);
const currentCommentsPage = ref(1);

// 已移到loadComments函数中

// 生成模拟评论数据
const generateMockComments = () => {
  const commentUsers = ['小王', '小李', '小张', '小刘', '小陈', '小赵', '小周'];
  const mockComments = [];
  const voteTypes = ['fake', 'non-fake'];
  const commentTexts = [
    '这明显是假新闻，我查证过事实并非如此。',
    '这个新闻有真实依据，我在多个可靠来源看到过类似报道。',
    '内容存在很多逻辑漏洞，可信度不高。',
    '作为业内人士，我可以确认这个消息是准确的。',
    '这种言论没有科学依据，很容易误导大众。',
    '我认为这个新闻是真实的，因为有视频证据支持。',
    '标题党行为，内容与实际情况不符。',
    '经过调查，这个新闻确实发生过，只是有些细节被夸大了。'
  ];
  
  for (let i = 1; i <= 15; i++) {
    mockComments.push({
      id: i,
      voteType: voteTypes[Math.floor(Math.random() * voteTypes.length)],
      comment: commentTexts[Math.floor(Math.random() * commentTexts.length)],
      imageUrl: Math.random() > 0.7 ? 'https://via.placeholder.com/300x200?text=Evidence' : '',
      date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      user: commentUsers[Math.floor(Math.random() * commentUsers.length)]
    });
  }
  
  // 保存模拟评论到本地存储
  localStorage.setItem(`comments_${props.news.id}`, JSON.stringify(mockComments));
  
  return mockComments;
};

// 计算分页相关
const totalCommentsPages = computed(() => {
  return Math.ceil(comments.value.length / commentsPageSize.value);
});

// 投票统计
const voteStats = computed(() => {
  return comments.value
    .filter(c => c.voteType)
    .reduce((acc, comment) => {
      acc[comment.voteType] = (acc[comment.voteType] || 0) + 1;
      return acc;
    }, { fake: 0, 'non-fake': 0 });
});

// 总投票数
const totalVotes = computed(() => {
  return voteStats.value.fake + voteStats.value['non-fake'];
});

// 是否显示评论分页
const showCommentsPagination = computed(() => {
  return totalCommentsPages.value > 1;
});

// 计算当前页显示的评论
const paginatedComments = computed(() => {
  const start = (currentCommentsPage.value - 1) * commentsPageSize.value;
  const end = start + commentsPageSize.value;
  return comments.value.slice(start, end);
});

// 获取指定类型的投票数
const getVotesCount = (type) => {
  return comments.value.filter(comment => comment.voteType === type).length;
};

// 获取指定类型的投票百分比
const getVotesPercentage = (type) => {
  if (comments.value.length === 0) return 50;
  return (getVotesCount(type) / comments.value.length) * 100;
};

// 处理评论页大小变化
const handleCommentsPageSizeChange = () => {
  currentCommentsPage.value = 1;
};

// 跳转到指定评论页
const goToCommentsPage = (page) => {
  currentCommentsPage.value = page;
};

import { updateNewsStatus } from '../services/newsService';

// 提交投票
const submitVote = () => {
  if (!voteType.value || !currentUser.value) return;
  
  const newComment = {
    id: Date.now(),
    voteType: voteType.value,
    comment: voteComment.value,
    imageUrl: voteImageUrl.value,
    date: new Date().toISOString(),
    user: currentUser.value.name
  };
  
  comments.value.unshift(newComment);
  
  // 保存到localStorage
  localStorage.setItem(`comments_${props.news.id}`, JSON.stringify(comments.value));
  
  // 计算投票结果
  updateNewsBasedOnVotes();
  
  // 重置表单
  voteType.value = '';
  voteComment.value = '';
  voteImageUrl.value = '';
  
  // 显示成功消息
  alert('投票成功！');
};

// 根据投票结果更新新闻状态
const updateNewsBasedOnVotes = () => {
  // 统计投票
  const voteStats = comments.value
    .filter(c => c.voteType)
    .reduce((acc, comment) => {
      acc[comment.voteType] = (acc[comment.voteType] || 0) + 1;
      return acc;
    }, { fake: 0, 'non-fake': 0 });
  
  // 当有5票以上时，根据多数投票决定新闻状态
  const totalVotes = voteStats.fake + voteStats['non-fake'];
  if (totalVotes >= 5) {
    const newStatus = voteStats.fake > voteStats['non-fake'] ? 'fake' : 'non-fake';
    updateNewsStatus(props.news.id, newStatus);
    
    // 更新当前新闻对象状态
    props.news.status = newStatus;
  }
};

// 返回列表
const goBack = () => {
  emit('back');
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
.news-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.back-btn {
  margin-bottom: 20px;
  padding: 8px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.back-btn:hover {
  background-color: #2980b9;
}

.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
  gap: 10px;
}

.news-content h1 {
  color: #2c3e50;
  margin: 0;
  flex: 1;
}

.reporter-badge {
  background-color: var(--success-color);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
}

.reporter-notice {
  margin-top: 40px;
  padding: 20px;
  background-color: #fff9c4;
  border-left: 4px solid #ffca28;
  border-radius: 4px;
  color: #ff8f00;
}

.meta-info {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
  color: #7f8c8d;
  font-size: 14px;
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

.full-detail {
  margin-bottom: 30px;
}

.full-detail p {
  line-height: 1.6;
  color: #34495e;
  margin-bottom: 20px;
}

.news-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.voting-section, .vote-form, .comments-section {
  margin-top: 40px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

h2 {
  color: #2c3e50;
  margin-top: 0;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.voting-stats {
  margin-top: 20px;
}

.vote-item {
  margin-bottom: 15px;
}

.vote-item span {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.vote-item.total {
  background-color: #e0f7fa;
  padding: 10px;
  border-radius: 8px;
  color: #006064;
}

.vote-item.fake span {
  color: #e74c3c;
}

.vote-item.non-fake span {
  color: #2ecc71;
}

.vote-bar {
  height: 20px;
  background-color: #ecf0f1;
  border-radius: 10px;
  overflow: hidden;
}

.vote-progress {
  height: 100%;
  transition: width 0.3s ease;
}

.vote-item.fake .vote-progress {
  background-color: #e74c3c;
}

.vote-item.non-fake .vote-progress {
  background-color: #2ecc71;
}

.vote-form form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.vote-options {
  display: flex;
  gap: 20px;
}

.vote-options label {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
}

input[type="url"] {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.vote-form button {
  padding: 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: bold;
}

.vote-form button:hover:not(:disabled) {
  background-color: #c0392b;
}

.vote-form button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.comments-controls {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.page-size-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.page-size-control h3 {
  margin: 0;
  font-size: 14px;
}

.comments-list {
  margin-bottom: 20px;
}

.comment-item {
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
  gap: 10px;
}

.comment-user {
  font-weight: bold;
  color: #2c3e50;
}

.comment-vote {
  padding: 3px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
}

.comment-vote.fake {
  background-color: #ffecec;
  color: #e74c3c;
}

.comment-vote.non-fake {
  background-color: #e8f5e9;
  color: #2ecc71;
}

.comment-date {
  color: #95a5a6;
  font-size: 12px;
}

.comment-text {
  margin: 10px 0;
  line-height: 1.5;
  color: #34495e;
}

.comment-image {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin-top: 10px;
}

.comments-pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.comments-pagination button {
  padding: 8px 15px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.comments-pagination button:hover {
  background-color: #f5f5f5;
}

.comments-pagination button.active {
  background-color: #3498db;
  color: white;
  border-color: #3498db;
}
</style>