import { Post, Tag, PostMeta } from 'types'
import urlJoin from 'url-join'
import cacheData from 'memory-cache'

const postMetas = ["id", "published", "title", "description" , "modified", "tags"]

type Params = {
    [k:string]: string
}

// microCMSのAPIを叩く
async function request(url: string, params:Params = {}): Promise<Response>{
    const serchParam = new URLSearchParams(params).toString()

    if(serchParam !== ''){
        url = urlJoin(url, '?'+serchParam)
    }

    const value = cacheData.get(url)
    if(value){
        return value.clone()
    }

    const resu = await fetch(url, { headers: {
        "X-MICROCMS-API-KEY": process.env.API_KEY
      }})


    cacheData.put(url, resu.clone(),  1000 * 60 * 60 * 24 * 15)
    return resu
}

// 指定したidの投稿を読み込む
export async function loadPostData(id: string): Promise<Post|null>{
    const url = urlJoin(process.env.API_URL, "myblog", id)

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
        title:data["title"]
    }

    return retu  
}

// 全ての投稿メタを日付順にソートし返却
export async function getSortedPostMeta(limit: number):Promise<PostMeta[]> {
    const url = urlJoin(process.env.API_URL, `myblog`)
    const param: Params = {orders: "-published", limit: limit.toString(), fields:postMetas.join(",") }
    const data = await request(url, param).then(res => res.json())
    return data.contents
}

// 指定したタグがつけられている投稿を取得
export async function getPostMetaByTag(slug:string):Promise<Post[]> {
    const param:Params = {filters: `tags[contains]${slug}`, fields: postMetas.join(",")}
    const url = urlJoin(process.env.API_URL, "myblog");
    const data = await request(url, param).then(res => res.json())
    return data.contents
}

// 指定したタグのデータを取得
export async function getTagProperty(id: string):Promise<Tag | null> {
    let url = urlJoin(process.env.API_URL, "tags", id)
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