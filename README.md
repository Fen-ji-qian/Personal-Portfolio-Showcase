# 3D 建模作品集网站

基于 Vue 3 + Three.js + Supabase 的零成本 3D 建模师作品集网站

## 技术栈

- **前端框架**: Vue 3 + Vite
- **样式方案**: Tailwind CSS
- **3D 渲染**: Three.js + GLTFLoader + OrbitControls + DRACOLoader
- **后端即服务**: Supabase 免费版（PostgreSQL + Storage + Auth）
- **构建工具**: Vite
- **包管理**: pnpm
- **部署平台**: GitHub Pages

## 功能特性

- ✅ 3D 模型交互查看器（旋转、缩放、平移、线框/材质切换）
- ✅ 作品分类筛选（按 Blender/Maya/3ds Max/ZBrush）
- ✅ 作品详情页（3D 预览 + 三视角渲染图 + 技术规格）
- ✅ 响应式设计（桌面/平板/手机）
- ✅ 零成本部署（GitHub Pages + Supabase 免费额度）
- ✅ 可视化数据管理（Supabase Studio）
- ✅ Git push 自动部署

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 安装依赖

```bash
pnpm install
```

### 配置 Supabase

1. 访问 [supabase.com](https://supabase.com) 注册账号
2. 创建新项目，记录 Project URL 和 anon key
3. 复制 `.env.local.example` 为 `.env.local`
4. 填入 Supabase 配置信息

```bash
cp .env.local.example .env.local
```

### 初始化数据库

1. 在 Supabase Dashboard 中打开 SQL Editor
2. 执行 `supabase/migrations/001_init.sql` 创建表结构
3. 执行 `supabase/seed.sql` 导入示例数据（可选）

### 配置 Storage

1. 在 Supabase Dashboard 中打开 Storage
2. 创建两个公开存储桶：`works`（存放图片）和 `models`（存放 3D 模型）
3. 设置公开访问权限

### 本地开发

```bash
pnpm dev
```

访问 http://localhost:5173

### 构建部署

```bash
pnpm build
```

## 项目结构

```
portfolio/
├── public/
│   └── images/
│       └── avatar.webp          # 头像
├── src/
│   ├── assets/                  # 静态资源
│   ├── components/              # Vue 组件
│   │   ├── ModelViewer.vue      # 3D 查看器组件
│   │   ├── WorkCard.vue         # 作品卡片
│   │   ├── FilterBar.vue        # 软件筛选栏
│   │   ├── ThreeViewImages.vue  # 三视角渲染图组件
│   │   ├── Navbar.vue           # 导航栏
│   │   └── Footer.vue           # 页脚
│   ├── composables/             # Vue 组合式函数
│   ├── lib/
│   │   └── supabase.js          # Supabase 客户端配置
│   ├── pages/                   # 页面组件
│   │   ├── Home.vue             # 首页
│   │   ├── Works.vue            # 作品列表页
│   │   ├── WorkDetail.vue       # 作品详情页
│   │   ├── About.vue            # 关于我页
│   │   └── Contact.vue          # 联系页
│   ├── data/
│   │   └── profile.json         # 个人信息（本地文件）
│   ├── router/                  # 路由配置
│   ├── App.vue
│   └── main.js
├── supabase/
│   ├── migrations/              # 数据库迁移 SQL 文件
│   │   └── 001_init.sql         # 初始化表结构
│   └── seed.sql                 # 预置数据
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions 部署配置
├── .env.local.example           # 环境变量模板
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

## 部署步骤

### 1. 部署到 GitHub Pages

1. 创建 GitHub 仓库并推送代码
2. 在仓库 Settings → Pages 中，Source 选择 "GitHub Actions"
3. 推送代码到 main 分支，自动触发部署

### 2. 配置自定义域名（可选）

1. 在 Cloudflare 添加域名
2. DNS 记录指向 GitHub Pages
3. 启用 Cloudflare 代理和 HTTPS

### 3. 管理作品数据

使用 Supabase Studio 可视化管理后台：
- 访问 https://app.supabase.com
- 选择项目 → Table Editor
- 直接编辑作品数据、上传文件

## 资源规范

| 资源类型 | 规范 |
|---|---|
| 3D 模型（GLB） | 单文件 < 10MB，使用 Draco 压缩 |
| 渲染图 | WebP 格式，单张 < 500KB |
| 封面图 | WebP 格式，单张 < 200KB |
| 总站点大小 | < 100MB |

## 成本说明

| 项目 | 费用 |
|---|---|
| 前端站点托管（GitHub Pages） | ¥0 |
| 后端数据库 + 存储（Supabase） | ¥0 |
| CDN 加速（Cloudflare） | ¥0 |
| SSL 证书 | ¥0 |
| CI/CD（GitHub Actions） | ¥0 |
| **月运行总成本** | **¥0** |

## 开发计划

- [x] Phase 1: 项目初始化、Supabase 配置、基础框架
- [x] Phase 2: 3D 查看器开发
- [x] Phase 3: 作品展示模块
- [x] Phase 4: 品牌页面开发
- [x] Phase 5: 响应式优化、部署配置

## 内容准备清单

- [ ] 精选作品 8-12 个
- [ ] 每个作品准备：GLB 模型、封面图、三视角渲染图
- [ ] 所有图片转为 WebP 格式
- [ ] 确定每个作品的制作软件分类
- [ ] 个人简介、技能列表、工作经历
- [ ] 社交媒体链接
- [ ] 联系邮箱

## 许可证

MIT License

## 联系方式

如有问题或建议，请通过以下方式联系：

- Email: your@email.com
- ArtStation: https://artstation.com/username
