import React from 'react';
import tw from 'tailwind-styled-components';

const Withdraw = ({ setShowWithdraw }) => {
  return (
    <WithdrawModal>
      <div className='w-[90%] h-[90%] mx-auto my-auto flex flex-col text-center'>
        <div className='text-2xl relative'>
          <span className='text-yellow-500'>⚠️</span>
          주의하세요
          <span className='text-yellow-500'>⚠️</span>
          <button className='absolute left-full top-[-80%]' onClick={() => setShowWithdraw(false)}>
            x
          </button>
        </div>
        <div>탈퇴시 삭제/유지되는 정보를 확인하세요!</div>
        <div>한 번 삭제된 정보는 복구가 불가능합니다.</div>
        <div className='border border-black w-3/4 mx-auto mt-4' id='withDrawInfo'>
          <div>계정 및 프로필 정보 삭제</div>
          <div> 내 매칭 이력 삭제</div>
          <div> 매너지수, 탈출레벨 삭제</div>
          <div> 크루원 모집글 및 댓글 유지</div>
          <div> 팀원 한 줄 평 유지</div>
        </div>
        <div>
          <div className='text-lg'>비밀번호 입력</div>
          <input type='password' className='pl-2 border border-black w-3/5 rounded' />
        </div>
        <div>
          <div className='text-lg'>탈퇴 사유(선택)</div>
          <select className='border border-black w-3/5 rounded'>
            <option value=''>자주 사용하지 않음</option>
            <option value=''>서비스 장애와 오류 때문에</option>
            <option value=''>탈퇴후 신규 가입을 위해</option>
            <option value=''>직접입력</option>
          </select>
        </div>
        <WithdrawBtn>탈퇴하기</WithdrawBtn>
      </div>
    </WithdrawModal>
  );
};

const WithdrawModal = tw.div`
  flex
  rounded-xl border border-black   w-[26%] h-[55%]
  bg-[#F2F2F2]
  absolute left-[37%] top-[30%]


`;

const WithdrawBtn = tw.button`
  w-3/5 text-center py-3 mx-auto bg-[#D3C7F6] mt-3 rounded-lg
`;

export default Withdraw;
