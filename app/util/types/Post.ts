export interface Frontmatter {
  title: string;
  created_on: string;
  is_published?: boolean;
}

export interface Post {
  frontmatter: Frontmatter;
  content: string;
}
