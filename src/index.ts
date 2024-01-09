import { ReactiveControllerHost, TemplateResult } from "lit";

import {
  RowData,
  Table,
  TableOptions,
  TableOptionsResolved,
  createTable,
} from "@tanstack/table-core";

export * from "@tanstack/table-core";

export function flexRender<TProps extends {}>(
  component: string | ((props: TProps) => TemplateResult) | undefined,
  props: TProps
) {
  if (!component) return null;

  if (typeof component === "function") return component(props);

  return component;
}

export function TableController<TData extends RowData>(
  host: ReactiveControllerHost,
  initialOptions: TableOptions<TData>
) {
  const resolvedOptions: TableOptionsResolved<TData> = {
    state: {}, // Dummy state
    renderFallbackValue: null,
    onStateChange: () => {}, // noop
    ...initialOptions,
  };

  const table = createTable(resolvedOptions);

  table.setOptions((prev) => ({
    ...prev,
    initialOptions,
    state: {
      ...table.initialState,
      ...initialOptions.state,
    },
    onStateChange: (updater) => {
      initialOptions.onStateChange?.(updater);
      host.requestUpdate();
    },
  }));

  return table;
}
