-- Migration 0007: Review Helpfulness & Voting
ALTER TABLE reviews ADD COLUMN helpful_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE reviews ADD COLUMN unhelpful_count INTEGER NOT NULL DEFAULT 0;
