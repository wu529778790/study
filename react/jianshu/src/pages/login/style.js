import styled from 'styled-components'

export const LoginWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 56px;
  background: #eee;
  z-index: 0;
`

export const LoginBox = styled.div`
  width: 400px;
  height: 180px;
  margin: 100px auto;
  background: #fff;
  box-shadow: 0 0 8px rgba(0,0,0,.1);
  padding-top: 20px;
`
export const Input = styled.input`
  display: block;
  width: 200px;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  color: #777;
  margin: 10px auto;
`

export const Button = styled.div`
  width: 220px;
  height: 30px;
  line-height: 30px;
  color: #fff;
  background: #3194d0;
  border-radius: 15px;
  margin: 10px auto;
  text-align: center;
`