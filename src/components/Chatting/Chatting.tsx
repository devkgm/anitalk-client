import { useEffect, useRef, useState } from 'react';
import styles from './Chatting.module.scss';
import { useRecoilValue } from 'recoil';
import { isLoggedInState, userState } from '@/recoil/auth';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { getChattings } from '@/api/ChattingAPI';

interface Prop {
    roomId: string;
}

function Chatting({ roomId }: Prop) {
    const [chatHistory, setChatHistory] = useState<ChatMessage[] | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const stmpClient = useRef<CompatClient | null>(null);
    const chatListRef = useRef(null);
    const accessToken = JSON.parse(localStorage.getItem('access_token'));
    const isLoggedIn = useRecoilValue(isLoggedInState);
    const user = useRecoilValue(userState);
    useEffect(() => {
        const loadChatHistory = async () => {
            try {
                const data = await getChattings(roomId);
                console.log(data);
                setChatHistory(data);
            } catch (e) {
                console.error(e);
            }
        };
        loadChatHistory();
        connection();
    }, []);
    useEffect(() => {
        if (chatListRef.current) {
            chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const connection = () => {
        stmpClient.current = Stomp.client('ws://' + import.meta.env.VITE_BASE_URL + '/ws');
        stmpClient.current.connect(
            {},
            //onConnect
            () => {
                stmpClient.current?.subscribe(`/ani/${roomId}`, (message) => {
                    setChatHistory((prevHistory) => {
                        return prevHistory ? [...prevHistory, JSON.parse(message.body)] : [JSON.parse(message.body)];
                    });
                });
            },
            //onError
            () => {
                console.error('연결 실패');
            }
        );
    };
    const sendHandler = (inputValue: string) => {
        if (inputValue == '') return;
        setInputValue('');
        if (stmpClient.current && stmpClient.current.connected) {
            const message: ChatMessage = {};
            message.content = inputValue;
            message.sendDate = new Date().toLocaleString();
            if (isLoggedIn) {
                message.nickname = user.nickname;
            } else {
                message.nickname = '덕후';
            }
            stmpClient.current.send(
                `/send/${roomId}`,
                {
                    Authorization: 'Bearer ' + accessToken,
                    'Content-Type': 'application/json',
                },
                JSON.stringify(message)
            );
        }
    };
    const handleChatInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing) return;
        if (e.key === 'Enter') {
            sendHandler(inputValue);
        }
    };
    const handleChatInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const scrollToBottom = () => {
        chatListRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.title__text}>채팅방</div>
            </div>
            <div className={styles.chatting} ref={chatListRef}>
                <ul className={styles.chatting__list}>
                    {chatHistory &&
                        chatHistory.map((chat, index) => {
                            return (
                                <li className={styles.chatting__list__item} key={chat.sendDate + index}>
                                    <div className={styles.chatting__list__item__nickname}>{chat.nickname}</div>
                                    <div className={styles.chatting__list__item__content}>{chat.content}</div>
                                    <div className={styles.chatting__list__item__senddate}>{chat.sendDate}</div>
                                </li>
                            );
                        })}
                </ul>
            </div>
            <div className={styles.input}>
                <input
                    type="text"
                    className={styles.input__text}
                    value={inputValue}
                    onKeyDown={handleChatInputKeyDown}
                    onChange={handleChatInputChange}
                />
                <button type="button" className={styles.input__button} onClick={() => sendHandler(inputValue)}>
                    전송
                </button>
            </div>
        </div>
    );
}

export default Chatting;
