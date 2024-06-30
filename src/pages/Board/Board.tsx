import Header from '@/components/Header/Header';
import styles from './Board.module.scss';
import { ReactEventHandler, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBoard, likeBoard, unLikeBoard } from '@/api/BoardAPI';
import Footer from '@/components/Footer/Footer';
import { deleteComment, getComments, uploadComment } from '@/api/CommentAPI';
import { useRecoilValue } from 'recoil';
import { isLoggedInState, userState } from '@/recoil/auth';
import toast from 'react-hot-toast';
import CommentInput from '@/components/CommentInput/CommentInput';
function Board() {
    const navigate = useNavigate();
    const { animationId, boardId } = useParams();
    const [board, setBoard] = useState<BoardResponse | null>(null);
    const [comments, setComments] = useState<Comment[] | null>(null);
    const [selectedComment, setSelectedComment] = useState(null);
    const isLoggedIn = useRecoilValue(isLoggedInState);
    const user = useRecoilValue(userState);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getBoard(animationId, boardId);
                console.log(data);
                setBoard(data);
            } catch (err) {
                console.error(err);
            }
        };
        loadData();
        const loadComment = async () => {
            try {
                const data: WithPageResponse<Comment> = await getComments(boardId);
                console.log(data);
                setComments(data.content);
            } catch (e) {
                console.error(e);
            }
        };
        loadComment();
    }, []);
    const handleLike = async () => {
        try {
            if (!isLoggedIn) {
                alert('로그인이 필요합니다.');
                return;
            }
            if (board.like.isLike) {
                const data = await unLikeBoard(animationId, boardId);
                setBoard({ ...board, like: data });
                return;
            }
            const data = await likeBoard(animationId, boardId);
            console.log(board, data);
            setBoard({ ...board, like: data });
        } catch (e) {
            console.error(e);
        }
    };
    const handleDeleteComment = async (comment: Comment) => {
        try {
            if (!isLoggedIn) {
                alert('로그인이 필요합니다.');
                return;
            }
            await deleteComment(boardId, comment);
            const newData = comments.map((c) => {
                if (c.id === comment.id) {
                    c.content = '삭제된 댓글';
                    return c;
                }
                return c;
            });
            setComments(newData);
        } catch (e) {
            console.error(e);
        }
    };
    const handleSubmitComment = async (inputData) => {
        try {
            if (!isLoggedIn) {
                toast('로그인이 필요합니다.');
                return;
            }
            const request = {
                userId: user.id,
                nickname: user.nickname,
                boardId: board.id,
                content: inputData,
                parent: null, //부모 댓글
            };
            const response = await uploadComment(board.id, request);
            setComments([...comments, response]);
        } catch (e) {
            console.error(e);
        }
    };
    const handleSubmitReply = async (inputData) => {
        try {
            if (!isLoggedIn) {
                toast('로그인이 필요합니다.');
                return;
            }
            const request = {
                userId: user.id,
                nickname: user.nickname,
                boardId: board.id,
                content: inputData,
                parent: selectedComment, //부모 댓글
            };
            const response = await uploadComment(board.id, request);
            // setComments([...comments, response]);
        } catch (e) {
            console.error(e);
        }
    };
    const handleReply = (id) => {
        if (id === selectedComment) {
            setSelectedComment(null);
            return;
        }
        setSelectedComment(id);
    };
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.article}>
                {board && (
                    <div className={styles.section}>
                        <div className={styles.head}>
                            <div className={styles.title}>
                                <span
                                    className={styles.title__sub}
                                    onClick={() => navigate('/animations/' + board.animationId)}
                                >
                                    {board.animationName}
                                </span>
                                <span className={styles.title__text}>{board.title}</span>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.date}>
                                    <span className={styles.date__text}>{board.writeDate} :작성일</span>
                                </div>
                                <div className={styles.author}>
                                    <span className={styles.author__text}>{board.nickname} :작성자</span>
                                </div>
                                <div className={styles.hit}>
                                    <span className={styles.hit__text}>{board.hit} :조회수</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.content}>
                            <div dangerouslySetInnerHTML={{ __html: board.content }} />
                            <div className={styles.like}>
                                {/* 추천을 덕추로 */}
                                <div className={styles.like__text} onClick={handleLike}>
                                    덕추
                                </div>
                                <span className={styles.like__count}>{board.like.count}</span>
                            </div>
                        </div>
                    </div>
                )}

                {comments && (
                    <div className={styles.commentSection}>
                        <div className={styles.title}>
                            <span className={styles.title__text}>댓글</span>
                        </div>
                        <ul className={styles.comments}>
                            {comments.map((comment) => (
                                <li className={`${styles.comments__item}`} key={comment.id}>
                                    <div
                                        className={`${styles.comments__item__container}  ${
                                            styles['depth' + comment.depth]
                                        }`}
                                    >
                                        <div className={styles.nickname}>{comment.nickname}</div>
                                        <div className={styles.content}>{comment.content}</div>
                                        <div className={styles.date}>{comment.writeDate}</div>
                                        {isLoggedIn && comment.userId === user.id && (
                                            <div className={styles.edit}>
                                                <div
                                                    className={styles.delete}
                                                    onClick={() => handleDeleteComment(comment)}
                                                >
                                                    삭제
                                                </div>
                                                <div className={styles.reply} onClick={() => handleReply(comment.id)}>
                                                    답글
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {selectedComment === comment.id && (
                                        <CommentInput handleSubmit={handleSubmitReply} />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <CommentInput handleSubmit={handleSubmitComment} />
            </div>
            <Footer />
        </div>
    );
}

export default Board;
