// 用户认证和角色管理服务

// 用户角色常量
export const USER_ROLES = {
  USER: 'user',
  REPORTER: 'reporter'
};

// 获取当前用户
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

// 设置当前用户
export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

// 清除当前用户
export const clearCurrentUser = () => {
  localStorage.removeItem('currentUser');
};

// 检查用户是否已登录
export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

// 检查用户是否具有特定角色
export const hasRole = (role) => {
  const user = getCurrentUser();
  return user && user.role === role;
};

// 模拟用户登录（选择角色）
export const loginAsRole = (role) => {
  const user = {
    id: Date.now().toString(),
    name: role === USER_ROLES.USER ? '普通用户' : '新闻发布者',
    role: role
  };
  setCurrentUser(user);
  return user;
};

// 模拟生成随机用户名
export const generateRandomUsername = (role) => {
  const adjectives = ['快乐的', '聪明的', '勇敢的', '友善的', '诚实的', '耐心的'];
  const nouns = role === USER_ROLES.USER ? 
    ['读者', '用户', '市民', '观察者', '参与者'] : 
    ['记者', '编辑', '作者', '通讯员', '发布者'];
  
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 1000);
  
  return `${adj}${noun}${num}`;
};