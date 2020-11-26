import React from 'react';
import './message.css';

const Message = ({ message }) => {
    return (
        <li className="message-item">
            <div className="message-icon" />
            <div className="message-info">
                <div className="message-sender">{message.senderUuid},</div>
                <div className="message-date">{message.sentAt}</div>
                <div className="message-content">{message.content}</div>
            </div>
        </li>
    );
};

export default Message;
