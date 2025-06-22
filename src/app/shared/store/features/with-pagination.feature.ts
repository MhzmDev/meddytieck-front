import { updateState } from '@angular-architects/ngrx-toolkit';
import { computed, Signal } from '@angular/core';
import {
  SignalStoreFeature,
  signalStoreFeature,
  type,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

type NamedState<StateName extends string> = {
  [K in StateName as `${K}Page`]: number;
} & {
  [K in StateName as `${K}PageSize`]: number;
};
type NamedProps<StateName extends string> = {
  [K in StateName as `${K}TotalItems`]: Signal<number>;
} & {
  [K in StateName as `${K}First`]: Signal<number>;
};
type NamedMethods<StateName extends string> = {
  [K in StateName as `set${Capitalize<K>}Page`]: (page: number) => void;
} & {
  [K in StateName as `set${Capitalize<K>}First`]: (page: number) => void;
} & {
  [K in StateName as `set${Capitalize<K>}PageSize`]: (pageSize: number) => void;
} & {
  [K in StateName as `${K}NextPage`]: () => void;
} & {
  [K in StateName as `${K}PreviousPage`]: () => void;
};

export function withPagination<StateName extends string, Prefix extends string>(
  name: StateName,
  prefix: Prefix,
): SignalStoreFeature<
  {
    state: Record<
      StateName,
      {
        count: number;
        pageIndex: number;
        pageSize: number;
      } | null
    >;
    // eslint-disable-next-line
    methods: {};
    // eslint-disable-next-line
    props: {};
  },
  {
    state: NamedState<Prefix>;
    props: NamedProps<Prefix>;
    methods: NamedMethods<Prefix>;
  }
>;
export function withPagination<StateName extends string>(
  name: StateName,
): SignalStoreFeature<
  {
    state: Record<
      StateName,
      {
        count: number;
        pageIndex: number;
        pageSize: number;
      } | null
    >;
    // eslint-disable-next-line
    methods: {};
    // eslint-disable-next-line
    props: {};
  },
  {
    state: {
      page: number;
      pageSize: number;
    };
    props: { totalItems: Signal<number>; first: Signal<number> };
    methods: {
      setPage: (page: number) => void;
      setFirst: (first: number) => void;
      setPageSize: (pageSize: number) => void;
      nextPage: () => void;
      previousPage: () => void;
    };
  }
>;
export function withPagination(
  name: string,
  prefix?: string,
  // eslint-disable-next-line
): SignalStoreFeature<any, any> {
  const {
    setPageSizeName,
    previousPageName,
    firstName,
    pageSizeName,
    setPageName,
    totalItemsName,
    pageName,
    setFirstName,
  } = createPaginationKeys(prefix);
  return signalStoreFeature(
    {
      state: type<
        Record<
          string,
          {
            count: number;
            pageIndex: number;
            pageSize: number;
          } | null
        >
      >(),
    },
    withState({
      [pageName]: 1,
      [pageSizeName]: 5,
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    withComputed((store: any) => ({
      [totalItemsName]: computed(() => store[name]()?.count),
      [firstName]: computed(() => {
        const page = store[pageName];
        const pageSize = store[pageSizeName];
        return (page() - 1) * pageSize();
      }),
    })),
    // eslint-disable-next-line
    withMethods((store: any) => ({
      [setPageName]: (page: number) => {
        updateState(store, `setPageTo(${page})`, { [pageName]: page });
      },
      [setPageSizeName]: (pageSize: number) => {
        updateState(store, `setPageSizeTo(${pageSize})`, {
          [pageSizeName]: pageSize,
        });
      },
      [prefix ? `${prefix}NextPage` : 'nextPage']: () => {
        const page = store[pageName]();
        const pageSize = store[pageSizeName]();
        const totalItems = store[totalItemsName]();
        const nextPageNo = Math.min(page + 1, Math.ceil(totalItems / pageSize));
        updateState(store, `setPageTo(${nextPageNo})`, {
          [pageName]: nextPageNo,
        });
      },
      [previousPageName]: () => {
        const prevPage = Math.max(0, store[pageName]() - 1);
        updateState(store, `setPageTo(${prevPage})`, { [pageName]: prevPage });
      },
      [setFirstName]: (first: number) => {
        const rows = store[pageSizeName]();
        const page = Math.floor(first / rows) + 1;
        updateState(store, `setFirstTo(${page})`, { [pageName]: page });
      },
    })),
  );
}

function createPaginationKeys(prefix: string | undefined) {
  return {
    pageName: prefix ? `${prefix}Page` : 'page',
    pageSizeName: prefix ? `${prefix}PageSize` : 'pageSize',
    totalItemsName: prefix ? `${prefix}TotalItems` : 'totalItems',
    firstName: prefix ? `${prefix}First` : 'first',
    previousPageName: prefix ? `${prefix}PreviousPage` : 'previousPage',
    setPageName: prefix
      ? `set${prefix[0].toUpperCase() + prefix.slice(1)}Page`
      : 'setPage',
    setPageSizeName: prefix
      ? `set${prefix[0].toUpperCase() + prefix.slice(1)}PageSize`
      : 'setPageSize',
    setFirstName: prefix
      ? `set${prefix[0].toUpperCase() + prefix.slice(1)}First`
      : 'setFirst',
  };
}
