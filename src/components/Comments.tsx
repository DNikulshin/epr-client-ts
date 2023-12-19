import {CommentUser} from "./Comment.tsx";

export const Comments = (comments: Comment[]) => {
    return (
        <>
            <strong>Комменты: <br/></strong>
            {
                comments &&   Object.values(comments).map(commentItem => <CommentUser {...commentItem} key={commentItem.id} />)
            }
        </>
    )
}
