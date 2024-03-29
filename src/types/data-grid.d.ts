declare module "@mui/x-data-grid" {
  /// <reference types="react" />
  import * as React$1 from "react";
  import { IconButtonProps } from "@mui/material/IconButton";
  import { MenuItemProps } from "@mui/material/MenuItem";
  import { InputBaseProps } from "@mui/material/InputBase";
  import { SelectProps } from "@mui/material/Select";
  import { ClickAwayListenerProps } from "@mui/material/ClickAwayListener";
  import { PopperProps } from "@mui/material/Popper";
  import * as _mui_material_OverridableComponent from "@mui/material/OverridableComponent";
  import * as _mui_material from "@mui/material";
  import { InternalStandardProps } from "@mui/material";
  import { TextFieldProps } from "@mui/material/TextField";
  import { ButtonProps } from "@mui/material/Button";
  import { TooltipProps } from "@mui/material/Tooltip";
  import { ComponentsPropsList } from "@mui/material/styles";
  import * as reselect from "reselect";

  interface GridBodyProps {
    children?: React$1.ReactNode;
  }
  declare function GridBody(props: GridBodyProps): JSX.Element;
  declare namespace GridBody {
    var propTypes: any;
  }

  declare function GridErrorHandler(props: any): JSX.Element;

  declare function GridFooterPlaceholder(): JSX.Element | null;

  declare function GridHeaderPlaceholder(): JSX.Element;

  declare function GridOverlays(): JSX.Element | null;

  interface GridFilterItem {
    id?: number | string;
    columnField?: string;
    value?: any;
    operatorValue?: string;
  }
  declare enum GridLinkOperator {
    And = "and",
    Or = "or",
  }

  interface GridFilterInputValueProps {
    item: GridFilterItem;
    applyValue: (value: GridFilterItem) => void;
    apiRef: any;
  }

  /**
   * The mode of the cell.
   */
  declare type GridCellMode = "edit" | "view";
  /**
   * The mode of the row.
   */
  declare type GridRowMode = "edit" | "view";
  /**
   * The cell value type.
   */
  declare type GridCellValue =
    | string
    | number
    | boolean
    | Date
    | null
    | undefined
    | object;
  /**
   * The coordinates of cell represented by their row and column indexes.
   */
  interface GridCellIndexCoordinates {
    colIndex: number;
    rowIndex: number;
  }
  /**
   * The coordinates of column header represented by their row and column indexes.
   */
  interface GridColumnHeaderIndexCoordinates {
    colIndex: number;
  }

  declare type GridRowsProp = Readonly<GridRowModel[]>;
  /**
   * @deprecated prefer GridRowModel.
   */
  declare type GridRowData<
    T = {
      [key: string]: any;
    }
  > = T;
  /**
   * The key value object representing the data of a row.
   */
  declare type GridRowModel<
    T = {
      [key: string]: any;
    }
  > = T;
  declare type GridUpdateAction = "delete";
  interface GridRowModelUpdate extends GridRowModel {
    _action?: GridUpdateAction;
  }
  interface GridRowTreeNodeConfig {
    id: GridRowId;
    children?: GridRowTreeConfig;
    descendantsCount?: number;
    expanded?: boolean;
    /**
     * If `true`, this node has been automatically added to fill a gap in the tree structure
     */
    fillerNode?: boolean;
  }
  declare type GridRowTreeConfig = Map<string, GridRowTreeNodeConfig>;
  declare type GridRowsLookup = Record<GridRowId, GridRowModel>;
  /**
   * The type of Id supported by the grid.
   */
  declare type GridRowId = string | number;
  /**
   * The function to retrieve the id of a [[GridRowModel]].
   */
  declare type GridRowIdGetter = (row: GridRowModel) => GridRowId;
  /**
   * An helper function to check if the id provided is valid.
   *
   * @param {GridRowId} id Id as [[GridRowId]].
   * @param {GridRowModel | Partial<GridRowModel>} row Row as [[GridRowModel]].
   * @param {string} detailErrorMessage A custom error message to display for invalid IDs
   */
  declare function checkGridRowIdIsValid(
    id: GridRowId,
    row: GridRowModel | Partial<GridRowModel>,
    detailErrorMessage?: string
  ): void;

  interface GridEditCellProps {
    value: GridCellValue;
    [prop: string]: any;
  }
  declare type GridEditRowProps = {
    [field: string]: GridEditCellProps;
  };
  declare type GridEditRowsModel = {
    [rowId: string]: GridEditRowProps;
  };
  declare type GridEditMode = "cell" | "row";
  declare enum GridEditModes {
    Cell = "cell",
    Row = "row",
  }
  declare enum GridCellModes {
    Edit = "edit",
    View = "view",
  }
  declare enum GridRowModes {
    Edit = "edit",
    View = "view",
  }

  /**
   * Object passed as parameter in the column [[GridColDef]] cell renderer.
   */
  interface GridCellParams<V = any, R = any, F = V> {
    /**
     * The grid row id.
     */
    id: GridRowId;
    /**
     * The column field of the cell that triggered the event
     */
    field: string;
    /**
     * The cell value, but if the column has valueGetter, use getValue.
     */
    value: V;
    /**
     * The cell value formatted with the column valueFormatter.
     */
    formattedValue: F;
    /**
     * The row model of the row that the current cell belongs to.
     */
    row: GridRowModel<R>;
    /**
     * The column of the row that the current cell belongs to.
     */
    colDef: GridStateColDef;
    /**
     * If true, the cell is editable.
     */
    isEditable?: boolean;
    /**
     * The mode of the cell.
     */
    cellMode: GridCellMode;
    /**
     * If true, the cell is the active element.
     */
    hasFocus: boolean;
    /**
     * the tabIndex value.
     */
    tabIndex: 0 | -1;
    /**
     * Get the cell value of a row and field.
     * @param {GridRowId} id The row id.
     * @param {string} field The field.
     * @returns {GridCellValue} The cell value.
     */
    getValue: (id: GridRowId, field: string) => GridCellValue;
  }
  /**
   * GridCellParams containing api.
   */
  interface GridRenderCellParams<V = any, R = any, F = V>
    extends GridCellParams<V, R, F> {
    /**
     * GridApi that let you manipulate the grid.
     */
    api: any;
  }
  /**
   * GridEditCellProps containing api.
   */
  interface GridRenderEditCellParams extends GridEditCellProps {
    /**
     * GridApi that let you manipulate the grid.
     */
    api: any;
  }
  /**
   * Alias of GridRenderCellParams.
   */
  declare type GridValueGetterParams = Omit<
    GridRenderCellParams,
    "formattedValue" | "isEditable"
  >;
  /**
   * Object passed as parameter in the column [[GridColDef]] value setter callback.
   */
  interface GridValueSetterParams {
    /**
     * The new cell value.
     */
    value: GridCellValue;
    /**
     * The row that is being editted.
     */
    row: GridRowModel;
  }
  /**
   * Object passed as parameter in the column [[GridColDef]] value formatter callback.
   */
  interface GridValueFormatterParams {
    /**
     * The grid row id.
     * It is not available when the value formatter is called by the filter panel.
     */
    id?: GridRowId;
    /**
     * The column field of the cell that triggered the event
     */
    field: string;
    /**
     * The cell value, but if the column has valueGetter, use getValue.
     */
    value: GridCellValue;
    /**
     * GridApi that let you manipulate the grid.
     */
    api: any;
  }

  interface GridFilterOperator {
    label?: string;
    value: string;
    getApplyFilterFn: (
      filterItem: GridFilterItem,
      column: GridStateColDef
    ) => null | ((params: GridCellParams) => boolean);
    InputComponent?: React$1.JSXElementConstructor<GridFilterInputValueProps>;
    InputComponentProps?: Record<string, any>;
  }

  declare const getGridBooleanOperators: () => GridFilterOperator[];

  declare const getGridDateOperators: (
    showTime?: boolean | undefined
  ) => GridFilterOperator[];

  declare const getGridNumericColumnOperators: () => GridFilterOperator[];

  declare const getGridSingleSelectOperators: () => GridFilterOperator[];

  declare const getGridStringOperators: () => GridFilterOperator[];

  declare type GridNativeColTypes =
    | "string"
    | "number"
    | "date"
    | "dateTime"
    | "boolean"
    | "singleSelect"
    | "actions";
  declare type GridColType = GridNativeColTypes | string;

  declare const getGridColDef: (
    columnTypes: any,
    type: GridColType | undefined
  ) => any;

  /**
   * A function used to process cellClassName params.
   */
  declare type GridCellClassFn = (params: GridCellParams) => string;
  /**
   * The union type representing the [[GridColDef]] cell class type.
   */
  declare type GridCellClassNamePropType = string | GridCellClassFn;

  /**
   * Object passed as parameter in the column [[GridColDef]] header renderer.
   */
  interface GridColumnHeaderParams {
    /**
     * The column field of the column that triggered the event
     */
    field: string;
    /**
     * The column of the current header component.
     */
    colDef: GridStateColDef;
  }

  /**
   * A function used to process headerClassName params.
   */
  declare type GridColumnHeaderClassFn = (
    params: GridColumnHeaderParams
  ) => string;
  /**
   * The union type representing the [[GridColDef]] column header class type.
   */
  declare type GridColumnHeaderClassNamePropType =
    | string
    | GridColumnHeaderClassFn;

  declare type GridSortDirection = "asc" | "desc" | null | undefined;
  declare type GridFieldComparatorList = {
    field: string;
    comparator: GridComparatorFn;
  }[];
  interface GridSortCellParams {
    id: GridRowId;
    field: string;
    value: GridCellValue;
    api: any;
  }
  /**
   * The type of the sort comparison function.
   */
  declare type GridComparatorFn = (
    v1: GridCellValue,
    v2: GridCellValue,
    cellParams1: GridSortCellParams,
    cellParams2: GridSortCellParams
  ) => number;
  /**
   * Object that represents the column sorted data, part of the [[GridSortModel]].
   */
  interface GridSortItem {
    /**
     * The column field identifier.
     */
    field: string;
    /**
     * The direction of the column that the grid should sort.
     */
    sort: GridSortDirection;
  }
  /**
   * The model used for sorting the grid.
   */
  declare type GridSortModel = GridSortItem[];

  /**
   * Object passed as parameter in the row callbacks.
   */
  interface GridRowParams<R extends GridRowModel = GridRowModel> {
    /**
     * The grid row id.
     */
    id: GridRowId;
    /**
     * The row model of the row that the current cell belongs to.
     */
    row: R;
    /**
     * All grid columns.
     */
    columns: GridColumns;
    /**
     * Get the cell value of a row and field.
     * @param {GridRowId} id The row id.
     * @param {string} field The field.
     * @returns {GridCellValue} The cell value.
     */
    getValue: (id: GridRowId, field: string) => GridCellValue;
  }

  declare type GridActionsCellItemProps = {
    label: string;
    icon?: React$1.ReactElement;
  } & (
    | ({
        showInMenu?: false;
        icon: React$1.ReactElement;
      } & IconButtonProps)
    | ({
        showInMenu: true;
      } & MenuItemProps)
  );
  declare const GridActionsCellItem: {
    (props: GridActionsCellItemProps): JSX.Element;
    propTypes: any;
  };

  /**
   * Alignment used in position elements in Cells.
   */
  declare type GridAlignment = "left" | "right" | "center";
  /**
   * Column Definition interface.
   */
  interface GridColDef {
    /**
     * The column identifier. It's used to map with [[GridRowModel]] values.
     */
    field: string;
    /**
     * The title of the column rendered in the column header cell.
     */
    headerName?: string;
    /**
     * The description of the column rendered as tooltip if the column header name is not fully displayed.
     */
    description?: string;
    /**
     * Set the width of the column.
     * @default 100
     */
    width?: number;
    /**
     * If set, it indicates that a column has fluid width. Range [0, ∞).
     */
    flex?: number;
    /**
     * Sets the minimum width of a column.
     * @default 50
     */
    minWidth?: number;
    /**
     * If `true`, hide the column.
     * @default false
     */
    hide?: boolean;
    /**
     * If `true`, the column is sortable.
     * @default true
     */
    sortable?: boolean;
    /**
     * If `true`, the column is resizable.
     * @default true
     */
    resizable?: boolean;
    /**
     * If `true`, the cells of the column are editable.
     * @default false
     */
    editable?: boolean;
    /**
     * A comparator function used to sort rows.
     */
    sortComparator?: GridComparatorFn;
    /**
     * Type allows to merge this object with a default definition [[GridColDef]].
     * @default 'string'
     */
    type?: GridColType;
    /**
     * To be used in combination with `type: 'singleSelect'`. This is an array of the possible cell values and labels.
     */
    valueOptions?: Array<
      | string
      | number
      | {
          value: any;
          label: string;
        }
    >;
    /**
     * Allows to align the column values in cells.
     */
    align?: GridAlignment;
    /**
     * Function that allows to get a specific data instead of field to render in the cell.
     * @param {GridValueGetterParams} params Object containing parameters for the getter.
     * @returns {GridCellValue} The cell value.
     */
    valueGetter?: (params: GridValueGetterParams) => GridCellValue;
    /**
     * Function that allows to customize how the entered value is stored in the row.
     * It only works with cell/row editing.
     * @param {GridValueSetterParams} params Object containing parameters for the setter.
     * @returns {GridRowModel} The row with the updated field.
     */
    valueSetter?: (params: GridValueSetterParams) => GridRowModel;
    /**
     * Function that allows to apply a formatter before rendering its value.
     * @param {GridValueFormatterParams} params Object containing parameters for the formatter.
     * @returns {GridCellValue} The formatted value.
     */
    valueFormatter?: (params: GridValueFormatterParams) => GridCellValue;
    /**
     * Function that takes the user-entered value and converts it to a value used internally.
     * @param {GridCellValue} value The user-entered value.
     * @param {GridCellParams} params The params when called before saving the value.
     * @returns {GridCellValue} The converted value to use internally.
     */
    valueParser?: (
      value: GridCellValue,
      params?: GridCellParams
    ) => GridCellValue;
    /**
     * Class name that will be added in cells for that column.
     */
    cellClassName?: GridCellClassNamePropType;
    /**
     * Allows to override the component rendered as cell for this column.
     * @param {GridRenderCellParams} params Object containing parameters for the renderer.
     * @returns {React.ReactNode} The element to be rendered.
     */
    renderCell?: (params: GridRenderCellParams) => React$1.ReactNode;
    /**
     * Allows to override the component rendered in edit cell mode for this column.
     * @param {GridRenderEditCellParams} params Object containing parameters for the renderer.
     * @returns {React.ReactNode} The element to be rendered.
     */
    renderEditCell?: (params: GridRenderEditCellParams) => React$1.ReactNode;
    /**
     * Class name that will be added in the column header cell.
     */
    headerClassName?: GridColumnHeaderClassNamePropType;
    /**
     * Allows to render a component in the column header cell.
     * @param {GridColumnHeaderParams} params Object containing parameters for the renderer.
     * @returns {React.ReactNode} The element to be rendered.
     */
    renderHeader?: (params: GridColumnHeaderParams) => React$1.ReactNode;
    /**
     * Header cell element alignment.
     */
    headerAlign?: GridAlignment;
    /**
     * Toggle the visibility of the sort icons.
     * @default false
     */
    hideSortIcons?: boolean;
    /**
     * If `true`, the column menu is disabled for this column.
     * @default false
     */
    disableColumnMenu?: boolean;
    /**
     * If `true`, the column is filterable.
     * @default true
     */
    filterable?: boolean;
    /**
     * Allows setting the filter operators for this column.
     */
    filterOperators?: GridFilterOperator[];
    /**
     * If `true`, this column cannot be reordered.
     * @default false
     */
    disableReorder?: boolean;
    /**
     * If `true`, this column will not be included in exports.
     * @default false
     */
    disableExport?: boolean;
  }
  interface GridActionsColDef extends GridColDef {
    /**
     * Type allows to merge this object with a default definition [[GridColDef]].
     * @default 'actions'
     */
    type: "actions";
    /**
     * Function that returns the actions to be shown.
     * @param {GridRowParams} params The params for each row.
     * @returns {React.ReactElement<GridActionsCellItemProps>[]} An array of [[GridActionsCell]] elements.
     */
    getActions: (
      params: GridRowParams
    ) => React$1.ReactElement<GridActionsCellItemProps>[];
  }
  declare type GridEnrichedColDef = GridColDef | GridActionsColDef;
  declare type GridColumns = GridEnrichedColDef[];
  declare type GridColTypeDef = Omit<GridColDef, "field"> & {
    extendType?: GridNativeColTypes;
  };
  declare type GridStateColDef = GridEnrichedColDef & {
    computedWidth: number;
  };
  /**
   * Meta Info about columns.
   */
  interface GridColumnsMeta {
    totalWidth: number;
    positions: number[];
  }
  declare type GridColumnLookup = {
    [field: string]: GridStateColDef;
  };
  interface GridColumnsState {
    all: string[];
    lookup: GridColumnLookup;
  }

  declare const GRID_ACTIONS_COL_DEF: GridColTypeDef;

  declare const GRID_BOOLEAN_COL_DEF: GridColTypeDef;

  declare const GRID_CHECKBOX_SELECTION_COL_DEF: GridColDef;

  declare function gridDateFormatter({
    value,
  }: {
    value: GridCellValue;
  }): string | number | boolean | object | null | undefined;
  declare function gridDateTimeFormatter({
    value,
  }: {
    value: GridCellValue;
  }): string | number | boolean | object | null | undefined;
  declare const GRID_DATE_COL_DEF: GridColTypeDef;
  declare const GRID_DATETIME_COL_DEF: GridColTypeDef;

  declare const GRID_NUMERIC_COL_DEF: GridColTypeDef;

  declare const GRID_SINGLE_SELECT_COL_DEF: GridColTypeDef;

  declare const GRID_STRING_COL_DEF: GridColTypeDef;

  declare type GridColumnTypesRecord = Record<GridColType, GridColTypeDef>;

  declare const DEFAULT_GRID_COL_TYPE_KEY = "__default__";
  declare const getGridDefaultColumnTypes: () => GridColumnTypesRecord;

  interface CursorCoordinates {
    x: number;
    y: number;
  }

  /**
   * The size of a container.
   */
  interface ElementSize {
    /**
     * The height of a container or HTMLElement.
     */
    height: number;
    /**
     * The width of a container or HTMLElement.
     */
    width: number;
  }

  interface GridScrollBarState {
    /**
     * Indicates if a vertical scrollbar is visible.
     */
    hasScrollY: boolean;
    /**
     * Indicates if an horizontal scrollbar is visible.
     */
    hasScrollX: boolean;
    /**
     * The scrollbars sizes.
     */
    sizes: {
      x: number;
      y: number;
    };
  }
  /**
   * the size of the container holding the set of rows visible to the user.
   */
  declare type GridViewportSizeState = ElementSize;
  /**
   * The set of container properties calculated on resize of the grid.
   */
  interface GridContainerProps {
    /**
     * If `true`, the grid is virtualizing the rendering of rows.
     */
    isVirtualized: boolean;
    /**
     * The number of rows that fit in the rendering zone.
     */
    renderingZonePageSize: number;
    /**
     * The number of rows that fit in the viewport.
     */
    viewportPageSize: number;
    /**
     * The total number of rows that are scrollable in the viewport. If pagination then it would be page size. If not, it would be the full set of rows.
     */
    virtualRowsCount: number;
    /**
     * The last page number.
     */
    lastPage: number;
    /**
     * The total element size required to render the set of rows, including scrollbars.
     */
    totalSizes: ElementSize;
    /**
     * The viewport size including scrollbars.
     */
    windowSizes: ElementSize;
    /**
     * The size of the container containing all the rendered rows.
     */
    renderingZone: ElementSize;
    /**
     * The size of the available scroll height in the rendering zone container.
     */
    renderingZoneScrollHeight: number;
    /**
     * The total element size required to render the full set of rows and columns, minus the scrollbars.
     */
    dataContainerSizes: ElementSize;
  }

  declare const GridFeatureModeConstant: {
    client: "client";
    server: "server";
  };
  declare type GridFeatureMode = "client" | "server";

  interface GridFilterModel {
    items: GridFilterItem[];
    linkOperator?: GridLinkOperator;
  }

  /**
   * The ref type of the inner grid root container.
   */
  declare type GridRootContainerRef = React$1.RefObject<HTMLDivElement>;

  /**
   * The object containing the column properties of the rendering state.
   */
  interface GridRenderColumnsProps {
    /**
     * The index of the first rendered column.
     */
    firstColIdx: number;
    /**
     * The index of the last rendered column.
     */
    lastColIdx: number;
    /**
     * The left offset required to position the viewport at the beginning of the first rendered column.
     */
    leftEmptyWidth: number;
    /**
     * The right offset required to position the viewport to the end of the last rendered column.
     */
    rightEmptyWidth: number;
  }
  /**
   * The object containing the row properties of the rendering state.
   */
  interface GridRenderRowProps {
    /**
     * The rendering zone page calculated from the scroll position.
     */
    page: number;
    /**
     * The index of the first rendered row.
     */
    firstRowIdx: number;
    /**
     * The index of the last rendered row.
     */
    lastRowIdx: number;
  }
  /**
   * The object containing the pagination properties of the rendering state.
   */
  interface GridRenderPaginationProps {
    /**
     * The current page if pagination is enabled.
     */
    paginationCurrentPage?: number;
    /**
     * The page size if pagination is enabled.
     */
    pageSize?: number;
  }
  /**
   * The full rendering state.
   */
  declare type GridRenderContextProps = GridRenderColumnsProps &
    GridRenderRowProps &
    GridRenderPaginationProps;

  declare type GridInputSelectionModel = GridRowId[] | GridRowId;
  declare type GridSelectionModel = GridRowId[];

  /**
   * Object passed as parameter of the column order change event.
   */
  interface GridColumnOrderChangeParams {
    /**
     * The HTMLElement column header element.
     */
    element?: HTMLElement | null;
    /**
     * The column field of the column that triggered the event.
     */
    field: string;
    /**
     * The column of the current header component.
     */
    colDef: GridStateColDef;
    /**
     * The target column index.
     */
    targetIndex: number;
    /**
     * The old column index.
     */
    oldIndex: number;
  }

  /**
   * Object passed as parameter of the column resize event.
   */
  interface GridColumnResizeParams {
    /**
     * The HTMLElement column header element.
     */
    element?: HTMLElement | null;
    /**
     * The column of the current header component.
     */
    colDef: GridStateColDef;
    /**
     * The width of the column.
     */
    width: number;
  }

  /**
   * Object passed as parameter of the column visibility change event.
   */
  interface GridColumnVisibilityChangeParams {
    /**
     * The field of the column which visibility changed.
     */
    field: string;
    /**
     * The column of the current header component.
     */
    colDef: GridStateColDef;
    /**
     * The visibility state of the column.
     */
    isVisible: boolean;
  }

  interface GridEditCellPropsParams {
    id: GridRowId;
    field: string;
    props: GridEditCellProps;
  }
  interface GridEditCellValueParams {
    id: GridRowId;
    field: string;
    value: GridCellValue;
  }
  interface GridCommitCellChangeParams {
    id: GridRowId;
    field: string;
  }
  interface GridCellEditCommitParams {
    id: GridRowId;
    field: string;
    value: GridCellValue;
  }

  /**
   * Object passed as parameter in the onRowsScrollEnd callback.
   */
  interface GridRowScrollEndParams {
    /**
     * The number of rows that fit in the viewport.
     */
    viewportPageSize: number;
    /**
     * The number of rows allocated for the rendered zone.
     */
    virtualRowsCount: number;
    /**
     * The grid visible columns.
     */
    visibleColumns: GridColumns;
  }

  interface GridScrollParams {
    left: number;
    top: number;
  }
  declare type GridScrollFn = (v: GridScrollParams) => void;

  /**
   * Object passed as parameter of the column sorted event.
   */
  interface GridSortModelParams {
    /**
     * The sort model used to sort the grid.
     */
    sortModel: GridSortModel;
    /**
     * The full set of columns.
     */
    columns: GridColumns;
    /**
     * Api that let you manipulate the grid.
     */
    api: any;
  }

  interface GridColumnMenuState {
    open: boolean;
    field?: string;
  }

  interface GridColumnReorderState {
    dragCol: string;
  }

  interface GridColumnResizeState {
    resizingColumnField: string;
  }

  /**
   * Available densities.
   */
  declare type GridDensity = "compact" | "standard" | "comfortable";
  /**
   * Density enum.
   */
  declare enum GridDensityTypes {
    Compact = "compact",
    Standard = "standard",
    Comfortable = "comfortable",
  }

  interface GridDensityState {
    value: GridDensity;
    rowHeight: number;
    headerHeight: number;
  }

  declare type GridCellIdentifier = {
    id: GridRowId;
    field: string;
  };
  declare type GridColumnIdentifier = {
    field: string;
  };
  interface GridFocusState {
    cell: GridCellIdentifier | null;
    columnHeader: GridColumnIdentifier | null;
  }
  interface GridTabIndexState {
    cell: GridCellIdentifier | null;
    columnHeader: GridColumnIdentifier | null;
  }

  declare enum GridPreferencePanelsValue {
    filters = "filters",
    columns = "columns",
  }

  interface GridPreferencePanelState {
    open: boolean;
    openedPanelValue?: GridPreferencePanelsValue;
  }
  declare type GridPreferencePanelInitialState = GridPreferencePanelState;

  interface GridRowsState {
    idRowsLookup: Record<GridRowId, GridRowModel>;
    allRows: GridRowId[];
    totalRowCount: number;
  }

  interface GridSortingState {
    sortedRows: GridRowId[];
    sortModel: GridSortModel;
  }
  interface GridSortingInitialState {
    sortModel?: GridSortModel;
  }

  interface GridRenderingState {
    virtualPage: number;
    virtualRowsCount: number;
    renderContext: Partial<GridRenderContextProps> | null;
    realScroll: GridScrollParams;
    renderingZoneScroll: GridScrollParams;
  }

  interface GridPaginationState {
    pageSize: number;
    page: number;
    pageCount: number;
    rowCount: number;
  }

  declare const getDefaultGridFilterModel: () => GridFilterModel;
  interface GridFilterState {
    filterModel: GridFilterModel;
    visibleRowsLookup: Record<GridRowId, boolean>;
    visibleRows: GridRowId[] | null;
  }
  interface GridFilterInitialState {
    filterModel?: GridFilterModel;
  }

  interface GridState {
    rows: GridRowsState;
    editRows: GridEditRowsModel;
    pagination: GridPaginationState;
    columns: GridColumnsState;
    columnReorder: GridColumnReorderState;
    columnResize: GridColumnResizeState;
    columnMenu: GridColumnMenuState;
    rendering: GridRenderingState;
    containerSizes: GridContainerProps | null;
    viewportSizes: GridViewportSizeState;
    scrollBar: GridScrollBarState;
    sorting: GridSortingState;
    focus: GridFocusState;
    tabIndex: GridTabIndexState;
    selection: GridSelectionModel;
    filter: GridFilterState;
    preferencePanel: GridPreferencePanelState;
    density: GridDensityState;
    error?: any;
  }
  interface GridInitialState {
    sorting?: GridSortingInitialState;
    filter?: GridFilterInitialState;
    preferencePanel?: GridPreferencePanelInitialState;
  }

  /**
   * The column API interface that is available in the grid [[apiRef]].
   */
  interface GridColumnApi {
    /**
     * Returns the [[GridColDef]] for the given `field`.
     * @param {string} field The column field.
     * @returns {{GridStateColDef}} The [[GridStateColDef]].
     */
    getColumn: (field: string) => GridStateColDef;
    /**
     * Returns an array of [[GridColDef]] containing all the column definitions.
     * @returns {GridStateColDef[]} An array of [[GridStateColDef]].
     */
    getAllColumns: () => GridStateColDef[];
    /**
     * Returns the currently visible columns.
     * @returns {GridStateColDef[]} An array of [[GridStateColDef]].
     */
    getVisibleColumns: () => GridStateColDef[];
    /**
     * Returns the [[GridColumnsMeta]] for each column.
     * @returns {GridColumnsMeta[]} All [[GridColumnsMeta]] objects.
     */
    getColumnsMeta: () => GridColumnsMeta;
    /**
     * Returns the index position of a column. By default, only the visible columns are considered.
     * Pass `false` to `useVisibleColumns` to consider all columns.
     * @param {string} field The column field.
     * @param {boolean} useVisibleColumns Determines if all columns or the visible ones should be considered.
     * @returns {number} The index position.
     */
    getColumnIndex: (field: string, useVisibleColumns?: boolean) => number;
    /**
     * Returns the left-position of a column relative to the inner border of the grid.
     * @param {string} field The column field.
     * @returns {number} The position in pixels.
     */
    getColumnPosition: (field: string) => number;
    /**
     * Updates the definition of a column.
     * @param {GridColDef} col The new [[GridColDef]] object.
     */
    updateColumn: (col: GridColDef) => void;
    /**
     * Updates the definition of multiple columns at the same time.
     * @param {GridColDef[]} cols The new column [[GridColDef]] objects.
     */
    updateColumns: (cols: GridColDef[]) => void;
    /**
     * Changes the visibility of the column referred by `field`.
     * @param {string} field The column to change visibility.
     * @param {boolean} isVisible Pass `true` to show the column, or `false` to hide it.
     */
    setColumnVisibility: (field: string, isVisible: boolean) => void;
    /**
     * Moves a column from its original position to the position given by `targetIndexPosition`.
     * @param {string} field The field name
     * @param {number} targetIndexPosition The new position (0-based).
     */
    setColumnIndex: (field: string, targetIndexPosition: number) => void;
    /**
     * Updates the width of a column.
     * @param {string} field The column field.
     * @param {number} width The new width.
     */
    setColumnWidth: (field: string, width: number) => void;
  }

  /**
   * The column menu API interface that is available in the grid [[apiRef]].
   */
  interface GridColumnMenuApi {
    /**
     * Display the column menu under the `field` column.
     * @param {string} field The column to display the menu.
     */
    showColumnMenu: (field: string) => void;
    /**
     * Hides the column menu that is open.
     */
    hideColumnMenu: () => void;
    /**
     * Toggles the column menu under the `field` column.
     * @param {string} field The field name to toggle the column menu.
     */
    toggleColumnMenu: (field: string) => void;
  }

  /**
   * Additional details passed to the callbacks
   */
  interface GridCallbackDetails {
    /**
     * Provided only if `DataGridPro` is being used.
     */
    api?: GridApi;
  }

  interface GridControlStateItem<TModel> {
    stateId: string;
    propModel?: TModel;
    stateSelector: (state: GridState) => TModel;
    propOnChange?: (model: TModel, details: GridCallbackDetails) => void;
    changeEvent: string;
  }

  /**
   * The control state API interface that is available in the grid `apiRef`.
   */
  interface GridControlStateApi {
    /**
     * Updates a control state that binds the model, the onChange prop, and the grid state together.
     * @param {GridControlStateItem<TModel>} controlState The [[GridControlStateItem]] to be registered.
     * @ignore - do not document.
     */
    updateControlState: <TModel>(
      controlState: GridControlStateItem<TModel>
    ) => void;
    /**
     * Allows the internal grid state to apply the registered control state constraint.
     * @param {GridState} state The new modified state that would be the next if the state is not controlled.
     * @returns {{ ignoreSetState: boolean, postUpdate: () => void }} ignoreSetState let the state know if it should update, and postUpdate is a callback function triggered if the state has updated.
     * @ignore - do not document.
     */
    applyControlStateConstraint: (state: GridState) => {
      ignoreSetState: boolean;
      postUpdate: () => void;
    };
  }

  declare type BaseEvent =
    | React$1.SyntheticEvent
    | DocumentEventMap[keyof DocumentEventMap]
    | {};
  declare type MuiEvent<E extends BaseEvent = BaseEvent> = E & {
    defaultMuiPrevented?: boolean;
  };

  declare type Listener = (...args: any[]) => void;
  declare class EventEmitter {
    /**
     * @ignore - do not document.
     */
    maxListeners: number;
    /**
     * @ignore - do not document.
     */
    warnOnce: boolean;
    /**
     * @ignore - do not document.
     */
    events: {
      [key: string]: Listener[];
    };
    /**
     * @ignore - do not document.
     */
    on(eventName: string, listener: Listener): void;
    /**
     * @ignore - do not document.
     */
    removeListener(eventName: string, listener: Listener): void;
    /**
     * @ignore - do not document.
     */
    removeAllListeners(eventName?: string): void;
    /**
     * @ignore - do not document.
     */
    emit(eventName: string, ...args: any[]): void;
    /**
     * @ignore - do not document.
     */
    once(eventName: string, listener: Listener): void;
  }

  declare type GridListener<Params, Event extends MuiEvent> = (
    params: Params,
    event: Event,
    details: GridCallbackDetails
  ) => void;
  declare type GridSubscribeEventOptions = {
    isFirst?: boolean;
  };
  declare class GridEventEmitter extends EventEmitter {
    /**
     * @ignore - do not document.
     */
    on<Params, Event extends MuiEvent>(
      eventName: string,
      listener: GridListener<Params, Event>,
      options?: GridSubscribeEventOptions
    ): void;
  }

  /**
   * The core API interface that is available in the grid `apiRef`.
   */
  interface GridCoreApi extends GridEventEmitter {
    /**
     * The react ref of the grid root container div element.
     * @ignore - do not document.
     */
    rootElementRef?: React$1.RefObject<HTMLDivElement>;
    /**
     * The react ref of the grid column container virtualized div element.
     * @ignore - do not document.
     */
    columnHeadersContainerElementRef?: React$1.RefObject<HTMLDivElement>;
    /**
     * The react ref of the grid column headers container element.
     * @ignore - do not document.
     */
    columnHeadersElementRef?: React$1.RefObject<HTMLDivElement>;
    /**
     * The react ref of the grid window container element.
     * @ignore - do not document.
     */
    windowRef?: React$1.RefObject<HTMLDivElement>;
    /**
     * The react ref of the grid data rendering zone.
     * @ignore - do not document.
     */
    renderingZoneRef?: React$1.RefObject<HTMLDivElement>;
    /**
     * The react ref of the grid header element.
     * @ignore - do not document.
     */
    headerRef?: React$1.RefObject<HTMLDivElement>;
    /**
     * The react ref of the grid footer element.
     * @ignore - do not document.
     */
    footerRef?: React$1.RefObject<HTMLDivElement>;
    /**
     * Registers a handler for an event.
     * @param {string} event The name of the event.
     * @param {function} handler The handler to be called.
     * @param {object} options Additional options for this listener.
     * @returns {function} A function to unsubscribe from this event.
     */
    subscribeEvent: <Params, Event extends MuiEvent>(
      event: string,
      handler: GridListener<Params, Event>,
      options?: GridSubscribeEventOptions
    ) => () => void;
    /**
     * Emits an event.
     * @param {string} name The name of the event.
     * @param {any} params Arguments to be passed to the handlers.
     * @param {MuiEvent<React.SyntheticEvent | DocumentEventMap[keyof DocumentEventMap]>} event The event object to pass forward.
     */
    publishEvent: (
      name: string,
      params?: any,
      event?: MuiEvent<
        React$1.SyntheticEvent | DocumentEventMap[keyof DocumentEventMap]
      >
    ) => void;
    /**
     * Displays the error overlay component.
     * @param {any} props Props to be passed to the `ErrorOverlay` component.
     */
    showError: (props: any) => void;
  }

  /**
   * The Clipboard API interface that is available in the grid [[apiRef]].
   */
  interface GridClipboardApi {
    /**
     * Copies the selected rows to the clipboard.
     * The fields will separated by the TAB character.
     * @param {boolean} includeHeaders Whether to include the headers or not. Default is `false`.
     * @ignore - do not document.
     */
    copySelectedRowsToClipboard: (includeHeaders?: boolean) => void;
  }

  /**
   * The options to apply on the CSV export.
   */
  interface GridCsvExportOptions {
    /**
     * The character used to separate fields.
     * @default ','
     */
    delimiter?: string;
    /**
     * The string used as the file name.
     * @default `document.title`
     */
    fileName?: string;
    /**
     * If `true`, the UTF-8 Byte Order Mark (BOM) prefixes the exported file.
     * This can allow Excel to automatically detect file encoding as UTF-8.
     * @default false
     */
    utf8WithBom?: boolean;
    /**
     * The columns exported in the CSV.
     * This should only be used if you want to restrict the columns exports.
     */
    fields?: string[];
    /**
     * If `true`, the hidden columns will also be exported.
     * @default false
     */
    allColumns?: boolean;
    /**
     * If `true, the first row of the CSV will include the headers of the grid.
     * @default true
     */
    includeHeaders?: boolean;
  }
  /**
   * The options to apply on the Print export.
   */
  interface GridPrintExportOptions {
    /**
     * The value to be used as the print window title.
     * @default The title of the page.
     */
    fileName?: string;
    /**
     * The columns to be printed.
     * This should only be used if you want to restrict the columns exported.
     */
    fields?: string[];
    /**
     * If `true`, the hidden columns will also be printed.
     * @default false
     */
    allColumns?: boolean;
    /**
     * If `true`, the toolbar is removed for when printing.
     * @default false
     */
    hideToolbar?: boolean;
    /**
     * If `true`, the footer is removed for when printing.
     * @default false
     */
    hideFooter?: boolean;
    /**
     * If `false`, all <style> and <link type="stylesheet" /> tags from the <head> will not be copied
     * to the print window.
     * @default true
     */
    copyStyles?: boolean;
    /**
     * One or more classes passed to the print window.
     */
    bodyClassName?: string;
    /**
     * Provide Print specific styles to the print window.
     */
    pageStyle?: string | Function;
  }
  /**
   * Available export formats.
   */
  declare type GridExportFormat = "csv" | "print";

  /**
   * The CSV export API interface that is available in the grid [[apiRef]].
   */
  interface GridCsvExportApi {
    /**
     * Returns the grid data as a CSV string.
     * This method is used internally by `exportDataAsCsv`.
     * @param {GridCsvExportOptions} options The options to apply on the export.
     * @returns {string} The data in the CSV format.
     */
    getDataAsCsv: (options?: GridCsvExportOptions) => string;
    /**
     * Downloads and exports a CSV of the grid's data.
     * @param {GridCsvExportOptions} options The options to apply on the export.
     */
    exportDataAsCsv: (options?: GridCsvExportOptions) => void;
  }

  interface GridDensityOption {
    icon: React$1.ReactElement;
    label: string;
    value: GridDensityTypes;
  }
  /**
   * The density API interface that is available in the grid `apiRef`.
   */
  interface GridDensityApi {
    /**
     * Sets the density of the grid.
     * @param {string} density Can be: `"compact"`, `"standard"`, `"comfortable"`.
     * @param {number} headerHeight The new header height.
     * @param {number} rowHeight The new row height.
     */
    setDensity: (
      density: GridDensity,
      headerHeight?: number,
      rowHeight?: number
    ) => void;
  }

  /**
   * The editing API interface that is available in the grid `apiRef`.
   */
  interface GridEditRowApi {
    /**
     * Set the edit rows model of the grid.
     * @param {GridEditRowsModel} model The new edit rows model.
     */
    setEditRowsModel: (model: GridEditRowsModel) => void;
    /**
     * Gets the edit rows model of the grid.
     * @returns {GridEditRowsModel} The edit rows model.
     */
    getEditRowsModel: () => GridEditRowsModel;
    /**
     * Sets the mode of a cell.
     * @param {GridRowId} id The id of the row.
     * @param {string} field The field to change the mode.
     * @param {GridCellMode} mode Can be: `"edit"`, `"view"`.
     */
    setCellMode: (id: GridRowId, field: string, mode: GridCellMode) => void;
    /**
     * Gets the mode of a cell.
     * @param {GridRowId} id The id of the row.
     * @param {string} field The field to get the mode.
     * @returns {GridCellMode} Returns `"edit"` or `"view"`.
     */
    getCellMode: (id: GridRowId, field: string) => GridCellMode;
    /**
     * Sets the mode of a row.
     * @param {GridRowId} id The id of the row.
     * @param {GridRowMode} mode Can be: `"edit"`, `"view"`.
     */
    setRowMode: (id: GridRowId, mode: GridRowMode) => void;
    /**
     * Gets the mode of a row.
     * @param {GridRowId} id The id of the row.
     * @returns {GridRowMode} Returns `"edit"` or `"view"`.
     */
    getRowMode: (id: GridRowId) => GridRowMode;
    /**
     * Controls if a cell is editable.
     * @param {GridCellParams} params The cell params.
     * @returns {boolean} A boolean value determining if the cell is editable.
     */
    isCellEditable: (params: GridCellParams) => boolean;
    /**
     * Sets the value of the edit cell.
     * Commonly used inside the edit cell component.
     * @param {GridEditCellValueParams} params Contains the id, field and value to set.
     * @param {React.SyntheticEvent} event The event to pass forward.
     */
    setEditCellValue: (
      params: GridEditCellValueParams,
      event?: React$1.SyntheticEvent
    ) => void;
    /**
     * Updates the field at the given id with the value stored in the edit row model.
     * @param {GridCommitCellChangeParams} params The id and field to commit to.
     * @param {React.SyntheticEvent} event The event to pass forward.
     * @returns {boolean} A boolean indicating if there is an error.
     */
    commitCellChange: (
      params: GridCommitCellChangeParams,
      event?: any
    ) => boolean;
    /**
     * Updates the row at the given id with the values stored in the edit row model.
     * @param {GridRowId} id The id to commit to.
     * @param {React.SyntheticEvent} event The event to pass forward.
     * @returns {boolean} A boolean indicating if there is an error.
     */
    commitRowChange: (id: GridRowId, event?: any) => boolean;
  }

  /**
   * The events API interface that is available in the grid `apiRef`.
   */
  interface GridEventsApi {
    /**
     * Triggers a resize of the component and recalculation of width and height.
     */
    resize: () => void;
  }

  /**
   * The filter API interface that is available in the grid [[apiRef]].
   */
  interface GridFilterApi {
    /**
     * Shows the filter panel. If `targetColumnField` is given, a filter for this field is also added.
     * @param {string} targetColumnField The column field to add a filter.
     */
    showFilterPanel: (targetColumnField?: string) => void;
    /**
     * Hides the filter panel.
     */
    hideFilterPanel: () => void;
    /**
     * Updates or inserts a [[GridFilterItem]].
     * @param {GridFilterItem} item The filter to update.
     */
    upsertFilter: (item: GridFilterItem) => void;
    /**
     * Applies a [[GridFilterItem]] on all rows. If no `linkOperator` is given, the "and" operator is used.
     * @param {GridFilterItem} item The filter to be applied.
     * @param {GridLinkOperator} linkOperator The link operator to use.
     */
    applyFilter: (
      item: GridFilterItem,
      linkOperator?: GridLinkOperator
    ) => void;
    /**
     * Applies all filters on all rows.
     */
    applyFilters: () => void;
    /**
     * Deletes a [[GridFilterItem]].
     * @param {GridFilterItem} item The filter to delete.
     */
    deleteFilter: (item: GridFilterItem) => void;
    /**
     * Changes the [[GridLinkOperator]] used to connect the filters.
     * @param {GridLinkOperator} operator The new link operator. It can be: `"and"` or `"or`".
     */
    applyFilterLinkOperator: (operator: GridLinkOperator) => void;
    /**
     * Sets the filter model to the one given by `model`.
     * @param {GridFilterModel} model The new filter model.
     */
    setFilterModel: (model: GridFilterModel) => void;
    /**
     * Returns a sorted `Map` containing only the visible rows.
     * @returns {Map<GridRowId, GridRowModel>} The sorted `Map`.
     */
    getVisibleRowModels: () => Map<GridRowId, GridRowModel>;
  }

  interface GridFocusApi {
    /**
     * Sets the focus to the cell at the given `id` and `field`.
     * @param {GridRowId} id The row id.
     * @param {string} field The column field.
     */
    setCellFocus: (id: GridRowId, field: string) => void;
    /**
     * Sets the focus to the column header at the given `field`.
     * @param {string} field The column field.
     * @param {string} event The event that triggers the action.
     */
    setColumnHeaderFocus: (field: string, event?: React.SyntheticEvent) => void;
  }

  /**
   * Set the types of the texts in the grid.
   */
  interface GridLocaleText {
    noRowsLabel: string;
    noResultsOverlayLabel: string;
    errorOverlayDefaultLabel: string;
    toolbarDensity: React.ReactNode;
    toolbarDensityLabel: string;
    toolbarDensityCompact: string;
    toolbarDensityStandard: string;
    toolbarDensityComfortable: string;
    toolbarColumns: React.ReactNode;
    toolbarColumnsLabel: string;
    toolbarFilters: React.ReactNode;
    toolbarFiltersLabel: string;
    toolbarFiltersTooltipHide: React.ReactNode;
    toolbarFiltersTooltipShow: React.ReactNode;
    toolbarFiltersTooltipActive: (count: number) => React.ReactNode;
    toolbarExport: React.ReactNode;
    toolbarExportLabel: string;
    toolbarExportCSV: React.ReactNode;
    toolbarExportPrint: React.ReactNode;
    columnsPanelTextFieldLabel: string;
    columnsPanelTextFieldPlaceholder: string;
    columnsPanelDragIconLabel: string;
    columnsPanelShowAllButton: React.ReactNode;
    columnsPanelHideAllButton: React.ReactNode;
    filterPanelAddFilter: React.ReactNode;
    filterPanelDeleteIconLabel: string;
    filterPanelOperators: React.ReactNode;
    filterPanelOperatorAnd: React.ReactNode;
    filterPanelOperatorOr: React.ReactNode;
    filterPanelColumns: React.ReactNode;
    filterPanelInputLabel: string;
    filterPanelInputPlaceholder: string;
    filterOperatorContains: string;
    filterOperatorEquals: string;
    filterOperatorStartsWith: string;
    filterOperatorEndsWith: string;
    filterOperatorIs: string;
    filterOperatorNot: string;
    filterOperatorAfter: string;
    filterOperatorOnOrAfter: string;
    filterOperatorBefore: string;
    filterOperatorOnOrBefore: string;
    filterOperatorIsEmpty: string;
    filterOperatorIsNotEmpty: string;
    filterValueAny: string;
    filterValueTrue: string;
    filterValueFalse: string;
    columnMenuLabel: string;
    columnMenuShowColumns: React.ReactNode;
    columnMenuFilter: React.ReactNode;
    columnMenuHideColumn: React.ReactNode;
    columnMenuUnsort: React.ReactNode;
    columnMenuSortAsc: React.ReactNode;
    columnMenuSortDesc: React.ReactNode;
    columnHeaderFiltersTooltipActive: (count: number) => React.ReactNode;
    columnHeaderFiltersLabel: string;
    columnHeaderSortIconLabel: string;
    footerRowSelected: (count: number) => React.ReactNode;
    footerTotalRows: React.ReactNode;
    footerTotalVisibleRows: (
      visibleCount: number,
      totalCount: number
    ) => React.ReactNode;
    checkboxSelectionHeaderName: string;
    booleanCellTrueLabel: string;
    booleanCellFalseLabel: string;
    actionsCellMore: string;
    MuiTablePagination: Omit<
      ComponentsPropsList["MuiTablePagination"],
      "page" | "count" | "onChangePage" | "rowsPerPage" | "onPageChange"
    >;
  }
  declare type GridTranslationKeys = keyof GridLocaleText;
  /**
   * The grid locale text API [[apiRef]].
   */
  interface GridLocaleTextApi {
    /**
     * Returns the translation for the `key`.
     * @param {T} key One of the keys in [[GridLocaleText]].
     * @returns {GridLocaleText[T]} The translated value.
     */
    getLocaleText: <T extends GridTranslationKeys>(key: T) => GridLocaleText[T];
  }

  /**
   * The page API interface that is available in the grid [[apiRef]].
   */
  interface GridPageApi {
    /**
     * Sets the displayed page to the value given by `page`.
     * @param {number} page The new page number
     */
    setPage: (page: number) => void;
  }

  /**
   * The page size API interface that is available in the grid [[apiRef]].
   */
  interface GridPageSizeApi {
    /**
     * Sets the number of displayed rows to the value given by `pageSize`.
     * @param {number} pageSize The new number of displayed rows.
     */
    setPageSize: (pageSize: number) => void;
  }

  interface GridParamsApi {
    /**
     * Gets the value of a cell at the given `id` and `field`.
     * @param {GridRowId} id The id of the row.
     * @param {string} field The column field.
     * @returns {GridCellValue} The cell value.
     */
    getCellValue: (id: GridRowId, field: string) => GridCellValue;
    /**
     * Gets the underlying DOM element for a cell at the given `id` and `field`.
     * @param {GridRowId} id The id of the row.
     * @param {string} field The column field.
     * @returns {HTMLDivElement | null} The DOM element or `null`.
     */
    getCellElement: (id: GridRowId, field: string) => HTMLDivElement | null;
    /**
     * Gets the [[GridCellParams]] object that is passed as argument in events.
     * @param {GridRowId} id The id of the row.
     * @param {string} field The column field.
     * @returns {GridCellParams} The cell params.
     */
    getCellParams: (id: GridRowId, field: string) => GridCellParams;
    /**
     * Gets the [[GridRowParams]] object that is passed as argument in events.
     * @param {GridRowId} id The id of the row.
     * @param {string} field The column field.
     * @returns {GridRowParams} The row params.
     */
    getRowParams: (id: GridRowId) => GridRowParams;
    /**
     * Gets the underlying DOM element for a row at the given `id`.
     * @param {GridRowId} id The id of the row.
     * @returns {HTMLDivElement | null} The DOM element or `null`.
     */
    getRowElement: (id: GridRowId) => HTMLDivElement | null;
    /**
     * Gets the underlying DOM element for the column header with the given `field`.
     * @param {string} field The column field.
     * @returns {HTMLDivElement | null} The DOM element or `null`.
     */
    getColumnHeaderElement: (field: string) => HTMLDivElement | null;
    /**
     * Gets the [[GridColumnHeaderParams]] object that is passed as argument in events.
     * @param {string} field The column field.
     * @returns {GridColumnHeaderParams} The cell params.
     */
    getColumnHeaderParams: (field: string) => GridColumnHeaderParams;
  }

  /**
   * The preferences panel API interface that is available in the grid [[apiRef]].
   */
  interface GridPreferencesPanelApi {
    /**
     * Displays the preferences panel. The `newValue` argument controls the content of the panel.
     * @param {GridPreferencePanelsValue} newValue The panel to open. Use `"filters"` or `"columns"`.
     */
    showPreferences: (newValue: GridPreferencePanelsValue) => void;
    /**
     * Hides the preferences panel.
     */
    hidePreferences: () => void;
  }

  /**
   * The Print export API interface that is available in the grid [[apiRef]].
   */
  interface GridPrintExportApi {
    /**
     * Print the grid's data.
     * @param {GridPrintExportOptions} options The options to apply on the export.
     */
    exportDataAsPrint: (options?: GridPrintExportOptions) => void;
  }

  /**
   * The disable virtualization API interface that is available in the grid [[apiRef]].
   */
  interface GridDisableVirtualizationApi {
    /**
     * Disables grid's virtualization.
     * @ignore - do not document. Remove before releasing v5 stable version.
     */
    unstable_disableVirtualization: () => void;
    /**
     * Enables grid's virtualization.
     * @ignore - do not document. Remove before releasing v5 stable version.
     */
    unstable_enableVirtualization: () => void;
  }

  /**
   * The Row API interface that is available in the grid `apiRef`.
   */
  interface GridRowApi {
    /**
     * Gets the full set of rows as [[Map<GridRowId, GridRowModel>]].
     * @returns {Map<GridRowId, GridRowModel>} The full set of rows.
     */
    getRowModels: () => Map<GridRowId, GridRowModel>;
    /**
     * Gets the total number of rows in the grid.
     * @returns {number} The number of rows.
     */
    getRowsCount: () => number;
    /**
     * Gets the list of row ids.
     * @returns {GridRowId[]} A list of ids.
     */
    getAllRowIds: () => GridRowId[];
    /**
     * Sets a new set of rows.
     * @param {GridRowModel[]} rows The new rows.
     */
    setRows: (rows: GridRowModel[]) => void;
    /**
     * Allows to updates, insert and delete rows in a single call.
     * @param {GridRowModelUpdate[]} updates An array of rows with an `action` specifying what to do.
     */
    updateRows: (updates: GridRowModelUpdate[]) => void;
    /**
     * Gets the `GridRowId` of a row at a specific index.
     * @param {number} index The index of the row
     * @returns {GridRowId} The `GridRowId` of the row.
     */
    getRowIdFromRowIndex: (index: number) => GridRowId;
    /**
     * Gets the row index of a row with a given id.
     * @param {GridRowId} id The `GridRowId` of the row.
     * @returns {number} The index of the row.
     */
    getRowIndex: (id: GridRowId) => number;
    /**
     * Gets the row data with a given id.
     * @param {GridRowId} id The id of the row.
     * @returns {GridRowModel} The row data.
     */
    getRow: (id: GridRowId) => GridRowModel | null;
  }

  /**
   * The selection API interface that is available in the grid [[apiRef]].
   */
  interface GridSelectionApi {
    /**
     * Change the selection state of a row.
     * @param {GridRowId} id The id of the row.
     * @param {boolean} isSelected Pass `false` to unselect a row. Default is `true`.
     * @param {boolean} resetSelection Whether to reset the already selected rows or not. Default is `false`.
     */
    selectRow: (
      id: GridRowId,
      isSelected?: boolean,
      resetSelection?: boolean
    ) => void;
    /**
     * Change the selection state of multiple rows.
     * @param {GridRowId[]} ids The row ids.
     * @param {boolean} isSelected The new selection state. Default is `true`.
     * @param {boolean} resetSelection Whether to reset the already selected rows or not. Default is `false`.
     */
    selectRows: (
      ids: GridRowId[],
      isSelected?: boolean,
      resetSelection?: boolean
    ) => void;
    /**
     * Change the selection state of all the selectable rows in a range.
     * @param {Object} range The range of rows to select.
     * @param {GridRowId} range.startId The first row id.
     * @param {GridRowId} range.endId The last row id.
     * @param {boolean} isSelected The new selection state. Default is `true`.
     * @param {boolean} resetSelection Whether to reset the selected rows outside of the range or not. Default is `false`.
     */
    selectRowRange: (
      range: {
        startId: GridRowId;
        endId: GridRowId;
      },
      isSelected?: boolean,
      resetSelection?: boolean
    ) => void;
    /**
     * Determines if a row is selected or not.
     * @param {GridRowId} id The id of the row.
     * @returns {boolean} A boolean indicating if the row is selected.
     */
    isRowSelected: (id: GridRowId) => boolean;
    /**
     * Returns an array of the selected rows.
     * @returns {Map<GridRowId, GridRowModel>} A `Map` with the selected rows.
     */
    getSelectedRows: () => Map<GridRowId, GridRowModel>;
    /**
     * Updates the selected rows to be those passed to the `rowIds` argument.
     * Any row already selected will be unselected.
     * @param {GridRowId[]} rowIds The row ids to select.
     */
    setSelectionModel: (rowIds: GridRowId[]) => void;
  }

  /**
   * The sort API interface that is available in the grid [[apiRef]].
   */
  interface GridSortApi {
    /**
     * Returns the sort model currently applied to the grid.
     * @returns {GridSortModel} The `GridSortModel`.
     */
    getSortModel: () => GridSortModel;
    /**
     * Applies the current sort model to the rows.
     */
    applySorting: () => void;
    /**
     * Updates the sort model and triggers the sorting of rows.
     * @param {GridSortModel} model The `GridSortModel` to be applied.
     */
    setSortModel: (model: GridSortModel) => void;
    /**
     * Sorts a column.
     * @param {GridColDef} column The [[GridColDef]] of the column to be sorted.
     * @param {GridSortDirection} direction The direction to be sorted. By default, the next in the `sortingOrder` prop.
     * @param {boolean} allowMultipleSorting Whether to keep the existing [[GridSortItem]]. Default is `false`.
     */
    sortColumn: (
      column: GridColDef,
      direction?: GridSortDirection,
      allowMultipleSorting?: boolean
    ) => void;
    /**
     * Returns all rows sorted according to the active sort model.
     * @returns {GridRowModel[]} The sorted [[GridRowModel]] objects.
     */
    getSortedRows: () => GridRowModel[];
    /**
     * Returns all row ids sorted according to the active sort model.
     * @returns {GridRowId[]} The sorted [[GridRowId]] values.
     */
    getSortedRowIds: () => GridRowId[];
  }

  interface GridStateApi {
    /**
     * Property that contains the whole state of the grid.
     */
    state: GridState;
    /**
     * Sets the whole state of the grid.
     * @param {function} state The new state or a function to return the new state.
     */
    setState: (
      state: GridState | ((previousState: GridState) => GridState)
    ) => void;
    /**
     * Forces the grid to rerender. It's often used after a state update.
     */
    forceUpdate: React$1.Dispatch<any>;
  }

  interface Logger {
    debug: (...args: any[]) => void;
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
  }

  /**
   * The logger API interface that is available in the grid `apiRef`.
   */
  interface GridLoggerApi {
    /**
     * @param {string} name The name of the logger
     * @returns {Logger} Instance of the logger
     * @ignore - do not document.
     */
    getLogger: (name: string) => Logger;
  }

  /**
   * The scroll API interface that is available in the grid [[apiRef]].
   */
  interface GridScrollApi {
    /**
     * Triggers the viewport to scroll to the given positions (in pixels).
     * @param {GridScrollParams} params An object containing the `left` or `top` position to scroll.
     */
    scroll: (params: Partial<GridScrollParams>) => void;
    /**
     * Returns the current scroll position.
     * @returns {GridScrollParams} The scroll positions.
     */
    getScrollPosition: () => GridScrollParams;
    /**
     * Triggers the viewport to scroll to the cell at indexes given by `params`.
     * Returns `true` if the grid had to scroll to reach the target.
     * @param {GridCellIndexCoordinates} params The indexes where the cell is.
     * @returns {boolean} Returns `true` if the index was outside of the viewport and the grid had to scroll to reach the target.
     */
    scrollToIndexes: (params: Partial<GridCellIndexCoordinates>) => boolean;
  }

  declare type GridColumnsPreProcessing = (columns: GridColumns) => GridColumns;
  interface GridColumnsPreProcessingApi {
    /**
     * Register a column pre-processing and emit an event to re-apply all the columns pre-processing
     * @param {string} processingName Name of the pre-processing. Used to clean the previous version of the pre-processing.
     * @param {GridColumnsPreProcessing | null } columnsPreProcessing Pre-processing to register.
     * @ignore - do not document
     */
    unstable_registerColumnPreProcessing: (
      processingName: string,
      columnsPreProcessing: GridColumnsPreProcessing
    ) => void;
    /**
     * Apply all the columns pre-processing
     * @param {GridColumns} columns. Columns to pre-process
     * @returns {GridColumns} The pre-processed columns
     * @ignore - do not document
     */
    unstable_applyAllColumnPreProcessing: (columns: GridColumns) => GridColumns;
  }

  declare type RowGroupParams = {
    ids: GridRowId[];
    idRowsLookup: GridRowsLookup;
  };
  interface GridRowGroupingResult {
    tree: GridRowTreeConfig;
    paths: Record<GridRowId, string[]>;
    idRowsLookup: GridRowsLookup;
  }
  declare type GridRowGroupingPreProcessing = (
    params: RowGroupParams
  ) => GridRowGroupingResult | null;
  interface GridRowGroupsPreProcessingApi {
    /**
     * Register a column pre-processing and emit an event to re-apply the row grouping pre-processing
     * @param {string} processingName Name of the pre-processing. Used to clean the previous version of the pre-processing.
     * @param {GridRowGroupingPreProcessing} columnsPreProcessing Pre-processing to register.
     * @ignore - do not document
     */
    unstable_registerRowGroupsBuilder: (
      processingName: string,
      groupingFunction: GridRowGroupingPreProcessing | null
    ) => void;
    /**
     * Apply the first row grouping pre-processing that does not return null
     * @param {GridRowsLookup} rowsLookup. Lookup of the rows to group
     * @param {GridRowId[]} List of the rows IDs
     * @returns {GridRowGroupingResult} The grouped rows
     * @ignore - do not document
     */
    unstable_groupRows: (params: RowGroupParams) => GridRowGroupingResult;
  }

  /**
   * The full grid API.
   */
  interface GridApi
    extends GridCoreApi,
      GridStateApi,
      GridLoggerApi,
      GridColumnsPreProcessingApi,
      GridRowGroupsPreProcessingApi,
      GridDensityApi,
      GridEventsApi,
      GridRowApi,
      GridEditRowApi,
      GridParamsApi,
      GridColumnApi,
      GridSelectionApi,
      GridSortApi,
      GridPageApi,
      GridPageSizeApi,
      GridCsvExportApi,
      GridFocusApi,
      GridFilterApi,
      GridColumnMenuApi,
      GridPreferencesPanelApi,
      GridPrintExportApi,
      GridDisableVirtualizationApi,
      GridLocaleTextApi,
      GridControlStateApi,
      GridClipboardApi,
      GridScrollApi {}

  /**
   * The apiRef component prop type.
   */
  declare type GridApiRef = React$1.MutableRefObject<GridApi>;

  interface GridStateChangeParams {
    state: GridState;
    api: GridApi;
  }

  interface GridRowSelectionCheckboxParams {
    value: boolean;
    id: GridRowId;
  }

  interface GridHeaderSelectionCheckboxParams {
    value: boolean;
  }

  /**
   * Set of icons used in the grid component UI.
   */
  interface GridIconSlotsComponent {
    /**
     * Icon displayed on the boolean cell to represent the true value.
     */
    BooleanCellTrueIcon: React$1.JSXElementConstructor<any>;
    /**
     * Icon displayed on the boolean cell to represent the false value.
     */
    BooleanCellFalseIcon: React$1.JSXElementConstructor<any>;
    /**
     * Icon displayed on the side of the column header title to display the filter input component.
     */
    ColumnMenuIcon: React$1.JSXElementConstructor<any>;
    /**
     * Icon displayed on the open filter button present in the toolbar by default.
     */
    OpenFilterButtonIcon: React$1.JSXElementConstructor<any>;
    /**
     * Icon displayed on the column header menu to show that a filter has been applied to the column.
     */
    ColumnFilteredIcon: React$1.JSXElementConstructor<any>;
    /**
     * Icon displayed on the column menu selector tab.
     */
    ColumnSelectorIcon: React$1.JSXElementConstructor<any>;
    /**
     * Icon displayed on the side of the column header title when unsorted.
     */
    ColumnUnsortedIcon: React$1.JSXElementConstructor<any> | null;
    /**
     * Icon displayed on the side of the column header title when sorted in ascending order.
     */
    ColumnSortedAscendingIcon: React$1.JSXElementConstructor<any> | null;
    /**
     * Icon displayed on the side of the column header title when sorted in descending order.
     */
    ColumnSortedDescendingIcon: React$1.JSXElementConstructor<any> | null;
    /**
     * Icon displayed in between two column headers that allows to resize the column header.
     */
    ColumnResizeIcon: React$1.JSXElementConstructor<any>;
    /**
     * Icon displayed on the compact density option in the toolbar.
     */
    DensityCompactIcon: React$1.JSXElementConstructor<any>;
    /**
     * Icon displayed on the standard density option in the toolbar.
     */
    DensityStandardIcon: React$1.JSXElementConstructor<any>;
    /**
     * Icon displayed on the "comfortable" density option in the toolbar.
     */
    DensityComfortableIcon: React$1.JSXElementConstructor<any>;
    /**
     * Icon displayed on the open export button present in the toolbar by default.
     */
    ExportIcon: React$1.JSXElementConstructor<any>;
    /**
     * Icon displayed on the `actions` column type to open the menu.
     */
    MoreActionsIcon: React$1.JSXElementConstructor<any>;
  }

  /**
   * Grid components React prop interface containing all the overridable components.
   *
   */
  interface GridSlotsComponent extends GridIconSlotsComponent {
    /**
     * Component rendered for each cell.
     */
    Cell: React$1.JSXElementConstructor<any>;
    /**
     * The custom Checkbox component used in the grid for both header and cells.
     */
    Checkbox: React$1.JSXElementConstructor<any>;
    /**
     * Column menu component rendered by clicking on the 3 dots "kebab" icon in column headers.
     */
    ColumnMenu: React$1.JSXElementConstructor<any>;
    /**
     * Error overlay component rendered above the grid when an error is caught.
     */
    ErrorOverlay: React$1.JSXElementConstructor<any>;
    /**
     * Footer component rendered at the bottom of the grid viewport.
     */
    Footer: React$1.JSXElementConstructor<any>;
    /**
     * Header component rendered above the grid column header bar.
     * Prefer using the `Toolbar` slot. You should never need to use this slot. TODO remove.
     */
    Header: React$1.JSXElementConstructor<any>;
    /**
     * Toolbar component rendered inside the Header component.
     */
    Toolbar: React$1.JSXElementConstructor<any> | null;
    /**
     * PreferencesPanel component rendered inside the Header component.
     */
    PreferencesPanel: React$1.JSXElementConstructor<any>;
    /**
     * Loading overlay component rendered when the grid is in a loading state.
     */
    LoadingOverlay: React$1.JSXElementConstructor<any>;
    /**
     * No results overlay component rendered when the grid has no results after filtering.
     */
    NoResultsOverlay: React$1.JSXElementConstructor<any>;
    /**
     * No rows overlay component rendered when the grid has no rows.
     */
    NoRowsOverlay: React$1.JSXElementConstructor<any>;
    /**
     * Pagination component rendered in the grid footer by default.
     */
    Pagination: React$1.JSXElementConstructor<any> | null;
    /**
     * Filter panel component rendered when clicking the filter button.
     */
    FilterPanel: React$1.JSXElementConstructor<any>;
    /**
     * GridColumns panel component rendered when clicking the columns button.
     */
    ColumnsPanel: React$1.JSXElementConstructor<any>;
    /**
     * Panel component wrapping the filters and columns panels.
     */
    Panel: React$1.JSXElementConstructor<any>;
    /**
     * Component rendered for each row.
     */
    Row: React$1.JSXElementConstructor<any>;
  }

  /**
   * Overrideable components props dynamically passed to the component at rendering.
   */
  interface GridSlotsComponentsProps {
    checkbox?: any;
    cell?: any;
    columnMenu?: any;
    columnsPanel?: any;
    errorOverlay?: any;
    filterPanel?: any;
    footer?: any;
    header?: any;
    loadingOverlay?: any;
    noResultsOverlay?: any;
    noRowsOverlay?: any;
    pagination?: any;
    panel?: any;
    preferencesPanel?: any;
    row?: any;
    toolbar?: any;
  }

  interface GridCellProps {
    align: GridAlignment;
    className?: string;
    colIndex: number;
    field: string;
    rowId: GridRowId;
    formattedValue?: GridCellValue;
    hasFocus?: boolean;
    height: number;
    isEditable?: boolean;
    showRightBorder?: boolean;
    value?: GridCellValue;
    width: number;
    cellMode?: GridCellMode;
    children: React$1.ReactNode;
    tabIndex: 0 | -1;
    onClick?: React$1.MouseEventHandler<HTMLDivElement>;
    onDoubleClick?: React$1.MouseEventHandler<HTMLDivElement>;
    onMouseDown?: React$1.MouseEventHandler<HTMLDivElement>;
    onMouseUp?: React$1.MouseEventHandler<HTMLDivElement>;
    onKeyDown?: React$1.KeyboardEventHandler<HTMLDivElement>;
    onDragEnter?: React$1.DragEventHandler<HTMLDivElement>;
    onDragOver?: React$1.DragEventHandler<HTMLDivElement>;
    [x: string]: any;
  }
  declare function GridCell(props: GridCellProps): JSX.Element;
  declare namespace GridCell {
    var propTypes: any;
  }

  declare function GridEditInputCell(
    props: GridRenderEditCellParams & InputBaseProps
  ): JSX.Element;
  declare namespace GridEditInputCell {
    var propTypes: any;
  }

  declare const renderEditInputCell: (params: any) => JSX.Element;

  declare function GridEditSingleSelectCell(
    props: GridRenderEditCellParams & SelectProps
  ): JSX.Element;
  declare namespace GridEditSingleSelectCell {
    var propTypes: any;
  }

  declare const renderEditSingleSelectCell: (params: any) => JSX.Element;

  declare type MenuPosition =
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top"
    | undefined;
  interface GridMenuProps extends Omit<PopperProps, "onKeyDown"> {
    open: boolean;
    target: React$1.ReactNode;
    onClickAway: ClickAwayListenerProps["onClickAway"];
    position?: MenuPosition;
  }
  declare const GridMenu: {
    (props: GridMenuProps): JSX.Element;
    propTypes: any;
  };

  declare type GridActionsCellProps = Pick<
    GridRenderCellParams,
    "colDef" | "id" | "api"
  > &
    Pick<GridMenuProps, "position">;
  declare const GridActionsCell: {
    (props: GridActionsCellProps): JSX.Element;
    propTypes: any;
  };

  declare const renderActionsCell: (
    params: GridRenderCellParams
  ) => JSX.Element;

  declare type GridRootProps = React$1.HTMLAttributes<HTMLDivElement>;
  declare const GridRoot: React$1.ForwardRefExoticComponent<
    GridRootProps & React$1.RefAttributes<HTMLDivElement>
  >;

  declare type GridColumnsContainerProps =
    React$1.HTMLAttributes<HTMLDivElement>;
  declare const GridColumnsContainer: React$1.ForwardRefExoticComponent<
    GridColumnsContainerProps & React$1.RefAttributes<HTMLDivElement>
  >;

  declare type GridFooterContainerProps =
    React$1.HTMLAttributes<HTMLDivElement>;
  declare const GridFooterContainer: React$1.ForwardRefExoticComponent<
    GridFooterContainerProps & React$1.RefAttributes<HTMLDivElement>
  >;

  declare type GridOverlayProps = React$1.HTMLAttributes<HTMLDivElement>;
  declare const GridOverlay: React$1.ForwardRefExoticComponent<
    GridOverlayProps & React$1.RefAttributes<HTMLDivElement>
  >;

  declare type GridToolbarContainerProps =
    React$1.HTMLAttributes<HTMLDivElement>;
  declare const GridToolbarContainer: React$1.ForwardRefExoticComponent<
    GridToolbarContainerProps & React$1.RefAttributes<HTMLDivElement>
  >;

  interface GridColumnHeaderItemProps {
    colIndex: number;
    column: GridStateColDef;
    columnMenuOpen: boolean;
    headerHeight: number;
    isDragging: boolean;
    isResizing: boolean;
    isLastColumn: boolean;
    extendRowFullWidth: boolean;
    sortDirection: GridSortDirection;
    sortIndex?: number;
    filterItemsCounter?: number;
    hasFocus?: boolean;
    hasScrollX: boolean;
    hasScrollY: boolean;
    tabIndex: 0 | -1;
  }
  declare function GridColumnHeaderItem(
    props: GridColumnHeaderItemProps
  ): JSX.Element;
  declare namespace GridColumnHeaderItem {
    var propTypes: any;
  }

  interface GridColumnHeaderSeparatorProps
    extends React$1.HTMLAttributes<HTMLDivElement> {
    resizable: boolean;
    resizing: boolean;
    height: number;
  }
  declare function GridColumnHeaderSeparatorRaw(
    props: GridColumnHeaderSeparatorProps
  ): JSX.Element;
  declare namespace GridColumnHeaderSeparatorRaw {
    var propTypes: any;
  }
  declare const GridColumnHeaderSeparator: React$1.MemoExoticComponent<
    typeof GridColumnHeaderSeparatorRaw
  >;

  interface GridColumnHeaderSortIconProps {
    direction: GridSortDirection;
    index: number | undefined;
  }
  declare function GridColumnHeaderSortIconRaw(
    props: GridColumnHeaderSortIconProps
  ): JSX.Element | null;
  declare namespace GridColumnHeaderSortIconRaw {
    var propTypes: any;
  }
  declare const GridColumnHeaderSortIcon: React$1.MemoExoticComponent<
    typeof GridColumnHeaderSortIconRaw
  >;

  interface GridColumnHeaderTitleProps {
    label: string;
    columnWidth: number;
    description?: string;
  }
  declare function GridColumnHeaderTitle(
    props: GridColumnHeaderTitleProps
  ): JSX.Element;
  declare namespace GridColumnHeaderTitle {
    var propTypes: any;
  }

  declare const GridColumnsHeader: React$1.ForwardRefExoticComponent<
    Pick<any, string | number | symbol> & React$1.RefAttributes<HTMLDivElement>
  >;

  interface GridColumnHeadersItemCollectionProps {
    columns: GridStateColDef[];
    dragCol: string;
    resizeCol: string;
  }
  declare function GridColumnHeadersItemCollection(
    props: GridColumnHeadersItemCollectionProps
  ): JSX.Element;
  declare namespace GridColumnHeadersItemCollection {
    var propTypes: any;
  }

  declare const GridCellCheckboxForwardRef: React$1.ForwardRefExoticComponent<
    GridCellParams<any, any, any> & React$1.RefAttributes<HTMLInputElement>
  >;

  declare const GridCellCheckboxRenderer: React$1.MemoExoticComponent<
    React$1.ForwardRefExoticComponent<
      GridCellParams<any, any, any> & React$1.RefAttributes<HTMLInputElement>
    >
  >;

  declare const GridHeaderCheckbox: React$1.ForwardRefExoticComponent<
    GridColumnHeaderParams & React$1.RefAttributes<HTMLInputElement>
  >;

  declare const GridArrowUpwardIcon: _mui_material_OverridableComponent.OverridableComponent<
    _mui_material.SvgIconTypeMap<{}, "svg">
  > & {
    muiName: string;
  };
  declare const GridArrowDownwardIcon: _mui_material_OverridableComponent.OverridableComponent<
    _mui_material.SvgIconTypeMap<{}, "svg">
  > & {
    muiName: string;
  };
  declare const GridFilterListIcon: _mui_material_OverridableComponent.OverridableComponent<
    _mui_material.SvgIconTypeMap<{}, "svg">
  > & {
    muiName: string;
  };
  declare const GridFilterAltIcon: _mui_material_OverridableComponent.OverridableComponent<
    _mui_material.SvgIconTypeMap<{}, "svg">
  > & {
    muiName: string;
  };
  declare const GridSearchIcon: _mui_material_OverridableComponent.OverridableComponent<
    _mui_material.SvgIconTypeMap<{}, "svg">
  > & {
    muiName: string;
  };
  declare const GridMenuIcon: _mui_material_OverridableComponent.OverridableComponent<
    _mui_material.SvgIconTypeMap<{}, "svg">
  > & {
    muiName: string;
  };
  declare const GridCheckCircleIcon: _mui_material_OverridableComponent.OverridableComponent<
    _mui_material.SvgIconTypeMap<{}, "svg">
  > & {
    muiName: string;
  };
  declare const GridColumnIcon: _mui_material_OverridableComponent.OverridableComponent<
    _mui_material.SvgIconTypeMap<{}, "svg">
  > & {
    muiName: string;
  };
  declare const GridSeparatorIcon: _mui_material_OverridableComponent.OverridableComponent<
    _mui_material.SvgIconTypeMap<{}, "svg">
  > & {
    muiName: string;
  };
  declare const GridViewHeadlineIcon: _mui_material_OverridableComponent.OverridableComponent<
    _mui_material.SvgIconTypeMap<{}, "svg">
  > & {
    muiName: string;
  };
  declare const GridTableRowsIcon: _mui_material_OverridableComponent.OverridableComponent<
    _mui_material.SvgIconTypeMap<{}, "svg">
  > & {
    muiName: string;
  };
  declare const GridViewStreamIcon: _mui_material_OverridableComponent.OverridableComponent<
    _mui_material.SvgIconTypeMap<{}, "svg">
  > & {
    muiName: string;
  };
  declare const GridTripleDotsVerticalIcon: _mui_material_OverridableComponent.OverridableComponent<
    _mui_material.SvgIconTypeMap<{}, "svg">
  > & {
    muiName: string;
  };
  declare const GridCloseIcon: _mui_material_OverridableComponent.OverridableComponent<
    _mui_material.SvgIconTypeMap<{}, "svg">
  > & {
    muiName: string;
  };
  declare const GridAddIcon: _mui_material_OverridableComponent.OverridableComponent<
    _mui_material.SvgIconTypeMap<{}, "svg">
  > & {
    muiName: string;
  };
  declare const GridLoadIcon: _mui_material_OverridableComponent.OverridableComponent<
    _mui_material.SvgIconTypeMap<{}, "svg">
  > & {
    muiName: string;
  };
  declare const GridDragIcon: _mui_material_OverridableComponent.OverridableComponent<
    _mui_material.SvgIconTypeMap<{}, "svg">
  > & {
    muiName: string;
  };
  declare const GridSaveAltIcon: _mui_material_OverridableComponent.OverridableComponent<
    _mui_material.SvgIconTypeMap<{}, "svg">
  > & {
    muiName: string;
  };
  declare const GridCheckIcon: _mui_material_OverridableComponent.OverridableComponent<
    _mui_material.SvgIconTypeMap<{}, "svg">
  > & {
    muiName: string;
  };
  declare const GridMoreVertIcon: _mui_material_OverridableComponent.OverridableComponent<
    _mui_material.SvgIconTypeMap<{}, "svg">
  > & {
    muiName: string;
  };

  interface GridFilterItemProps {
    column: GridColDef;
    onClick: (event: React$1.MouseEvent<any>) => void;
  }

  declare const GridColumnsMenuItem: {
    (props: GridFilterItemProps): JSX.Element | null;
    propTypes: any;
  };

  declare const GridFilterMenuItem: {
    (props: GridFilterItemProps): JSX.Element | null;
    propTypes: any;
  };

  interface GridColumnHeaderMenuProps {
    columnMenuId?: string;
    columnMenuButtonId?: string;
    ContentComponent: React$1.JSXElementConstructor<any>;
    contentComponentProps?: any;
    field: string;
    open: boolean;
    target: Element | null;
  }
  declare function GridColumnHeaderMenu({
    columnMenuId,
    columnMenuButtonId,
    ContentComponent,
    contentComponentProps,
    field,
    open,
    target,
  }: GridColumnHeaderMenuProps): JSX.Element | null;
  declare namespace GridColumnHeaderMenu {
    var propTypes: any;
  }

  interface GridColumnMenuProps
    extends React$1.HTMLAttributes<HTMLUListElement> {
    hideMenu: (event: React$1.SyntheticEvent) => void;
    currentColumn: GridColDef;
    open: boolean;
    id?: string;
    labelledby?: string;
  }

  declare const GridColumnMenu: React$1.ForwardRefExoticComponent<
    GridColumnMenuProps & React$1.RefAttributes<HTMLUListElement>
  >;

  declare const HideGridColMenuItem: {
    (props: GridFilterItemProps): JSX.Element | null;
    propTypes: any;
  };

  declare const SortGridMenuItems: {
    (props: GridFilterItemProps): JSX.Element | null;
    propTypes: any;
  };

  declare const GridColumnMenuContainer: React$1.ForwardRefExoticComponent<
    GridColumnMenuProps & React$1.RefAttributes<HTMLUListElement>
  >;

  declare function GridColumnsPanel(): JSX.Element;

  interface GridPanelClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the paper element. */
    paper: string;
  }
  interface GridPanelProps
    extends InternalStandardProps<PopperProps, "children"> {
    children?: React$1.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<GridPanelClasses>;
    open: boolean;
  }
  declare const gridPanelClasses: Record<"panel" | "paper", string>;
  declare const GridPanel: React$1.ForwardRefExoticComponent<
    Pick<
      GridPanelProps,
      | "classes"
      | "children"
      | "defaultChecked"
      | "defaultValue"
      | "suppressContentEditableWarning"
      | "suppressHydrationWarning"
      | "accessKey"
      | "className"
      | "contentEditable"
      | "contextMenu"
      | "dir"
      | "draggable"
      | "hidden"
      | "id"
      | "lang"
      | "placeholder"
      | "slot"
      | "spellCheck"
      | "style"
      | "tabIndex"
      | "title"
      | "translate"
      | "radioGroup"
      | "role"
      | "about"
      | "datatype"
      | "inlist"
      | "prefix"
      | "property"
      | "resource"
      | "typeof"
      | "vocab"
      | "autoCapitalize"
      | "autoCorrect"
      | "autoSave"
      | "color"
      | "itemProp"
      | "itemScope"
      | "itemType"
      | "itemID"
      | "itemRef"
      | "results"
      | "security"
      | "unselectable"
      | "inputMode"
      | "is"
      | "aria-activedescendant"
      | "aria-atomic"
      | "aria-autocomplete"
      | "aria-busy"
      | "aria-checked"
      | "aria-colcount"
      | "aria-colindex"
      | "aria-colspan"
      | "aria-controls"
      | "aria-current"
      | "aria-describedby"
      | "aria-details"
      | "aria-disabled"
      | "aria-dropeffect"
      | "aria-errormessage"
      | "aria-expanded"
      | "aria-flowto"
      | "aria-grabbed"
      | "aria-haspopup"
      | "aria-hidden"
      | "aria-invalid"
      | "aria-keyshortcuts"
      | "aria-label"
      | "aria-labelledby"
      | "aria-level"
      | "aria-live"
      | "aria-modal"
      | "aria-multiline"
      | "aria-multiselectable"
      | "aria-orientation"
      | "aria-owns"
      | "aria-placeholder"
      | "aria-posinset"
      | "aria-pressed"
      | "aria-readonly"
      | "aria-relevant"
      | "aria-required"
      | "aria-roledescription"
      | "aria-rowcount"
      | "aria-rowindex"
      | "aria-rowspan"
      | "aria-selected"
      | "aria-setsize"
      | "aria-sort"
      | "aria-valuemax"
      | "aria-valuemin"
      | "aria-valuenow"
      | "aria-valuetext"
      | "dangerouslySetInnerHTML"
      | "onCopy"
      | "onCopyCapture"
      | "onCut"
      | "onCutCapture"
      | "onPaste"
      | "onPasteCapture"
      | "onCompositionEnd"
      | "onCompositionEndCapture"
      | "onCompositionStart"
      | "onCompositionStartCapture"
      | "onCompositionUpdate"
      | "onCompositionUpdateCapture"
      | "onFocus"
      | "onFocusCapture"
      | "onBlur"
      | "onBlurCapture"
      | "onChange"
      | "onChangeCapture"
      | "onBeforeInput"
      | "onBeforeInputCapture"
      | "onInput"
      | "onInputCapture"
      | "onReset"
      | "onResetCapture"
      | "onSubmit"
      | "onSubmitCapture"
      | "onInvalid"
      | "onInvalidCapture"
      | "onLoad"
      | "onLoadCapture"
      | "onError"
      | "onErrorCapture"
      | "onKeyDown"
      | "onKeyDownCapture"
      | "onKeyPress"
      | "onKeyPressCapture"
      | "onKeyUp"
      | "onKeyUpCapture"
      | "onAbort"
      | "onAbortCapture"
      | "onCanPlay"
      | "onCanPlayCapture"
      | "onCanPlayThrough"
      | "onCanPlayThroughCapture"
      | "onDurationChange"
      | "onDurationChangeCapture"
      | "onEmptied"
      | "onEmptiedCapture"
      | "onEncrypted"
      | "onEncryptedCapture"
      | "onEnded"
      | "onEndedCapture"
      | "onLoadedData"
      | "onLoadedDataCapture"
      | "onLoadedMetadata"
      | "onLoadedMetadataCapture"
      | "onLoadStart"
      | "onLoadStartCapture"
      | "onPause"
      | "onPauseCapture"
      | "onPlay"
      | "onPlayCapture"
      | "onPlaying"
      | "onPlayingCapture"
      | "onProgress"
      | "onProgressCapture"
      | "onRateChange"
      | "onRateChangeCapture"
      | "onSeeked"
      | "onSeekedCapture"
      | "onSeeking"
      | "onSeekingCapture"
      | "onStalled"
      | "onStalledCapture"
      | "onSuspend"
      | "onSuspendCapture"
      | "onTimeUpdate"
      | "onTimeUpdateCapture"
      | "onVolumeChange"
      | "onVolumeChangeCapture"
      | "onWaiting"
      | "onWaitingCapture"
      | "onAuxClick"
      | "onAuxClickCapture"
      | "onClick"
      | "onClickCapture"
      | "onContextMenu"
      | "onContextMenuCapture"
      | "onDoubleClick"
      | "onDoubleClickCapture"
      | "onDrag"
      | "onDragCapture"
      | "onDragEnd"
      | "onDragEndCapture"
      | "onDragEnter"
      | "onDragEnterCapture"
      | "onDragExit"
      | "onDragExitCapture"
      | "onDragLeave"
      | "onDragLeaveCapture"
      | "onDragOver"
      | "onDragOverCapture"
      | "onDragStart"
      | "onDragStartCapture"
      | "onDrop"
      | "onDropCapture"
      | "onMouseDown"
      | "onMouseDownCapture"
      | "onMouseEnter"
      | "onMouseLeave"
      | "onMouseMove"
      | "onMouseMoveCapture"
      | "onMouseOut"
      | "onMouseOutCapture"
      | "onMouseOver"
      | "onMouseOverCapture"
      | "onMouseUp"
      | "onMouseUpCapture"
      | "onSelect"
      | "onSelectCapture"
      | "onTouchCancel"
      | "onTouchCancelCapture"
      | "onTouchEnd"
      | "onTouchEndCapture"
      | "onTouchMove"
      | "onTouchMoveCapture"
      | "onTouchStart"
      | "onTouchStartCapture"
      | "onPointerDown"
      | "onPointerDownCapture"
      | "onPointerMove"
      | "onPointerMoveCapture"
      | "onPointerUp"
      | "onPointerUpCapture"
      | "onPointerCancel"
      | "onPointerCancelCapture"
      | "onPointerEnter"
      | "onPointerEnterCapture"
      | "onPointerLeave"
      | "onPointerLeaveCapture"
      | "onPointerOver"
      | "onPointerOverCapture"
      | "onPointerOut"
      | "onPointerOutCapture"
      | "onGotPointerCapture"
      | "onGotPointerCaptureCapture"
      | "onLostPointerCapture"
      | "onLostPointerCaptureCapture"
      | "onScroll"
      | "onScrollCapture"
      | "onWheel"
      | "onWheelCapture"
      | "onAnimationStart"
      | "onAnimationStartCapture"
      | "onAnimationEnd"
      | "onAnimationEndCapture"
      | "onAnimationIteration"
      | "onAnimationIterationCapture"
      | "onTransitionEnd"
      | "onTransitionEndCapture"
      | "anchorEl"
      | "container"
      | "disablePortal"
      | "keepMounted"
      | "modifiers"
      | "open"
      | "placement"
      | "popperOptions"
      | "popperRef"
      | "transition"
    > &
      React$1.RefAttributes<HTMLDivElement>
  >;

  declare function GridPanelContent(
    props: React$1.PropsWithChildren<React$1.HTMLAttributes<HTMLDivElement>>
  ): JSX.Element;

  declare function GridPanelFooter(
    props: React$1.PropsWithChildren<React$1.HTMLAttributes<HTMLDivElement>>
  ): JSX.Element;

  declare function GridPanelHeader(
    props: React$1.PropsWithChildren<React$1.HTMLAttributes<HTMLDivElement>>
  ): JSX.Element;

  declare function GridPanelWrapper(
    props: React$1.PropsWithChildren<React$1.HTMLAttributes<HTMLDivElement>>
  ): JSX.Element;

  declare const GridPreferencesPanel: React$1.ForwardRefExoticComponent<
    React$1.HTMLAttributes<HTMLDivElement> &
      React$1.RefAttributes<HTMLDivElement>
  >;

  interface GridFilterFormProps {
    item: GridFilterItem;
    hasMultipleFilters: boolean;
    showMultiFilterOperators?: boolean;
    multiFilterOperator?: GridLinkOperator;
    disableMultiFilterOperator?: boolean;
    applyFilterChanges: (item: GridFilterItem) => void;
    applyMultiFilterOperatorChanges: (operator: GridLinkOperator) => void;
    deleteFilter: (item: GridFilterItem) => void;
  }
  declare function GridFilterForm(props: GridFilterFormProps): JSX.Element;
  declare namespace GridFilterForm {
    var propTypes: any;
  }

  declare const SUBMIT_FILTER_STROKE_TIME = 500;
  interface GridTypeFilterInputValueProps extends GridFilterInputValueProps {
    type?: "text" | "number" | "date" | "datetime-local" | "singleSelect";
  }
  declare function GridFilterInputValue(
    props: GridTypeFilterInputValueProps & TextFieldProps
  ): JSX.Element;
  declare namespace GridFilterInputValue {
    var propTypes: any;
  }

  declare function GridFilterPanel(): JSX.Element;

  declare const GridToolbar: React$1.ForwardRefExoticComponent<
    GridToolbarContainerProps & React$1.RefAttributes<HTMLDivElement>
  >;

  declare const GridToolbarColumnsButton: React$1.ForwardRefExoticComponent<
    Pick<
      ButtonProps<"button", {}>,
      | keyof _mui_material_OverridableComponent.CommonProps
      | "form"
      | "slot"
      | "title"
      | "defaultChecked"
      | "defaultValue"
      | "suppressContentEditableWarning"
      | "suppressHydrationWarning"
      | "accessKey"
      | "contentEditable"
      | "contextMenu"
      | "dir"
      | "draggable"
      | "hidden"
      | "id"
      | "lang"
      | "placeholder"
      | "spellCheck"
      | "tabIndex"
      | "translate"
      | "radioGroup"
      | "role"
      | "about"
      | "datatype"
      | "inlist"
      | "prefix"
      | "property"
      | "resource"
      | "typeof"
      | "vocab"
      | "autoCapitalize"
      | "autoCorrect"
      | "autoSave"
      | "color"
      | "itemProp"
      | "itemScope"
      | "itemType"
      | "itemID"
      | "itemRef"
      | "results"
      | "security"
      | "unselectable"
      | "inputMode"
      | "is"
      | "aria-activedescendant"
      | "aria-atomic"
      | "aria-autocomplete"
      | "aria-busy"
      | "aria-checked"
      | "aria-colcount"
      | "aria-colindex"
      | "aria-colspan"
      | "aria-controls"
      | "aria-current"
      | "aria-describedby"
      | "aria-details"
      | "aria-disabled"
      | "aria-dropeffect"
      | "aria-errormessage"
      | "aria-expanded"
      | "aria-flowto"
      | "aria-grabbed"
      | "aria-haspopup"
      | "aria-hidden"
      | "aria-invalid"
      | "aria-keyshortcuts"
      | "aria-label"
      | "aria-labelledby"
      | "aria-level"
      | "aria-live"
      | "aria-modal"
      | "aria-multiline"
      | "aria-multiselectable"
      | "aria-orientation"
      | "aria-owns"
      | "aria-placeholder"
      | "aria-posinset"
      | "aria-pressed"
      | "aria-readonly"
      | "aria-relevant"
      | "aria-required"
      | "aria-roledescription"
      | "aria-rowcount"
      | "aria-rowindex"
      | "aria-rowspan"
      | "aria-selected"
      | "aria-setsize"
      | "aria-sort"
      | "aria-valuemax"
      | "aria-valuemin"
      | "aria-valuenow"
      | "aria-valuetext"
      | "children"
      | "dangerouslySetInnerHTML"
      | "onCopy"
      | "onCopyCapture"
      | "onCut"
      | "onCutCapture"
      | "onPaste"
      | "onPasteCapture"
      | "onCompositionEnd"
      | "onCompositionEndCapture"
      | "onCompositionStart"
      | "onCompositionStartCapture"
      | "onCompositionUpdate"
      | "onCompositionUpdateCapture"
      | "onFocus"
      | "onFocusCapture"
      | "onBlur"
      | "onBlurCapture"
      | "onChange"
      | "onChangeCapture"
      | "onBeforeInput"
      | "onBeforeInputCapture"
      | "onInput"
      | "onInputCapture"
      | "onReset"
      | "onResetCapture"
      | "onSubmit"
      | "onSubmitCapture"
      | "onInvalid"
      | "onInvalidCapture"
      | "onLoad"
      | "onLoadCapture"
      | "onError"
      | "onErrorCapture"
      | "onKeyDown"
      | "onKeyDownCapture"
      | "onKeyPress"
      | "onKeyPressCapture"
      | "onKeyUp"
      | "onKeyUpCapture"
      | "onAbort"
      | "onAbortCapture"
      | "onCanPlay"
      | "onCanPlayCapture"
      | "onCanPlayThrough"
      | "onCanPlayThroughCapture"
      | "onDurationChange"
      | "onDurationChangeCapture"
      | "onEmptied"
      | "onEmptiedCapture"
      | "onEncrypted"
      | "onEncryptedCapture"
      | "onEnded"
      | "onEndedCapture"
      | "onLoadedData"
      | "onLoadedDataCapture"
      | "onLoadedMetadata"
      | "onLoadedMetadataCapture"
      | "onLoadStart"
      | "onLoadStartCapture"
      | "onPause"
      | "onPauseCapture"
      | "onPlay"
      | "onPlayCapture"
      | "onPlaying"
      | "onPlayingCapture"
      | "onProgress"
      | "onProgressCapture"
      | "onRateChange"
      | "onRateChangeCapture"
      | "onSeeked"
      | "onSeekedCapture"
      | "onSeeking"
      | "onSeekingCapture"
      | "onStalled"
      | "onStalledCapture"
      | "onSuspend"
      | "onSuspendCapture"
      | "onTimeUpdate"
      | "onTimeUpdateCapture"
      | "onVolumeChange"
      | "onVolumeChangeCapture"
      | "onWaiting"
      | "onWaitingCapture"
      | "onAuxClick"
      | "onAuxClickCapture"
      | "onClick"
      | "onClickCapture"
      | "onContextMenu"
      | "onContextMenuCapture"
      | "onDoubleClick"
      | "onDoubleClickCapture"
      | "onDrag"
      | "onDragCapture"
      | "onDragEnd"
      | "onDragEndCapture"
      | "onDragEnter"
      | "onDragEnterCapture"
      | "onDragExit"
      | "onDragExitCapture"
      | "onDragLeave"
      | "onDragLeaveCapture"
      | "onDragOver"
      | "onDragOverCapture"
      | "onDragStart"
      | "onDragStartCapture"
      | "onDrop"
      | "onDropCapture"
      | "onMouseDown"
      | "onMouseDownCapture"
      | "onMouseEnter"
      | "onMouseLeave"
      | "onMouseMove"
      | "onMouseMoveCapture"
      | "onMouseOut"
      | "onMouseOutCapture"
      | "onMouseOver"
      | "onMouseOverCapture"
      | "onMouseUp"
      | "onMouseUpCapture"
      | "onSelect"
      | "onSelectCapture"
      | "onTouchCancel"
      | "onTouchCancelCapture"
      | "onTouchEnd"
      | "onTouchEndCapture"
      | "onTouchMove"
      | "onTouchMoveCapture"
      | "onTouchStart"
      | "onTouchStartCapture"
      | "onPointerDown"
      | "onPointerDownCapture"
      | "onPointerMove"
      | "onPointerMoveCapture"
      | "onPointerUp"
      | "onPointerUpCapture"
      | "onPointerCancel"
      | "onPointerCancelCapture"
      | "onPointerEnter"
      | "onPointerEnterCapture"
      | "onPointerLeave"
      | "onPointerLeaveCapture"
      | "onPointerOver"
      | "onPointerOverCapture"
      | "onPointerOut"
      | "onPointerOutCapture"
      | "onGotPointerCapture"
      | "onGotPointerCaptureCapture"
      | "onLostPointerCapture"
      | "onLostPointerCaptureCapture"
      | "onScroll"
      | "onScrollCapture"
      | "onWheel"
      | "onWheelCapture"
      | "onAnimationStart"
      | "onAnimationStartCapture"
      | "onAnimationEnd"
      | "onAnimationEndCapture"
      | "onAnimationIteration"
      | "onAnimationIterationCapture"
      | "onTransitionEnd"
      | "onTransitionEndCapture"
      | "action"
      | "centerRipple"
      | "disabled"
      | "disableRipple"
      | "disableTouchRipple"
      | "focusRipple"
      | "focusVisibleClassName"
      | "LinkComponent"
      | "onFocusVisible"
      | "sx"
      | "TouchRippleProps"
      | "disableElevation"
      | "disableFocusRipple"
      | "endIcon"
      | "fullWidth"
      | "href"
      | "size"
      | "startIcon"
      | "variant"
      | "key"
      | "autoFocus"
      | "formAction"
      | "formEncType"
      | "formMethod"
      | "formNoValidate"
      | "formTarget"
      | "name"
      | "type"
      | "value"
    > &
      React$1.RefAttributes<HTMLButtonElement>
  >;

  declare const GridToolbarDensitySelector: React$1.ForwardRefExoticComponent<
    Pick<
      ButtonProps<"button", {}>,
      | keyof _mui_material_OverridableComponent.CommonProps
      | "form"
      | "slot"
      | "title"
      | "defaultChecked"
      | "defaultValue"
      | "suppressContentEditableWarning"
      | "suppressHydrationWarning"
      | "accessKey"
      | "contentEditable"
      | "contextMenu"
      | "dir"
      | "draggable"
      | "hidden"
      | "id"
      | "lang"
      | "placeholder"
      | "spellCheck"
      | "tabIndex"
      | "translate"
      | "radioGroup"
      | "role"
      | "about"
      | "datatype"
      | "inlist"
      | "prefix"
      | "property"
      | "resource"
      | "typeof"
      | "vocab"
      | "autoCapitalize"
      | "autoCorrect"
      | "autoSave"
      | "color"
      | "itemProp"
      | "itemScope"
      | "itemType"
      | "itemID"
      | "itemRef"
      | "results"
      | "security"
      | "unselectable"
      | "inputMode"
      | "is"
      | "aria-activedescendant"
      | "aria-atomic"
      | "aria-autocomplete"
      | "aria-busy"
      | "aria-checked"
      | "aria-colcount"
      | "aria-colindex"
      | "aria-colspan"
      | "aria-controls"
      | "aria-current"
      | "aria-describedby"
      | "aria-details"
      | "aria-disabled"
      | "aria-dropeffect"
      | "aria-errormessage"
      | "aria-expanded"
      | "aria-flowto"
      | "aria-grabbed"
      | "aria-haspopup"
      | "aria-hidden"
      | "aria-invalid"
      | "aria-keyshortcuts"
      | "aria-label"
      | "aria-labelledby"
      | "aria-level"
      | "aria-live"
      | "aria-modal"
      | "aria-multiline"
      | "aria-multiselectable"
      | "aria-orientation"
      | "aria-owns"
      | "aria-placeholder"
      | "aria-posinset"
      | "aria-pressed"
      | "aria-readonly"
      | "aria-relevant"
      | "aria-required"
      | "aria-roledescription"
      | "aria-rowcount"
      | "aria-rowindex"
      | "aria-rowspan"
      | "aria-selected"
      | "aria-setsize"
      | "aria-sort"
      | "aria-valuemax"
      | "aria-valuemin"
      | "aria-valuenow"
      | "aria-valuetext"
      | "children"
      | "dangerouslySetInnerHTML"
      | "onCopy"
      | "onCopyCapture"
      | "onCut"
      | "onCutCapture"
      | "onPaste"
      | "onPasteCapture"
      | "onCompositionEnd"
      | "onCompositionEndCapture"
      | "onCompositionStart"
      | "onCompositionStartCapture"
      | "onCompositionUpdate"
      | "onCompositionUpdateCapture"
      | "onFocus"
      | "onFocusCapture"
      | "onBlur"
      | "onBlurCapture"
      | "onChange"
      | "onChangeCapture"
      | "onBeforeInput"
      | "onBeforeInputCapture"
      | "onInput"
      | "onInputCapture"
      | "onReset"
      | "onResetCapture"
      | "onSubmit"
      | "onSubmitCapture"
      | "onInvalid"
      | "onInvalidCapture"
      | "onLoad"
      | "onLoadCapture"
      | "onError"
      | "onErrorCapture"
      | "onKeyDown"
      | "onKeyDownCapture"
      | "onKeyPress"
      | "onKeyPressCapture"
      | "onKeyUp"
      | "onKeyUpCapture"
      | "onAbort"
      | "onAbortCapture"
      | "onCanPlay"
      | "onCanPlayCapture"
      | "onCanPlayThrough"
      | "onCanPlayThroughCapture"
      | "onDurationChange"
      | "onDurationChangeCapture"
      | "onEmptied"
      | "onEmptiedCapture"
      | "onEncrypted"
      | "onEncryptedCapture"
      | "onEnded"
      | "onEndedCapture"
      | "onLoadedData"
      | "onLoadedDataCapture"
      | "onLoadedMetadata"
      | "onLoadedMetadataCapture"
      | "onLoadStart"
      | "onLoadStartCapture"
      | "onPause"
      | "onPauseCapture"
      | "onPlay"
      | "onPlayCapture"
      | "onPlaying"
      | "onPlayingCapture"
      | "onProgress"
      | "onProgressCapture"
      | "onRateChange"
      | "onRateChangeCapture"
      | "onSeeked"
      | "onSeekedCapture"
      | "onSeeking"
      | "onSeekingCapture"
      | "onStalled"
      | "onStalledCapture"
      | "onSuspend"
      | "onSuspendCapture"
      | "onTimeUpdate"
      | "onTimeUpdateCapture"
      | "onVolumeChange"
      | "onVolumeChangeCapture"
      | "onWaiting"
      | "onWaitingCapture"
      | "onAuxClick"
      | "onAuxClickCapture"
      | "onClick"
      | "onClickCapture"
      | "onContextMenu"
      | "onContextMenuCapture"
      | "onDoubleClick"
      | "onDoubleClickCapture"
      | "onDrag"
      | "onDragCapture"
      | "onDragEnd"
      | "onDragEndCapture"
      | "onDragEnter"
      | "onDragEnterCapture"
      | "onDragExit"
      | "onDragExitCapture"
      | "onDragLeave"
      | "onDragLeaveCapture"
      | "onDragOver"
      | "onDragOverCapture"
      | "onDragStart"
      | "onDragStartCapture"
      | "onDrop"
      | "onDropCapture"
      | "onMouseDown"
      | "onMouseDownCapture"
      | "onMouseEnter"
      | "onMouseLeave"
      | "onMouseMove"
      | "onMouseMoveCapture"
      | "onMouseOut"
      | "onMouseOutCapture"
      | "onMouseOver"
      | "onMouseOverCapture"
      | "onMouseUp"
      | "onMouseUpCapture"
      | "onSelect"
      | "onSelectCapture"
      | "onTouchCancel"
      | "onTouchCancelCapture"
      | "onTouchEnd"
      | "onTouchEndCapture"
      | "onTouchMove"
      | "onTouchMoveCapture"
      | "onTouchStart"
      | "onTouchStartCapture"
      | "onPointerDown"
      | "onPointerDownCapture"
      | "onPointerMove"
      | "onPointerMoveCapture"
      | "onPointerUp"
      | "onPointerUpCapture"
      | "onPointerCancel"
      | "onPointerCancelCapture"
      | "onPointerEnter"
      | "onPointerEnterCapture"
      | "onPointerLeave"
      | "onPointerLeaveCapture"
      | "onPointerOver"
      | "onPointerOverCapture"
      | "onPointerOut"
      | "onPointerOutCapture"
      | "onGotPointerCapture"
      | "onGotPointerCaptureCapture"
      | "onLostPointerCapture"
      | "onLostPointerCaptureCapture"
      | "onScroll"
      | "onScrollCapture"
      | "onWheel"
      | "onWheelCapture"
      | "onAnimationStart"
      | "onAnimationStartCapture"
      | "onAnimationEnd"
      | "onAnimationEndCapture"
      | "onAnimationIteration"
      | "onAnimationIterationCapture"
      | "onTransitionEnd"
      | "onTransitionEndCapture"
      | "action"
      | "centerRipple"
      | "disabled"
      | "disableRipple"
      | "disableTouchRipple"
      | "focusRipple"
      | "focusVisibleClassName"
      | "LinkComponent"
      | "onFocusVisible"
      | "sx"
      | "TouchRippleProps"
      | "disableElevation"
      | "disableFocusRipple"
      | "endIcon"
      | "fullWidth"
      | "href"
      | "size"
      | "startIcon"
      | "variant"
      | "key"
      | "autoFocus"
      | "formAction"
      | "formEncType"
      | "formMethod"
      | "formNoValidate"
      | "formTarget"
      | "name"
      | "type"
      | "value"
    > &
      React$1.RefAttributes<HTMLButtonElement>
  >;

  interface GridToolbarExportProps extends ButtonProps {
    csvOptions?: GridCsvExportOptions;
    printOptions?: GridPrintExportOptions;
  }
  declare const GridToolbarExport: React$1.ForwardRefExoticComponent<
    Pick<
      GridToolbarExportProps,
      | "className"
      | "style"
      | "classes"
      | "form"
      | "slot"
      | "title"
      | "defaultChecked"
      | "defaultValue"
      | "suppressContentEditableWarning"
      | "suppressHydrationWarning"
      | "accessKey"
      | "contentEditable"
      | "contextMenu"
      | "dir"
      | "draggable"
      | "hidden"
      | "id"
      | "lang"
      | "placeholder"
      | "spellCheck"
      | "tabIndex"
      | "translate"
      | "radioGroup"
      | "role"
      | "about"
      | "datatype"
      | "inlist"
      | "prefix"
      | "property"
      | "resource"
      | "typeof"
      | "vocab"
      | "autoCapitalize"
      | "autoCorrect"
      | "autoSave"
      | "color"
      | "itemProp"
      | "itemScope"
      | "itemType"
      | "itemID"
      | "itemRef"
      | "results"
      | "security"
      | "unselectable"
      | "inputMode"
      | "is"
      | "aria-activedescendant"
      | "aria-atomic"
      | "aria-autocomplete"
      | "aria-busy"
      | "aria-checked"
      | "aria-colcount"
      | "aria-colindex"
      | "aria-colspan"
      | "aria-controls"
      | "aria-current"
      | "aria-describedby"
      | "aria-details"
      | "aria-disabled"
      | "aria-dropeffect"
      | "aria-errormessage"
      | "aria-expanded"
      | "aria-flowto"
      | "aria-grabbed"
      | "aria-haspopup"
      | "aria-hidden"
      | "aria-invalid"
      | "aria-keyshortcuts"
      | "aria-label"
      | "aria-labelledby"
      | "aria-level"
      | "aria-live"
      | "aria-modal"
      | "aria-multiline"
      | "aria-multiselectable"
      | "aria-orientation"
      | "aria-owns"
      | "aria-placeholder"
      | "aria-posinset"
      | "aria-pressed"
      | "aria-readonly"
      | "aria-relevant"
      | "aria-required"
      | "aria-roledescription"
      | "aria-rowcount"
      | "aria-rowindex"
      | "aria-rowspan"
      | "aria-selected"
      | "aria-setsize"
      | "aria-sort"
      | "aria-valuemax"
      | "aria-valuemin"
      | "aria-valuenow"
      | "aria-valuetext"
      | "children"
      | "dangerouslySetInnerHTML"
      | "onCopy"
      | "onCopyCapture"
      | "onCut"
      | "onCutCapture"
      | "onPaste"
      | "onPasteCapture"
      | "onCompositionEnd"
      | "onCompositionEndCapture"
      | "onCompositionStart"
      | "onCompositionStartCapture"
      | "onCompositionUpdate"
      | "onCompositionUpdateCapture"
      | "onFocus"
      | "onFocusCapture"
      | "onBlur"
      | "onBlurCapture"
      | "onChange"
      | "onChangeCapture"
      | "onBeforeInput"
      | "onBeforeInputCapture"
      | "onInput"
      | "onInputCapture"
      | "onReset"
      | "onResetCapture"
      | "onSubmit"
      | "onSubmitCapture"
      | "onInvalid"
      | "onInvalidCapture"
      | "onLoad"
      | "onLoadCapture"
      | "onError"
      | "onErrorCapture"
      | "onKeyDown"
      | "onKeyDownCapture"
      | "onKeyPress"
      | "onKeyPressCapture"
      | "onKeyUp"
      | "onKeyUpCapture"
      | "onAbort"
      | "onAbortCapture"
      | "onCanPlay"
      | "onCanPlayCapture"
      | "onCanPlayThrough"
      | "onCanPlayThroughCapture"
      | "onDurationChange"
      | "onDurationChangeCapture"
      | "onEmptied"
      | "onEmptiedCapture"
      | "onEncrypted"
      | "onEncryptedCapture"
      | "onEnded"
      | "onEndedCapture"
      | "onLoadedData"
      | "onLoadedDataCapture"
      | "onLoadedMetadata"
      | "onLoadedMetadataCapture"
      | "onLoadStart"
      | "onLoadStartCapture"
      | "onPause"
      | "onPauseCapture"
      | "onPlay"
      | "onPlayCapture"
      | "onPlaying"
      | "onPlayingCapture"
      | "onProgress"
      | "onProgressCapture"
      | "onRateChange"
      | "onRateChangeCapture"
      | "onSeeked"
      | "onSeekedCapture"
      | "onSeeking"
      | "onSeekingCapture"
      | "onStalled"
      | "onStalledCapture"
      | "onSuspend"
      | "onSuspendCapture"
      | "onTimeUpdate"
      | "onTimeUpdateCapture"
      | "onVolumeChange"
      | "onVolumeChangeCapture"
      | "onWaiting"
      | "onWaitingCapture"
      | "onAuxClick"
      | "onAuxClickCapture"
      | "onClick"
      | "onClickCapture"
      | "onContextMenu"
      | "onContextMenuCapture"
      | "onDoubleClick"
      | "onDoubleClickCapture"
      | "onDrag"
      | "onDragCapture"
      | "onDragEnd"
      | "onDragEndCapture"
      | "onDragEnter"
      | "onDragEnterCapture"
      | "onDragExit"
      | "onDragExitCapture"
      | "onDragLeave"
      | "onDragLeaveCapture"
      | "onDragOver"
      | "onDragOverCapture"
      | "onDragStart"
      | "onDragStartCapture"
      | "onDrop"
      | "onDropCapture"
      | "onMouseDown"
      | "onMouseDownCapture"
      | "onMouseEnter"
      | "onMouseLeave"
      | "onMouseMove"
      | "onMouseMoveCapture"
      | "onMouseOut"
      | "onMouseOutCapture"
      | "onMouseOver"
      | "onMouseOverCapture"
      | "onMouseUp"
      | "onMouseUpCapture"
      | "onSelect"
      | "onSelectCapture"
      | "onTouchCancel"
      | "onTouchCancelCapture"
      | "onTouchEnd"
      | "onTouchEndCapture"
      | "onTouchMove"
      | "onTouchMoveCapture"
      | "onTouchStart"
      | "onTouchStartCapture"
      | "onPointerDown"
      | "onPointerDownCapture"
      | "onPointerMove"
      | "onPointerMoveCapture"
      | "onPointerUp"
      | "onPointerUpCapture"
      | "onPointerCancel"
      | "onPointerCancelCapture"
      | "onPointerEnter"
      | "onPointerEnterCapture"
      | "onPointerLeave"
      | "onPointerLeaveCapture"
      | "onPointerOver"
      | "onPointerOverCapture"
      | "onPointerOut"
      | "onPointerOutCapture"
      | "onGotPointerCapture"
      | "onGotPointerCaptureCapture"
      | "onLostPointerCapture"
      | "onLostPointerCaptureCapture"
      | "onScroll"
      | "onScrollCapture"
      | "onWheel"
      | "onWheelCapture"
      | "onAnimationStart"
      | "onAnimationStartCapture"
      | "onAnimationEnd"
      | "onAnimationEndCapture"
      | "onAnimationIteration"
      | "onAnimationIterationCapture"
      | "onTransitionEnd"
      | "onTransitionEndCapture"
      | "action"
      | "centerRipple"
      | "disabled"
      | "disableRipple"
      | "disableTouchRipple"
      | "focusRipple"
      | "focusVisibleClassName"
      | "LinkComponent"
      | "onFocusVisible"
      | "sx"
      | "TouchRippleProps"
      | "disableElevation"
      | "disableFocusRipple"
      | "endIcon"
      | "fullWidth"
      | "href"
      | "size"
      | "startIcon"
      | "variant"
      | "key"
      | "autoFocus"
      | "formAction"
      | "formEncType"
      | "formMethod"
      | "formNoValidate"
      | "formTarget"
      | "name"
      | "type"
      | "value"
      | "csvOptions"
      | "printOptions"
    > &
      React$1.RefAttributes<HTMLButtonElement>
  >;

  interface GridToolbarFilterButtonProps
    extends Omit<TooltipProps, "title" | "children" | "componentsProps"> {
    /**
     * The props used for each slot inside.
     * @default {}
     */
    componentsProps?: {
      button?: ButtonProps;
    };
  }
  declare const GridToolbarFilterButton: React$1.ForwardRefExoticComponent<
    Pick<
      GridToolbarFilterButtonProps,
      | "classes"
      | "slot"
      | "style"
      | "defaultChecked"
      | "defaultValue"
      | "suppressContentEditableWarning"
      | "suppressHydrationWarning"
      | "accessKey"
      | "className"
      | "contentEditable"
      | "contextMenu"
      | "dir"
      | "draggable"
      | "hidden"
      | "id"
      | "lang"
      | "placeholder"
      | "spellCheck"
      | "tabIndex"
      | "translate"
      | "radioGroup"
      | "role"
      | "about"
      | "datatype"
      | "inlist"
      | "prefix"
      | "property"
      | "resource"
      | "typeof"
      | "vocab"
      | "autoCapitalize"
      | "autoCorrect"
      | "autoSave"
      | "color"
      | "itemProp"
      | "itemScope"
      | "itemType"
      | "itemID"
      | "itemRef"
      | "results"
      | "security"
      | "unselectable"
      | "inputMode"
      | "is"
      | "aria-activedescendant"
      | "aria-atomic"
      | "aria-autocomplete"
      | "aria-busy"
      | "aria-checked"
      | "aria-colcount"
      | "aria-colindex"
      | "aria-colspan"
      | "aria-controls"
      | "aria-current"
      | "aria-describedby"
      | "aria-details"
      | "aria-disabled"
      | "aria-dropeffect"
      | "aria-errormessage"
      | "aria-expanded"
      | "aria-flowto"
      | "aria-grabbed"
      | "aria-haspopup"
      | "aria-hidden"
      | "aria-invalid"
      | "aria-keyshortcuts"
      | "aria-label"
      | "aria-labelledby"
      | "aria-level"
      | "aria-live"
      | "aria-modal"
      | "aria-multiline"
      | "aria-multiselectable"
      | "aria-orientation"
      | "aria-owns"
      | "aria-placeholder"
      | "aria-posinset"
      | "aria-pressed"
      | "aria-readonly"
      | "aria-relevant"
      | "aria-required"
      | "aria-roledescription"
      | "aria-rowcount"
      | "aria-rowindex"
      | "aria-rowspan"
      | "aria-selected"
      | "aria-setsize"
      | "aria-sort"
      | "aria-valuemax"
      | "aria-valuemin"
      | "aria-valuenow"
      | "aria-valuetext"
      | "dangerouslySetInnerHTML"
      | "onCopy"
      | "onCopyCapture"
      | "onCut"
      | "onCutCapture"
      | "onPaste"
      | "onPasteCapture"
      | "onCompositionEnd"
      | "onCompositionEndCapture"
      | "onCompositionStart"
      | "onCompositionStartCapture"
      | "onCompositionUpdate"
      | "onCompositionUpdateCapture"
      | "onFocus"
      | "onFocusCapture"
      | "onBlur"
      | "onBlurCapture"
      | "onChange"
      | "onChangeCapture"
      | "onBeforeInput"
      | "onBeforeInputCapture"
      | "onInput"
      | "onInputCapture"
      | "onReset"
      | "onResetCapture"
      | "onSubmit"
      | "onSubmitCapture"
      | "onInvalid"
      | "onInvalidCapture"
      | "onLoad"
      | "onLoadCapture"
      | "onError"
      | "onErrorCapture"
      | "onKeyDown"
      | "onKeyDownCapture"
      | "onKeyPress"
      | "onKeyPressCapture"
      | "onKeyUp"
      | "onKeyUpCapture"
      | "onAbort"
      | "onAbortCapture"
      | "onCanPlay"
      | "onCanPlayCapture"
      | "onCanPlayThrough"
      | "onCanPlayThroughCapture"
      | "onDurationChange"
      | "onDurationChangeCapture"
      | "onEmptied"
      | "onEmptiedCapture"
      | "onEncrypted"
      | "onEncryptedCapture"
      | "onEnded"
      | "onEndedCapture"
      | "onLoadedData"
      | "onLoadedDataCapture"
      | "onLoadedMetadata"
      | "onLoadedMetadataCapture"
      | "onLoadStart"
      | "onLoadStartCapture"
      | "onPause"
      | "onPauseCapture"
      | "onPlay"
      | "onPlayCapture"
      | "onPlaying"
      | "onPlayingCapture"
      | "onProgress"
      | "onProgressCapture"
      | "onRateChange"
      | "onRateChangeCapture"
      | "onSeeked"
      | "onSeekedCapture"
      | "onSeeking"
      | "onSeekingCapture"
      | "onStalled"
      | "onStalledCapture"
      | "onSuspend"
      | "onSuspendCapture"
      | "onTimeUpdate"
      | "onTimeUpdateCapture"
      | "onVolumeChange"
      | "onVolumeChangeCapture"
      | "onWaiting"
      | "onWaitingCapture"
      | "onAuxClick"
      | "onAuxClickCapture"
      | "onClick"
      | "onClickCapture"
      | "onContextMenu"
      | "onContextMenuCapture"
      | "onDoubleClick"
      | "onDoubleClickCapture"
      | "onDrag"
      | "onDragCapture"
      | "onDragEnd"
      | "onDragEndCapture"
      | "onDragEnter"
      | "onDragEnterCapture"
      | "onDragExit"
      | "onDragExitCapture"
      | "onDragLeave"
      | "onDragLeaveCapture"
      | "onDragOver"
      | "onDragOverCapture"
      | "onDragStart"
      | "onDragStartCapture"
      | "onDrop"
      | "onDropCapture"
      | "onMouseDown"
      | "onMouseDownCapture"
      | "onMouseEnter"
      | "onMouseLeave"
      | "onMouseMove"
      | "onMouseMoveCapture"
      | "onMouseOut"
      | "onMouseOutCapture"
      | "onMouseOver"
      | "onMouseOverCapture"
      | "onMouseUp"
      | "onMouseUpCapture"
      | "onSelect"
      | "onSelectCapture"
      | "onTouchCancel"
      | "onTouchCancelCapture"
      | "onTouchEnd"
      | "onTouchEndCapture"
      | "onTouchMove"
      | "onTouchMoveCapture"
      | "onTouchStart"
      | "onTouchStartCapture"
      | "onPointerDown"
      | "onPointerDownCapture"
      | "onPointerMove"
      | "onPointerMoveCapture"
      | "onPointerUp"
      | "onPointerUpCapture"
      | "onPointerCancel"
      | "onPointerCancelCapture"
      | "onPointerEnter"
      | "onPointerEnterCapture"
      | "onPointerLeave"
      | "onPointerLeaveCapture"
      | "onPointerOver"
      | "onPointerOverCapture"
      | "onPointerOut"
      | "onPointerOutCapture"
      | "onGotPointerCapture"
      | "onGotPointerCaptureCapture"
      | "onLostPointerCapture"
      | "onLostPointerCaptureCapture"
      | "onScroll"
      | "onScrollCapture"
      | "onWheel"
      | "onWheelCapture"
      | "onAnimationStart"
      | "onAnimationStartCapture"
      | "onAnimationEnd"
      | "onAnimationEndCapture"
      | "onAnimationIteration"
      | "onAnimationIterationCapture"
      | "onTransitionEnd"
      | "onTransitionEndCapture"
      | "open"
      | "componentsProps"
      | "arrow"
      | "components"
      | "describeChild"
      | "disableFocusListener"
      | "disableHoverListener"
      | "disableInteractive"
      | "disableTouchListener"
      | "enterDelay"
      | "enterNextDelay"
      | "enterTouchDelay"
      | "followCursor"
      | "leaveDelay"
      | "leaveTouchDelay"
      | "onClose"
      | "onOpen"
      | "placement"
      | "PopperComponent"
      | "PopperProps"
      | "sx"
      | "TransitionComponent"
      | "TransitionProps"
    > &
      React$1.RefAttributes<HTMLButtonElement>
  >;

  declare const GridApiContext: React$1.Context<GridApiRef | undefined>;

  interface AutoSizerSize {
    height: number;
    width: number;
  }
  interface AutoSizerProps
    extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "children"> {
    /**
     * Function responsible for rendering children.
     * @param {AutoSizerSize} size The grid's size.
     * @returns {React.ReactNode} The children to render.
     */
    children: (size: AutoSizerSize) => React$1.ReactNode;
    /**
     * Default height to use for initial render; useful for SSR.
     * @default null
     */
    defaultHeight?: number;
    /**
     * Default width to use for initial render; useful for SSR.
     * @default null
     */
    defaultWidth?: number;
    /**
     * If `true`, disable dynamic :height property.
     * @default false
     */
    disableHeight?: boolean;
    /**
     * If `true`, disable dynamic :width property.
     * @default false
     */
    disableWidth?: boolean;
    /**
     * Nonce of the inlined stylesheet for Content Security Policy.
     */
    nonce?: string;
    /**
     * Callback to be invoked on-resize.
     * @param {AutoSizerSize} size The grid's size.
     */
    onResize?: (size: AutoSizerSize) => void;
  }
  declare const GridAutoSizer: React$1.ForwardRefExoticComponent<
    AutoSizerProps & React$1.RefAttributes<HTMLDivElement>
  >;

  declare const GridFooter: React$1.ForwardRefExoticComponent<
    GridFooterContainerProps & React$1.RefAttributes<HTMLDivElement>
  >;

  declare const GridHeader: React$1.ForwardRefExoticComponent<
    React$1.HTMLAttributes<HTMLDivElement> &
      React$1.RefAttributes<HTMLDivElement>
  >;

  declare const GridLoadingOverlay: React$1.ForwardRefExoticComponent<
    GridOverlayProps & React$1.RefAttributes<HTMLDivElement>
  >;

  declare const GridNoRowsOverlay: React$1.ForwardRefExoticComponent<
    GridOverlayProps & React$1.RefAttributes<HTMLDivElement>
  >;

  declare const GridPagination: React$1.ForwardRefExoticComponent<
    React$1.HTMLAttributes<HTMLDivElement> &
      React$1.RefAttributes<HTMLDivElement>
  >;

  interface RowCountProps {
    rowCount: number;
    visibleRowCount: number;
  }
  declare const GridRowCount: React$1.ForwardRefExoticComponent<
    React$1.HTMLAttributes<HTMLDivElement> &
      RowCountProps &
      React$1.RefAttributes<HTMLDivElement>
  >;

  interface GridRowProps {
    rowId: GridRowId;
    selected: boolean;
    index: number;
    rowHeight: number;
    containerWidth: number;
    row: GridRowModel;
    firstColumnToRender: number;
    lastColumnToRender: number;
    visibleColumns: GridStateColDef[];
    renderedColumns: GridStateColDef[];
    cellFocus: GridCellIdentifier | null;
    cellTabIndex: GridCellIdentifier | null;
    editRowsState: GridEditRowsModel;
    scrollBarState: GridScrollBarState;
    onClick?: React$1.MouseEventHandler<HTMLDivElement>;
    onDoubleClick?: React$1.MouseEventHandler<HTMLDivElement>;
  }
  declare function GridRow(
    props: React$1.HTMLAttributes<HTMLDivElement> & GridRowProps
  ): JSX.Element;
  declare namespace GridRow {
    var propTypes: any;
  }

  interface SelectedRowCountProps {
    selectedRowCount: number;
  }
  declare const GridSelectedRowCount: React$1.ForwardRefExoticComponent<
    React$1.HTMLAttributes<HTMLDivElement> &
      SelectedRowCountProps &
      React$1.RefAttributes<HTMLDivElement>
  >;

  interface ScrollAreaProps {
    scrollDirection: "left" | "right";
  }
  declare function GridScrollAreaRaw(
    props: ScrollAreaProps
  ): JSX.Element | null;
  declare namespace GridScrollAreaRaw {
    var propTypes: any;
  }
  declare const GridScrollArea: React$1.MemoExoticComponent<
    typeof GridScrollAreaRaw
  >;

  declare const GRID_EXPERIMENTAL_ENABLED: boolean;

  declare enum GridEvents {
    /**
     * Fired when the grid is resized. Called with a [[ElementSize]] object.
     */
    resize = "resize",
    /**
     * Fired when the grid is resized with a debounced time of 60ms. Called with a [[ElementSize]] object.
     */
    debouncedResize = "debouncedResize",
    /**
     * Fired when an exception is thrown in the grid.
     */
    componentError = "componentError",
    /**
     * Fired when the grid is unmounted.
     */
    unmount = "unmount",
    /**
     * Fired when the mode of a cell changes. Called with a [[GridCellModeChangeParams]] object.
     * @ignore - do not document
     */
    cellModeChange = "cellModeChange",
    /**
     * Fired when a cell is clicked. Called with a [[GridCellParams]] object.
     */
    cellClick = "cellClick",
    /**
     * Fired when a cell is double-clicked. Called with a [[GridCellParams]] object.
     */
    cellDoubleClick = "cellDoubleClick",
    /**
     * Fired when a `mousedown` event happens in a cell. Called with a [[GridCellParams]] object.
     */
    cellMouseDown = "cellMouseDown",
    /**
     * Fired when a `mouseup` event happens in a cell. Called with a [[GridCellParams]] object.
     */
    cellMouseUp = "cellMouseUp",
    /**
     * Fired when a `keydown` event happens in a cell. Called with a [[GridCellParams]] object.
     */
    cellKeyDown = "cellKeyDown",
    /**
     * Fired when a cell gains focus. Called with a [[GridCellParams]] object.
     */
    cellFocusIn = "cellFocusIn",
    /**
     * Fired when a cell loses focus. Called with a [[GridCellParams]] object.
     */
    cellFocusOut = "cellFocusOut",
    /**
     * Fired when the user starts dragging a cell. It's mapped to the `dragstart` DOM event.
     * Called with a [[GridCellParams]] object.
     * @ignore - do not document.
     */
    cellDragStart = "cellDragStart",
    /**
     * Fired when the dragged cell enters a valid drop target. It's mapped to the `dragend` DOM event.
     * Called with a [[GridCellParams]] object.
     * @ignore - do not document.
     */
    cellDragEnter = "cellDragEnter",
    /**
     * Fired while an element or text selection is dragged over the cell.
     * It's mapped to the `dragover` DOM event.
     * Called with a [[GridCellParams]] object.
     * @ignore - do not document.
     */
    cellDragOver = "cellDragOver",
    /**
     * Fired when the dragging of a cell ends. Called with a [[GridCellParams]] object.
     * @ignore - do not document.
     */
    cellDragEnd = "cellDragEnd",
    /**
     * Fired when the props of the edit cell changes. Called with a [[GridEditCellPropsParams]] object.
     */
    editCellPropsChange = "editCellPropsChange",
    /**
     * Fired when the props of the edit input are committed. Called with a [[GridEditCellPropsParams]] object.
     */
    cellEditCommit = "cellEditCommit",
    /**
     * Fired when the cell turns to edit mode. Called with a [[GridCellParams]] object.
     */
    cellEditStart = "cellEditStart",
    /**
     * Fired when the cell turns back to view mode. Called with a [[GridCellParams]] object.
     */
    cellEditStop = "cellEditStop",
    /**
     * Fired when the row turns to edit mode. Called with a [[GridCellParams]] object.
     */
    rowEditStart = "rowEditStart",
    /**
     * Fired when the row turns back to view mode. Called with a [[GridCellParams]] object.
     */
    rowEditStop = "rowEditStop",
    /**
     * Fired when the props of the edit input are committed. Called with the [[GridRowId]] of the row.
     */
    rowEditCommit = "rowEditCommit",
    /**
     * Fired when a [navigation key](/components/data-grid/accessibility#keyboard-navigation) is pressed in a cell.
     * Called with a [[GridCellParams]] object.
     * @ignore - do not document.
     */
    cellNavigationKeyDown = "cellNavigationKeyDown",
    /**
     * Fired when a row is clicked. Called with a [[GridRowParams]] object.
     */
    rowClick = "rowClick",
    /**
     * Fired when a row is double-clicked. Called with a [[GridRowParams]] object.
     */
    rowDoubleClick = "rowDoubleClick",
    /**
     * Fired when the row editing model changes. Called with a [[GridEditRowModelParams]] object.
     */
    editRowsModelChange = "editRowsModelChange",
    /**
     * Fired when a column header loses focus. Called with a [[GridColumnHeaderParams]] object.
     * @ignore - do not document.
     */
    columnHeaderBlur = "columnHeaderBlur",
    /**
     * Fired when a column header gains focus. Called with a [[GridColumnHeaderParams]] object.
     * @ignore - do not document.
     */
    columnHeaderFocus = "columnHeaderFocus",
    /**
     * Fired when a [navigation key](/components/data-grid/accessibility#keyboard-navigation) is pressed in a column header.
     * Called with a [[GridColumnHeaderParams]] object.
     * @ignore - do not document.
     */
    columnHeaderNavigationKeyDown = "columnHeaderNavigationKeyDown",
    /**
     * Fired when a key is pressed in a column header. It's mapped do the `keydown` DOM event.
     * Called with a [[GridColumnHeaderParams]] object.
     */
    columnHeaderKeyDown = "columnHeaderKeyDown",
    /**
     * Fired when a column header is clicked. Called with a [[GridColumnHeaderParams]] object.
     */
    columnHeaderClick = "columnHeaderClick",
    /**
     * Fired when a column header is double-clicked. Called with a [[GridColumnHeaderParams]] object.
     */
    columnHeaderDoubleClick = "columnHeaderDoubleClick",
    /**
     * Fired when a `mouseover` event happens in a column header. Called with a [[GridColumnHeaderParams]] object.
     * @ignore - do not document.
     */
    columnHeaderOver = "columnHeaderOver",
    /**
     * Fired when a `mouseout` event happens in a column header. Called with a [[GridColumnHeaderParams]] object.
     * @ignore - do not document.
     */
    columnHeaderOut = "columnHeaderOut",
    /**
     * Fired when a `mouseenter` event happens in a column header. Called with a [[GridColumnHeaderParams]] object.
     * @ignore - do not document.
     */
    columnHeaderEnter = "columnHeaderEnter",
    /**
     * Fired when a `mouseleave` event happens in a column header. Called with a [[GridColumnHeaderParams]] object.
     * @ignore - do not document.*
     */
    columnHeaderLeave = "columnHeaderLeave",
    /**
     * Fired when the user starts dragging a column header. It's mapped to the `dragstart` DOM event.
     * Called with a [[GridColumnHeaderParams]] object.
     * @ignore - do not document.
     */
    columnHeaderDragStart = "columnHeaderDragStart",
    /**
     * Fired while an element or text selection is dragged over the column header.
     * It's mapped to the `dragover` DOM event.
     * Called with a [[GridColumnHeaderParams]] object.
     * @ignore - do not document.
     */
    columnHeaderDragOver = "columnHeaderDragOver",
    /**
     * Fired when the dragged column header enters a valid drop target.
     * It's mapped to the `dragend` DOM event.
     * Called with a [[GridColumnHeaderParams]] object.
     * @ignore - do not document.
     */
    columnHeaderDragEnter = "columnHeaderDragEnter",
    /**
     * Fired when the dragging of a column header ends. Called with a [[GridColumnHeaderParams]] object.
     * @ignore - do not document.
     */
    columnHeaderDragEnd = "columnHeaderDragEnd",
    /**
     * Fired when the selection state of one or multiple rows changes.
     * Called with a [[GridSelectionModelChangeParams]] object.
     */
    selectionChange = "selectionChange",
    /**
     * Fired when the value of the selection checkbox of the header is changed
     * Called with a [[GridHeaderSelectionCheckboxParams]] object.
     */
    headerSelectionCheckboxChange = "headerSelectionCheckboxChange",
    /**
     * Fired when the value of the selection checkbox of a row is changed
     * Called with a [[GridRowSelectionCheckboxParams]] object.
     */
    rowSelectionCheckboxChange = "rowSelectionCheckboxChange",
    /**
     * Fired when the page changes.
     */
    pageChange = "pageChange",
    /**
     * Fired when the page size changes.
     */
    pageSizeChange = "pageSizeChange",
    /**
     * Fired during the scroll of the grid viewport. Called with a [[GridScrollParams]] object.
     */
    rowsScroll = "rowsScroll",
    /**
     * Fired when scrolling to the bottom of the grid viewport. Called with a [[GridRowScrollEndParams]] object.
     */
    rowsScrollEnd = "rowsScrollEnd",
    /**
     * Fired when a `mousedown` DOM event happens in the column header separator.
     * Called with a [[GridColumnHeaderParams]] object.
     * @ignore - do not document.
     */
    columnSeparatorMouseDown = "columnSeparatorMouseDown",
    /**
     * Fired during the resizing of a column. Called with a [[GridColumnResizeParams]] object.
     */
    columnResize = "columnResize",
    /**
     * Fired when the width of a column is changed. Called with a [[GridColumnResizeParams]] object.
     */
    columnWidthChange = "columnWidthChange",
    /**
     * Fired when the user starts resizing a column. Called with an object `{ field: string }`.
     */
    columnResizeStart = "columnResizeStart",
    /**
     * Fired when the user stops resizing a column. Called with an object `{ field: string }`.
     */
    columnResizeStop = "columnResizeStop",
    /**
     * Fired when the user ends reordering a column.
     */
    columnOrderChange = "columnOrderChange",
    /**
     * Fired when the rows are updated.
     * @ignore - do not document.
     */
    rowsSet = "rowsSet",
    /**
     * Fired when the visible rows are updated
     * @ignore - do not document.
     */
    visibleRowsSet = "visibleRowsSet",
    /**
     * Fired when the columns state is changed.
     * Called with an array of strings corresponding to the field names.
     */
    columnsChange = "columnsChange",
    /**
     * Fired when a column pre-processing is changed
     * @ignore - do not document
     */
    columnsPreProcessingChange = "columnsPreProcessingChange",
    /**
     * Fired when the row grouping function is changed
     * @ignore - do not document
     */
    rowGroupsPreProcessingChange = "rowGroupsPreProcessingChange",
    /**
     * Fired when the sort model changes.
     * Called with a [[GridSortModelParams]] object.
     */
    sortModelChange = "sortModelChange",
    /**
     * Fired when the filter model changes.
     * Called with a [[GridFilterModel]] object.
     */
    filterModelChange = "filterModelChange",
    /**
     * Fired when the state of the grid is updated. Called with a [[GridState]] object.
     */
    stateChange = "stateChange",
    /**
     * Fired when a column visibility changes. Called with a [[GridColumnVisibilityChangeParams]] object.
     */
    columnVisibilityChange = "columnVisibilityChange",
  }

  declare const GRID_DEFAULT_LOCALE_TEXT: GridLocaleText;

  declare const gridColumnMenuSelector: (
    state: GridState
  ) => GridColumnMenuState;

  declare const gridColumnReorderSelector: (
    state: GridState
  ) => GridColumnReorderState;
  declare const gridColumnReorderDragColSelector: reselect.OutputSelector<
    GridState,
    string,
    (res: GridColumnReorderState) => string
  >;

  declare const gridColumnResizeSelector: (
    state: GridState
  ) => GridColumnResizeState;
  declare const gridResizingColumnFieldSelector: reselect.OutputSelector<
    GridState,
    string,
    (res: GridColumnResizeState) => string
  >;

  declare const gridColumnsSelector: (state: GridState) => GridColumnsState;
  declare const allGridColumnsFieldsSelector: (state: GridState) => string[];
  declare const gridColumnLookupSelector: (
    state: GridState
  ) => GridColumnLookup;
  declare const allGridColumnsSelector: reselect.OutputSelector<
    GridState,
    GridStateColDef[],
    (res1: string[], res2: GridColumnLookup) => GridStateColDef[]
  >;
  declare const visibleGridColumnsSelector: reselect.OutputSelector<
    GridState,
    GridStateColDef[],
    (res: GridStateColDef[]) => GridStateColDef[]
  >;
  declare const gridColumnsMetaSelector: reselect.OutputSelector<
    GridState,
    {
      totalWidth: number;
      positions: number[];
    },
    (res: GridStateColDef[]) => {
      totalWidth: number;
      positions: number[];
    }
  >;
  declare const filterableGridColumnsSelector: reselect.OutputSelector<
    GridState,
    GridStateColDef[],
    (res: GridStateColDef[]) => GridStateColDef[]
  >;
  declare const filterableGridColumnsIdsSelector: reselect.OutputSelector<
    GridState,
    string[],
    (res: GridStateColDef[]) => string[]
  >;
  declare const visibleGridColumnsLengthSelector: reselect.OutputSelector<
    GridState,
    number,
    (res: GridStateColDef[]) => number
  >;
  declare const gridColumnsTotalWidthSelector: reselect.OutputSelector<
    GridState,
    number,
    (res: { totalWidth: number; positions: number[] }) => number
  >;

  declare const gridDensitySelector: (state: GridState) => GridDensityState;
  declare const gridDensityValueSelector: reselect.OutputSelector<
    GridState,
    GridDensity,
    (res: GridDensityState) => GridDensity
  >;
  declare const gridDensityRowHeightSelector: reselect.OutputSelector<
    GridState,
    number,
    (res: GridDensityState) => number
  >;
  declare const gridDensityHeaderHeightSelector: reselect.OutputSelector<
    GridState,
    number,
    (res: GridDensityState) => number
  >;

  declare const gridEditRowsStateSelector: (
    state: GridState
  ) => GridEditRowsModel;

  declare const gridFilterStateSelector: (state: GridState) => GridFilterState;
  declare const gridFilterModelSelector: reselect.OutputSelector<
    GridState,
    GridFilterModel,
    (res: GridFilterState) => GridFilterModel
  >;
  declare const gridVisibleRowsLookupSelector: reselect.OutputSelector<
    GridState,
    Record<GridRowId, boolean>,
    (res: GridFilterState) => Record<GridRowId, boolean>
  >;
  declare const visibleSortedGridRowsSelector: reselect.OutputSelector<
    GridState,
    Map<
      GridRowId,
      {
        [key: string]: any;
      }
    >,
    (
      res1: Record<GridRowId, boolean>,
      res2: Map<
        GridRowId,
        {
          [key: string]: any;
        }
      >
    ) => Map<
      GridRowId,
      {
        [key: string]: any;
      }
    >
  >;
  declare const visibleSortedGridRowsAsArraySelector: reselect.OutputSelector<
    GridState,
    [
      GridRowId,
      {
        [key: string]: any;
      }
    ][],
    (
      res: Map<
        GridRowId,
        {
          [key: string]: any;
        }
      >
    ) => [
      GridRowId,
      {
        [key: string]: any;
      }
    ][]
  >;
  declare const visibleSortedGridRowIdsSelector: reselect.OutputSelector<
    GridState,
    GridRowId[],
    (
      res: Map<
        GridRowId,
        {
          [key: string]: any;
        }
      >
    ) => GridRowId[]
  >;
  declare const visibleGridRowCountSelector: reselect.OutputSelector<
    GridState,
    number,
    (res1: GridFilterState, res2: number) => number
  >;
  declare const activeGridFilterItemsSelector: reselect.OutputSelector<
    GridState,
    GridFilterItem[],
    (res1: GridFilterModel, res2: GridColumnLookup) => GridFilterItem[]
  >;
  declare const filterGridItemsCounterSelector: reselect.OutputSelector<
    GridState,
    number,
    (res: GridFilterItem[]) => number
  >;
  declare type FilterColumnLookup = Record<string, GridFilterItem[]>;
  declare const filterGridColumnLookupSelector: reselect.OutputSelector<
    GridState,
    FilterColumnLookup,
    (res: GridFilterItem[]) => FilterColumnLookup
  >;

  declare const gridFocusStateSelector: (state: GridState) => GridFocusState;
  declare const gridFocusCellSelector: reselect.OutputSelector<
    GridState,
    GridCellIdentifier | null,
    (res: GridFocusState) => GridCellIdentifier | null
  >;
  declare const gridFocusColumnHeaderSelector: reselect.OutputSelector<
    GridState,
    GridColumnIdentifier | null,
    (res: GridFocusState) => GridColumnIdentifier | null
  >;
  declare const gridTabIndexStateSelector: (
    state: GridState
  ) => GridTabIndexState;
  declare const gridTabIndexCellSelector: reselect.OutputSelector<
    GridState,
    GridCellIdentifier | null,
    (res: GridTabIndexState) => GridCellIdentifier | null
  >;
  declare const gridTabIndexColumnHeaderSelector: reselect.OutputSelector<
    GridState,
    GridColumnIdentifier | null,
    (res: GridTabIndexState) => GridColumnIdentifier | null
  >;

  declare const gridPaginationSelector: (
    state: GridState
  ) => GridPaginationState;
  declare const gridPageSelector: reselect.OutputSelector<
    GridState,
    number,
    (res: GridPaginationState) => number
  >;
  declare const gridPageSizeSelector: reselect.OutputSelector<
    GridState,
    number,
    (res: GridPaginationState) => number
  >;
  declare const gridPaginatedVisibleSortedGridRowIdsSelector: reselect.OutputSelector<
    GridState,
    GridRowId[],
    (res1: GridPaginationState, res2: GridRowId[]) => GridRowId[]
  >;

  declare const gridPreferencePanelStateSelector: (
    state: GridState
  ) => GridPreferencePanelState;
  declare const gridViewportSizeStateSelector: (
    state: GridState
  ) => ElementSize;

  declare const gridRowsStateSelector: (state: GridState) => GridRowsState;
  declare const gridRowCountSelector: reselect.OutputSelector<
    GridState,
    number,
    (res: GridRowsState) => number
  >;
  declare const gridRowsLookupSelector: reselect.OutputSelector<
    GridState,
    Record<
      GridRowId,
      {
        [key: string]: any;
      }
    >,
    (res: GridRowsState) => Record<
      GridRowId,
      {
        [key: string]: any;
      }
    >
  >;
  declare const unorderedGridRowIdsSelector: reselect.OutputSelector<
    GridState,
    GridRowId[],
    (res: GridRowsState) => GridRowId[]
  >;
  declare const unorderedGridRowModelsSelector: reselect.OutputSelector<
    GridState,
    {
      [key: string]: any;
    }[],
    (res: GridRowsState) => {
      [key: string]: any;
    }[]
  >;

  declare const gridSelectionStateSelector: (
    state: GridState
  ) => GridSelectionModel;
  declare const selectedGridRowsCountSelector: reselect.OutputSelector<
    GridState,
    number,
    (res: GridSelectionModel) => number
  >;
  declare const selectedGridRowsSelector: reselect.OutputSelector<
    GridState,
    Map<
      GridRowId,
      {
        [key: string]: any;
      }
    >,
    (
      res1: GridSelectionModel,
      res2: Record<
        GridRowId,
        {
          [key: string]: any;
        }
      >
    ) => Map<
      GridRowId,
      {
        [key: string]: any;
      }
    >
  >;
  declare const selectedIdsLookupSelector: reselect.OutputSelector<
    GridState,
    {},
    (res: GridSelectionModel) => {}
  >;

  declare const sortedGridRowIdsSelector: reselect.OutputSelector<
    GridState,
    GridRowId[],
    (res1: GridSortingState, res2: GridRowId[]) => GridRowId[]
  >;
  declare const sortedGridRowsSelector: reselect.OutputSelector<
    GridState,
    Map<
      GridRowId,
      {
        [key: string]: any;
      }
    >,
    (
      res1: GridRowId[],
      res2: Record<
        GridRowId,
        {
          [key: string]: any;
        }
      >
    ) => Map<
      GridRowId,
      {
        [key: string]: any;
      }
    >
  >;
  declare const gridSortModelSelector: reselect.OutputSelector<
    GridState,
    GridSortModel,
    (res: GridSortingState) => GridSortModel
  >;
  declare type GridSortColumnLookup = Record<
    string,
    {
      sortDirection: GridSortDirection;
      sortIndex?: number;
    }
  >;
  declare const gridSortColumnLookupSelector: reselect.OutputSelector<
    GridState,
    GridSortColumnLookup,
    (res: GridSortModel) => GridSortColumnLookup
  >;

  declare const gridRenderingSelector: (state: GridState) => GridRenderingState;
  declare const gridScrollSelector: reselect.OutputSelector<
    GridState,
    GridScrollParams,
    (res: GridRenderingState) => GridScrollParams
  >;

  declare const useGridApi: (apiRef: GridApiRef) => GridApi;

  declare function useGridApiContext(): GridApiRef;

  /**
   * Signal to the underlying logic what version of the public component API
   * of the data grid is exposed.
   */
  declare enum GridSignature {
    DataGrid = "DataGrid",
    DataGridPro = "DataGridPro",
  }
  declare function useGridApiEventHandler<Params, Event extends MuiEvent>(
    apiRef: GridApiRef,
    eventName: string,
    handler?: GridListener<Params, Event>,
    options?: GridSubscribeEventOptions
  ): void;
  declare function useGridApiOptionHandler<Params, Event extends MuiEvent>(
    apiRef: GridApiRef,
    eventName: string,
    handler?: GridListener<Params, Event>
  ): void;

  declare function useGridApiMethod<T extends Partial<GridApi>>(
    apiRef: GridApiRef,
    apiMethods: T,
    apiName: string
  ): void;

  declare function useGridApiRef(): GridApiRef;
  declare function useGridApiRef(
    apiRefProp: GridApiRef | undefined
  ): GridApiRef;

  declare function useGridLogger(apiRef: GridApiRef, name: string): Logger;

  declare const useGridRootProps: () => GridComponentProps;

  declare function useGridScrollFn(
    apiRef: GridApiRef,
    renderingZoneElementRef: React$1.RefObject<HTMLDivElement>,
    columnHeadersElementRef: React$1.RefObject<HTMLDivElement>
  ): [GridScrollFn];

  declare const useGridSelector: <T>(
    apiRef: GridApiRef,
    selector: (state: GridState) => T
  ) => T;

  declare const useGridState: (
    apiRef: GridApiRef
  ) => [
    GridState,
    (stateUpdaterFn: (oldState: GridState) => GridState) => boolean,
    () => void
  ];

  declare const useGridNativeEventListener: <E extends Event>(
    apiRef: GridApiRef,
    ref:
      | React$1.MutableRefObject<HTMLDivElement | null>
      | (() => Element | undefined | null),
    eventName: string,
    handler?: ((event: E) => any) | undefined,
    options?: AddEventListenerOptions | undefined
  ) => void;

  declare type GridMergedOptions = {
    [key in keyof GridProcessedMergedOptions]: Partial<
      GridProcessedMergedOptions[key]
    >;
  };
  /**
   * The grid options with a default in value which is merged with the the value given through props
   */
  interface GridProcessedMergedOptions {
    /**
     * Overrideable components.
     */
    components: GridSlotsComponent;
    /**
     * Set the locale text of the grid.
     * You can find all the translation keys supported in [the source](https://github.com/mui-org/material-ui-x/blob/HEAD/packages/grid/_modules_/grid/constants/localeTextConstants.ts) in the GitHub repository.
     */
    localeText: GridLocaleText;
  }
  /**
   * The grid options with a default in value overridable through props
   * None of the entry of this interface should be optional, they all have default values and `GridInputComponentProps` already applies a `Partial<GridSimpleOptions>` for the public interface
   * The controlled model do not have a default value at the prop processing level so they must be defined in `GridComponentOtherProps`
   * TODO: add multiSortKey
   */
  interface GridSimpleOptions {
    /**
     * If `true`, the grid height is dynamic and follow the number of rows in the grid.
     * @default false
     */
    autoHeight: boolean;
    /**
     * If `true`, the pageSize is calculated according to the container size and the max number of rows to avoid rendering a vertical scroll bar.
     * @default false
     */
    autoPageSize: boolean;
    /**
     * If `true`, the grid get a first column with a checkbox that allows to select rows.
     * @default false
     */
    checkboxSelection: boolean;
    /**
     * If `true`, the "Select All" header checkbox selects only the rows on the current page. To be used in combination with `checkboxSelection`.
     * It only works if the pagination is enabled.
     * @default false
     */
    checkboxSelectionVisibleOnly: boolean;
    /**
     * Number of extra columns to be rendered before/after the visible slice.
     * @default 3
     */
    columnBuffer: number;
    /**
     * Number of extra rows to be rendered before/after the visible slice.
     * @default 3
     */
    rowBuffer: number;
    /**
     * Number of rows from the `rowBuffer` that can be visible before a new slice is rendered.
     * @default 3
     */
    rowThreshold: number;
    /**
     * Number of rows from the `columnBuffer` that can be visible before a new slice is rendered.
     * @default 3
     */
    columnThreshold: number;
    /**
     * Set the density of the grid.
     * @default "standard"
     */
    density: GridDensity;
    /**
     * If `true`, rows will not be extended to fill the full width of the grid container.
     * @default false
     */
    disableExtendRowFullWidth: boolean;
    /**
     * If `true`, column filters are disabled.
     * @default false
     */
    disableColumnFilter: boolean;
    /**
     * If `true`, the column menu is disabled.
     * @default false
     */
    disableColumnMenu: boolean;
    /**
     * If `true`, reordering columns is disabled.
     * @default false
     */
    disableColumnReorder: boolean;
    /**
     * If `true`, resizing columns is disabled.
     * @default false
     */
    disableColumnResize: boolean;
    /**
     * If `true`, hiding/showing columns is disabled.
     * @default false
     */
    disableColumnSelector: boolean;
    /**
     * If `true`, the density selector is disabled.
     * @default false
     */
    disableDensitySelector: boolean;
    /**
     * If `true`, filtering with multiple columns is disabled.
     * @default false
     */
    disableMultipleColumnsFiltering: boolean;
    /**
     * If `true`, multiple selection using the CTRL or CMD key is disabled.
     * @default false
     */
    disableMultipleSelection: boolean;
    /**
     * If `true`, sorting with multiple columns is disabled.
     * @default false
     */
    disableMultipleColumnsSorting: boolean;
    /**
     * If `true`, the selection on click on a row or cell is disabled.
     * @default false
     */
    disableSelectionOnClick: boolean;
    /**
     * If `true`, the virtualization is disabled.
     * @default false
     */
    disableVirtualization: boolean;
    /**
     * Controls whether to use the cell or row editing.
     * @default "cell"
     */
    editMode: GridEditMode;
    /**
     * Filtering can be processed on the server or client-side.
     * Set it to 'server' if you would like to handle filtering on the server-side.
     * @default "client"
     */
    filterMode: GridFeatureMode;
    /**
     * Set the height in pixel of the column headers in the grid.
     * @default 56
     */
    headerHeight: number;
    /**
     * If `true`, the footer component is hidden.
     * @default false
     */
    hideFooter: boolean;
    /**
     * If `true`, the pagination component in the footer is hidden.
     * @default false
     */
    hideFooterPagination: boolean;
    /**
     * If `true`, the row count in the footer is hidden.
     * It has no effect if the pagination is enabled.
     * @default false
     */
    hideFooterRowCount: boolean;
    /**
     * If `true`, the selected row count in the footer is hidden.
     * @default false
     */
    hideFooterSelectedRowCount: boolean;
    /**
     * Pass a custom logger in the components that implements the [[Logger]] interface.
     * @default console
     */
    logger: Logger;
    /**
     * Allows to pass the logging level or false to turn off logging.
     * @default "debug"
     */
    logLevel: keyof Logger | false;
    /**
     * If `true`, pagination is enabled.
     * @default false
     */
    pagination: boolean;
    /**
     * Pagination can be processed on the server or client-side.
     * Set it to 'client' if you would like to handle the pagination on the client-side.
     * Set it to 'server' if you would like to handle the pagination on the server-side.
     * @default "client"
     */
    paginationMode: GridFeatureMode;
    /**
     * Set the height in pixel of a row in the grid.
     * @default 52
     */
    rowHeight: number;
    /**
     * Select the pageSize dynamically using the component UI.
     * @default [25, 50, 100]
     */
    rowsPerPageOptions: number[];
    /**
     * Set the area at the bottom of the grid viewport where onRowsScrollEnd is called.
     */
    scrollEndThreshold: number;
    /**
     * If `true`, the right border of the cells are displayed.
     * @default false
     */
    showCellRightBorder: boolean;
    /**
     * If `true`, the right border of the column headers are displayed.
     * @default false
     */
    showColumnRightBorder: boolean;
    /**
     * The order of the sorting sequence.
     * @default ['asc', 'desc', null]
     */
    sortingOrder: GridSortDirection[];
    /**
     * Sorting can be processed on the server or client-side.
     * Set it to 'client' if you would like to handle sorting on the client-side.
     * Set it to 'server' if you would like to handle sorting on the server-side.
     * @default "client"
     */
    sortingMode: GridFeatureMode;
    /**
     * If positive, the Grid will throttle updates coming from `apiRef.current.updateRows` and `apiRef.current.setRows`.
     * It can be useful if you have a high update rate but do not want to do heavy work like filtering / sorting or rendering on each  individual update.
     * @default 0
     */
    throttleRowsMs: number;
  }

  interface GridClasses {
    /**
     * Styles applied to the root element if `autoHeight={true}`.
     */
    autoHeight: string;
    /**
     * Styles applied to the icon of the boolean cell.
     */
    booleanCell: string;
    /**
     * Styles applied to the cell element if the cell is editable.
     */
    "cell--editable": string;
    /**
     * Styles applied to the cell element if the cell is in edit mode.
     */
    "cell--editing": string;
    /**
     * Styles applied to the cell element if `align="center"`.
     */
    "cell--textCenter": string;
    /**
     * Styles applied to the cell element if `align="left"`.
     */
    "cell--textLeft": string;
    /**
     * Styles applied to the cell element if `align="right"`.
     */
    "cell--textRight": string;
    /**
     * Styles applied to the cell element if the cell has a custom renderer.
     */
    "cell--withRenderer": string;
    /**
     * Styles applied to the cell element.
     */
    cell: string;
    /**
     * Styles applied to the cell checkbox element.
     */
    cellCheckbox: string;
    /**
     * Styles applied to the selection checkbox element.
     */
    checkboxInput: string;
    /**
     * Styles applied to the column header if `headerAlign="center"`.
     */
    "columnHeader--alignCenter": string;
    /**
     * Styles applied to the column header if `headerAlign="left"`.
     */
    "columnHeader--alignLeft": string;
    /**
     * Styles applied to the column header if `headerAlign="right"`.
     */
    "columnHeader--alignRight": string;
    /**
     * Styles applied to the floating column header element when it is dragged.
     */
    "columnHeader--dragging": string;
    /**
     * Styles applied to the column header if it is being dragged.
     */
    "columnHeader--moving": string;
    /**
     * Styles applied to the column header if the type of the column is `number`.
     */
    "columnHeader--numeric": string;
    /**
     * Styles applied to the column header if the column is sortable.
     */
    "columnHeader--sortable": string;
    /**
     * Styles applied to the column header if the column is sorted.
     */
    "columnHeader--sorted": string;
    /**
     * Styles applied to the column header element.
     */
    columnHeader: string;
    /**
     * Styles applied to the header checkbox cell element.
     */
    columnHeaderCheckbox: string;
    /**
     * Styles applied to the column header's draggable container element.
     */
    columnHeaderDraggableContainer: string;
    /**
     * Styles applied to the column headers wrapper if a column is being dragged.
     */
    columnHeaderDropZone: string;
    /**
     * Styles applied to the column header's title element;
     */
    columnHeaderTitle: string;
    /**
     * Styles applied to the column header's title container element.
     */
    columnHeaderTitleContainer: string;
    /**
     * Styles applied to the column header's wrapper element.
     */
    columnHeaderWrapper: string;
    /**
     * Styles applied to the outer columns container element.
     */
    columnsContainer: string;
    /**
     * Styles applied to the column header separator if the column is resizable.
     */
    "columnSeparator--resizable": string;
    /**
     * Styles applied to the column header separator if the column is being resized.
     */
    "columnSeparator--resizing": string;
    /**
     * Styles applied to the column header separator element.
     */
    columnSeparator: string;
    /**
     * Styles applied to the columns panel element.
     */
    columnsPanel: string;
    /**
     * Styles applied to the columns panel row element.
     */
    columnsPanelRow: string;
    /**
     * Styles applied to the panel element.
     */
    panel: string;
    /**
     * Styles applied to the panel header element.
     */
    panelHeader: string;
    /**
     * Styles applied to the panel wrapper element.
     */
    panelWrapper: string;
    /**
     * Styles applied to the panel content element.
     */
    panelContent: string;
    /**
     * Styles applied to the panel footer element.
     */
    panelFooter: string;
    /**
     * Styles applied to the paper element.
     */
    paper: string;
    /**
     * Styles applied to root of the boolean edit component.
     */
    editBooleanCell: string;
    /**
     * Styles applied to the root of the filter form component.
     */
    filterForm: string;
    /**
     * Styles applied to the root of the input component.
     */
    editInputCell: string;
    /**
     * Styles applied to the filter icon element.
     */
    filterIcon: string;
    /**
     * Styles applied to the footer container element.
     */
    footerContainer: string;
    /**
     * Styles applied to the column header icon's container.
     */
    iconButtonContainer: string;
    /**
     * Styles applied to the column header separator icon element.
     */
    iconSeparator: string;
    /**
     * Styles applied to the main container element.
     */
    main: string;
    /**
     * Styles applied to the menu element.
     */
    menu: string;
    /**
     * Styles applied to the menu icon element.
     */
    menuIcon: string;
    /**
     * Styles applied to the menu icon button element.
     */
    menuIconButton: string;
    /**
     * Styles applied to the menu icon element if the menu is open.
     */
    menuOpen: string;
    /**
     * Styles applied to the menu list element.
     */
    menuList: string;
    /**
     * Styles applied to the overlay element.
     */
    overlay: string;
    /**
     * Styles applied to the virtualization container.
     */
    virtualScroller: any;
    /**
     * Styles applied to the virtualization content.
     */
    virtualScrollerContent: any;
    /**
     * Styles applied to the virtualization render zone.
     */
    virtualScrollerRenderZone: any;
    /**
     * Styles applied to the root element.
     */
    root: string;
    /**
     * Styles applied to the row element if the row is editable.
     */
    "row--editable": string;
    /**
     * Styles applied to the row element if the row is in edit mode.
     */
    "row--editing": string;
    /**
     * Styles applied to the row element.
     */
    row: string;
    /**
     * Styles applied to the footer row count element.
     */
    rowCount: string;
    /**
     * Styles applied to both scroll area elements.
     */
    scrollArea: string;
    /**
     * Styles applied to the left scroll area element.
     */
    scrollAreaLeft: string;
    /**
     * Styles applied to the right scroll area element.
     */
    scrollAreaRight: string;
    /**
     * Styles applied to the footer selected row count element.
     */
    selectedRowCount: string;
    /**
     * Styles applied to the sort icon element.
     */
    sortIcon: string;
    /**
     * Styles applied to the toolbar container element.
     */
    toolbarContainer: string;
    /**
     * Styles applied to the toolbar filter list element.
     */
    toolbarFilterList: string;
    /**
     * Styles applied to the viewport element.
     */
    viewport: string;
    /**
     * Styles applied to the window element.
     */
    window: string;
    /**
     * Styles applied to both the cell and the column header if `showColumnRightBorder={true}`.
     */
    withBorder: string;
  }
  declare type GridClassKey = keyof GridClasses;
  declare function getDataGridUtilityClass(slot: string): string;
  declare const gridClasses: Record<
    | "actionsCell"
    | "autoHeight"
    | "booleanCell"
    | "cell--editable"
    | "cell--editing"
    | "cell--textCenter"
    | "cell--textLeft"
    | "cell--textRight"
    | "cell--withRenderer"
    | "cell"
    | "cellCheckbox"
    | "checkboxInput"
    | "columnHeader--alignCenter"
    | "columnHeader--alignLeft"
    | "columnHeader--alignRight"
    | "columnHeader--dragging"
    | "columnHeader--moving"
    | "columnHeader--numeric"
    | "columnHeader--sortable"
    | "columnHeader--sorted"
    | "columnHeader"
    | "columnHeaderCheckbox"
    | "columnHeaderDraggableContainer"
    | "columnHeaderDropZone"
    | "columnHeaderTitle"
    | "columnHeaderTitleContainer"
    | "columnHeaderWrapper"
    | "columnsContainer"
    | "columnSeparator--resizable"
    | "columnSeparator--resizing"
    | "columnSeparator"
    | "columnsPanel"
    | "columnsPanelRow"
    | "panel"
    | "panelHeader"
    | "panelWrapper"
    | "panelContent"
    | "panelFooter"
    | "paper"
    | "editBooleanCell"
    | "editInputCell"
    | "filterForm"
    | "filterIcon"
    | "footerContainer"
    | "iconButtonContainer"
    | "iconSeparator"
    | "main"
    | "menu"
    | "menuIcon"
    | "menuIconButton"
    | "menuOpen"
    | "menuList"
    | "overlay"
    | "root"
    | "row--editable"
    | "row--editing"
    | "row"
    | "rowCount"
    | "scrollArea--left"
    | "scrollArea--right"
    | "scrollArea"
    | "selectedRowCount"
    | "sortIcon"
    | "toolbarContainer"
    | "toolbarFilterList"
    | "virtualScroller"
    | "virtualScrollerContent"
    | "virtualScrollerRenderZone"
    | "withBorder",
    string
  >;

  /**
   * The grid component react props before applying the default values.
   */
  interface GridInputComponentProps
    extends Partial<GridSimpleOptions>,
      Partial<GridMergedOptions>,
      GridComponentOtherProps {}
  /**
   * The grid component react props after applying the default values.
   */
  interface GridComponentProps
    extends GridSimpleOptions,
      GridProcessedMergedOptions,
      GridComponentOtherProps {}
  interface GridComponentOtherProps {
    /**
     * The ref object that allows grid manipulation. Can be instantiated with [[useGridApiRef()]].
     */
    apiRef?: GridApiRef;
    /**
     * Signal to the underlying logic what version of the public component API
     * of the data grid is exposed [[GridSignature]].
     * @internal
     */
    signature?: string;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<GridClasses>;
    /**
     * Extend native column types with your new column types.
     */
    columnTypes?: GridColumnTypesRecord;
    /**
     * Set the total number of rows, if it is different than the length of the value `rows` prop.
     */
    rowCount?: number;
    /**
     * Override the height/width of the grid inner scrollbar.
     */
    scrollbarSize?: number;
    /**
     * Function that applies CSS classes dynamically on cells.
     * @param {GridCellParams} params With all properties from [[GridCellParams]].
     * @returns {string} The CSS class to apply to the cell.
     */
    getCellClassName?: (params: GridCellParams) => string;
    /**
     * Function that applies CSS classes dynamically on rows.
     * @param {GridRowParams} params With all properties from [[GridRowParams]].
     * @returns {string} The CSS class to apply to the row.
     */
    getRowClassName?: (params: GridRowParams) => string;
    /**
     * Callback fired when a cell is rendered, returns true if the cell is editable.
     * @param {GridCellParams} params With all properties from [[GridCellParams]].
     * @returns {boolean} A boolean indicating if the cell is editable.
     */
    isCellEditable?: (params: GridCellParams) => boolean;
    /**
     * Determines if a row can be selected.
     * @param {GridRowParams} params With all properties from [[GridRowParams]].
     * @returns {boolean} A boolean indicating if the cell is selectable.
     */
    isRowSelectable?: (params: GridRowParams) => boolean;
    /**
     * Callback fired when the edit cell value changes.
     * @param {GridEditCellPropsParams} params With all properties from [[GridEditCellPropsParams]].
     * @param {MuiEvent} event The event that caused this prop to be called.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onEditCellPropsChange?: (
      params: GridEditCellPropsParams,
      event: MuiEvent<React$1.SyntheticEvent>,
      details: GridCallbackDetails
    ) => void;
    /**
     * Callback fired when the cell changes are committed.
     * @param {GridCellEditCommitParams} params With all properties from [[GridCellEditCommitParams]].
     * @param {MuiEvent<React.SyntheticEvent>} event The event that caused this prop to be called.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onCellEditCommit?: (
      params: GridCellEditCommitParams,
      event: MuiEvent<React$1.SyntheticEvent>,
      details: GridCallbackDetails
    ) => void;
    /**
     * Callback fired when the cell turns to edit mode.
     * @param {GridCellParams} params With all properties from [[GridCellParams]].
     * @param {MuiEvent<React.SyntheticEvent>} event The event that caused this prop to be called.
     */
    onCellEditStart?: (
      params: GridCellParams,
      event: MuiEvent<React$1.SyntheticEvent>
    ) => void;
    /**
     * Callback fired when the cell turns to view mode.
     * @param {GridCellParams} params With all properties from [[GridCellParams]].
     * @param {MuiEvent<React.SyntheticEvent>} event The event that caused this prop to be called.
     */
    onCellEditStop?: (
      params: GridCellParams,
      event: MuiEvent<React$1.SyntheticEvent>
    ) => void;
    /**
     * Callback fired when the row changes are committed.
     * @param {GridRowId} id The row id.
     * @param {MuiEvent<React.SyntheticEvent>} event The event that caused this prop to be called.
     */
    onRowEditCommit?: (
      id: GridRowId,
      event: MuiEvent<React$1.SyntheticEvent>
    ) => void;
    /**
     * Callback fired when the row turns to edit mode.
     * @param {GridRowParams} params With all properties from [[GridRowParams]].
     * @param {MuiEvent<React.SyntheticEvent>} event The event that caused this prop to be called.
     */
    onRowEditStart?: (
      params: GridRowParams,
      event: MuiEvent<React$1.SyntheticEvent>
    ) => void;
    /**
     * Callback fired when the row turns to view mode.
     * @param {GridRowParams} params With all properties from [[GridRowParams]].
     * @param {MuiEvent<React.SyntheticEvent>} event The event that caused this prop to be called.
     */
    onRowEditStop?: (
      params: GridRowParams,
      event: MuiEvent<React$1.SyntheticEvent>
    ) => void;
    /**
     * Callback fired when an exception is thrown in the grid.
     * @param {any} args The arguments passed to the `showError` call.
     * @param {MuiEvent<{}>} event The event object.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onError?: (
      args: any,
      event: MuiEvent<{}>,
      details: GridCallbackDetails
    ) => void;
    /**
     * Callback fired when a click event comes from a cell element.
     * @param {GridCellParams} params With all properties from [[GridCellParams]].
     * @param {MuiEvent<React.MouseEvent>} event The event object.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onCellClick?: (
      params: GridCellParams,
      event: MuiEvent<React$1.MouseEvent>,
      details: GridCallbackDetails
    ) => void;
    /**
     * Callback fired when a double click event comes from a cell element.
     * @param {GridCellParams} params With all properties from [[GridCellParams]].
     * @param {MuiEvent<React.MouseEvent>} event The event object.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onCellDoubleClick?: (
      params: GridCellParams,
      event: MuiEvent<React$1.MouseEvent>,
      details: GridCallbackDetails
    ) => void;
    /**
     * Callback fired when a cell loses focus.
     * @param {GridCellParams} params With all properties from [[GridCellParams]].
     * @param {MuiEvent<React.SyntheticEvent | DocumentEventMap['click']>} event The event object.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onCellFocusOut?: (
      params: GridCellParams,
      event: MuiEvent<React$1.SyntheticEvent | DocumentEventMap["click"]>,
      details: GridCallbackDetails
    ) => void;
    /**
     * Callback fired when a keydown event comes from a cell element.
     * @param {GridCellParams} params With all properties from [[GridCellParams]].
     * @param {MuiEvent<React.KeyboardEvent>} event The event object.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onCellKeyDown?: (
      params: GridCellParams,
      event: MuiEvent<React$1.KeyboardEvent>,
      details: GridCallbackDetails
    ) => void;
    /**
     * Callback fired when the cell value changed.
     * @param {GridEditCellValueParams} params With all properties from [[GridEditCellValueParams]].
     * @param {MuiEvent<{}>} event The event object.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onCellValueChange?: (
      params: GridEditCellValueParams,
      event: MuiEvent<{}>,
      details: GridCallbackDetails
    ) => void;
    /**
     * Callback fired when a click event comes from a column header element.
     * @param {GridColumnHeaderParams} params With all properties from [[GridColumnHeaderParams]].
     * @param {MuiEvent<React.SyntheticEvent>} event The event object.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onColumnHeaderClick?: (
      params: GridColumnHeaderParams,
      event: MuiEvent<React$1.SyntheticEvent>,
      details: GridCallbackDetails
    ) => void;
    /**
     * Callback fired when a double click event comes from a column header element.
     * @param {GridColumnHeaderParams} params With all properties from [[GridColumnHeaderParams]].
     * @param {MuiEvent<React.SyntheticEvent>} event The event object.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onColumnHeaderDoubleClick?: (
      params: GridColumnHeaderParams,
      event: MuiEvent<React$1.SyntheticEvent>,
      details: GridCallbackDetails
    ) => void;
    /**
     * Callback fired when a mouseover event comes from a column header element.
     * @param {GridColumnHeaderParams} params With all properties from [[GridColumnHeaderParams]].
     * @param {MuiEvent<React.SyntheticEvent>} event The event object.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onColumnHeaderOver?: (
      params: GridColumnHeaderParams,
      event: MuiEvent<React$1.SyntheticEvent>,
      details: GridCallbackDetails
    ) => void;
    /**
     * Callback fired when a mouseout event comes from a column header element.
     * @param {GridColumnHeaderParams} params With all properties from [[GridColumnHeaderParams]].
     * @param {MuiEvent<React.SyntheticEvent>} event The event object.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onColumnHeaderOut?: (
      params: GridColumnHeaderParams,
      event: MuiEvent<React$1.SyntheticEvent>,
      details: GridCallbackDetails
    ) => void;
    /**
     * Callback fired when a mouse enter event comes from a column header element.
     * @param {GridColumnHeaderParams} params With all properties from [[GridColumnHeaderParams]].
     * @param {MuiEvent<React.SyntheticEvent>} event The event object.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onColumnHeaderEnter?: (
      params: GridColumnHeaderParams,
      event: MuiEvent<React$1.SyntheticEvent>,
      details: GridCallbackDetails
    ) => void;
    /**
     * Callback fired when a mouse leave event comes from a column header element.
     * @param {GridColumnHeaderParams} params With all properties from [[GridColumnHeaderParams]].
     * @param {MuiEvent<React.SyntheticEvent>} event The event object.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onColumnHeaderLeave?: (
      params: GridColumnHeaderParams,
      event: MuiEvent<React$1.SyntheticEvent>,
      details: GridCallbackDetails
    ) => void;
    /**
     * Callback fired when a column is reordered.
     * @param {GridColumnOrderChangeParams} params With all properties from [[GridColumnOrderChangeParams]].
     * @param {MuiEvent<{}>} event The event object.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onColumnOrderChange?: (
      params: GridColumnOrderChangeParams,
      event: MuiEvent<{}>,
      details: GridCallbackDetails
    ) => void;
    /**
     * Callback fired while a column is being resized.
     * @param {GridColumnResizeParams} params With all properties from [[GridColumnResizeParams]].
     * @param {MuiEvent<{}>} event The event object.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onColumnResize?: (
      params: GridColumnResizeParams,
      event: MuiEvent<{}>,
      details: GridCallbackDetails
    ) => void;
    /**
     * Callback fired when the width of a column is changed.
     * @param {GridCallbackDetails} params With all properties from [[GridColumnResizeParams]].
     * @param {MuiEvent<{}>} event The event object.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onColumnWidthChange?: (
      params: GridColumnResizeParams,
      event: MuiEvent<{}>,
      details: GridCallbackDetails
    ) => void;
    /**
     * Callback fired when a column visibility changes.
     * @param {GridColumnVisibilityChangeParams} params With all properties from [[GridColumnVisibilityChangeParams]].
     * @param {MuiEvent<{}>} event The event object.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onColumnVisibilityChange?: (
      params: GridColumnVisibilityChangeParams,
      event: MuiEvent<{}>,
      details: GridCallbackDetails
    ) => void;
    /**
     * Callback fired when a click event comes from a row container element.
     * @param {GridRowParams} params With all properties from [[GridRowParams]].
     * @param {MuiEvent<React.SyntheticEvent>} event The event object.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onRowClick?: (
      params: GridRowParams,
      event: MuiEvent<React$1.SyntheticEvent>,
      details: GridCallbackDetails
    ) => void;
    /**
     * Callback fired when scrolling to the bottom of the grid viewport.
     * @param {GridRowScrollEndParams} params With all properties from [[GridRowScrollEndParams]].
     * @param {MuiEvent<{}>} event The event object.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onRowsScrollEnd?: (
      params: GridRowScrollEndParams,
      event: MuiEvent<{}>,
      details: GridCallbackDetails
    ) => void;
    /**
     * Callback fired when a double click event comes from a row container element.
     * @param {GridRowParams} params With all properties from [[RowParams]].
     * @param {MuiEvent<React.SyntheticEvent>} event The event object.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onRowDoubleClick?: (
      params: GridRowParams,
      event: MuiEvent<React$1.SyntheticEvent>,
      details: GridCallbackDetails
    ) => void;
    /**
     * Callback fired when the grid is resized.
     * @param {ElementSize} containerSize With all properties from [[ElementSize]].
     * @param {MuiEvent<{}>} event The event object.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onResize?: (
      containerSize: ElementSize,
      event: MuiEvent<{}>,
      details: GridCallbackDetails
    ) => void;
    /**
     * Callback fired when the state of the grid is updated.
     * @param {GridState} state The new state.
     * @param {MuiEvent<{}>} event The event object.
     * @param {GridCallbackDetails} details Additional details for this callback.
     * @internal
     */
    onStateChange?: (
      state: GridState,
      event: MuiEvent<{}>,
      details: GridCallbackDetails
    ) => void;
    /**
     * The zero-based index of the current page.
     * @default 0
     */
    page?: number;
    /**
     * Callback fired when the current page has changed.
     * @param {number} page Index of the page displayed on the Grid.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onPageChange?: (page: number, details: GridCallbackDetails) => void;
    /**
     * Set the number of rows in one page.
     * @default 100
     */
    pageSize?: number;
    /**
     * Callback fired when the page size has changed.
     * @param {number} pageSize Size of the page displayed on the Grid.
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onPageSizeChange?: (pageSize: number, details: GridCallbackDetails) => void;
    /**
     * Set the edit rows model of the grid.
     */
    editRowsModel?: GridEditRowsModel;
    /**
     * Callback fired when the `editRowsModel` changes.
     * @param {GridEditRowsModel} editRowsModel With all properties from [[GridEditRowsModel]].
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onEditRowsModelChange?: (
      editRowsModel: GridEditRowsModel,
      details: GridCallbackDetails
    ) => void;
    /**
     * Set the filter model of the grid.
     */
    filterModel?: GridFilterModel;
    /**
     * Callback fired when the Filter model changes before the filters are applied.
     * @param {GridFilterModel} model With all properties from [[GridFilterModel]].
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onFilterModelChange?: (
      model: GridFilterModel,
      details: GridCallbackDetails
    ) => void;
    /**
     * Set the selection model of the grid.
     */
    selectionModel?: GridInputSelectionModel;
    /**
     * Callback fired when the selection state of one or multiple rows changes.
     * @param {GridSelectionModel} selectionModel With all the row ids [[GridSelectionModel]].
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onSelectionModelChange?: (
      selectionModel: GridSelectionModel,
      details: GridCallbackDetails
    ) => void;
    /**
     * Set the sort model of the grid.
     */
    sortModel?: GridSortModel;
    /**
     * Callback fired when the sort model changes before a column is sorted.
     * @param {GridSortModel} model With all properties from [[GridSortModel]].
     * @param {GridCallbackDetails} details Additional details for this callback.
     */
    onSortModelChange?: (
      model: GridSortModel,
      details: GridCallbackDetails
    ) => void;
    /**
     * The label of the grid.
     */
    "aria-label"?: string;
    /**
     * The id of the element containing a label for the grid.
     */
    "aria-labelledby"?: string;
    /**
     * @ignore
     */
    className?: string;
    /**
     * Set of columns of type [[GridColumns]].
     */
    columns: GridColumns;
    /**
     * An error that will turn the grid into its error state and display the error component.
     */
    error?: any;
    /**
     * Return the id of a given [[GridRowModel]].
     */
    getRowId?: GridRowIdGetter;
    /**
     * If `true`, a  loading overlay is displayed.
     */
    loading?: boolean;
    /**
     * Nonce of the inline styles for [Content Security Policy](https://www.w3.org/TR/2016/REC-CSP2-20161215/#script-src-the-nonce-attribute).
     */
    nonce?: string;
    /**
     * Set of rows of type [[GridRowsProp]].
     */
    rows: GridRowsProp;
    /**
     * The initial state of the DataGrid.
     * The data in it will be set in the state on initialization but will not be controlled.
     * If one of the data in `initialState` is also being controlled, then the control state wins.
     */
    initialState?: GridInitialState;
    /**
     * @ignore
     */
    style?: React$1.CSSProperties;
    /**
     * Overrideable components props dynamically passed to the component at rendering.
     */
    componentsProps?: GridSlotsComponentsProps;
  }

  declare const useGridProcessedProps: (
    inProps: GridInputComponentProps
  ) => GridComponentProps;

  interface Localization {
    components: {
      MuiDataGrid: {
        defaultProps: Pick<GridMergedOptions, "localeText">;
      };
    };
  }

  declare const arSD: Localization;

  declare const bgBG: Localization;

  declare const csCZ: Localization;

  declare const deDE: Localization;

  declare const elGR: Localization;

  declare const enUS: Localization;

  declare const esES: Localization;

  declare const faIR: Localization;

  declare const frFR: Localization;

  declare const itIT: Localization;

  declare const jaJP: Localization;

  declare const koKR: Localization;

  declare const nlNL: Localization;

  declare const plPL: Localization;

  declare const ptBR: Localization;

  declare const ruRU: Localization;

  declare const skSK: Localization;

  declare const trTR: Localization;

  declare const ukUA: Localization;

  declare const viVN: Localization;

  declare const zhCN: Localization;

  declare const DataGrid: React$1.MemoExoticComponent<
    React$1.ForwardRefExoticComponent<
      Omit<
        GridInputComponentProps,
        | "apiRef"
        | "checkboxSelectionVisibleOnly"
        | "disableColumnResize"
        | "disableColumnReorder"
        | "disableMultipleColumnsFiltering"
        | "disableMultipleColumnsSorting"
        | "disableMultipleSelection"
        | "throttleRowsMs"
        | "hideFooterRowCount"
        | "options"
        | "onRowsScrollEnd"
        | "scrollEndThreshold"
        | "signature"
      > & {
        pagination?: true | undefined;
      } & React$1.RefAttributes<HTMLDivElement>
    >
  >;

  declare const MAX_PAGE_SIZE = 100;
  /**
   * The grid component react props interface.
   */
  declare type DataGridProps = Omit<
    GridInputComponentProps,
    | "apiRef"
    | "checkboxSelectionVisibleOnly"
    | "disableColumnResize"
    | "disableColumnReorder"
    | "disableMultipleColumnsFiltering"
    | "disableMultipleColumnsSorting"
    | "disableMultipleSelection"
    | "throttleRowsMs"
    | "hideFooterRowCount"
    | "options"
    | "onRowsScrollEnd"
    | "scrollEndThreshold"
    | "signature"
  > & {
    pagination?: true;
  };

  declare const useDataGridComponent: (
    apiRef: GridApiRef,
    props: GridComponentProps
  ) => void;

  export {
    AutoSizerProps,
    AutoSizerSize,
    CursorCoordinates,
    DEFAULT_GRID_COL_TYPE_KEY,
    DataGrid,
    DataGridProps,
    ElementSize,
    FilterColumnLookup,
    GRID_ACTIONS_COL_DEF,
    GRID_BOOLEAN_COL_DEF,
    GRID_CHECKBOX_SELECTION_COL_DEF,
    GRID_DATETIME_COL_DEF,
    GRID_DATE_COL_DEF,
    GRID_DEFAULT_LOCALE_TEXT,
    GRID_EXPERIMENTAL_ENABLED,
    GRID_NUMERIC_COL_DEF,
    GRID_SINGLE_SELECT_COL_DEF,
    GRID_STRING_COL_DEF,
    GridActionsCell,
    GridActionsCellItem,
    GridActionsCellItemProps,
    GridActionsColDef,
    GridAddIcon,
    GridAlignment,
    GridApi,
    GridApiContext,
    GridApiRef,
    GridArrowDownwardIcon,
    GridArrowUpwardIcon,
    GridAutoSizer,
    GridBody,
    GridCallbackDetails,
    GridCell,
    GridCellCheckboxForwardRef,
    GridCellCheckboxRenderer,
    GridCellClassFn,
    GridCellClassNamePropType,
    GridCellEditCommitParams,
    GridCellIdentifier,
    GridCellIndexCoordinates,
    GridCellMode,
    GridCellModes,
    GridCellParams,
    GridCellProps,
    GridCellValue,
    GridCheckCircleIcon,
    GridCheckIcon,
    GridClassKey,
    GridClasses,
    GridClipboardApi,
    GridCloseIcon,
    GridColDef,
    GridColType,
    GridColTypeDef,
    GridColumnApi,
    GridColumnHeaderClassFn,
    GridColumnHeaderClassNamePropType,
    GridColumnHeaderIndexCoordinates,
    GridColumnHeaderItem,
    GridColumnHeaderMenu,
    GridColumnHeaderMenuProps,
    GridColumnHeaderParams,
    GridColumnHeaderSeparator,
    GridColumnHeaderSeparatorProps,
    GridColumnHeaderSortIcon,
    GridColumnHeaderSortIconProps,
    GridColumnHeaderTitle,
    GridColumnHeaderTitleProps,
    GridColumnHeadersItemCollection,
    GridColumnHeadersItemCollectionProps,
    GridColumnIcon,
    GridColumnIdentifier,
    GridColumnLookup,
    GridColumnMenu,
    GridColumnMenuApi,
    GridColumnMenuContainer,
    GridColumnMenuProps,
    GridColumnMenuState,
    GridColumnOrderChangeParams,
    GridColumnReorderState,
    GridColumnResizeParams,
    GridColumnResizeState,
    GridColumnTypesRecord,
    GridColumnVisibilityChangeParams,
    GridColumns,
    GridColumnsContainer,
    GridColumnsHeader,
    GridColumnsMenuItem,
    GridColumnsMeta,
    GridColumnsPanel,
    GridColumnsState,
    GridCommitCellChangeParams,
    GridComparatorFn,
    GridComponentProps,
    GridContainerProps,
    GridControlStateApi,
    GridCoreApi,
    GridCsvExportApi,
    GridCsvExportOptions,
    GridDensity,
    GridDensityApi,
    GridDensityOption,
    GridDensityState,
    GridDensityTypes,
    GridDisableVirtualizationApi,
    GridDragIcon,
    GridEditCellProps,
    GridEditCellPropsParams,
    GridEditCellValueParams,
    GridEditInputCell,
    GridEditMode,
    GridEditModes,
    GridEditRowApi,
    GridEditRowProps,
    GridEditRowsModel,
    GridEditSingleSelectCell,
    GridEnrichedColDef,
    GridErrorHandler,
    GridEvents,
    GridEventsApi,
    GridExportFormat,
    GridFeatureMode,
    GridFeatureModeConstant,
    GridFieldComparatorList,
    GridFilterAltIcon,
    GridFilterApi,
    GridFilterForm,
    GridFilterFormProps,
    GridFilterInitialState,
    GridFilterInputValue,
    GridFilterInputValueProps,
    GridFilterItem,
    GridFilterItemProps,
    GridFilterListIcon,
    GridFilterMenuItem,
    GridFilterModel,
    GridFilterOperator,
    GridFilterPanel,
    GridFilterState,
    GridFocusApi,
    GridFocusState,
    GridFooter,
    GridFooterContainer,
    GridFooterContainerProps,
    GridFooterPlaceholder,
    GridHeader,
    GridHeaderCheckbox,
    GridHeaderPlaceholder,
    GridHeaderSelectionCheckboxParams,
    GridIconSlotsComponent,
    GridInitialState,
    GridInputComponentProps,
    GridInputSelectionModel,
    GridLinkOperator,
    GridLoadIcon,
    GridLoadingOverlay,
    GridLocaleText,
    GridLocaleTextApi,
    GridMenu,
    GridMenuIcon,
    GridMenuProps,
    GridMoreVertIcon,
    GridNativeColTypes,
    GridNoRowsOverlay,
    GridOverlay,
    GridOverlayProps,
    GridOverlays,
    GridPageApi,
    GridPageSizeApi,
    GridPagination,
    GridPaginationState,
    GridPanel,
    GridPanelClasses,
    GridPanelContent,
    GridPanelFooter,
    GridPanelHeader,
    GridPanelProps,
    GridPanelWrapper,
    GridParamsApi,
    GridPreferencePanelInitialState,
    GridPreferencePanelState,
    GridPreferencePanelsValue,
    GridPreferencesPanel,
    GridPreferencesPanelApi,
    GridPrintExportApi,
    GridPrintExportOptions,
    GridRenderCellParams,
    GridRenderColumnsProps,
    GridRenderContextProps,
    GridRenderEditCellParams,
    GridRenderPaginationProps,
    GridRenderRowProps,
    GridRenderingState,
    GridRoot,
    GridRootContainerRef,
    GridRootProps,
    GridRow,
    GridRowApi,
    GridRowCount,
    GridRowData,
    GridRowId,
    GridRowIdGetter,
    GridRowMode,
    GridRowModel,
    GridRowModelUpdate,
    GridRowModes,
    GridRowParams,
    GridRowProps,
    GridRowScrollEndParams,
    GridRowSelectionCheckboxParams,
    GridRowTreeConfig,
    GridRowTreeNodeConfig,
    GridRowsLookup,
    GridRowsProp,
    GridRowsState,
    GridSaveAltIcon,
    GridScrollApi,
    GridScrollArea,
    GridScrollBarState,
    GridScrollFn,
    GridScrollParams,
    GridSearchIcon,
    GridSelectedRowCount,
    GridSelectionApi,
    GridSelectionModel,
    GridSeparatorIcon,
    GridSignature,
    GridSlotsComponent,
    GridSlotsComponentsProps,
    GridSortApi,
    GridSortCellParams,
    GridSortColumnLookup,
    GridSortDirection,
    GridSortItem,
    GridSortModel,
    GridSortModelParams,
    GridSortingInitialState,
    GridSortingState,
    GridState,
    GridStateApi,
    GridStateChangeParams,
    GridStateColDef,
    GridTabIndexState,
    GridTableRowsIcon,
    GridToolbar,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarContainerProps,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarExportProps,
    GridToolbarFilterButton,
    GridToolbarFilterButtonProps,
    GridTranslationKeys,
    GridTripleDotsVerticalIcon,
    GridTypeFilterInputValueProps,
    GridUpdateAction,
    GridValueFormatterParams,
    GridValueGetterParams,
    GridValueSetterParams,
    GridViewHeadlineIcon,
    GridViewStreamIcon,
    GridViewportSizeState,
    HideGridColMenuItem,
    Logger,
    MAX_PAGE_SIZE,
    MuiEvent,
    SUBMIT_FILTER_STROKE_TIME,
    SortGridMenuItems,
    activeGridFilterItemsSelector,
    allGridColumnsFieldsSelector,
    allGridColumnsSelector,
    arSD,
    bgBG,
    checkGridRowIdIsValid,
    csCZ,
    deDE,
    elGR,
    enUS,
    esES,
    faIR,
    filterGridColumnLookupSelector,
    filterGridItemsCounterSelector,
    filterableGridColumnsIdsSelector,
    filterableGridColumnsSelector,
    frFR,
    getDataGridUtilityClass,
    getDefaultGridFilterModel,
    getGridBooleanOperators,
    getGridColDef,
    getGridDateOperators,
    getGridDefaultColumnTypes,
    getGridNumericColumnOperators,
    getGridSingleSelectOperators,
    getGridStringOperators,
    gridClasses,
    gridColumnLookupSelector,
    gridColumnMenuSelector,
    gridColumnReorderDragColSelector,
    gridColumnReorderSelector,
    gridColumnResizeSelector,
    gridColumnsMetaSelector,
    gridColumnsSelector,
    gridColumnsTotalWidthSelector,
    gridDateFormatter,
    gridDateTimeFormatter,
    gridDensityHeaderHeightSelector,
    gridDensityRowHeightSelector,
    gridDensitySelector,
    gridDensityValueSelector,
    gridEditRowsStateSelector,
    gridFilterModelSelector,
    gridFilterStateSelector,
    gridFocusCellSelector,
    gridFocusColumnHeaderSelector,
    gridFocusStateSelector,
    gridPageSelector,
    gridPageSizeSelector,
    gridPaginatedVisibleSortedGridRowIdsSelector,
    gridPaginationSelector,
    gridPanelClasses,
    gridPreferencePanelStateSelector,
    gridRenderingSelector,
    gridResizingColumnFieldSelector,
    gridRowCountSelector,
    gridRowsLookupSelector,
    gridRowsStateSelector,
    gridScrollSelector,
    gridSelectionStateSelector,
    gridSortColumnLookupSelector,
    gridSortModelSelector,
    gridTabIndexCellSelector,
    gridTabIndexColumnHeaderSelector,
    gridTabIndexStateSelector,
    gridViewportSizeStateSelector,
    gridVisibleRowsLookupSelector,
    itIT,
    jaJP,
    koKR,
    nlNL,
    plPL,
    ptBR,
    renderActionsCell,
    renderEditInputCell,
    renderEditSingleSelectCell,
    ruRU,
    selectedGridRowsCountSelector,
    selectedGridRowsSelector,
    selectedIdsLookupSelector,
    skSK,
    sortedGridRowIdsSelector,
    sortedGridRowsSelector,
    trTR,
    ukUA,
    unorderedGridRowIdsSelector,
    unorderedGridRowModelsSelector,
    useDataGridComponent,
    useGridApi,
    useGridApiContext,
    useGridApiEventHandler,
    useGridApiMethod,
    useGridApiOptionHandler,
    useGridApiRef,
    useGridLogger,
    useGridNativeEventListener,
    useGridProcessedProps,
    useGridRootProps,
    useGridScrollFn,
    useGridSelector,
    useGridState,
    viVN,
    visibleGridColumnsLengthSelector,
    visibleGridColumnsSelector,
    visibleGridRowCountSelector,
    visibleSortedGridRowIdsSelector,
    visibleSortedGridRowsAsArraySelector,
    visibleSortedGridRowsSelector,
    zhCN,
  };
}
