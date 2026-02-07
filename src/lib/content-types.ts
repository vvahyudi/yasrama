export const NEWS_STATUS = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;
export type NewsStatus = (typeof NEWS_STATUS)[number];

export const ACTIVITY_TYPES = [
	"ACADEMIC",
	"EXTRACURRICULAR",
	"COMMUNITY",
	"OTHER",
] as const;
export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export const INSTITUTION_TYPES = ["PAUD", "SD"] as const;
export type InstitutionType = (typeof INSTITUTION_TYPES)[number];

export interface NewsSummary {
	id: string;
	slug: string;
	title: string;
	description: string;
	image: string | null;
	featured: boolean;
	status: NewsStatus;
	createdAt: string;
	authorName: string | null;
}

export interface ActivitySummary {
	id: string;
	slug: string;
	title: string;
	description: string;
	image: string | null;
	type: ActivityType;
	institution: InstitutionType | null;
	featured: boolean;
	createdAt: string;
	authorName: string | null;
}

