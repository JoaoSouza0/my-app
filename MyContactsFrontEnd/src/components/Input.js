import styled, { css } from 'styled-components';

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
  appearance: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
  `}

   &[disabled]{
    background-color:  ${({ theme }) => theme.colors.gray[100]} ;
    border-color: ${({ theme }) => theme.colors.gray[200]};
  }
`;
