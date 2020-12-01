import React, { useEffect, useState } from 'react';
import './messageList.css';
import { messages } from '../../../data.json';
import Message from './message';
import Pagination from '../pagination/pagination';

const MessageList = () => {
    const amountOfMessages = 5;
    const [sortedMessages, setSortedMessages] = useState([]); // by default sorted by newest
    const [currentPageMessages, setCurrentPageMessages] = useState([]);
    const [sortedByNewest, setSortedByNewest] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

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
        defineTotalPages(msgArr.length);
    }

    function selectMessagesForCurrentPage(page, messages, displayNewest) {
        let curMessages = [];

        if (displayNewest) {
            curMessages = messages.slice(
                page * amountOfMessages - amountOfMessages,
                page * amountOfMessages
            );
        }

        if (!displayNewest) {
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

    function defineTotalPages(totalMessages) {
        if (totalMessages > amountOfMessages) {
            setTotalPages(Math.ceil(totalMessages / amountOfMessages));
        }
    }

    function handleSortButton(sortByNewest) {
        selectMessagesForCurrentPage(1, sortedMessages, sortByNewest);
        setSortedByNewest(!sortedByNewest);
        setCurrentPage(1);
    }

    function changePage(page) {
        setCurrentPage(page);
        selectMessagesForCurrentPage(page, sortedMessages, sortedByNewest);
    }

    function removeMessage(message) {
        let arr = [...sortedMessages];
        for (let i = 0; i < arr.length; i++) {
            if (message.uuid === arr[i].uuid && message.content === arr[i].content) {
                arr.splice(i, 1);
            }
        }
        setSortedMessages([...arr]);

        if (currentPageMessages.length > 1) {
            selectMessagesForCurrentPage(currentPage, arr, sortedByNewest);
        } else {
            changePage(currentPage - 1);
        }
    }

    useEffect(() => {
        deduplicateMessages(messages);
    }, []);

    return (
        <div className="page-container">
            <h1>Chat</h1>
            {currentPageMessages.length ? (
                <div>
                    <div className="sort-container">
                        <span className="sort-text">Sort by: </span>
                        <button
                            onClick={() => handleSortButton(true)}
                            className="sort-btn"
                            disabled={sortedByNewest}
                        >
                            newest
                        </button>
                        <button
                            onClick={() => handleSortButton(false)}
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
                                handleRemoveMessage={removeMessage}
                            />
                        ))}
                    </ul>

                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        changePage={changePage}
                    />
                </div>
            ) : (
                <h3>Message box is empty</h3>
            )}
        </div>
    );
};

export default MessageList;
