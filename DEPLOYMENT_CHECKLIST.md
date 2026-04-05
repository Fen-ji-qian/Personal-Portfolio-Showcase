# 部署检查清单

## ✅ 开发阶段完成

- [x] 项目初始化和依赖安装
- [x] Tailwind CSS 配置
- [x] Vue Router 路由配置
- [x] Supabase 客户端配置
- [x] 导航栏组件（响应式）
- [x] 页脚组件
- [x] 首页（Hero 区 + 精选作品）
- [x] 作品列表页（分类筛选）
- [x] 作品详情页（3D 查看器 + 三视角展示）
- [x] 关于我页面
- [x] 联系页面
- [x] 3D 查看器组件（Three.js 集成）
- [x] 作品卡片组件
- [x] 筛选栏组件
- [x] 三视角图片展示组件
- [x] 数据库迁移 SQL 文件
- [x] GitHub Actions 部署配置

## 📋 部署前必做

### 1. Supabase 配置

- [ ] 注册 Supabase 账号（https://supabase.com）
- [ ] 创建新项目
- [ ] 复制 Project URL 和 anon key
- [ ] 创建 `.env.local` 文件（复制 `.env.local.example`）
- [ ] 填入 Supabase 配置到 `.env.local`
- [ ] 执行 `supabase/migrations/001_init.sql` 到 SQL Editor
- [ ] 创建 Storage 存储桶：`works` 和 `models`
- [ ] 设置存储桶为公开访问

### 2. 内容准备

- [ ] 准备个人头像（放在 `public/images/avatar.webp`）
- [ ] 编辑 `src/data/profile.js` 填写个人信息
- [ ] 准备 8-12 个代表作品
- [ ] 每个作品准备：
  - [ ] 封面图（WebP，16:9，< 200KB）
  - [ ] 3D 模型文件（GLB，< 10MB，Draco 压缩）
  - [ ] 三视角渲染图（正面/侧面/背面，WebP，< 500KB）
- [ ] 上传所有文件到 Supabase Storage
- [ ] 在 Supabase Studio 中添加作品数据

### 3. 本地测试

- [ ] 运行 `pnpm dev` 无错误
- [ ] 所有页面可以正常访问
- [ ] 作品列表显示正常
- [ ] 作品详情页 3D 模型加载正常
- [ ] 响应式布局测试（手机/平板/桌面）
- [ ] 检查浏览器控制台无错误

### 4. Git 配置

- [ ] 初始化 Git 仓库：`git init`
- [ ] 创建 `.gitignore`（已存在）
- [ ] 确保 `.env.local` 不提交到 Git
- [ ] 首次提交：`git add . && git commit -m "Initial commit"`

### 5. GitHub 部署

- [ ] 创建 GitHub 仓库
- [ ] 推送代码：`git remote add origin <repo-url> && git push -u origin main`
- [ ] 配置 GitHub Pages：Settings → Pages → Source 选 "GitHub Actions"
- [ ] 等待首次部署完成（Actions 标签查看进度）
- [ ] 访问生成的 GitHub Pages URL 测试

### 6. 自定义域名（可选）

- [ ] 购买域名
- [ ] 在 Cloudflare 添加域名
- [ ] 配置 DNS CNAME 指向 `<username>.github.io`
- [ ] 启用 Cloudflare 代理
- [ ] 在 GitHub Pages 设置自定义域名

## 🚀 部署后验证

- [ ] 访问线上站点，检查所有页面
- [ ] 测试作品列表筛选功能
- [ ] 测试 3D 模型加载和交互
- [ ] 测试响应式布局
- [ ] 检查所有链接（社交媒体、联系邮箱）
- [ ] 测试页面加载速度
- [ ] 在多个设备和浏览器测试

## 📊 性能检查

- [ ] 使用 Lighthouse 测试性能（目标：90+）
- [ ] 检查首屏加载时间（目标：< 3 秒）
- [ ] 检查 3D 模型加载时间（目标：< 2 秒）
- [ ] 优化图片大小（如有需要）
- [ ] 优化模型文件大小（如有需要）

## 🔒 安全检查

- [ ] 确认 `.env.local` 未提交到 Git
- [ ] 确认 Supabase RLS（行级安全）已启用
- [ ] 确认 Storage 桶权限设置正确
- [ ] 检查是否有敏感信息泄露

## 📝 持续维护

- [ ] 定期更新作品
- [ ] 监控 Supabase 使用量（免费额度内）
- [ ] 收集用户反馈
- [ ] 根据反馈优化功能和性能

---

## 💡 使用建议

### 内容更新流程

1. **添加新作品**：
   - 上传文件到 Supabase Storage
   - 复制公开 URL
   - 在 Supabase Studio 的 Table Editor 中添加新记录

2. **修改个人信息**：
   - 编辑 `src/data/profile.js`
   - 提交并推送：`git add . && git commit -m "Update profile" && git push`
   - GitHub Actions 自动部署

3. **调整样式**：
   - 编辑 `tailwind.config.js` 或组件样式
   - 本地测试：`pnpm dev`
   - 提交并推送

### 监控和优化

- 使用 Supabase Dashboard 监控数据库和存储使用量
- 使用 GitHub Actions 日志监控部署状态
- 使用浏览器 DevTools 分析性能瓶颈
- 收集访客反馈持续改进

---

**完成所有检查项后，你的作品集网站就正式上线了！🎉**
