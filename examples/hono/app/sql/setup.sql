DROP TABLE IF EXISTS Board;
CREATE TABLE Board (
  id TEXT PRIMARY KEY,
  title TEXT,
  content TEXT,
  updated_at TEXT DEFAULT (datetime('now')),
  created_at TEXT DEFAULT (datetime('now'))
);
INSERT INTO Hour (id, title, content) VALUES (1, '202401', '# TODO'), (4, '202402', '# TODO'), (11, '202403', '# TODO'), (13, '202404', '# TODO');

DROP TABLE IF EXISTS Hour;
CREATE TABLE Hour (
  id TEXT PRIMARY KEY,
  title TEXT,
  content TEXT,
  updated_at TEXT DEFAULT (datetime('now')),
  created_at TEXT DEFAULT (datetime('now'))
);
INSERT INTO Hour (id, title, content) VALUES (1, '202401', '# TODO'), (4, '202402', '# TODO'), (11, '202403', '# TODO'), (13, '202404', '# TODO');