export type Twitter_Card = "summary" | "large"

export type Tag = {
    text: string,
    id: string,
}

export type PostMeta = {
    id: string
    published: string
    title: string
    description: string
    modified:string
    tags: Tag[]
}

export interface Post extends PostMeta{
    content: string
}