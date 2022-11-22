export interface Frontmatter {
  title: string;
  created_on: string;
}

export interface Post {
  frontmatter: Frontmatter;
  content: string;
}
