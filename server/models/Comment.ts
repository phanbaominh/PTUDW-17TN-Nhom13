import User, { DUMMY_USER, DUMMY_USERS } from "./User";
import Chance from "chance";
import { userInfo } from "os";

const chance = new Chance();

interface Comment {
    user: User;
    content: string;
    replies: Comment[];
}

function randomChoice(things: any[]) {
    return things[Math.floor(Math.random() * things.length)];
}

function randomUser(parent: User|undefined) {
    let choosenUser: User = randomChoice(DUMMY_USERS);
    while (parent && choosenUser.username === parent.username){
        choosenUser = randomChoice(DUMMY_USERS);
    }
    return choosenUser;
}
const dummyReviewContentList = [
    `There are predictably a number of readers who will look at this title and shy away, thinking that a book with "algorithms" in its title must be just for techies and computer scientists. There will be others who pride themselves on being technologically astute who think they know all about algorithms already. Both groups are wrong. Both will be astounded and profoundly affected by the human applications Brian Christian and Tom Griffiths make in this book for all of us. I should qualify that; it is a book for anyone who has ever had difficulty in such tasks as "when to stop looking" (for an apartment, for instance); how to schedule a busy family's priorities; how to clean out the garage; how to stop thinking about a problem; how to network. In fact, all the day-to-day problems that follow us from waking up to going to bed are addressed here by the human use of algorithms. I confess that I was grateful for the definition of "algorithms" early in the book; it is one of those words that everyone uses but many of us would have been hard put to explain. Notice I wrote "would have been" because this book explains it all so clearly that neophytes can understand it and technological people will not feel they are being patronized. And all of us who really use this book (not just read, but use) will find it has made our lives more productive, better organized, and essentially, much happier. Brian Christian and Tom Griffiths are geniuses at combining cutting edge philosophy with information we can use to make our lives richer.`,
    `This book is a very good introduction to several mathematical concepts that many people have heard of, but don't know much about. Brian Christian also does something very clever: he makes these concepts eminently relatable.

    It may sound like hyperbole, but the chapters on optimal stopping and explore/exploit changed my life. I save a lot more time not trying to figure out which parking spot to choose or where to eat.
    
    The most impactful concepts are clustered in the front of the book, which is again optimal for those readers with short attention spans. The stuff later in the book is also very enlightening, just not as universally applicable as optimal stopping or explore/exploit.
    
    This is not a book designed for people with an advanced understanding of math or computer science. It's designed as a gateway to bring in people like me who are interested in these fields, but are perhaps a little intimidated.
    
    Read it now, people.`,
    `This book is a well-made translation of the algorithmic thinking used by computer scientists into plain-English. I like the author's style of writing because it is straight to the point and accessible for laypeople. He make hard concepts easy to understand and uses a lot of examples throughout the book. Amazing piece of work!`,
];

const dummy1stReplyList = [
    "Bạn review tiếng Anh hay ghê",
    "Review tiếng Việt cho mình hiểu với",
    "Me no speak english, can you speak Vnmese",
];

const dummy2ndReplyList = [
    "Mình đồng ý với bạn",
    "Học tiếng anh đi bạn",
    "Có chừng đó mà cũng ko hiểu",
];

const dummyContentList = [
    dummyReviewContentList,
    dummy1stReplyList,
    dummy2ndReplyList,
];

function generate(n: number, depth: number, level: number, parent?: User): Comment[] {
    const comments: Comment[] = [];
    for (let i = 0; i < n; i++){
        const user = randomUser(parent);
        comments.push({
            user,
            content: (!level) ? dummyContentList[level][i] 
                            : randomChoice(dummyContentList[level]),
            replies: depth > 1 ? generate(n - 1, depth - 1, level + 1, user ) : [],
        });
    };
    return comments;
}

const DUMMY_COMMENTS: Comment[] = generate(3, 3, 0);
export default Comment
export { DUMMY_COMMENTS };
