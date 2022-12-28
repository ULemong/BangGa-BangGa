import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import DropdownMenu from './DropdownMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTableList, faMap, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { get } from '../../utils/api';
import { useEffect } from 'react';
import { getCookieValue } from '../../utils/cookie';
import { useState } from 'react';
const Navigators = () => {
  const [myManner, setMyManner] = useState(null);
  const [myTier, setMyTier] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const getUserInfo = async () => {
    try {
      const res = await get('/api/user');
      const { mannerScore, tier, profileImg } = res;
      setMyManner(mannerScore);
      setMyTier(tier);
      setImgUrl(profileImg);
      console.log(profileImg);
    } catch (err) {
      console.log(err);
    }
  };
  const loginToken = getCookieValue('token');

  useEffect(() => {
    {
      loginToken && getUserInfo();
    }
  }, []);

  return (
    <NavContainer>
      <NavMenu />
      {loginToken && (
        <MyStatContainer>
          <MyStat myStat={myTier}>
            <span className='absolute w-12 h-12 left-[-18px] top-[-8px]'>
              <img src={`${process.env.PUBLIC_URL}/images/icon/gold-medal.png`} className='w-full h-full' alt='' />
            </span>
          </MyStat>
          <MyStat myStat={myManner}>
            <span className='absolute w-12 h-12 left-[-14px] top-[-12px] text-[42px]'>
              {myManner > 80 ? ' 🥰' : myManner > 60 ? '😊' : myManner > 40 ? '🙂' : myManner > 20 ? '🥲' : '🙃'}
            </span>
          </MyStat>
          <DropdownMenu imgUrl={imgUrl} />
        </MyStatContainer>
      )}
    </NavContainer>
  );
};

const NavMenu = () => {
  return (
    <div className='ml-[33.33%] w-1/3 flex justify-center '>
      <NavbarBg>
        <NavButtonsContainer>
          <NavLink to='/'>
            <NavBtn className='bg-[#62BFDB]'>
              <FontAwesomeIcon icon={faHouse} />
            </NavBtn>
          </NavLink>
          <NavLink to='/recruit-list'>
            <NavBtn className='bg-yellow-500'>
              <FontAwesomeIcon icon={faTableList} />
            </NavBtn>
          </NavLink>
          <NavLink to='/recruit-map'>
            <NavBtn className='bg-[#FF88AF]'>
              <FontAwesomeIcon icon={faMap} />
            </NavBtn>
          </NavLink>
          <NavLink to='/cafelist'>
            <NavBtn className='bg-[#4497D4]'>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </NavBtn>
          </NavLink>
        </NavButtonsContainer>
      </NavbarBg>
    </div>
  );
};

const NavContainer = tw.div`
  flex w-full h-[12vh]
`;

const NavbarBg = tw.div`
  w-[390px]
  border-t-[85px] 
  border-t-[#242229]
  border-l-[25px] 
  border-r-[25px] 
  border-x-transparent
  rounded-b-[3000px]
  flex
  justify-center
  relative
`;

const NavButtonsContainer = tw.div`
  top-[-70px]
  absolute
  flex
`;

const NavBtn = tw.nav`
  text-white border-white border-2 rounded-md w-14 h-12 text-center mx-3
  flex justify-center items-center text-3xl
`;
const MyStatContainer = tw.div`
  w-1/3 flex justify-end
`;

const MyStat = ({ myStat, children }) => {
  return (
    <div className='w-1/3 flex justify-center items-center'>
      <span className='bg-black w-4/5 h-9 pl-2 relative rounded-full flex justify-center items-center'>
        <span className='text-white text-xl font-extrabold'>{myStat}</span>
        {children}
      </span>
    </div>
  );
};

export default Navigators;
