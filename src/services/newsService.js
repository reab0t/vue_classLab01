// 新闻数据服务
// 提供模拟数据和数据管理功能

// 生成模拟新闻数据
export const generateMockNews = () => {
  const newsTopics = [
    '科学家发现新型环保材料可以完全降解',
    '研究表明每天喝咖啡可以延长寿命',
    '新的医疗技术可以治愈所有类型的癌症',
    '全球气温创下历史新高，专家警告气候变化加剧',
    '人工智能系统在医学诊断方面超越人类专家',
    '最新研究显示手机辐射对人体健康没有负面影响',
    '经济学家预测明年全球经济将迎来强劲增长',
    '新发现的行星可能存在外星生命',
    '体育明星打破多项世界纪录',
    '政府宣布新的教育改革计划',
    '大型科技公司发布革命性新产品',
    '研究表明每天锻炼15分钟可以显著改善健康',
    '考古学家发现古代文明的神秘遗迹',
    '环保组织警告海洋塑料污染达到危机水平',
    '新的饮食习惯可以逆转糖尿病',
    '太空探索任务取得重大突破',
    '最新调查显示全球幸福感指数下降',
    '研究人员开发出可充电的电动汽车电池，充电时间仅需5分钟',
    '专家预测未来十年将有大量工作岗位被自动化取代',
    '新的研究发现睡眠不足会导致严重的健康问题'
  ];

  const reporters = [
    '张三', '李四', '王五', '赵六', '钱七', 
    '孙八', '周九', '吴十', '郑十一', '王十二'
  ];

  const shortDetails = [
    '这项突破性研究可能会改变我们对环保材料的认识...',
    '新的研究结果显示，适量饮用咖啡有诸多健康益处...',
    '这一重大医学突破为癌症患者带来了新的希望...',
    '数据显示今年全球平均气温比工业化前水平高出1.5度...',
    'AI系统在诊断准确率上首次超过了经验丰富的医生团队...',
    '经过长期研究，科学家得出结论认为手机辐射的影响被夸大了...',
    '多家国际经济机构上调了对明年全球经济增长的预期...',
    '这颗新发现的行星位于宜居带内，具备支持生命的条件...',
    '在昨天的比赛中，这位体育明星创造了多项令人惊叹的成绩...',
    '政府表示新的教育改革计划将重点关注学生的全面发展...'
  ];

  const fullDetails = [
    '在最新的研究中，来自顶尖大学的科学家团队成功开发出一种新型环保材料。这种材料不仅具有传统塑料的耐用性和功能性，而且可以在自然环境中完全降解，不会产生有害物质。研究负责人表示，这项发明可能会对减少塑料污染产生革命性的影响。目前，该团队正在寻求商业合作伙伴，希望在未来几年内将这种材料推向市场。',
    '最新发表在权威医学期刊上的研究表明，每天饮用适量咖啡（约2-3杯）与长寿之间存在正相关关系。研究人员对超过50万人进行了长达10年的跟踪调查，发现适量饮用咖啡的人群死亡率比不饮用咖啡的人群低约15%。不过，研究人员也提醒，过量饮用咖啡可能会带来负面影响，建议人们根据自身情况适量饮用。',
    '在一场新闻发布会上，国际癌症研究中心宣布他们开发出了一种革命性的治疗方法，可以针对所有类型的癌症。这种治疗方法基于最新的基因编辑技术，可以精确识别并消灭癌细胞，同时不会伤害健康细胞。虽然这项技术仍处于临床试验阶段，但初步结果令人鼓舞。医学专家认为，如果后续试验取得成功，这可能是癌症治疗领域的重大突破。',
    '根据世界气象组织发布的最新报告，今年全球平均气温创下历史新高，比工业化前水平高出1.5度。报告显示，极端天气事件的频率和强度都在增加，包括热浪、洪水、干旱和飓风等。气候学家警告，如果不立即采取紧急行动减少温室气体排放，情况将进一步恶化。多个环保组织呼吁各国政府加强气候政策，加快向可再生能源转型。',
    '在一项最新的研究中，研究人员开发的人工智能系统在医学影像诊断方面的表现首次超越了人类专家。该AI系统能够分析X光片、CT扫描和核磁共振成像等医学影像，识别出微小的异常情况。在对数千例病例的测试中，该系统的诊断准确率达到了95%，而人类专家的准确率约为86%。研究人员表示，这一技术可以帮助医生提高诊断效率和准确性，特别是在医疗资源匮乏的地区。'
  ];

  const statuses = ['fake', 'non-fake'];
  const news = [];

  for (let i = 1; i <= 20; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    // 确保图片索引从1到20，对应public目录中的news1.png到news20.png
    const imageIndex = i;
    news.push({
      id: i,
      topic: newsTopics[i - 1],
      shortDetail: shortDetails[Math.floor(Math.random() * shortDetails.length)],
      fullDetail: fullDetails[Math.floor(Math.random() * fullDetails.length)],
      reporter: reporters[Math.floor(Math.random() * reporters.length)],
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: status,
      imageUrl: `/news${imageIndex}.png`,
      votes: { fake: 0, 'non-fake': 0 } // 初始化投票计数
    });
  }

  return news;
};

// 从localStorage获取新闻数据
export const getNewsFromStorage = () => {
  // 清理旧数据，强制重新生成带有正确图片的数据
  const mockNews = generateMockNews();
  localStorage.setItem('news', JSON.stringify(mockNews));
  return mockNews;
};

// 清理localStorage中的新闻数据
export const clearNewsStorage = () => {
  localStorage.removeItem('news');
};

// 更新新闻数据到localStorage
export const updateNewsInStorage = (news) => {
  localStorage.setItem('news', JSON.stringify(news));
};

// 根据ID获取新闻
export const getNewsById = (id) => {
  const news = getNewsFromStorage();
  return news.find(item => item.id === id) || null;
};

// 创建新新闻
export const createNews = (newsData, reporterName) => {
  const news = getNewsFromStorage();
  
  // 生成新ID
  const newId = Math.max(...news.map(item => item.id), 0) + 1;
  
  // 创建新新闻对象
  const newNews = {
    id: newId,
    topic: newsData.topic,
    shortDetail: newsData.shortDetail,
    fullDetail: newsData.fullDetail,
    reporter: reporterName,
    date: new Date().toISOString(),
    status: 'pending', // 新发布的新闻初始状态为pending
    imageUrl: newsData.imageUrl || `/news${(newId % 20) + 1}.png`, // 如果没有提供图片，使用默认图片
    votes: { fake: 0, 'non-fake': 0 }, // 初始化投票计数
    comments: [] // 初始化评论数组
  };
  
  // 添加到新闻列表
  news.unshift(newNews); // 添加到数组开头，让新新闻显示在最前面
  
  // 更新存储
  updateNewsInStorage(news);
  
  return newNews;
};

// 更新新闻状态（基于投票结果）
export const updateNewsStatus = (newsId, newStatus) => {
  const news = getNewsFromStorage();
  const index = news.findIndex(item => item.id === newsId);
  
  if (index !== -1) {
    news[index].status = newStatus;
    updateNewsInStorage(news);
    return true;
  }
  
  return false;
};