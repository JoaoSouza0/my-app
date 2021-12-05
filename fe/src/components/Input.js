import styled from 'styled-components';

export default styled.input`
  width: 100%;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: #fff;
  height: 52px;
  border: 2px solid #fff;
  border-radius: 4px;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  transition: border-color 0.2s ease-in;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};

  }
`;
