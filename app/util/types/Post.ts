export interface Frontmatter {
  title: string;
  createdAt: Date;
  isPublished?: boolean;
  updatedAt: Date;
}

export interface Post {
  frontmatter: Frontmatter;
  content: string;
}
