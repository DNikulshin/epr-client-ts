import {CommentUser} from "./Comment.tsx";
import { Comment} from "../store/data-store/types.ts";

export const Comments = (comments: Comment[]) => {
    console.log(comments)
    return (
        <>
            <strong>Комменты: <br/></strong>
            {
                comments &&   Object.values(comments).map(commentItem => <CommentUser {...commentItem} key={commentItem.id} />)
            }
        </>
    )
}
