/** Shared domain types for Vertical. */

export type NavLink = {
  href: string;
  label: string;
  index?: string;
};

export type SocialLink = {
  href: string;
  label: string;
  external?: boolean;
};

export type ProjectStatus = "live" | "archived" | "wip";

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  client?: string;
  year: string | number;
  role?: string;
  categories: string[];
  excerpt: string;
  description?: string;
  cover: string;
  gallery?: string[];
  videoUrl?: string;
  accentColor?: string;
  status?: ProjectStatus;
  featured?: boolean;
  desktopIcon?: string;
};

/** Visual theme for service color blocks */
export type ServiceTheme = "lime" | "cool" | "hot" | "ink" | "paper";

export type Service = {
  id: string;
  index: string;
  title: string;
  description: string;
  longDescription?: string;
  tags?: string[];
  deliverables?: string[];
  theme?: ServiceTheme;
  punch?: string;
};

export type ProcessStep = {
  index: string;
  title: string;
  description: string;
};

/** Desktop OS window ids */
export type DesktopWindowId =
  | `project:${string}`
  | "readme"
  | "about"
  | "trash"
  | "system";

export type DesktopWindowState = {
  id: DesktopWindowId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  z: number;
};
