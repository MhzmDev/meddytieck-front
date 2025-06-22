import { SidebarNode } from '../model/sidebar.model';

export function findNodeWithParentsHasRoute(
  nodes: SidebarNode[],
  url: string,
): {
  node: SidebarNode | null;
  parents: SidebarNode[];
} {
  const parents: SidebarNode[] = [];
  for (const node of nodes) {
    if (node.route && url.includes(node.route)) {
      return { node, parents };
    }
    if (node.children) {
      const res = findNodeWithParentsHasRoute(node.children, url);
      if (res.node) {
        return { node: res.node, parents: [...parents, node, ...res.parents] };
      }
    }
  }
  return { node: null, parents: [] };
}
