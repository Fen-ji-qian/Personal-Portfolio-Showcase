import express from 'express';

const router = express.Router();

// 模拟访问数据
const visitData = [
  { date: '2024-01-01', visits: 1200 },
  { date: '2024-01-02', visits: 1900 },
  { date: '2024-01-03', visits: 1500 },
  { date: '2024-01-04', visits: 2100 },
  { date: '2024-01-05', visits: 1800 },
  { date: '2024-01-06', visits: 2500 },
  { date: '2024-01-07', visits: 2200 }
];

// 模拟注册数据
const registrationData = [
  { date: '2024-01-01', registrations: 120 },
  { date: '2024-01-02', registrations: 190 },
  { date: '2024-01-03', registrations: 150 },
  { date: '2024-01-04', registrations: 210 },
  { date: '2024-01-05', registrations: 180 },
  { date: '2024-01-06', registrations: 250 },
  { date: '2024-01-07', registrations: 220 }
];

// 模拟来源数据
const sourceData = [
  { name: '直接访问', value: 400 },
  { name: '搜索引擎', value: 300 },
  { name: '社交媒体', value: 200 },
  { name: '外部链接', value: 100 }
];

// 获取访问数据
router.get('/visits', (req, res) => {
  res.json({
    success: true,
    data: visitData
  });
});

// 获取注册数据
router.get('/registrations', (req, res) => {
  res.json({
    success: true,
    data: registrationData
  });
});

// 获取来源分析
router.get('/sources', (req, res) => {
  res.json({
    success: true,
    data: sourceData
  });
});

export default router;