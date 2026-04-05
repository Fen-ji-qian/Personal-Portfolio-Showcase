-- 作品表
CREATE TABLE IF NOT EXISTS works (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  software TEXT NOT NULL CHECK (software IN ('blender', 'maya', '3dsmax', 'zbrush')),
  tags TEXT[],
  order_num INTEGER DEFAULT 0,
  cover_url TEXT,
  model_url TEXT,
  view_front TEXT,
  view_side TEXT,
  view_back TEXT,
  summary TEXT,
  description TEXT,
  tech_stack TEXT[],
  poly_count TEXT,
  texture_size TEXT,
  render_engine TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 分类表
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  sort_order INTEGER DEFAULT 0
);

-- 插入预设分类数据
INSERT INTO categories (id, name, icon, sort_order) VALUES
  ('blender', 'Blender', 'blender', 1),
  ('maya', 'Maya', 'maya', 2),
  ('3dsmax', '3ds Max', '3dsmax', 3),
  ('zbrush', 'ZBrush', 'zbrush', 4)
ON CONFLICT (id) DO NOTHING;

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_works_software ON works(software);
CREATE INDEX IF NOT EXISTS idx_works_featured ON works(featured);
CREATE INDEX IF NOT EXISTS idx_works_order ON works(order_num);

-- 启用行级安全
ALTER TABLE works ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- 创建公开读取策略
CREATE POLICY "允许公开读取作品" ON works
  FOR SELECT
  USING (true);

CREATE POLICY "允许公开读取分类" ON categories
  FOR SELECT
  USING (true);

-- 创建触发器自动更新 updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_works_updated_at
  BEFORE UPDATE ON works
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
