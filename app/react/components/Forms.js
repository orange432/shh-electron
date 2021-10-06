import styled from '@emotion/styled';

export const Form = styled.form`
  border: 2px solid ${({theme}) => theme.colors.deepPurple};
  max-width: 640px;
  max-width: ${({maxWidth}) => maxWidth};
  width: 100%;
  margin: 10px auto;
`

export const Label = styled.label`
  display: block;
  font-size: 20px;
`

export const Input = styled.input`
  border: none;
  border-bottom: 2px solid ${({theme}) => theme.colors.deepPurple};
  font-size: 20px;
  color: ${({theme}) => theme.colors.deepPurple};
  width: calc(100% - 18px);
  margin: 6px;
`

export const Button = styled.button`
  padding: 8px 15px;
  font-size: 18px;
  background-color: ${({theme})=>theme.colors.treeGreen};
  color: #fff;
`