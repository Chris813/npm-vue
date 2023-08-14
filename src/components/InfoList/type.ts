/**链接类型 */
type ILink = {
    github:string
    npm: string
}

/**size类型 */
type ISize = {
    Minified?: string
    Gzipped?: string
}

/**模块详情 */
export type IDetail = {
    title?: string
    desc?: string
    link?: ILink
    size?: ISize
}