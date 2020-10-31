import path from 'path'

interface GenConfig {
  basePath: string
  baseFields: string[]
}

interface NextObject {
  name: string
  obj: Record<string, any>
}

const config: GenConfig = {
  basePath: `${path.resolve('./')}/src/views/`,
  baseFields: [
    'id',
    'createTime',
    'extra',
    'deleted',
    'version',
    'weight',
    'updateTime',
    'createBy',
    'updateBy'
  ]
}

export { config, NextObject }
