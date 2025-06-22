import { MenuDesignTokens } from '@primeng/themes/types/menu';

export const menu: MenuDesignTokens = {
  root: {
    borderRadius: '{border.radius.lg}',
  },
  item: {
    focusBackground: '{primary.50}',
  },
  css: `
    .p-menu-submenu-label {
      display: none;
    }
    .p-menu {
      min-width: 10rem;
    }
  `,
};
