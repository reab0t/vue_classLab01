# 社交反假新闻系统 - 用户案例
# Social Anti-Fake News System - User Cases

## 1. 系统概述
## 1. System Overview

本系统是一个社交反假新闻平台，允许用户查看、发布、投票和评论新闻，通过集体智慧判断新闻的真实性。
This system is a social anti-fake news platform that allows users to view, publish, vote on, and comment on news, determining the authenticity of news through collective intelligence.

系统支持两种用户角色：普通用户和新闻发布者。
The system supports two user roles: ordinary users and news publishers.

## 2. 用户角色
## 2. User Roles

### 2.1 普通用户
### 2.1 Ordinary Users
- 查看新闻列表
- View news list
- 筛选新闻（全部/假新闻/非假新闻）
- Filter news (all/fake news/non-fake news)
- 查看新闻详情
- View news details
- 对新闻进行真假投票
- Vote on whether news is fake or not
- 发表评论
- Post comments

### 2.2 新闻发布者 
### 2.2 News Publishers
- 拥有普通用户的所有权限
- Have all permissions of ordinary users
- 发布新的新闻内容
- Publish new news content
- 查看自己发布的新闻
- View news published by themselves

## 3. 详细用户案例
## 3. Detailed User Cases

### 3.1 用户角色选择（所有用户）
### 3.1 User Role Selection (All Users)

**前置条件**：用户首次访问系统
**Preconditions**: User visits the system for the first time

**流程**：
**Process**:
1. 用户访问系统首页
1. User visits the system homepage
2. 系统显示角色选择界面
2. System displays role selection interface
3. 用户选择「普通用户」或「新闻发布者」角色
3. User selects "Ordinary User" or "News Publisher" role
4. 系统随机分配用户名并保存用户角色信息
4. System randomly assigns a username and saves user role information
5. 用户进入系统主界面
5. User enters the main interface of the system

**异常情况**：
**Exception Cases**:
- 用户刷新页面：系统保持用户之前选择的角色和用户名
- User refreshes the page: System maintains the user's previously selected role and username

### 3.2 查看新闻列表（普通用户/新闻发布者）
### 3.2 Viewing News List (Ordinary Users/News Publishers)

**前置条件**：用户已选择角色并登录系统
**Preconditions**: User has selected a role and logged into the system

**流程**：
**Process**:
1. 用户进入系统主界面，默认显示所有新闻列表
1. User enters the main interface, which displays all news list by default
2. 新闻以卡片形式展示，包含标题、简短描述、发布者、日期和状态
2. News is displayed in card form, including title, brief description, publisher, date, and status
3. 对于新闻发布者，其发布的新闻会显示「我发布的」标识
3. For news publishers, their published news will show an "I published" badge
4. 用户可以使用筛选功能筛选新闻（全部/假新闻/非假新闻）
4. User can use filtering function to filter news (all/fake news/non-fake news)
5. 用户可以使用分页控制（每页6条/每页10条/显示全部）
5. User can use pagination control (6 items per page/10 items per page/display all)
6. 用户点击新闻卡片进入详情页
6. User clicks on news card to enter details page

**功能点**：
**Function Points**:
- 筛选功能：通过下拉菜单选择筛选条件
- Filter function: Select filter conditions through drop-down menu
- 分页控制：通过下拉菜单选择每页显示数量
- Pagination control: Select number of items per page through drop-down menu
- 新闻排序：默认按发布时间倒序排列
- News sorting: By default, sorted in reverse chronological order of publication

### 3.3 发布新闻（仅新闻发布者）
### 3.3 Publishing News (News Publishers Only)

**前置条件**：用户已以新闻发布者角色登录系统
**Preconditions**: User has logged into the system as a news publisher

**流程**：
**Process**:
1. 用户在顶部导航栏看到「发布新闻」按钮
1. User sees the "Publish News" button in the top navigation bar
2. 用户点击「发布新闻」按钮，打开新闻发布表单
2. User clicks the "Publish News" button to open the news publishing form
3. 用户填写新闻标题、简短描述、详细内容
3. User fills in news title, brief description, and detailed content
4. 用户可以选择性地添加图片链接
4. User can optionally add image links
5. 用户点击「提交」按钮发布新闻
5. User clicks the "Submit" button to publish news
6. 系统保存新闻并显示在新闻列表顶部
6. System saves the news and displays it at the top of the news list
7. 用户可以选择取消发布操作
7. User can choose to cancel the publishing operation

**数据验证**：
**Data Validation**:
- 标题、简短描述、详细内容为必填项
- Title, brief description, and detailed content are required fields
- 图片链接必须是有效的URL格式
- Image links must be in valid URL format

### 3.4 查看新闻详情（普通用户/新闻发布者）
### 3.4 Viewing News Details (Ordinary Users/News Publishers)

**前置条件**：用户已登录系统
**Preconditions**: User has logged into the system

**流程**：
**Process**:
1. 用户在新闻列表点击任意新闻卡片
1. User clicks on any news card in the news list
2. 系统显示新闻详情页面，包含：
2. System displays the news details page, including:
   - 新闻标题（新闻发布者可看到「我发布的新闻」标识）
   - News title (news publishers can see "I published this news" badge)
   - 发布者信息和发布日期
   - Publisher information and publication date
   - 新闻状态（待定/假新闻/非假新闻）
   - News status (pending/fake news/non-fake news)
   - 新闻完整内容和图片（如有）
   - Complete news content and images (if any)
   - 投票结果统计
   - Vote result statistics
   - 评论列表
   - Comment list
3. 用户可以点击「返回列表」按钮回到新闻列表页
3. User can click the "Back to List" button to return to the news list page

### 3.5 对新闻进行投票（仅普通用户）
### 3.5 Voting on News (Ordinary Users Only)

**前置条件**：
**Preconditions**:
- 用户以普通用户角色登录系统
- User has logged into the system as an ordinary user
- 用户正在查看新闻详情页
- User is viewing the news details page

**流程**：
**Process**:
1. 用户在新闻详情页找到投票区域
1. User finds the voting area on the news details page
2. 用户选择「假新闻」或「不是假新闻」选项
2. User selects "Fake News" or "Not Fake News" option
3. 用户可以添加投票理由（可选）
3. User can add voting reasons (optional)
4. 用户可以添加证据图片链接（可选）
4. User can add evidence image links (optional)
5. 用户点击「提交投票」按钮
5. User clicks the "Submit Vote" button
6. 系统记录投票并更新投票统计
6. System records the vote and updates vote statistics
7. 当总投票数达到5票时，系统自动根据多数投票更新新闻状态
7. When the total number of votes reaches 5, the system automatically updates the news status based on the majority vote
8. 投票同时生成一条评论，显示在评论列表中
8. The vote also generates a comment, which is displayed in the comment list

**限制**：
**Limitations**:
- 新闻发布者不能对自己发布的新闻进行投票
- News publishers cannot vote on news they published themselves
- 系统会显示提示信息："作为新闻发布者，您无法对自己的新闻进行投票，但可以查看其他用户的评价"
- System will display a message: "As a news publisher, you cannot vote on your own news, but you can view other users' evaluations"

### 3.6 发表评论（普通用户/新闻发布者）
### 3.6 Posting Comments (Ordinary Users/News Publishers)

**前置条件**：用户已登录系统并正在查看新闻详情页
**Preconditions**: User has logged into the system and is viewing the news details page

**流程**：
**Process**:
1. 用户在新闻详情页评论区域找到评论输入框
1. User finds the comment input box in the comment area of the news details page
2. 用户输入评论内容
2. User enters comment content
3. 用户点击「提交评论」按钮
3. User clicks the "Submit Comment" button
4. 系统保存评论并显示在评论列表中
4. System saves the comment and displays it in the comment list
5. 评论显示用户名和评论时间
5. Comments show username and comment time

**评论功能**：
**Comment Features**:
- 评论支持分页显示（默认每页5条）
- Comments support pagination display (5 items per page by default)
- 用户可以切换评论页码查看更多评论
- User can switch comment pages to view more comments

### 3.7 退出登录（所有用户）
### 3.7 Logging Out (All Users)

**前置条件**：用户已登录系统
**Preconditions**: User has logged into the system

**流程**：
**Process**:
1. 用户在顶部导航栏看到自己的用户名和「退出登录」按钮
1. User sees their username and "Logout" button in the top navigation bar
2. 用户点击「退出登录」按钮
2. User clicks the "Logout" button
3. 系统清除用户登录信息
3. System clears user login information
4. 用户返回角色选择界面
4. User returns to the role selection interface

## 4. 数据存储说明
## 4. Data Storage Description

系统使用浏览器本地存储（localStorage）保存数据：
The system uses browser local storage (localStorage) to save data:
- 用户信息：保存用户角色和用户名
- User information: Save user role and username
- 新闻数据：保存所有新闻的完整信息
- News data: Save complete information of all news
- 评论数据：按新闻ID分别保存评论列表
- Comment data: Save comment lists separately by news ID

## 5. 响应式设计
## 5. Responsive Design

系统支持在不同设备上的良好体验：
The system supports good experience on different devices:
- 桌面端：多列网格布局，完整功能展示
- Desktop: Multi-column grid layout, complete function display
- 平板/手机端：单列布局，优化触控交互
- Tablet/Phone: Single-column layout, optimized touch interaction

## 6. 用户体验优化
## 6. User Experience Optimization

- 状态提示：操作成功或失败时显示适当的提示信息
- Status tips: Display appropriate prompt messages when operations succeed or fail
- 加载状态：数据加载过程中显示加载状态
- Loading status: Display loading status during data loading
- 表单验证：输入数据不符合要求时提供即时反馈
- Form validation: Provide immediate feedback when input data does not meet requirements
- 视觉反馈：按钮点击、状态变化等提供视觉反馈
- Visual feedback: Provide visual feedback for button clicks, status changes, etc.