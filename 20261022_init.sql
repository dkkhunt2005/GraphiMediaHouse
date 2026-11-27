-- Graphi Media House Database Schema & Security Policies
-- Migration: 20261022_init.sql

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Project Inquiries Table
CREATE TABLE IF NOT EXISTS public.project_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    company_name TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service_type TEXT NOT NULL,
    budget_range TEXT NOT NULL,
    project_location TEXT,
    project_timeline TEXT,
    project_description TEXT NOT NULL,
    consent_to_contact BOOLEAN NOT NULL DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexing for fast administrative search and sorting
CREATE INDEX IF NOT EXISTS idx_project_inquiries_created_at ON public.project_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_inquiries_status ON public.project_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_project_inquiries_service ON public.project_inquiries(service_type);

-- 2. Row Level Security (RLS) Configuration
ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;

-- Deny all by default
-- Allow public anon users to ONLY insert their inquiries (cannot read, cannot modify, cannot delete)
CREATE POLICY "Allow public anonymous submission of project inquiries" 
    ON public.project_inquiries 
    FOR INSERT 
    TO anon, authenticated
    WITH CHECK (
        length(trim(full_name)) > 1 AND
        length(trim(email)) > 5 AND
        length(trim(phone)) >= 8 AND
        length(trim(project_description)) > 5 AND
        consent_to_contact = true
    );

-- Allow authenticated administrative users to view inquiries
CREATE POLICY "Allow authenticated administrators full access to project inquiries" 
    ON public.project_inquiries 
    FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

-- 3. Demonstration & Portfolio Projects Table (for CMS capability)
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    year TEXT NOT NULL,
    client_studio TEXT NOT NULL,
    hero_image TEXT NOT NULL,
    gallery_images TEXT[] DEFAULT '{}',
    short_description TEXT NOT NULL,
    background TEXT NOT NULL,
    challenge TEXT NOT NULL,
    approach TEXT NOT NULL,
    outcome TEXT NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    is_demonstration BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Allow public to read published projects only
CREATE POLICY "Allow public read of published projects"
    ON public.portfolio_projects
    FOR SELECT
    TO anon, authenticated
    USING (is_published = true);

-- Allow authenticated administrators full management of portfolio
CREATE POLICY "Allow authenticated administrators manage portfolio"
    ON public.portfolio_projects
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
