import styled from "@emotion/styled";

export const Message = styled.div`
  background: ${({theme}) => theme.colors.primary};
  
  p{
    font-size: 12px;
    text-align: justify;
    color: #fff;
  }

  em{
    display: inline-block;
    border-radius: 40px;
    background: ${({theme})=>theme.colors.tertiary};
    color: #fff;
    font-weight: 700;
    font-size: 14px;
  }
`;