import React, { useState } from 'react';
// import tw from 'tailwind-styled-components';

import Modal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { showRegisterProfileAtom, showAddProfileIconAtom, profileImgAtom } from '../recoil/register';
const RegisterProfile = () => {
  const userRadioInputData = [
    { name: '성별', options: ['남자', '여자'] },
    { name: '나이', options: ['10대', '20대', '30대 이상'] },
    { name: '선호 지역', options: ['강남', '건대', '홍대'] },
  ];
  const userSelectInputData = [
    {
      name: 'MBTI',
      options: [
        '선택',
        'ISTJ',
        'ISFJ',
        'INFJ',
        'INTJ',
        'ISTP',
        'ISFP',
        'INFP',
        'INTP',
        'ESTP',
        'ESFP',
        'ENFP',
        'ENTP',
        'ESTJ',
        'ESFJ',
        'ENFJ',
        'ENTJ',
      ],
    },
    {
      name: '선호 테마',
      options: [
        '없음',
        '추리',
        '미스테리',
        '공포',
        '판타지',
        'SF',
        '모험',
        '로맨스',
        '드라마',
        '감성',
        '범죄',
        '스릴러',
        '액션',
        '19금',
      ],
    },
    {
      name: '비선호 테마',
      options: [
        '없음',
        '추리',
        '미스테리',
        '공포',
        '판타지',
        'SF',
        '모험',
        '로맨스',
        '드라마',
        '감성',
        '범죄',
        '스릴러',
        '액션',
        '19금',
      ],
    },
  ];
  const setShowRegisterProfile = useSetRecoilState(showRegisterProfileAtom);
  const [showAddProfileIcon, setShowAddProfileIcon] = useRecoilState(showAddProfileIconAtom);
  const [profileImg, setProfileImg] = useRecoilState(profileImgAtom);
  const [tempProfileImg, setTempProfileImg] = useState(null);
  const navigate = useNavigate();
  const onCancelBtn = () => {
    setShowRegisterProfile(false);
  };

  const onCompleteBtn = () => {
    setShowRegisterProfile(false);
    navigate('/login');
  };

  const onChangeProfileImg = (e) => {
    setTempProfileImg(e.target.files[0]);
  };

  const onSubmitProfileImg = (e) => {
    e.preventDefault();
    setProfileImg(tempProfileImg);
    setShowAddProfileIcon(false);
  };
  const onCancelProfileImg = (e) => {
    e.preventDefault();
    setShowAddProfileIcon(false);
  };

  const modalStyle = {
    content: {
      top: '35%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '20%', // specify desired width
      height: '60%', // specify desired height
    },
  };

  return (
    <div
      className='mx-auto h-[90%] w-[104%] 
      border border-black border-[1px] rounded-[30px]
      flex flex-col 
      absolute 
      left-[-2%]
      bg-[#F2F2F2]
  '>
      <div className='mt-[5%] mx-auto  flex  relative'>
        <div className='w-[120px] h-[120px] rounded-full bg-black'>
          {profileImg && (
            <img className='w-full h-full rounded-full' src={URL.createObjectURL(profileImg)} alt='uploaded image' />
          )}
        </div>

        <div className='absolute w-10 h-10  top-0 left-[90%]'>
          <button onClick={() => setShowAddProfileIcon(true)}>
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
        <Modal style={modalStyle} isOpen={showAddProfileIcon} onRequestClose={() => setShowAddProfileIcon(false)}>
          <h2>프로필 사진을 업로드하세요</h2>
          {tempProfileImg && (
            <img className='rounded-full' src={URL.createObjectURL(tempProfileImg)} alt='uploaded image' />
          )}
          <form onSubmit={onSubmitProfileImg}>
            <input type='file' onChange={onChangeProfileImg} />
            <div className='w-full flex justify-between'>
              <button className='ml-auto border border-black' type='submit'>
                저장하기
              </button>
              <button className='ml-2 border border-black' onClick={onCancelProfileImg}>
                취소하기
              </button>
            </div>
          </form>
        </Modal>
      </div>
      <div className='mx-auto mt-[1%]'>닉네임</div>
      <div className='mx-auto mt-[1%] w-full text-center'>
        <input className='border rounded-full pl-[5%] w-4/5' type='text' placeholder='한 줄 소개' />
      </div>
      {userRadioInputData.map((inputData) => (
        <RadioInputBox inputData={inputData} key={inputData.name} />
      ))}
      {userSelectInputData.map((inputData) => (
        <SelectInputBox inputData={inputData} key={inputData.name} />
      ))}
      <div className='BtnBox w-[90%] mx-auto flex'>
        <div className='ml-auto mt-4'>
          <button className='px-4 py-2 bg-[#E5E5E5] rounded-lg mr-2 shadow-xl' onClick={onCancelBtn}>
            취소
          </button>
          <button className='px-4 py-2 bg-[#BCE3FF] rounded-lg shadow-xl' onClick={onCompleteBtn}>
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

const RadioInputBox = ({ inputData }) => (
  <div className='mx-[5%] w-[90%] h-10 border-b border-black flex'>
    <div className='w-1/5 flex items-center'>{inputData.name}</div>
    <div className='ml-auto w-4/5 flex items-center'>
      {inputData.options.map((option) => (
        <div className='ml-2 text-center' key={inputData.name + option}>
          <label>{option}</label>
          <input type='radio' name={inputData.name} />
        </div>
      ))}
    </div>
  </div>
);

const SelectInputBox = ({ inputData }) => (
  <div className='mx-[5%] w-[90%] h-10 border-b border-black flex'>
    <div className='w-1/5 flex items-center'>{inputData.name}</div>
    <div className='ml-auto w-4/5 flex items-center'>
      <select className='border border-black' name='' id=''>
        {inputData.options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  </div>
);

export default RegisterProfile;
