import React, { useEffect, useState } from 'react';
import './messageList.css';
import { messages } from '../../data.json';
import Message from './message';

const MessageList = () => {
    const amountOfMessagesOnThePage = 5;
    const [sortedMessages, setSortedMessages] = useState([]);
    const [currentPageMessages, setCurrentPageMessages] = useState([]);

    function deduplicateMessages(messages) {
        let uniqueMessages = messages.filter(
            (msg, index, self) =>
                index === self.findIndex(
                    (el) => el.uuid === msg.uuid && el.content === msg.content
                )
        );
        sortMessagesByDate(uniqueMessages);
    }

    function sortMessagesByDate(messages) {
        // TODO need to sort messages by `sentAt` by default in ascending order
        setSortedMessages([...messages]);
        selectMessagesForCurrentPage(1, messages);
    }

    function selectMessagesForCurrentPage(page, messages) {
        let curMessages = messages.slice(page - 1, amountOfMessagesOnThePage);
        setCurrentPageMessages(curMessages);
    }

    useEffect(() => {
        deduplicateMessages(messages);
    }, []);

    return (
        <>
            <h1>Chat</h1>
            {currentPageMessages ? (
                <ul className="messages-container">
                    {currentPageMessages.map((message) => (
                        <Message
                            key={`${message.uuid}-${message.sentAt}`}
                            message={message}
                        />
                    ))}
                </ul>
            ) : (
                <h3>Message box is empty</h3>
            )}
        </>
    );
};

export default MessageList;
