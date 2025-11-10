# Group Name:TV station
    TEAMS:
        JinLei / lynden 20222102
        Zhou WenZe / Unicornt 20222099
    The URL of the deployed website:
https://vue-class-lab01.vercel.app/

# 社交反假新闻系统 (Fake or Not Fake)

一个基于Vue.js开发的社交反假新闻系统，旨在利用群体智慧帮助识别和验证新闻的真实性。

## 项目功能

- **新闻列表展示**：显示所有新闻，包含标题、简短描述、状态、记者和日期
- **新闻过滤**：支持按状态（全部、假新闻、非假新闻）过滤
- **分页功能**：可选择每页显示的新闻数量（6条、10条或全部）
- **新闻详情页**：查看新闻的完整信息，包括图片
- **投票系统**：用户可以投票判断新闻是否为假新闻
- **评论功能**：用户可以添加评论和图片链接来支持自己的判断
- **实时统计**：显示假新闻和非假新闻的投票比例
- **评论分页**：评论列表也支持分页查看

## 技术栈

- **Vue.js 3**：用于构建用户界面的渐进式JavaScript框架
- **Vite**：现代前端构建工具
- **LocalStorage**：用于本地存储用户投票和评论数据

## 项目结构

```
├── public/             # 静态资源文件夹
├── src/                # 源代码文件夹
│   ├── assets/         # 资源文件（CSS、图片等）
│   ├── components/     # Vue组件
│   │   ├── NewsList.vue    # 新闻列表组件
│   │   └── NewsDetail.vue  # 新闻详情组件
│   ├── services/       # 服务层
│   │   └── newsService.js  # 新闻数据服务
│   ├── App.vue         # 应用根组件
│   └── main.js         # 应用入口文件
├── .gitignore          # Git忽略文件
├── index.html          # HTML入口文件
├── package.json        # 项目配置文件
├── vite.config.js      # Vite配置文件
└── README.md           # 项目说明文档
```

## 安装与运行

### 前置要求

- Node.js 20.19.0
- npm

## 数据说明

- 应用使用模拟数据初始化新闻列表
- 用户的投票和评论数据存储在浏览器的LocalStorage中
- 页面刷新后，新闻列表数据保持不变，但用户添加的评论可能会被重置

## 响应式设计

应用支持桌面和移动设备的响应式布局：
- 在桌面设备上，新闻卡片以网格形式展示（多列）
- 在移动设备上，新闻卡片单列垂直排列
- 导航和控制元素会根据屏幕尺寸自适应调整


