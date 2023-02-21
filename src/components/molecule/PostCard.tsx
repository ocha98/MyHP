import Link from "next/link"
import Time from "../atom/Time"
import Tag from "../atom/Tag"
import { PostMeta } from "types"

const PostCard = ({ id, title, description, published, tags}:PostMeta) => {
  return (
    <article className="col-sm-6 col-md-4 col-lg-3 pb-3">
      <div className="card d-flex flex-column" style={{ height: "100%" }}>
        <div className="card-body">
          <Link href={`/posts/${id}`}>
              <h2 className="card-title fs-5 border-bottom fw-normal" style={{wordBreak:"normal"}}>{title}</h2>
              <p className="card-subtitle text-muted fs-6 "><Time dateString={published} /></p>
              <p className="card-text">{description}</p>
          </Link>
        </div>
        <div style={{ margin: "3px", paddingBottom: "8px" }}>
        </div>
        <div style={{ margin: "3px", paddingBottom: "8px" }}>
          {
            tags.map((tag) => {
              return <Tag key={tag.id} is_small={true} {...tag} />
            })
          }
        </div>
      </div>
    </article>
  )
}

export default PostCard

