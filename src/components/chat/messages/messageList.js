import React, { useEffect, useState } from 'react';
import './messageList.css';
import { messages } from '../../../data.json';
import Message from './message';

const MessageList = () => {
    const amountOfMessages = 5;
    const [sortedMessages, setSortedMessages] = useState([]); // by default sorted by newest
    const [currentPageMessages, setCurrentPageMessages] = useState([]);
    const [sortedByNewest, setSortedByNewest] = useState(true);

    function deduplicateMessages(messages) {
        let uniqueMessages = messages.filter(
            (msg, index, self) =>
                index ===
                self.findIndex(
                    (el) => el.uuid === msg.uuid && el.content === msg.content
                )
        );
        sortMessagesByDate(uniqueMessages);
    }

    function sortMessagesByDate(messages) {
        let msgArr = [...messages];

        msgArr.sort(function (a, b) {
            return new Date(b.sentAt) - new Date(a.sentAt);
        });

        setSortedMessages([...msgArr]);
        selectMessagesForCurrentPage(1, msgArr, true);
    }

    function selectMessagesForCurrentPage(page, messages, displayNewest) {
        let curMessages = [];

        if (displayNewest) {
            curMessages = messages.slice(page - 1, amountOfMessages);
        } else {
            // Slice method is used from the end of already sorted array to avoid sorting backward
            if (page === 1) {
                curMessages = messages.slice(-(page * amountOfMessages));
            } else {
                curMessages = messages.slice(
                    -(page * amountOfMessages),
                    -(page * amountOfMessages - amountOfMessages)
                );
            }
            curMessages.reverse();
        }
        setCurrentPageMessages([...curMessages]);
    }

    function handleClickButton(sortByNewest) {
        selectMessagesForCurrentPage(1, sortedMessages, sortByNewest);
        setSortedByNewest(!sortedByNewest);
    }

    useEffect(() => {
        deduplicateMessages(messages);
    }, []);

    return (
        <div className="page-container">
            <h1>Chat</h1>
            {currentPageMessages ? (
                <div>
                    <div className="sort-container">
                        <span className="sort-text">Sort by: </span>
                        <button
                            onClick={() => handleClickButton(true)}
                            className="sort-btn"
                            disabled={sortedByNewest}
                        >
                            newest
                        </button>
                        <button
                            onClick={() => handleClickButton(false)}
                            className="sort-btn"
                            disabled={!sortedByNewest}
                        >
                            oldest
                        </button>
                        {sortedByNewest ? (
                            <span className="sort-text-default">sorted by newest</span>
                        ) : (
                            <span className="sort-text-default">sorted by oldest</span>
                        )}
                    </div>

                    <ul className="messages-container">
                        {currentPageMessages.map((message) => (
                            <Message
                                key={`${message.uuid}-${message.sentAt}`}
                                message={message}
                            />
                        ))}
                    </ul>
                </div>
            ) : (
                <h3>Message box is empty</h3>
            )}
        </div>
    );
};

export default MessageList;
