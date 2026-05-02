import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Employee } from '@/components/EmployeeCard';

const EMPLOYEES_DIR = path.join(process.cwd(), 'content', 'employees');

export interface EmployeeWithContent extends Employee {
  content: string;
}

function parseEmployee(slug: string): EmployeeWithContent | null {
  const filePath = path.join(EMPLOYEES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    code: data.code,
    name: data.name,
    role: data.role,
    employer: data.employer,
    type: data.type,
    zone: data.zone,
    status: data.status,
    savings: data.savings,
    content,
  };
}

export function getAllEmployees(): EmployeeWithContent[] {
  if (!fs.existsSync(EMPLOYEES_DIR)) return [];

  const slugs = fs
    .readdirSync(EMPLOYEES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''));

  return slugs
    .map((slug) => parseEmployee(slug))
    .filter((e): e is EmployeeWithContent => e !== null);
}

export function getEmployee(slug: string): EmployeeWithContent | null {
  return parseEmployee(slug);
}

export function getAllEmployeeSlugs(): string[] {
  if (!fs.existsSync(EMPLOYEES_DIR)) return [];
  return fs
    .readdirSync(EMPLOYEES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''));
}
