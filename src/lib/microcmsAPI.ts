import { Post, Tag, PostMeta } from 'types'
import urlJoin from 'url-join'

const postMetas = ["id", "published", "title", "description" , "modified", "tags"]

type Params = {
    [k:string]: string
}

const ENDPOINT = process.env.API_URL;

// microCMSのAPIを叩く
async function request(url: string, params:Params = {}): Promise<Response>{
    const serchParam = new URLSearchParams(params).toString()
    if(serchParam !== ''){
        url = urlJoin(url, '?'+serchParam)
    }

    const resu = await fetch(url, { headers: {
        "X-MICROCMS-API-KEY": process.env.API_KEY
      }})

    return resu
}

// 指定したidの投稿を読み込む
export async function loadPostData(id: string): Promise<Post|null>{
    const url = urlJoin(ENDPOINT, "myblog", id)

    const resu = await request(url)

    if( resu.status === 404){
        return null
    }
   
    const data = await resu.json()

    let tags:Tag[] = []
    for(let tag of data["tags"]){
        tags.push({id: tag["id"], text: tag["text"]})
    }
 
    const retu:Post = {
        tags:tags,
        id:data["id"],
        published:data["published"],
        modified:data["modified"],
        description:data["description"],
        content:data["content"],
        title:data["title"],
        isLimited: data["limited"]
    }

    return retu  
}

//全ての投稿idを取得
export async function getAllPostIDs(): Promise<{id:string}[]> {
    const url = urlJoin(ENDPOINT, 'myblog')
    const param: Params = {orders: "-published", limit:" 500", fields:"id"}
    const data = await request(url, param).then(res => res.json())

    return data.contents
}

// 全ての投稿メタを日付順にソートし返却
export async function getSortedPostMeta(limit: number):Promise<PostMeta[]> {
    const url = urlJoin(ENDPOINT, `myblog`)
    const param: Params = {orders: "-published", limit: limit.toString(), filters:"limited[equals]false", fields:postMetas.join(",") }
    const data = await request(url, param).then(res => res.json())
    return data.contents
}

// 全てのタグidを取得
export async function getAllTagIds():Promise<{id:string}[]> {
    let url = urlJoin(ENDPOINT, "tags")
    const param:Params =  {limit:" 500", fields:"id"}
    const data = await request(url, param).then(res => res.json())

    return data.contents
}

// 指定したタグがつけられている投稿を取得
export async function getPostMetaByTag(slug:string):Promise<Post[]> {
    const param:Params = {orders: "-published", limit:" 500", filters: `tags[contains]${slug}[and]limited[equals]false`, fields: postMetas.join(",")}
    const url = urlJoin(ENDPOINT, "myblog");
    const data = await request(url, param).then(res => res.json())
    return data.contents
}

// 指定したタグのデータを取得
export async function getTagProperty(id: string):Promise<Tag | null> {
    let url = urlJoin(ENDPOINT, "tags", id)
    const param:Params = {fields: "id,text"}
    const resu = await request(url, param)

    if(resu.status === 404){
        return null
    }

    const data = await resu.json()
    const prop:Tag = {
        id: data["id"],
        text: data["text"],
    }

    return prop
}