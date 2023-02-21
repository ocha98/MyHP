import Link from "next/link";
import styled from "styled-components";

type TagProps = {
  is_small: boolean
  text: string,
  id: string,
}

const SmallTag = styled.div`
  display: inline-block;
  background-color: #eee;
  margin: 0px 3px;
  padding: 3px;
  border-radius: 20%;
  font-size: 0.8rem;
  &:hover {
    background-color: azure;
  }
`

const Tag = ({ is_small, text, id }:TagProps) => {
  return (
    <Link href={`/tags/${id}`}>
      {is_small ? 
        <SmallTag><span>{text}</span></SmallTag>:
        <div className="btn btn-sm btn-secondary  m-1">
          <span><i className="bi bi-tag"></i>{ text }</span>
        </div>
      }
    </Link>
  )
}

export default Tag