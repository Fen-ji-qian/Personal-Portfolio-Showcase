import express from 'express';

const router = express.Router();

// 登录
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // 这里可以添加登录逻辑
  console.log('Login attempt:', email);
  // 模拟登录成功
  res.json({
    success: true,
    user: {
      id: '1',
      email: email,
      role: 'admin'
    },
    token: 'mock-token-123'
  });
});

// 登出
router.post('/logout', (req, res) => {
  // 这里可以添加登出逻辑
  res.json({ success: true, message: 'Logged out successfully' });
});

// 获取当前用户信息
router.get('/me', (req, res) => {
  // 这里可以添加获取用户信息的逻辑
  res.json({
    success: true,
    user: {
      id: '1',
      email: 'admin@example.com',
      role: 'admin'
    }
  });
});

export default router;