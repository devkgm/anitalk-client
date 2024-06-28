import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { animationState } from '@/recoil/home';
// import { updateAnimation } from '@/api/AnimationAPI';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './WriteAnimation.module.scss';
import toast, { Toaster } from 'react-hot-toast';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { getAnimation, updateAnimation } from '@/api/AnimationAPI';
import { deleteFile, uploadFile, uploadFileWithParent } from '@/api/FileAPI';

function WriteAnimation() {
    const { animationId } = useParams();
    const navigate = useNavigate();
    const [animation, setAnimation] = useState<Animation | null>(null);
    useEffect(() => {
        const loadAnimation = async () => {
            try {
                const data = await getAnimation(animationId);
                setAnimation(data);
            } catch (e) {
                console.error(e);
            }
        };
        if (animationId) loadAnimation();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAnimation((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedAnimation = await updateAnimation(animation);
            toast('애니메이션 정보가 업데이트되었습니다.');
            navigate(`/animations/${animation.id}`);
        } catch (error) {
            console.error(error);
            toast.error('업데이트 중 오류가 발생했습니다.');
        }
    };
    const handleUploadFile = async (e) => {
        try {
            const formData = new FormData();
            formData.append('attach', e.target.files[0]);
            const data = await uploadFile('animations', formData);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className={styles.container}>
            <Header />
            <section className={styles.section}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <div className={styles.divide}>
                            <div className={styles.imageContainer}>
                                <img className={styles.thumbnail} src={animation?.thumbnailUrl || ''} alt="썸네일" />
                                <input type="file" className={styles.inputFile} onChange={handleUploadFile} />
                            </div>
                        </div>
                        <div className={styles.divide}>
                            <div className={styles.field}>
                                <label htmlFor="name">제목</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={animation?.name || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label htmlFor="condition">상태</label>
                                    <input
                                        type="text"
                                        id="condition"
                                        name="condition"
                                        value={animation?.condition || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor="episode">에피소드</label>
                                    <input
                                        type="text"
                                        id="episode"
                                        name="episode"
                                        value={animation?.episode || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label htmlFor="season">시즌</label>
                                    <input
                                        type="text"
                                        id="season"
                                        name="season"
                                        value={animation?.season || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor="productCompany">제작사</label>
                                    <input
                                        type="text"
                                        id="productCompany"
                                        name="productCompany"
                                        value={animation?.productCompany || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label htmlFor="producer">감독</label>
                                    <input
                                        type="text"
                                        id="producer"
                                        name="producer"
                                        value={animation?.producer || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor="onDate">방영일</label>
                                    <input
                                        type="text"
                                        id="onDate"
                                        name="onDate"
                                        value={animation?.onDate || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label htmlFor="plot">줄거리</label>
                                    <textarea
                                        id="plot"
                                        name="plot"
                                        value={animation?.plot || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        업데이트
                    </button>
                </form>
            </section>
            <Footer />
            <Toaster />
        </div>
    );
}

export default WriteAnimation;
