import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MessageList from './messageList';

afterEach(() => {
    cleanup();
});

describe('MessageList Component', () => {
    test('Should render component with empty array', () => {
        render(<MessageList data={[]} />, { wrapper: BrowserRouter });
        expect(screen.getByTestId('page-container')).toBeInTheDocument();
        expect(screen.getByText('Message box is empty')).toBeInTheDocument();
    });

    test('Should render component with list of messages', () => {
        const messages = [
            {
                sentAt: '2012-11-13T17:29:37.003Z',
                uuid: '435453',
                content: '1',
                senderUuid: '2',
            },
            {
                sentAt: '2015-05-22T13:55:10.542Z',
                uuid: '4354353',
                content: '2',
                senderUuid: '2',
            },
        ];
        render(<MessageList data={messages} />, { wrapper: BrowserRouter });
        expect(screen.getByTestId('messages-container')).toBeInTheDocument();
        expect(
            screen.getByTestId(`${messages[0].uuid}-${messages[0].sentAt}`)
        ).toBeInTheDocument();
        expect(
            screen.getByTestId(`${messages[1].uuid}-${messages[1].sentAt}`)
        ).toBeInTheDocument();
    });

    test('Should remove duplicate messages', () => {
        let result;
        const messages = [
            {
                sentAt: '2012-11-13T17:29:37.003Z',
                uuid: '435453',
                content: '1',
                senderUuid: '2',
            },
            {
                sentAt: '2012-11-13T17:29:37.003Z',
                uuid: '435453',
                content: '1',
                senderUuid: '2',
            },
        ];
        render(<MessageList data={messages} onChange={(v) => (result = v)} />, {
            wrapper: BrowserRouter,
        });
        expect(result.length).toEqual(1);
    });

    test('Should sort messages by newest', () => {
        let result;
        const messages = [
            {
                sentAt: '2012-11-13T17:29:37.003Z',
                uuid: '435453',
                content: '1',
                senderUuid: '2',
            },
            {
                sentAt: '2016-02-17T10:13:03.115Z',
                uuid: '937888',
                content: '4',
                senderUuid: '2',
            },
            {
                sentAt: '2015-05-22T13:55:10.542Z',
                uuid: '435411',
                content: '2',
                senderUuid: '2',
            },
        ];
        render(<MessageList data={messages} onChange={(v) => (result = v)} />, {
            wrapper: BrowserRouter,
        });
        expect(result.length).toEqual(3);
        expect(result[0].uuid).toEqual('937888');
        expect(result[1].uuid).toEqual('435411');
        expect(result[2].uuid).toEqual('435453');
    });

    test('Should remove one message', () => {
        let result;
        const messages = [
            {
                sentAt: '2012-11-13T17:29:37.003Z',
                uuid: '435453',
                content: '1',
                senderUuid: '2',
            },
            {
                sentAt: '2015-05-22T13:55:10.542Z',
                uuid: '4354353',
                content: '2',
                senderUuid: '2',
            },
        ];
        render(<MessageList data={messages} onChange={(v) => (result = v)} />, {
            wrapper: BrowserRouter,
        });
        const messageItem = screen.getByTestId(
            `${messages[0].uuid}-${messages[0].sentAt}`
        );
        expect(messageItem).toBeInTheDocument();
        expect(screen.getAllByText('X')[0]).toBeInTheDocument();
        fireEvent.click(screen.getAllByText('X')[0]);
        expect(result.length).toEqual(1);
    });
});
