import express from 'express';

const router = express.Router();

// 模拟数据
const usersData = [
  {
    id: '1',
    name: '管理员',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    created_at: '2024-01-01T10:00:00Z',
    last_login: '2024-01-07T14:30:00Z'
  },
  {
    id: '2',
    name: '张三',
    email: 'zhangsan@example.com',
    role: 'user',
    status: 'active',
    created_at: '2024-01-02T09:15:00Z',
    last_login: '2024-01-06T10:20:00Z'
  },
  {
    id: '3',
    name: '李四',
    email: 'lisi@example.com',
    role: 'user',
    status: 'inactive',
    created_at: '2024-01-03T16:45:00Z',
    last_login: '2024-01-05T08:45:00Z'
  }
];

// 获取用户列表
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: usersData
  });
});

// 获取用户详情
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = usersData.find(item => item.id === id);
  if (user) {
    res.json({
      success: true,
      data: user
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
});

// 更新用户信息
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const index = usersData.findIndex(item => item.id === id);
  if (index !== -1) {
    usersData[index] = {
      ...usersData[index],
      ...req.body
    };
    res.json({
      success: true,
      data: usersData[index]
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
});

// 删除用户
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = usersData.findIndex(item => item.id === id);
  if (index !== -1) {
    usersData.splice(index, 1);
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
});

export default router;