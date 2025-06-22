export interface SidebarNode {
  key: string;
  label: string;
  icon?: string;
  route?: string;
  children?: SidebarNode[];
}
