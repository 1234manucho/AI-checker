export type ContentType = 'text' | 'image' | 'video' | 'audio';

export type VerificationStatus = 'true' | 'false' | 'partially_true' | 'unverified';

export interface Source {
  name: string;
  url: string;
  trustScore: number;
}

export interface FactCheckResult {
  id: string;
  content: string;
  contentType: ContentType;
  verificationStatus: string;
  credibilityScore: number;
  sources: Source[];
  explanation: string;
  additionalContext?: string;
  detectedIssues?: string[];
  timestamp: string;
  language: string;
}