## Feature: Displaying Deduplicated Chat Messages

Need to develop a new feature.

Given a small dataset of chat messages in a `JSON` file that we need to display
to meet the following specifications:

1. All messages are displayed in a list.
2. Each message has its `content`, `senderUuid`, and `sentAt` properties displayed.
3. Messages are displayed at-most once. If there are duplicated messages, we would like
them to be deduplicated if the `uuid` and `content` are the same.
4. Instead of showing the `sentAt` timestamp, we would like to display a more
human-readable string such as "DayOfTheWeek Month Day, Year at Time".
5. Support sorting by `sentAt` in either ascending or descending order.
6. Support pagination through messages where each page contains 5 messages. 
You are welcome to implement this how you see fit, e.g. infinite scrolling, a button, etc.
7. Allow a message to be deleted.
