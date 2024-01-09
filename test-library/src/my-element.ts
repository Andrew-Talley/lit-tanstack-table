import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import { TableController, flexRender, getCoreRowModel } from "../../src/index";

@customElement("my-element")
export class MyElement extends LitElement {
  private table = TableController(this, {
    columns: [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => html`Name: ${info.getValue()}`,
      },
      { accessorKey: "age", header: "Age" },
    ],
    data: [
      { name: "John", age: 20 },
      { name: "Jane", age: 21 },
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  render() {
    return html`
      <table>
        <thead>
          ${this.table
            .getLeafHeaders()
            .map(
              (header) =>
                html`<th>
                  ${flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>`
            )}
        </thead>
        <tbody>
          ${this.table.getRowModel().flatRows.map(
            (row) => html` <tr>
                ${row
                  .getAllCells()
                  .map(
                    (cell) =>
                      html`<td>
                        ${flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>`
                  )}
              </tr>

              <tr></tr>`
          )}
        </tbody>
      </table>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}
