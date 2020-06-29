import { User, DUMMY_USERS } from "../entities/User";

interface Comment {
  user: User;
  content: string;
  replies: Comment[];
}

function randomChoice(things: any[]) {
  return things[Math.floor(Math.random() * things.length)];
}

function randomUser(parent: User | undefined) {
  let choosenUser: User = randomChoice(DUMMY_USERS);
  while (parent && choosenUser.username === parent.username) {
    choosenUser = randomChoice(DUMMY_USERS);
  }
  return choosenUser;
}
const dummyReviewContentList = [
  `There are predictably a number of readers who will look at this title and shy away, thinking that a book with "algorithms" in its title must be just for techies and computer scientists. There will be others who pride themselves on being technologically astute who think they know all about algorithms already.`,
  `This book is a very good introduction to several mathematical concepts that many people have heard of, but don't know much about. Brian Christian also does something very clever: he makes these concepts eminently relatable.`,
  `This book is a well-made translation of the algorithmic thinking used by computer scientists into plain-English. I like the author's style of writing because it is straight to the point and accessible for laypeople. He make hard concepts easy to understand and uses a lot of examples throughout the book. Amazing piece of work!`
];

const dummy1stReplyList = [
  "Bạn review tiếng Anh hay ghê",
  "Review tiếng Việt cho mình hiểu với",
  "Me no speak english, can you speak Vnmese"
];

const dummy2ndReplyList = [
  "Mình đồng ý với bạn",
  "Học tiếng anh đi bạn",
  "Có chừng đó mà cũng ko hiểu"
];

const dummyContentList = [dummyReviewContentList, dummy1stReplyList, dummy2ndReplyList];

function generate(n: number, depth: number, level: number, parent?: User): Comment[] {
  const comments: Comment[] = [];
  for (let i = 0; i < n; i++) {
    const user = randomUser(parent);
    comments.push({
      user,
      content: !level ? dummyContentList[level][i] : randomChoice(dummyContentList[level]),
      replies: depth > 1 ? generate(n - 1, depth - 1, level + 1, user) : []
    });
  }
  return comments;
}

const DUMMY_COMMENTS: Comment[] = generate(3, 3, 0);
export default Comment;
export { DUMMY_COMMENTS };
