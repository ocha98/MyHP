import PostCard from "../molecule/PostCard"
import React from "react"
import { PostMeta } from "types"

const PostGrid = ({ postDatas }:{postDatas:PostMeta[]}) => {
  return (
    <div className="bg-light p-3">
      <div className="container text-center">
        <div className="row">
          {
            postDatas.map((props) => {
              return (
                <PostCard key={props["id"]} {...props} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default PostGrid