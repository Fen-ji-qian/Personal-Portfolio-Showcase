-- 示例作品数据（可选）
-- 导入到 Supabase 前，请先上传文件到 Storage 并获取 URL

-- 示例 1：机甲角色
INSERT INTO works (id, title, software, tags, order_num, cover_url, model_url, view_front, view_side, view_back, summary, description, tech_stack, poly_count, texture_size, render_engine, featured) VALUES
  ('00000000-0000-0000-0000-000000000001', '机甲角色', 'blender', ARRAY['硬表面', 'PBR', '科幻'], 1, 
   'https://your-storage.supabase.co/works/robot-cover.webp',
   'https://your-storage.supabase.co/models/robot.glb',
   'https://your-storage.supabase.co/works/robot-front.webp',
   'https://your-storage.supabase.co/works/robot-side.webp',
   'https://your-storage.supabase.co/works/robot-back.webp',
   '高精度科幻机甲角色建模',
   '使用 Blender 制作的科幻风格机甲角色，包含完整的 PBR 材质和细节雕刻。制作周期 2 周，主要用于游戏项目。',
   ARRAY['Blender', 'Substance Painter', 'Marmoset'],
   '85,000', '4K', 'Cycles', true);

-- 示例 2：自然场景
INSERT INTO works (id, title, software, tags, order_num, cover_url, model_url, view_front, view_side, view_back, summary, description, tech_stack, poly_count, texture_size, render_engine, featured) VALUES
  ('00000000-0000-0000-0000-000000000002', '奇幻森林场景', 'blender', ARRAY['场景', '自然', '风格化'], 2,
   'https://your-storage.supabase.co/works/forest-cover.webp',
   'https://your-storage.supabase.co/models/forest.glb',
   'https://your-storage.supabase.co/works/forest-front.webp',
   'https://your-storage.supabase.co/works/forest-side.webp',
   'https://your-storage.supabase.co/works/forest-back.webp',
   '风格化奇幻森林场景',
   '低多边形风格化森林场景，包含多种树木、植被和环境元素。适合移动端游戏使用。',
   ARRAY['Blender', 'Substance Painter'],
   '45,000', '2K', 'Eevee', true);

-- 示例 3：角色模型
INSERT INTO works (id, title, software, tags, order_num, cover_url, model_url, view_front, view_side, view_back, summary, description, tech_stack, poly_count, texture_size, render_engine, featured) VALUES
  ('00000000-0000-0000-0000-000000000003', '奇幻角色', 'zbrush', ARRAY['角色', '雕刻', '写实'], 3,
   'https://your-storage.supabase.co/works/character-cover.webp',
   'https://your-storage.supabase.co/models/character.glb',
   'https://your-storage.supabase.co/works/character-front.webp',
   'https://your-storage.supabase.co/works/character-side.webp',
   'https://your-storage.supabase.co/works/character-back.webp',
   '高细节奇幻角色雕刻',
   '使用 ZBrush 进行高细节雕刻，包含完整的服装和配饰细节。拓扑优化后用于游戏引擎。',
   ARRAY['ZBrush', 'Maya', 'Substance Painter'],
   '120,000', '4K', 'Arnold', false);
