import Head from 'next/head';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';
import ChatScreen from '../../components/ChatScreen';
import getRecipientEmail from '../../utils/getRecipientEmail';

function ChatPage({ messages, chat }) {
  const [user] = useAuthState(auth);
  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
}

export default ChatPage;

export async function getServerSideProps(ctx) {
  const ref = db.collection('chats').doc(ctx.query.id);

  const messagesRef = await ref
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get();

  // Prep the messages on the server
  const messages = messagesRef.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      // You will lose your timestamp data type when you send timestamp from the
      // backend to the frontend (i.e. JSON.stringify to JSON.parse).
      // toDate converts a date string to a Date object
      timestamp: messages.timestamp.toDate().getTime(), // getTime will return a unix timestamp
    }));

  // Prep the chats
  const chatRef = await ref.get();
  const chat = {
    id: chatRef.id,
    ...chatRef.data(),
  };

  return {
    props: {
      messages,
      chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow0style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
