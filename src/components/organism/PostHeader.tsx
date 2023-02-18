import Time from "../atom/Time"
import { Tag } from "types"
import ETag from "../atom/Tag"

type Props =  {
  title: string
  published: string
  modified: string
  tags: Tag[]
}

const PostHeader = ({ title, published, modified, tags }:Props) => {
  return (
    <header>
      <h1 className="fw-bold">{title}</h1>
      <p><span style={{ marginRight: "3px" }}><i className="bi bi-pencil-fill" />投稿日：<Time dateString={published} /> </span>
        <i className="bi bi-arrow-clockwise" />更新日:<Time dateString={modified} /></p>
        <div>
        {
          tags.map((tag) => { return <ETag key={tag.id}  is_small={false} {...tag} /> })
        }
      </div>
    </header>
  )
}

export default PostHeader