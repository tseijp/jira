CREATE TABLE hour (
  id TEXT PRIMARY KEY,
  title TEXT,
  content TEXT,
  updated_at TEXT DEFAULT (datetime('now')),
  created_at TEXT DEFAULT (datetime('now')),
);