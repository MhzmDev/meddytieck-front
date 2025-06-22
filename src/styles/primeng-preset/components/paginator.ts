import { PaginatorDesignTokens } from '@primeng/themes/types/paginator';

export const paginator: PaginatorDesignTokens = {
  root: {
    borderRadius: '0',
    padding: '0.5rem',
  },
  navButton: {
    selectedBackground: '{primary.500}',
    selectedColor: '{surface.0}',
  },
  css: `
    .p-paginator {
      margin-top: 1.25rem;
      justify-content: flex-end;
      &:dir(rtl) {
        justify-content: flex-start;
        & .p-iconwrapper {
          transform: scaleX(-1);
        }
      }
    }
    .p-paginator:dir(rtl), 
    .p-paginator-pages:dir(rtl) {
      flex-direction: row-reverse;
    }
    .p-paginator-page,
    .p-paginator-first,
    .p-paginator-last,
    .p-paginator-next,
    .p-paginator-prev {
      border: 1px solid var(--p-surface-100);
    }

    .p-paginator-current {
      color: var(--p-surface-300) !important;
      &:dir(rtl) {
        order: 1;
        margin-left: auto;
      }
    }
  `,
};
