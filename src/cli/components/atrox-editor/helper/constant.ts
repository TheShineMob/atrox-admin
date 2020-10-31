/**
 * @description 支持常量
 * @author wuy1fffff
 * @date 2020-08-11 09:31
 * @lastEditTime 2020-08-11 09:31
 */

import { ImageDisplay } from './utils/image'

// 4种对齐
export const enum Alignment {
  left = 'left',
  center = 'center',
  right = 'right',
  justify = 'justify'
}

//  验证对齐的正则
export const ALIGN_PATTERN = new RegExp(
  `(${Alignment.left}|${Alignment.center}|${Alignment.right}|${Alignment.justify})`
)

//  100%行高
export const LINE_HEIGHT_100 = 1.7
//  默认行高
export const DEFAULT_LINE_HEIGHT = '100%'

export const DEFAULT_IMAGE_URL_REGEX = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
export const DEFAULT_IMAGE_WIDTH = 200
export const DEFAULT_IMAGE_HEIGHT = 200
export const DEFAULT_IMAGE_DISPLAY = ImageDisplay.INLINE
