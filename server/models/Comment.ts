import User, { DUMMY_USER } from "./User";
import Chance from "chance";

const chance = new Chance();

interface Comment {
    user: User;
    content: string;
    replies: Comment[];
}

function generate(n: number, depth: number): Comment[] {
    const comments: Comment[] = [];
    for (let i = 0; i < n; i++){
        comments.push({
            user: DUMMY_USER,
            content: chance.paragraph({sentences: 5}),
            replies: depth > 1 ? generate(n, depth - 1) : [],
        });
    };
    return comments;
}

const DUMMY_COMMENTS: Comment[] = generate(2,3);
export default Comment
export { DUMMY_COMMENTS };
