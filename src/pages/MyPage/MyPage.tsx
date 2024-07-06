import { useRecoilState } from 'recoil';
import styles from './MyPage.module.scss';
import { isLoggedInState, userState } from '@/recoil/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserBoards } from '@/api/BoardAPI';
import Header from '@/components/Header/Header';
import { getUserComments } from '@/api/CommentAPI';
import Modal from '@/components/Modal/Modal';
import PasswordChange from './components/PasswordChange/PasswordChange';
import NicknameChange from './components/NicknameChange/NicknameChange';
import { logout } from '@/api/UserAPI';
import { getUserLikeAnimation } from '@/api/AnimationAPI';
import AnimationCard from '../Home/components/AnimationCard/AnimationCard';
import { selectedArticleState } from '@/recoil/mypage';
import Pagination from '@/components/Pagination/Pagination';
import ReviewCard from '../Review/ReviewCard/ReviewCard';
import { getUserReview } from '@/api/ReviewAPI';

function MyPage() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
    const [user, setUser] = useRecoilState(userState);
    const [boards, setBoards] = useState<MyBoardVO[] | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [animations, setAnimations] = useState<AnimationResponse[]>([]);
    const [reviews, setReviews] = useState<ReviewResponse[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState('');
    const [activeTab, setActiveTab] = useRecoilState<'board' | 'comment' | 'favorite' | 'review'>(selectedArticleState);
    const [page, setPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    useEffect(() => {
        if (user.id) {
            activeTab == 'board' && loadBoards();
            activeTab == 'comment' && loadComments();
            activeTab == 'favorite' && loadAnimations();
            activeTab == 'review' && loadReviews();
        }
    }, [currentPage, user, activeTab]);
    const loadBoards = async () => {
        try {
            const data = await getUserBoards(user.id, currentPage);
            setBoards(data.content);
            setPage(data.page);
        } catch (e) {
            console.error(e);
        }
    };
    const loadComments = async () => {
        try {
            const data = await getUserComments(user.id, currentPage);
            setComments(data.content);
            setPage(data.page);
        } catch (e) {
            console.error(e);
        }
    };
    const loadAnimations = async () => {
        try {
            const data = await getUserLikeAnimation();
            setAnimations(data.content);
        } catch (e) {
            console.error(e);
        }
    };
    const loadReviews = async () => {
        try {
            const data = await getUserReview();
            console.log(data);
            setReviews(data.content);
        } catch (e) {
            console.error(e);
        }
    };
    const handleLogOut = async () => {
        try {
            await logout(user);
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
            setUser({ id: null, email: '', nickname: '' });
            setIsLoggedIn(false);
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };

    const handlePasswordChange = () => {
        setModalContent('password');
        toggleModal();
    };

    const handleNickNameChange = () => {
        setModalContent('nickname');
        toggleModal();
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const handleTapChange = (tab: 'board' | 'comment' | 'favorite' | 'review') => {
        setActiveTab(tab);
        setCurrentPage(0);
    };
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.section}>
                <div className={styles.title}>마이페이지</div>
                <div className={styles.userInfo}>
                    <div>{user.nickname}님 안녕하세요!</div>
                </div>
                <div className={styles.navigation}>
                    <button
                        className={`${styles.navButton} ${activeTab === 'board' && styles.active}`}
                        onClick={() => handleTapChange('board')}
                    >
                        작성한 게시글
                    </button>
                    <button
                        className={`${styles.navButton} ${activeTab === 'comment' && styles.active}`}
                        onClick={() => handleTapChange('comment')}
                    >
                        작성한 댓글
                    </button>
                    <button
                        className={`${styles.navButton} ${activeTab === 'favorite' && styles.active}`}
                        onClick={() => handleTapChange('favorite')}
                    >
                        즐겨찾기
                    </button>
                    <button
                        className={`${styles.navButton} ${activeTab === 'review' && styles.active}`}
                        onClick={() => handleTapChange('review')}
                    >
                        리뷰
                    </button>
                </div>
                {activeTab === 'board' && (
                    <div className={styles.content}>
                        <ul className={styles.list}>
                            {boards &&
                                boards.map((board) => (
                                    <li
                                        className={styles.listItem}
                                        key={board.id}
                                        onClick={() => navigate(`/animations/${board.animationId}/boards/${board.id}`)}
                                    >
                                        <div className={styles.listItemTitle}>{board.animationName}</div>
                                        <div className={styles.listItemTitle}>{board.title}</div>
                                        <div className={styles.listItemDetail}>{board.hit} 조회</div>
                                        <div className={styles.listItemDetail}>{board.writeDate}</div>
                                    </li>
                                ))}
                        </ul>
                        {boards && page && (
                            <div className={styles.pagination}>
                                <Pagination page={page} perBlock={10} onPageChange={setCurrentPage} />
                            </div>
                        )}
                    </div>
                )}
                {activeTab === 'comment' && (
                    <div className={styles.content}>
                        <ul className={styles.list}>
                            {comments.map((comment) => (
                                <li
                                    className={styles.listItem}
                                    key={comment.id + comment.date}
                                    onClick={() =>
                                        navigate(`/animations/${comment.animationId}/boards/${comment.boardId}`)
                                    }
                                >
                                    <div className={styles.listItemDetail}>{comment.animationName}</div>
                                    <div className={styles.listItemDetail}>{comment.boardTitle}</div>
                                    <div className={styles.listItemDetail}>{comment.nickname}</div>
                                    <div className={styles.listItemContent}>{comment.content}</div>
                                    <div className={styles.listItemDetail}>{comment.date}</div>
                                </li>
                            ))}
                        </ul>
                        {comments && page && (
                            <div className={styles.pagination}>
                                <Pagination page={page} perBlock={10} onPageChange={setCurrentPage} />
                            </div>
                        )}
                    </div>
                )}
                {activeTab === 'favorite' && (
                    <div className={styles.content}>
                        <div className={styles.content}>
                            <ul className={styles.aniList}>
                                {activeTab === 'favorite' &&
                                    animations.map((ani) => (
                                        <li
                                            className={styles.aniListItem}
                                            key={ani.id}
                                            onClick={() => navigate(`/animations/${ani.id}`)}
                                        >
                                            <AnimationCard data={ani} key={ani.id + ani.name} />
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                )}
                {activeTab === 'review' && (
                    <div className={styles.content}>
                        <div className={styles.content}>
                            <ul className={styles.aniList}>
                                {activeTab === 'review' &&
                                    reviews.map((review) => (
                                        <li
                                            className={styles.aniListItem}
                                            key={review.id}
                                            onClick={() => navigate(`/animations/${review.animationId}`)}
                                        >
                                            <ReviewCard review={review} key={review.id} />
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                )}
                <div className={styles.buttons}>
                    <button type="button" onClick={handleLogOut} className={styles.logoutButton}>
                        로그아웃
                    </button>
                    <button type="button" onClick={handlePasswordChange} className={styles.pwdChangeButton}>
                        비밀번호 변경
                    </button>
                    <button type="button" onClick={handleNickNameChange} className={styles.nicknameChangeButton}>
                        닉네임 변경
                    </button>
                </div>
            </div>
            {showModal && (
                <Modal onClose={toggleModal}>
                    {modalContent === 'password' ? (
                        <PasswordChange onClose={toggleModal} />
                    ) : (
                        <NicknameChange onClose={toggleModal} />
                    )}
                </Modal>
            )}
        </div>
    );
}

export default MyPage;
