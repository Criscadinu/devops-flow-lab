-- Renumber missions v2: definitive DevOps Handbook hierarchy
-- Run in safe order to avoid chain conflicts: process "leaf" targets first

-- Chain: M-14→M-23 (safe first — M-23 is new)
UPDATE "UserProgress" SET "moduleId" = 'M-23' WHERE "moduleId" = 'M-14';
-- Chain continues upstream
UPDATE "UserProgress" SET "moduleId" = 'M-14' WHERE "moduleId" = 'M-07';
UPDATE "UserProgress" SET "moduleId" = 'M-07' WHERE "moduleId" = 'M-06';
UPDATE "UserProgress" SET "moduleId" = 'M-06' WHERE "moduleId" = 'M-05';
UPDATE "UserProgress" SET "moduleId" = 'M-05' WHERE "moduleId" = 'M-04';
-- M-10 → M-04 (M-04 is now free)
UPDATE "UserProgress" SET "moduleId" = 'M-04' WHERE "moduleId" = 'M-10';

-- Chain: M-15→M-24 (safe first — M-24 is new)
UPDATE "UserProgress" SET "moduleId" = 'M-24' WHERE "moduleId" = 'M-15';
-- M-08 → M-15 (M-15 now free)
UPDATE "UserProgress" SET "moduleId" = 'M-15' WHERE "moduleId" = 'M-08';

-- Chain: M-19→M-25 (safe first — M-25 is new)
UPDATE "UserProgress" SET "moduleId" = 'M-25' WHERE "moduleId" = 'M-19';
UPDATE "UserProgress" SET "moduleId" = 'M-19' WHERE "moduleId" = 'M-18';
UPDATE "UserProgress" SET "moduleId" = 'M-18' WHERE "moduleId" = 'M-17';
UPDATE "UserProgress" SET "moduleId" = 'M-17' WHERE "moduleId" = 'M-16';
-- M-09 → M-16 (M-16 now free)
UPDATE "UserProgress" SET "moduleId" = 'M-16' WHERE "moduleId" = 'M-09';

-- M-20→M-26 (safe — M-26 is new)
UPDATE "UserProgress" SET "moduleId" = 'M-26' WHERE "moduleId" = 'M-20';
-- M-11 → M-20 (M-20 now free)
UPDATE "UserProgress" SET "moduleId" = 'M-20' WHERE "moduleId" = 'M-11';

-- M-21→M-27 (safe — M-27 is new)
UPDATE "UserProgress" SET "moduleId" = 'M-27' WHERE "moduleId" = 'M-21';

-- Planned missions (no real pages, but may exist in DB from test controls)
UPDATE "UserProgress" SET "moduleId" = 'M-21' WHERE "moduleId" = 'M-12';
UPDATE "UserProgress" SET "moduleId" = 'M-22' WHERE "moduleId" = 'M-13';
