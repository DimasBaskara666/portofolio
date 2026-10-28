export type DomainType = 'data' | 'software' | 'ai';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ArchitectureStep {
  step: number;
  label: string;
  description: string;
  tag?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  domain: DomainType;
  year: string;
  summary: string;
  technicalContext?: string;
  status?: 'completed' | 'in-progress' | 'planned';
  metrics: ProjectMetric[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  architectureSteps: ArchitectureStep[];
  featured?: boolean;
}

export interface SkillItem {
  name: string;
  context: string;
}

export interface CompetencyGroup {
  id: string;
  title: string;
  pillar: DomainType;
  description: string;
  skills: SkillItem[];
}

export interface EngineeringLog {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  category: string;
  tags: string[];
  readTime?: string;
}

export interface SystemTelemetry {
  status: string;
  currentFocus: string;
  location: string;
  timezone: string;
}
