import express from 'express';

const router = express.Router();

// 模拟数据
const contentData = [
  {
    id: '1',
    title: '如何使用管理系统',
    content: '<p>这是一篇关于如何使用管理系统的教程文章。</p>',
    category: '教程',
    status: 'published',
    user_id: '1',
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T10:00:00Z'
  },
  {
    id: '2',
    title: '系统更新公告',
    content: '<p>系统已更新至最新版本。</p>',
    category: '新闻',
    status: 'published',
    user_id: '1',
    created_at: '2024-01-02T14:30:00Z',
    updated_at: '2024-01-02T14:30:00Z'
  }
];

// 获取内容列表
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: contentData
  });
});

// 创建内容
router.post('/', (req, res) => {
  const newContent = {
    id: (contentData.length + 1).toString(),
    ...req.body,
    user_id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  contentData.push(newContent);
  res.json({
    success: true,
    data: newContent
  });
});

// 获取内容详情
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const content = contentData.find(item => item.id === id);
  if (content) {
    res.json({
      success: true,
      data: content
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Content not found'
    });
  }
});

// 更新内容
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const index = contentData.findIndex(item => item.id === id);
  if (index !== -1) {
    contentData[index] = {
      ...contentData[index],
      ...req.body,
      updated_at: new Date().toISOString()
    };
    res.json({
      success: true,
      data: contentData[index]
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Content not found'
    });
  }
});

// 删除内容
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = contentData.findIndex(item => item.id === id);
  if (index !== -1) {
    contentData.splice(index, 1);
    res.json({
      success: true,
      message: 'Content deleted successfully'
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Content not found'
    });
  }
});

// 更新内容状态
router.put('/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const index = contentData.findIndex(item => item.id === id);
  if (index !== -1) {
    contentData[index].status = status;
    contentData[index].updated_at = new Date().toISOString();
    res.json({
      success: true,
      data: contentData[index]
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Content not found'
    });
  }
});

export default router;