import React from 'react';
import './message.css';

const Message = ({ message, handleRemoveMessage }) => {
    const options = {
        weekday: 'short',
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: 'numeric',
        minute: 'numeric'
    }

    return (
        <li className="message-item" data-testid={`${message.uuid}-${message.sentAt}`}>
            <div className="message-icon" />
            <div className="message-info">
                <div className="message-sender">{message.senderUuid},</div>
                <div className="message-date">
                    {new Date(message.sentAt).toLocaleDateString("en-US", options)}
                </div>
                <div className="message-content">{message.content}</div>
            </div>
            <button className='message-delete-btn' onClick={() => handleRemoveMessage(message)}>X</button>
        </li>
    );
};

export default Message;
