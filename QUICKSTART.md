# 快速开始指南

## 项目已完成开发！✅

根据需求文档，所有核心功能已开发完成。以下是后续步骤：

## 1. 本地运行

项目已经在运行中，访问地址：http://localhost:5173

如果需要重新启动：

```bash
pnpm dev
```

## 2. 配置 Supabase（必须）

### 2.1 创建 Supabase 账号

1. 访问 https://supabase.com
2. 注册免费账号
3. 创建新项目（选择靠近你的区域）

### 2.2 获取 API 密钥

项目创建完成后：
1. 进入 Project Settings（左下角齿轮图标）
2. 点击 API 选项卡
3. 复制以下两个值：
   - Project URL
   - anon/public key

### 2.3 配置环境变量

在项目根目录创建 `.env.local` 文件：

```bash
cp .env.local.example .env.local
```

编辑 `.env.local` 文件，填入你的 Supabase 配置：

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 3. 初始化数据库

### 3.1 执行 SQL 迁移

1. 在 Supabase Dashboard 中，打开 SQL Editor（左侧边栏）
2. 打开 `supabase/migrations/001_init.sql` 文件
3. 复制全部内容并粘贴到 SQL Editor
4. 点击 Run 执行

### 3.2 创建 Storage 存储桶

1. 在 Supabase Dashboard 中，打开 Storage（左侧边栏）
2. 点击 "New bucket"
3. 创建两个公开存储桶：
   - `works` - 用于存储图片
   - `models` - 用于存储 3D 模型文件
4. 设置权限为公开（Public bucket）

### 3.3 上传测试数据（可选）

#### 方法一：使用 Supabase Studio（推荐）

1. 打开 Table Editor（左侧边栏）
2. 选择 `works` 表
3. 点击 "Insert" 添加新作品
4. 上传文件到 Storage 后，复制公开 URL 填入对应字段

#### 方法二：执行示例 SQL

1. 打开 `supabase/seed.sql`
2. 修改其中的 URL 为你上传到 Storage 的文件 URL
3. 在 SQL Editor 中执行

## 4. 准备你的作品

### 4.1 文件规范

| 资源类型 | 规范 | 存储位置 |
|---|---|---|
| 3D 模型 | GLB 格式，< 10MB，使用 Draco 压缩 | Storage/models/ |
| 封面图 | WebP 格式，< 200KB，16:9 比例 | Storage/works/ |
| 三视角渲染图 | WebP 格式，每张 < 500KB | Storage/works/ |

### 4.2 上传文件到 Storage

1. 打开 Supabase Dashboard → Storage
2. 选择对应存储桶（works 或 models）
3. 拖拽文件上传
4. 点击文件 → 复制公开 URL

### 4.3 添加作品数据

在 Supabase Studio 的 Table Editor 中添加作品：

**必填字段：**
- `title`: 作品标题
- `software`: 制作软件（blender/maya/3dsmax/zbrush）
- `cover_url`: 封面图 URL
- `order_num`: 排序号（数字越小越靠前）

**可选字段：**
- `model_url`: 3D 模型 URL
- `view_front/view_side/view_back`: 三视角渲染图 URL
- `tags`: 标签数组，如 `["硬表面", "PBR", "科幻"]`
- `summary`: 简短描述
- `description`: 详细描述（支持 Markdown）
- `tech_stack`: 技术栈数组
- `poly_count`: 面数，如 "85,000"
- `texture_size`: 贴图分辨率，如 "4K"
- `render_engine`: 渲染引擎，如 "Cycles"
- `featured`: 是否首页精选（布尔值）

## 5. 自定义个人信息

编辑 `src/data/profile.js` 文件，修改：

```javascript
export default {
  name: "你的名字",
  title: "3D 建模师",
  avatar: "/images/avatar.webp",  // 放在 public/images/ 目录
  bio: "个人简介...",
  skills: ["Blender", "Maya", ...],
  experience: [...],
  social: {
    artstation: "https://artstation.com/yourusername",
    github: "https://github.com/yourusername",
    email: "your@email.com"
  }
}
```

## 6. 部署上线

### 6.1 推送到 GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### 6.2 配置 GitHub Pages

1. 在 GitHub 仓库页面，进入 Settings
2. 点击 Pages（左侧边栏）
3. Source 选择 "GitHub Actions"
4. 保存后，每次 push 到 main 分支会自动部署

### 6.3 配置自定义域名（可选）

1. 购买域名（可选）
2. 在 Cloudflare 添加域名
3. DNS 设置 CNAME 指向 `yourusername.github.io`
4. 启用 Cloudflare 代理（橙色云朵）

## 7. 开发建议

### 7.1 性能优化

- 所有图片使用 WebP 格式
- 3D 模型使用 Draco 压缩
- 启用图片懒加载（已实现）
- 模型按需加载（已实现）

### 7.2 SEO 优化

- 每个作品有独立 URL
- 语义化 HTML 标签
- 图片和模型有 alt 描述
- 自动生成 sitemap（需额外配置）

### 7.3 内容建议

- 精选 8-12 个代表作品
- 每个作品提供高质量封面图
- 三视角展示提升专业度
- 详细描述制作流程和技术细节

## 8. 常见问题

### Q: 页面显示"Supabase 未配置"

A: 请确保：
1. 已创建 `.env.local` 文件
2. 正确填写了 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY
3. 重启开发服务器（pnpm dev）

### Q: 作品列表为空

A: 检查：
1. Supabase 数据库表是否已创建
2. works 表中是否有数据
3. 浏览器控制台是否有错误信息

### Q: 3D 模型无法加载

A: 确保：
1. 模型格式为 GLB/GLTF
2. 模型文件已上传到 Storage 并设置为公开访问
3. model_url 字段填写的是完整的公开 URL
4. 模型文件大小 < 10MB

### Q: 如何压缩 GLB 模型？

A: 使用 Blender：
1. 安装 Draco 压缩插件
2. 导出时启用 Draco 压缩
3. 或使用在线工具：https://github.com/KhronosGroup/glTF-Blender-Exporter

## 9. 技术支持

如有问题，请检查：
1. 浏览器控制台（F12）的错误信息
2. Supabase Dashboard 的 Logs
3. README.md 中的详细说明

---

**祝部署顺利！🎉**
