import React from 'react';
import { useState } from 'react';
import tw from 'tailwind-styled-components';
import Celebrate from '../modals/Celebrate';

const Login = () => {
  const inputDatas = [
    { name: '이름', placeHolder: '김탈출' },
    { name: '휴대전화 번호', placeHolder: '010-1234-5678' },
    { name: '이메일', placeHolder: 'example@escape.elice' },
    { name: '비밀번호', placeHolder: '영문, 숫자, 특수문자 조합 최소 8자' },
    { name: '비밀번호 확인', placeHolder: '비밀번호를 다시 한번 입력해주세요' },
  ];
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <BackGround style={{ backgroundImage: 'url(/images/bg1.png)' }}>
      <Title>로그인</Title>
      <InputContainer>
        {showModal ? <Celebrate setShowModal={setShowModal} /> : null}

        <InnnerContainer>
          {inputDatas.map((inputData) => (
            <InputBox key={inputData.name} inputData={inputData} />
          ))}
          <RegisterBtn onClick={handleClick}>가입하기</RegisterBtn>
        </InnnerContainer>
      </InputContainer>
    </BackGround>
  );
};

const InputBox = ({ inputData }) => {
  return (
    <div className='w-4/5'>
      <div className='mr-auto'>{inputData.name}</div>
      <input
        className='w-full border border-black rounded pl-2 h-10  mb-[2%]'
        type='text'
        placeholder={inputData.placeHolder}
      />
    </div>
  );
};

const BackGround = tw.div`
  w-screen h-screen flex justify-center items-center flex-col
`;
const Title = tw.div`
  mx-auto 
  mt-auto 
  mb-4 
  text-3xl 
  bg-[#3F51A2] 
  text-white 
  border 
  border-white 
  border-[6px] 
  rounded-[24px]
  w-[150px]
  h-[60px]
  flex
  justify-center
  items-center
`;
const InputContainer = tw.div`
  rounded-[80px] w-[30%] h-3/5 mx-auto mb-auto bg-gradient-to-r from-cyan-200 to-blue-300   
  border 
  border-[#4497D4] 
  border-[6px] 
  relative
`;
const InnnerContainer = tw.div`
  w-[80%] h-[84%] flex flex-col justify-center items-center mx-auto mt-[10%]
`;
const RegisterBtn = tw.button`
 bg-white w-1/2 mt-auto rounded-[18px]   
 text-2xl
 text-[#3F51A2]
 border 
 border-[#3F51A2]
 border-[6px] 
`;
export default Login;