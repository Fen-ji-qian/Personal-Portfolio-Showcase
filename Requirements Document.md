# 3D建模作品集网站需求文档（零成本精简版）

版本：2.1
日期：2026-04-04
定位：零成本部署，含轻量后端管理，Git push 即部署

---

# 一、项目概述

## 1.1 项目背景

为3D建模师/艺术家打造个人作品集网站，以沉浸式3D交互展示作品，吸引潜在客户与雇主。

## 1.2 核心目标

- **专业展示**：3D交互呈现作品细节（旋转、缩放、材质切换）
- **高效传达**：60秒内让访客理解核心能力
- **品牌塑造**：体现个人风格与技术深度
- **转化导向**：便于联系与作品分享
- **零成本运行**：月运行费用为0

## 1.3 设计原则

- **零成本优先**：所有服务使用免费额度，月运行费用为0
- **轻量后端**：使用 Supabase 免费版（PostgreSQL + Storage + Auth）提供数据持久化和管理接口
- **渐进增强**：不支持WebGL的设备降级为静态图片展示
- **性能至上**：首屏加载 < 3秒，3D模型首次渲染 < 2秒

---

# 二、目标用户

| 用户类型 | 核心需求 |
|---|---|
| 招聘方（游戏/影视公司） | 技术能力、作品质量、流程规范性 |
| 同行/社区 | 制作过程、技术细节 |
| 个人访客 | 浏览体验、视觉冲击力 |

---

# 三、功能需求

## 3.1 作品展示模块

### 3.1.1 3D模型查看器

- **核心交互**：360°旋转、缩放、平移、一键重置视角
- **展示模式**：线框/材质切换
- **支持格式**：GLTF/GLB（压缩后单文件 < 10MB）
- **加载优化**：DRACOLoader 压缩传输、加载进度条
- **降级方案**：WebGL不可用时显示静态渲染图

### 3.1.2 作品详情页

- **元信息**：标题、软件分类标签、技术栈、面数/贴图分辨率等硬指标
- **三视角展示**：固定展示三张不同视角的渲染图（正面视角、侧面视角、背面/细节视角）
- **内容结构**：封面图 → 3D预览 → 三视角渲染图 → 简介 → 制作流程
- **操作功能**：渲染图下载（图片直接链接）、社交分享（Web Share API）

## 3.2 作品分类与筛选

- **分类维度**：按制作软件分类 —— Blender / Maya / 3ds Max / ZBrush
- **筛选方式**：软件标签单选/多选过滤
- **排序**：按优先级手动排序（后台管理面板配置）
- **首页展示**：3-5个核心代表作置顶

## 3.3 个人品牌页面

### 3.3.1 关于我

- 个人简介、技能列表、教育/工作背景
- 社交媒体链接（ArtStation/Behance/GitHub等图标链接）

### 3.3.2 联系方式

- **首选**：mailto 邮件链接（零成本）
- **可选**：Formspree 免费版表单（50次/月，无需后端）

## 3.4 用户体验

### 3.4.1 导航与布局

- 响应式设计：桌面 ≥ 1024px / 平板 768-1023px / 手机 < 768px
- 导航结构：首页 → 作品分类 → 作品详情 → 关于我 → 联系
- 3D查看器尺寸：桌面 600px高 / 移动端 400px高满宽

### 3.4.2 性能与SEO

- 图片懒加载、模型按需加载
- 每个作品独立URL、语义化HTML、图片alt标签、meta描述
- Open Graph / Twitter Card 社交分享元数据
- 自动生成 sitemap.xml

### 3.4.3 可访问性

- 键盘导航支持
- 高对比度文字
- 图片/模型均有文字替代描述

---

# 四、非功能需求

## 4.1 性能指标

| 指标 | 目标值 |
|---|---|
| 首屏加载 | < 3秒 |
| 3D模型首次渲染 | < 2秒 |
| 页面切换延迟 | < 500ms |
| 移动端流畅度 | 60fps |

## 4.2 兼容性

- 桌面：Chrome 90+、Firefox 88+、Safari 14+、Edge 90+
- 移动端：iOS Safari 14+、Android Chrome 90+
- WebGL 2.0 不可用时自动降级为静态图片

## 4.3 资源规范

| 资源类型 | 规范 |
|---|---|
| 3D模型（GLB） | 单文件 < 10MB，使用Draco压缩 |
| 渲染图 | WebP格式，单张 < 500KB，提供2x分辨率 |
| 封面图 | WebP格式，单张 < 200KB |
| 过程图 | WebP格式，单张 < 300KB |
| 总站点大小 | < 100MB（GitHub Pages限制） |

---

# 五、技术栈

## 5.1 核心技术（全部免费）

| 类别 | 选型 | 说明 |
|---|---|---|
| 前端框架 | Vue 3 + Vite | 轻量快速，生态成熟 |
| 样式方案 | Tailwind CSS | 原子化CSS，无需UI组件库，体积小 |
| 3D渲染 | Three.js + GLTFLoader + OrbitControls + DRACOLoader | 仅保留核心模块 |
| 后端即服务 | Supabase 免费版 | PostgreSQL数据库 + 对象存储 + 认证 + RESTful API |
| 管理后台 | Supabase Studio | 自带可视化数据管理面板，开箱即用 |
| 联系表单 | mailto 或 Formspree 免费版 | 无需自建后端 |
| 构建工具 | Vite | 极速构建 |
| 包管理 | pnpm | 高效磁盘利用 |

## 5.2 不使用的技术（节省成本）

| 排除项 | 原因 |
|---|---|
| TypeScript | 个人项目可选，降低开发门槛 |
| UI组件库（Element/Ant Design） | 体积大、风格难定制，Tailwind足够 |
| 自建后端（Node.js/Express） | Supabase免费版完全替代 |
| Headless CMS（Strapi/Sanity） | Supabase + Studio已满足需求 |
| 对象存储（S3/R2） | Supabase Storage免费版替代 |
| reCAPTCHA | 个人小站不需要 |
| KTX2Loader | 需要额外工具链，收益不大 |

---

# 六、数据结构设计

## 6.1 数据库表结构（Supabase PostgreSQL）

### works 作品表

| 字段 | 类型 | 说明 |
|---|---|---|
| id | UUID (PK) | 主键，自动生成 |
| title | TEXT | 作品标题 |
| software | TEXT | 制作软件：blender / maya / 3dsmax / zbrush |
| tags | TEXT[] | 标签数组，如 ["硬表面", "PBR", "科幻"] |
| order_num | INTEGER | 排序权重，数字越小越靠前 |
| cover_url | TEXT | 封面图URL（Supabase Storage） |
| model_url | TEXT | 3D模型文件URL（可选） |
| view_front | TEXT | 正面视角渲染图URL |
| view_side | TEXT | 侧面视角渲染图URL |
| view_back | TEXT | 背面/细节视角渲染图URL |
| summary | TEXT | 简短描述 |
| description | TEXT | 详细描述（支持Markdown） |
| tech_stack | TEXT[] | 技术栈数组 |
| poly_count | TEXT | 面数，如 "85,000" |
| texture_size | TEXT | 贴图分辨率，如 "4K" |
| render_engine | TEXT | 渲染引擎，如 "Cycles" |
| featured | BOOLEAN | 是否首页精选 |
| created_at | TIMESTAMPTZ | 创建时间 |
| updated_at | TIMESTAMPTZ | 更新时间 |

### categories 分类表

| 字段 | 类型 | 说明 |
|---|---|---|
| id | TEXT (PK) | 分类ID：blender / maya / 3dsmax / zbrush |
| name | TEXT | 显示名称 |
| icon | TEXT | 图标标识 |
| sort_order | INTEGER | 排序 |

**预设分类数据：**

| id | name | icon |
|---|---|---|
| blender | Blender | blender |
| maya | Maya | maya |
| 3dsmax | 3ds Max | 3dsmax |
| zbrush | ZBrush | zbrush |

## 6.2 作品数据示例

```json
{
  "id": "a1b2c3d4",
  "title": "机甲角色",
  "software": "blender",
  "tags": ["硬表面", "PBR", "科幻"],
  "order_num": 1,
  "cover_url": "https://xxx.supabase.co/storage/v1/object/public/works/robot-cover.webp",
  "model_url": "https://xxx.supabase.co/storage/v1/object/public/models/robot.glb",
  "view_front": "https://xxx.supabase.co/storage/v1/object/public/works/robot-front.webp",
  "view_side": "https://xxx.supabase.co/storage/v1/object/public/works/robot-side.webp",
  "view_back": "https://xxx.supabase.co/storage/v1/object/public/works/robot-back.webp",
  "summary": "高精度科幻机甲角色建模",
  "description": "使用Blender制作的科幻风格机甲角色...",
  "tech_stack": ["Blender", "Substance Painter", "Marmoset"],
  "poly_count": "85,000",
  "texture_size": "4K",
  "render_engine": "Cycles",
  "featured": true,
  "created_at": "2026-03-15T00:00:00Z",
  "updated_at": "2026-03-15T00:00:00Z"
}
```

## 6.3 个人信息（profile.json，本地文件）

```json
{
  "name": "你的名字",
  "title": "3D建模师",
  "avatar": "/images/avatar.webp",
  "bio": "个人简介...",
  "skills": ["Blender", "Maya", "3ds Max", "ZBrush", "Substance Painter", "UE5"],
  "experience": [
    { "company": "XX公司", "role": "3D建模师", "period": "2024-2026" }
  ],
  "social": {
    "artstation": "https://artstation.com/username",
    "github": "https://github.com/username",
    "email": "your@email.com"
  }
}
```

---

# 七、页面结构

## 7.1 首页

```
[导航栏: Logo | 作品 | 关于 | 联系]
[Hero区: 大标题 + 核心代表作3D预览 + CTA按钮]
[精选作品: 3-5个卡片网格，含封面+标题+标签]
[最新作品: 时间线/网格展示]
[页脚: 社交链接 + 版权]
```

## 7.2 作品分类页

```
[导航栏]
[软件筛选栏: 全部 | Blender | Maya | 3ds Max | ZBrush]
[作品网格: 封面+标题+软件标签，hover显示简介]
```

## 7.3 作品详情页

```
[导航栏]
[面包屑: 首页 > 软件分类 > 作品名]
[3D查看器（桌面左侧/移动端顶部）]
[信息区: 标题 | 软件标签 | 技术栈 | 硬指标]
[简介文字]
[三视角渲染图: 正面视角 | 侧面视角 | 背面/细节视角]
[下载/分享按钮]
```

## 7.4 关于我页

```
[头像 + 姓名 + 职位]
[个人简介]
[技能标签云]
[工作经历时间线]
[社交媒体图标链接]
```

## 7.5 联系页

```
[一句话引导语]
[mailto邮件按钮（主要）]
[可选: Formspree表单]
[社交媒体链接]
```

---

# 八、设计规范

## 8.1 视觉风格

- **主色调**：深色系 `#0a0a0a` / `#121212`
- **强调色**：`#00d4ff`（科技蓝）/ `#ff6b6b`（活力红）
- **字体**：无衬线字体（Inter / Noto Sans SC）
- **留白**：充足呼吸空间
- **动效**：轻量过渡动画，不干扰内容浏览

## 8.2 响应式断点

| 断点 | 范围 | 布局 |
|---|---|---|
| 桌面 | ≥ 1024px | 多列网格，3D查看器侧边信息 |
| 平板 | 768-1023px | 两列网格，信息区下移 |
| 手机 | < 768px | 单列，3D查看器全宽 |

---

# 九、项目结构

```
portfolio/
├── public/
│   └── images/
│       └── avatar.webp          # 头像
├── src/
│   ├── assets/                  # 静态资源
│   ├── components/              # Vue组件
│   │   ├── ModelViewer.vue      # 3D查看器组件
│   │   ├── WorkCard.vue         # 作品卡片
│   │   ├── FilterBar.vue        # 软件筛选栏
│   │   ├── ThreeViewImages.vue  # 三视角渲染图组件
│   │   └── Gallery.vue          # 图片画廊
│   ├── composables/             # Vue组合式函数
│   │   └── useSupabase.ts       # Supabase客户端封装
│   ├── lib/
│   │   └── supabase.ts          # Supabase初始化配置
│   ├── pages/                   # 页面组件
│   │   ├── Home.vue
│   │   ├── Works.vue
│   │   ├── WorkDetail.vue
│   │   ├── About.vue
│   │   └── Contact.vue
│   ├── data/
│   │   └── profile.json         # 个人信息（本地文件）
│   ├── router/                  # 路由配置
│   ├── App.vue
│   └── main.ts
├── supabase/
│   ├── migrations/              # 数据库迁移SQL文件
│   │   └── 001_init.sql         # 初始化表结构
│   └── seed.sql                 # 预置分类数据
├── .env.local                   # Supabase环境变量（不提交Git）
├── .gitignore
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── package.json
└── README.md
```

---

# 十、后端管理方案（Supabase 零成本）

## 10.1 为什么选择 Supabase

- **完全免费**：免费版包含 500MB 数据库 + 1GB 文件存储 + 50,000 月活用户认证
- **自带管理后台**：Supabase Studio 提供可视化数据管理界面，无需额外开发
- **零运维**：无需管理服务器，自动备份，自动扩缩
- **RESTful API 自动生成**：建表即生成API，前端直接调用

## 10.2 管理后台功能（Supabase Studio）

| 功能 | 实现方式 | 说明 |
|---|---|---|
| 作品增删改查 | Table Editor | 可视化表格编辑，支持筛选、排序 |
| 图片/模型上传 | Storage Manager | 拖拽上传，自动生成公开URL |
| 排序管理 | order_num 字段 | 直接在表格中修改数字排序 |
| 精选作品设置 | featured 字段 | 勾选即设为首页精选 |
| 数据导入导出 | CSV导入/导出 | 批量操作支持 |
| 访问控制 | RLS（行级安全） | 管理员可写，访客只读 |

## 10.3 管理员认证

- 使用 Supabase Auth 免费版
- 仅管理员账号可登录 Studio 进行数据管理
- 前端通过 Supabase 客户端只读访问数据（anon key）
- 管理操作通过 Studio 网页端完成，无需开发管理页面

## 10.4 API 接口（Supabase 自动生成）

```
# 获取作品列表（支持筛选）
GET /rest/v1/works?select=*&software=eq.blender&order=order_num.asc

# 获取单个作品
GET /rest/v1/works?id=eq.{uuid}&select=*

# 获取分类列表
GET /rest/v1/categories?select=*&order=sort_order.asc

# 获取精选作品
GET /rest/v1/works?select=*&featured=eq.true&order=order_num.asc
```

## 10.5 Supabase 免费额度

| 资源 | 免费额度 | 个人作品集预估用量 |
|---|---|---|
| PostgreSQL 数据库 | 500 MB | < 10 MB |
| 文件存储（Storage） | 1 GB | < 500 MB |
| 带宽 | 5 GB/月 | < 2 GB/月 |
| API 请求 | 无限制 | < 10,000次/月 |
| 认证用户 | 50,000 MAU | 1个管理员 |

---

# 十一、部署方案（零成本）

## 11.1 部署架构

```
访客浏览器
    ↓
Cloudflare CDN（免费加速 + HTTPS）
    ↓
GitHub Pages（前端静态托管，免费）
    ↓ API调用
Supabase（数据库 + 文件存储 + 管理后台，免费）

管理员
    ↓
Supabase Studio（网页端管理作品数据）
    ↓
Supabase Storage（上传图片/模型文件）
```

## 11.2 免费资源清单

| 服务 | 免费额度 | 用途 |
|---|---|---|
| GitHub Pages | 100GB流量/月，1GB存储 | 前端站点托管 |
| Cloudflare Free | 无限CDN流量 | 加速 + HTTPS + 自定义域名 |
| Supabase Free | 500MB数据库 + 1GB存储 | 数据管理 + 文件存储 + 管理后台 |
| GitHub Actions | 2000分钟/月 | 自动构建部署 |
| Formspree | 50次提交/月 | 联系表单（可选） |

## 11.3 部署步骤

1. **创建 Supabase 项目**：注册 supabase.com → 新建项目 → 记录 Project URL 和 anon key
2. **初始化数据库**：在 SQL Editor 中执行建表语句（见 supabase/migrations/001_init.sql）
3. **配置 Storage**：创建 `works` 和 `models` 两个公开存储桶
4. **初始化前端项目**：`pnpm create vite@latest portfolio --template vue`
5. **安装依赖**：`pnpm add @supabase/supabase-js three tailwindcss`
6. **配置环境变量**：在 `.env.local` 中填入 Supabase URL 和 anon key
7. **开发调试**：`pnpm dev` 本地开发
8. **推送到GitHub**：创建仓库并推送代码
9. **启用GitHub Pages**：Settings → Pages → Source选GitHub Actions
10. **配置自定义域名**（可选）：Cloudflare添加域名 → DNS指向GitHub Pages → 启用Cloudflare代理
11. **自动部署**：每次 `git push` 自动触发GitHub Actions构建部署

## 11.4 GitHub Actions 配置示例

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install
      - run: pnpm build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## 11.5 成本总结

| 项目 | 费用 |
|---|---|
| 域名（可选，用github.io则免费） | ￥30-80/年 |
| 前端站点托管（GitHub Pages） | ￥0 |
| 后端数据库+存储（Supabase） | ￥0 |
| CDN加速（Cloudflare） | ￥0 |
| SSL证书 | ￥0 |
| CI/CD（GitHub Actions） | ￥0 |
| 管理后台（Supabase Studio） | ￥0 |
| **月运行总成本** | **￥0** |

---

# 十二、开发里程碑

| 阶段 | 时间 | 交付物 |
|---|---|---|
| Phase 1 项目搭建 | 2-3天 | 脚手架、路由、布局、Tailwind配置、Supabase初始化 |
| Phase 2 3D查看器 | 3-5天 | Three.js集成、模型加载、交互控制 |
| Phase 3 作品展示 | 3-4天 | 数据库对接、列表筛选、详情页、三视角展示 |
| Phase 4 品牌页面 | 2天 | 关于我、联系页 |
| Phase 5 优化上线 | 2-3天 | 响应式、SEO、性能优化、部署 |
| **总计** | **2-3周** | **可上线的零成本作品集网站** |

---

# 十三、内容准备清单

- [ ] 精选作品 8-12 个
- [ ] 每个作品准备：GLB模型（< 10MB）、封面图、三视角渲染图（正面/侧面/背面）
- [ ] 所有图片转为 WebP 格式
- [ ] 确定每个作品的制作软件分类（Blender / Maya / 3ds Max / ZBrush）
- [ ] 个人简介、技能列表、工作经历
- [ ] 社交媒体链接
- [ ] 联系邮箱

---

# 十四、Phase 2 扩展方向（按需，非必需）

- 博客/教程文章（Markdown文件 + 静态生成）
- 多语言支持（i18n JSON文件）
- 暗色/亮色主题切换
- Umami 自托管访问统计（部署在 Cloudflare Pages）
- 作品搜索功能（前端 Lunr.js 纯客户端搜索）
