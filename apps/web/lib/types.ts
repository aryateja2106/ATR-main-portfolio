export interface Author {
	id: string;
	name: string;
	avatar: string;
	bio: string;
	twitter?: string;
	github?: string;
	website?: string;
}

export interface BlogPost {
	id: string;
	slug: string;
	title: string;
	description: string;
	excerpt: string;
	date: string;
	formattedDate: string;
	readTime: string;
	category: string;
	tags: string[];
	coverImage: string;
	author: Author;
	relatedArticles: string[];
	content: string;
	guide?: {
		purpose: string;
		audience: string[];
		outcomes: string[];
		prerequisites: string[];
		verifiedAt: string;
	};
	executiveSummary?: string;
	agentNavigation?: {
		useFor: string[];
		startAt: string;
	};
	sourceLicenses?: Array<{
		source: string;
		license: string;
		licenseUrl?: string;
		verifiedAt?: string;
	}>;
	reuse?: {
		editorial?: string;
		code?: string;
		approval?: string;
	};
}

export interface Category {
	id: string;
	name: string;
	description: string;
}
