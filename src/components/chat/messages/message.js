import React from 'react';
import './message.css';

const Message = ({ message }) => {
    const options = {
        weekday: 'short',
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: 'numeric',
        minute: 'numeric'
    }

    return (
        <li className="message-item">
            <div className="message-icon" />
            <div className="message-info">
                <div className="message-sender">{message.senderUuid},</div>
                <div className="message-date">
                    {new Date(message.sentAt).toLocaleDateString("en-US", options)}
                </div>
                <div className="message-content">{message.content}</div>
            </div>
        </li>
    );
};

export default Message;
