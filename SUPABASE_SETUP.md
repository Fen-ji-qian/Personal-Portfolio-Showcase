# Supabase 配置完成！✅

## 已完成的配置

- ✅ Supabase URL: `https://mcioprfxlupdpstdlonh.supabase.co`
- ✅ Publishable key 已配置到 `.env.local`
- ✅ 开发服务器已自动重启

## 下一步：初始化数据库

### 方法一：使用 SQL Editor（推荐）

1. **打开 Supabase Dashboard**
   - 访问：https://app.supabase.com
   - 登录并选择你的项目

2. **执行数据库迁移**
   - 点击左侧边栏的 **SQL Editor**
   - 打开项目中的 `supabase/migrations/001_init.sql` 文件
   - 复制全部内容
   - 粘贴到 SQL Editor
   - 点击 **Run** 执行

3. **创建 Storage 存储桶**
   - 点击左侧边栏的 **Storage**
   - 点击 **New bucket**
   - 创建第一个桶：`works`（存放图片）
     - Name: `works`
     - Region: 默认
     - Public: ✅ 勾选
     - 点击 Create
   - 创建第二个桶：`models`（存放 3D 模型）
     - Name: `models`
     - Region: 默认
     - Public: ✅ 勾选
     - 点击 Create

4. **验证配置**
   - 刷新浏览器 http://localhost:5173
   - 打开浏览器控制台（F12）
   - 应该不再显示 "Supabase 未配置" 警告
   - 如果看到 "Supabase 环境变量未配置"，请重启开发服务器

### 方法二：快速测试（可选）

如果你想快速测试，可以执行示例数据：

1. 打开 `supabase/seed.sql` 文件
2. 修改其中的 URL 为你上传到 Storage 的文件 URL（暂时可以留空或使用占位符）
3. 在 SQL Editor 中执行

## 上传作品文件

### 1. 准备文件

按照以下规范准备你的作品文件：

| 文件类型 | 格式 | 大小限制 | 存储位置 |
|---|---|---|---|
| 封面图 | WebP | < 200KB | works 桶 |
| 三视角图 | WebP | < 500KB | works 桶 |
| 3D 模型 | GLB | < 10MB | models 桶 |

### 2. 上传到 Storage

1. 在 Supabase Dashboard 打开 **Storage**
2. 选择 `works` 或 `models` 桶
3. 点击 **Upload** 或直接拖拽文件
4. 上传完成后，点击文件
5. 点击 **Copy public URL** 复制公开链接

### 3. 添加作品数据

1. 点击左侧边栏的 **Table Editor**
2. 选择 `works` 表
3. 点击 **Insert** 添加新作品
4. 填写必填字段：
   - `title`: 作品标题
   - `software`: 制作软件（blender/maya/3dsmax/zbrush）
   - `cover_url`: 封面图 URL（从 Storage 复制）
   - `order_num`: 排序号（数字越小越靠前，如 1, 2, 3...）

5. 填写可选字段：
   - `model_url`: 3D 模型 URL
   - `view_front/view_side/view_back`: 三视角渲染图 URL
   - `tags`: 标签（如 ["硬表面", "PBR", "科幻"]）
   - `summary`: 简短描述
   - `featured`: 是否首页精选（勾选）
   - 等等...

6. 点击 **Save** 保存

## 修改个人信息

编辑 `src/data/profile.js` 文件，修改为你的真实信息：

```javascript
export default {
  name: "你的名字",
  title: "3D 建模师",
  avatar: "/images/avatar.webp",  // 放在 public/images/ 目录
  bio: "你的个人简介...",
  skills: ["你的技能列表"],
  experience: [...],
  social: {
    artstation: "https://artstation.com/你的用户名",
    github: "https://github.com/你的用户名",
    email: "你的邮箱"
  }
}
```

## 测试清单

- [ ] 访问 http://localhost:5173 无错误
- [ ] 浏览器控制台无 Supabase 警告
- [ ] 首页显示正常
- [ ] 导航栏可以正常跳转
- [ ] 作品列表页显示你添加的作品
- [ ] 作品详情页可以加载 3D 模型（如果有上传）
- [ ] 三视角展示正常（如果有上传）
- [ ] 关于我和联系页显示正常

## 常见问题

### Q: 仍然显示"Supabase 未配置"

A: 
1. 检查 `.env.local` 文件是否存在
2. 确认 URL 和 key 填写正确（没有多余空格）
3. 重启开发服务器：Ctrl+C 停止，然后 `pnpm dev`

### Q: 作品列表为空

A:
1. 确认数据库表已创建（在 Table Editor 中查看）
2. 确认 works 表中有数据
3. 检查浏览器控制台的错误信息

### Q: 3D 模型无法加载

A:
1. 确认模型文件已上传到 Storage
2. 确认存储桶是公开的（Public）
3. 确认 model_url 是完整的公开 URL
4. 检查模型格式是否为 GLB

## 部署上线

完成本地测试后：

1. **推送到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/你的仓库.git
   git push -u origin main
   ```

2. **配置 GitHub Pages**
   - GitHub 仓库 → Settings → Pages
   - Source 选择 "GitHub Actions"
   - 保存后自动触发部署

3. **等待部署完成**
   - 在 Actions 标签查看部署进度
   - 部署完成后访问生成的 URL

---

**现在就开始配置 Supabase 吧！🚀**
