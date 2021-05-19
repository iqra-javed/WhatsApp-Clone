import { Avatar, Button, IconButton } from '@material-ui/core';
import styled from 'styled-components';
import {
  Chat as ChatIcon,
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
} from '@material-ui/icons';
import * as EmailValidator from 'email-validator';
import { auth } from '../firebase';

function Sidebar() {
  const createChat = () => {
    const input = promp(
      'Please enter an email address for the user you wish to chat with'
    );

    if (!input) return null;

    if (EmailValidator.validate(input)) {
      // We need to add the chat into the DB 'chats' collection
    }
  };
  return (
    <Container>
      <Header>
        <UserAvatar onClick={() => auth.signOut()} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder='Search in chats' />
      </Search>

      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      {/* List of Chats */}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 20px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;
  /* &&& increases the priority of the rule over Material UI styles */
  &&& {
    border-bottom: 1px solid whitesmoke;
    border-top: 1px solid whitesmoke;
  }
`;
