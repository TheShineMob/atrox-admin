import {
  CheckboxConfig,
  ColumnCellRenderParams,
  ColumnDefaultConfig,
  ColumnDefaultSlotParams,
  ColumnFooterRenderParams,
  ColumnInfo,
  ContextMenuConfig,
  EditConfig,
  EditVaildRules,
  EmptyRender,
  ExpandConfig,
  ExportOptons,
  FilterConfig,
  ImportOptons,
  KeyboardConfig,
  MergeOptions,
  MouseConfig,
  PrintOptons,
  RadioConfig,
  SeqConfig,
  SortConfig,
  TooltipConfig,
  TreeConfig,
  ValidConfig
} from 'vxe-table'
import {
  GridColumnOptions,
  GridFormOptions,
  GridPagerConfig,
  GridProxyConfig,
  GridProxyQueryFiltersParams,
  GridProxyQueryPageParams,
  GridProxyQuerySortParams,
  GridToolbarOptions
} from 'vxe-table/types/grid'
import {
  AtroxFormAction,
  AtroxFormField
} from '../components/atrox-form/AtroxFormInterface'

export interface AtroxCrudOptions {
  table: AtroxTableOptions
  form?: AtroxFormOptions
  editForm?: AtroxFormOptions
  deleteForm?: AtroxFormOptions
  uploadForm?: AtroxFormOptions
  actionConfig?: GridColumnOptions
  action?: AtroxCrudAction[]
  toolBar?: AtroxCrudAction[]
  query?: (
    params: {
      page: GridProxyQueryPageParams
      sort: GridProxyQuerySortParams
      filters: GridProxyQueryFiltersParams[]
      form: any
    },
    form: any,
    sort: any
  ) => Promise<any>
  edit?: (form: any) => Promise<any>
  insert?: (form: any) => Promise<any>
  delete?: (idList: string[]) => Promise<any>
  upload?: (file: FormData) => Promise<any>
}

export interface AtroxCrudAction {
  text?: string
  type: string
  color?: string
  emit?: string
  width?: string | number
  icon?: string
  path?: string
  templateName?: string
  exportName?: string
  hiddeOn?: (...args: any[]) => boolean
  handler?: (...args: any[]) => boolean
}

export interface AtroxFormOptions {
  fields?: AtroxFormField[]
  noCard?: boolean
  title?: string
  actions?: AtroxFormAction[]
  noValidate?: boolean
  mode?: 'row' | 'inline' | 'flex'
  flexWidth?: string
  flexNumber?: string
}

export interface AtroxTableOptions {
  /**
   * 列配置
   */
  columns?: GridColumnOptions[]
  /**
   * 分页配置项
   */
  pagerConfig?: boolean | GridPagerConfig
  /**
   * 数据代理配置项
   */
  proxyConfig?: GridProxyConfig
  /**
   * 工具栏配置
   */
  toolbar?: boolean | GridToolbarOptions
  /**
   * 表单配置项
   */
  formConfig?: boolean | GridFormOptions

  /**
   * 唯一标识
   */
  id?: string
  /**
   * 数据
   */
  data?: any[]
  /**
   * 表格的高度
   */
  height?: number | string
  /**
   * 表格的最大高度
   */
  maxHeight?: number | string
  /**
   * 所有列是否允许拖动列宽调整大小
   */
  resizable?: boolean
  /**
   * 是否带有斑马纹
   */
  stripe?: boolean
  /**
   * 是否带有纵向边框
   */
  border?: boolean | 'default' | 'full' | 'outer' | 'inner' | 'none'
  fit?: boolean
  /**
   * 表格是否加载中
   */
  loading?: boolean
  /**
   * 所有的列对其方式
   */
  align?: 'left' | 'center' | 'right'
  /**
   * 所有的表头列的对齐方式
   */
  headerAlign?: 'left' | 'center' | 'right'
  /**
   * 所有的表尾列的对齐方式
   */
  footerAlign?: 'left' | 'center' | 'right'
  /**
   * 是否显示表头
   */
  showHeader?: boolean
  /**
   * 是否要高亮当前选中行
   */
  highlightCurrentRow?: boolean
  /**
   * 鼠标移到行是否要高亮显示
   */
  highlightHoverRow?: boolean
  /**
   * 是否要高亮当前选中列
   */
  highlightCurrentColumn?: boolean
  /**
   * 鼠标移到列是否要高亮显示
   */
  highlightHoverColumn?: boolean
  /**
   * 激活单元格编辑时是否高亮显示
   */
  highlightCell?: boolean
  /**
   * 是否显示表尾
   */
  showFooter?: boolean
  /**
   * 表尾数据获取的方法
   */
  footerMethod?(params: { columns: ColumnInfo[]; data: any[] }): Array<string | number>[]
  /**
   * 给行附加 className
   */
  rowClassName?: string | Function
  /**
   * 给单元格附加 className
   */
  cellClassName?: string | Function
  /**
   * 给表头的行附加 className
   */
  headerRowClassName?: string | Function
  /**
   * 给表头的单元格附加 className
   */
  headerCellClassName?: string | Function
  /**
   * 给表尾的行附加 className
   */
  footerRowClassName?: string | Function
  /**
   * 给表尾的单元格附加 className
   */
  footerCellClassName?: string | Function
  /**
   * 给单元格附加样式
   */
  cellStyle?:
    | { [key: string]: any }
    | Array<string | number | boolean | { [key: string]: any }>
    | Function
  /**
   * 给表头单元格附加样式
   */
  headerCellStyle?:
    | { [key: string]: any }
    | Array<string | number | boolean | { [key: string]: any }>
    | Function
  /**
   * 给表尾单元格附加样式
   */
  footerCellStyle?:
    | { [key: string]: any }
    | Array<string | number | boolean | { [key: string]: any }>
    | Function
  /**
   * 给行附加样式
   */
  rowStyle?:
    | { [key: string]: any }
    | Array<string | number | boolean | { [key: string]: any }>
    | Function
  /**
   * 给表头行附加样式
   */
  headerRowStyle?:
    | { [key: string]: any }
    | Array<string | number | boolean | { [key: string]: any }>
    | Function
  /**
   * 给表尾行附加样式
   */
  footerRowStyle?:
    | { [key: string]: any }
    | Array<string | number | boolean | { [key: string]: any }>
    | Function
  /**
   * 临时合并单元格
   */
  mergeCells?: MergeOptions[]
  /**
   * 临时合并表尾
   */
  mergeFooterItems?: MergeOptions[]
  /**
   * 自定义单元格合并方法
   */
  spanMethod?(params: ColumnCellRenderParams): { rowspan: number; colspan: number }
  /**
   * 自定义表尾合并方法
   */
  footerSpanMethod?(
    params: ColumnFooterRenderParams
  ): { rowspan: number; colspan: number }
  /**
   * 设置所有内容过长时显示为省略号
   */
  showOverflow?: boolean | 'ellipsis' | 'title' | 'tooltip'
  /**
   * 设置表头所有内容过长时显示为省略号
   */
  showHeaderOverflow?: boolean | 'ellipsis' | 'title' | 'tooltip'
  /**
   * 设置表尾所有内容过长时显示为省略号
   */
  showFooterOverflow?: boolean | 'ellipsis' | 'title' | 'tooltip'

  /** 高级属性 */
  // 主键配置
  columnKey?: boolean
  rowKey?: boolean
  rowId?: string
  zIndex?: number
  keepSource?: boolean
  // 是否自动监听父容器变化去更新响应式表格宽高
  autoResize?: boolean
  // 是否自动根据状态属性去更新响应式表格宽高
  syncResize?: boolean | string
  // 列的默认参数
  columnConfig?: ColumnDefaultConfig
  // 序号配置项
  seqConfig?: SeqConfig
  // 排序配置项
  sortConfig?: SortConfig
  // 筛选配置项
  filterConfig?: FilterConfig
  // 单选框配置
  radioConfig?: RadioConfig
  // 复选框配置项
  checkboxConfig?: CheckboxConfig
  // 提示信息配置项
  tooltipConfig?: TooltipConfig
  // 导出配置项
  exportConfig?: boolean | ExportOptons
  // 导入配置项
  importConfig?: boolean | ImportOptons
  // 打印配置项
  printConfig?: PrintOptons
  // 展开行配置项
  expandConfig?: ExpandConfig
  // 树形结构配置项
  treeConfig?: boolean | TreeConfig
  // 快捷菜单配置项
  contextMenu?: boolean | ContextMenuConfig
  // 鼠标配置项
  mouseConfig?: MouseConfig
  // 按键配置项
  keyboardConfig?: KeyboardConfig
  // 编辑配置项
  editConfig?: boolean | EditConfig
  // 校验配置项
  validConfig?: ValidConfig
  // 校验规则配置项
  editRules?: EditVaildRules
  emptyText?: string
  // 空内容渲染配置项
  emptyRender?: boolean | EmptyRender
  animat?: boolean
  cloak?: boolean
  delayHover?: number
  /**
   * 横向虚拟滚动配置
   */
  scrollX?: {
    /**
     * 指定大于指定列时自动启动横向虚拟滚动，如果为 0 则总是启用，如果为 -1 则关闭
     */
    gt?: number
    /**
     * 指定每次渲染的数据偏移量，偏移量越大渲染次数就越少，但每次渲染耗时就越久
     */
    oSize?: number
    [key: string]: any
  }
  /**
   * 纵向虚拟滚动配置
   */
  scrollY?: {
    /**
     * 指定大于指定行时自动启动纵向虚拟滚动，如果为 0 则总是启用，如果为 -1 则关闭
     */
    gt?: number
    /**
     * 指定每次渲染的数据偏移量，偏移量越大渲染次数就越少，但每次渲染耗时就越久
     */
    oSize?: number
    [key: string]: any
  }

  size?: 'medium' | 'small' | 'mini'
  // 额外的参数
  params?: any
}
