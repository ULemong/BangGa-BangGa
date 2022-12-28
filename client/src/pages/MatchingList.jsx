import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from '../utils/api';
import Background from '../components/common/Background';
import Navigators from '../components/common/Navigators';
import Evaluation from '../modals/Evaluation';
import tw from 'tailwind-styled-components';
import Pagination from 'react-js-pagination';
import './CafeList.css';

const MatchingList = () => {
  const [visible, setVisible] = useState(false);
  const [selectedList, setSelectedList] = useState([]);

  const [recruitingList, setRecruitingList] = useState([]);
  const [recruitedList, setRecruitedList] = useState([]);

  const [openTab, setOpenTab] = React.useState(1);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setPage(page);
  };

  const [list, setList] = useState([]);

  // 진행중:참가한 모집글 정보 - 날짜 최신순 정렬
  const getRecruitingData = async () => {
    const data = await get('http://localhost:5002/api/matching-situation/posts');
    console.log('recruitingData', data);
    setRecruitingList(data.reverse());
  };

  // 매칭완료:참가한 모집글 정보 - 날짜 최신순 정렬
  const getRecruitedData = async () => {
    const data = await get('http://localhost:5002/api/matching-situation');
    console.log('recruitedData', data);
    setRecruitedList(data.reverse());
  };

  useEffect(() => {
    getRecruitingData();
  }, []);

  return (
    <Background img={'bg3'}>
      <Navigators />
      <div className=' flex flex-wrap w-[700px] mt-10'>
        <ul className='flex list-none flex-wrap pt-3 px-[15px] flex-row' role='tablist'>
          <li className='-mb-px mr-1 last:mr-0 flex-auto text-center'>
            <a
              className={
                'text-xs font-bold uppercase px-5 pt-3 rounded-t-[10px] block' +
                (openTab === 1 ? 'text-black bg-white pb-3' : 'text-gray-400 bg-white bg-opacity-50 pb-[9px]')
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
                getRecruitingData();
              }}
              data-toggle='tab'
              href='#link1'
              role='tablist'>
              진행중
            </a>
          </li>
          <li className='-mb-px mr-2 last:mr-0 flex-auto text-center'>
            <a
              className={
                'text-xs font-bold uppercase px-5 pt-3 rounded-t-[10px]  block' +
                (openTab === 2 ? 'text-black bg-white pb-3' : 'text-gray-400 bg-white bg-opacity-50 pb-[9px]')
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(2);
                getRecruitedData();
              }}
              data-toggle='tab'
              href='#link2'
              role='tablist'>
              매칭완료
            </a>
          </li>
        </ul>
        {/* className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded' */}
        <div>
          <div className='px-4 flex-auto'>
            <div className='tab-content tab-space'>
              <div className={openTab === 1 ? 'block' : 'hidden'} id='link1'>
                <Container>
                  <table className='w-[700px] text-xl text-left border-collapse'>
                    <thead>
                      <tr className='border-b-2 border-b-gray-300'>
                        <Th>매칭 날짜</Th>
                        <Th>매칭 제목</Th>
                        <Th>게시글 보러가기</Th>
                      </tr>
                    </thead>

                    {recruitingList.length !== 0 ? (
                      recruitingList.map((list) => (
                        <tbody key={list.matching_log_id}>
                          <tr>
                            <Td>{list.createdAt.slice(0, 10).replaceAll('-', '.')}</Td>
                            <Td>{list.title}</Td>
                            <Td>
                              {!list.isEvaluated && (
                                <button
                                  className='text-white bg-blue-500 shadow-lg shadow-blue-500/50 px-[15px] py-[1px] rounded-lg'
                                  onClick={() => {
                                    navigate(`/recruit-detail/${list.matchingPostsId
                                    }`)
                                  }}>
                                  이동
                                </button>
                              )}
                            </Td>
                          </tr>
                        </tbody>
                      ))
                    ) : (
                      <tbody>
                        <tr>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                        </tr>
                        <div>진행 중인 매칭 이력이 없습니다.</div>
                      </tbody>
                    )}
                    <Pagination
                      activePage={page}
                      itemsCountPerPage={5}
                      totalItemsCount={list.length}
                      pageRangeDisplayed={3}
                      prevPageText={'‹'}
                      nextPageText={'›'}
                      onChange={handlePageChange}
                    />
                  </table>
                </Container>
              </div>
              <div className={openTab === 2 ? 'block' : 'hidden'} id='link2'>
                <Container>
                  <table className='w-[700px] text-xl text-left border-collapse'>
                    <thead>
                      <tr className='border-b-2 border-b-gray-300'>
                        <Th>매칭 날짜</Th>
                        <Th>매칭 제목</Th>
                        <Th>평가하기</Th>
                      </tr>
                    </thead>

                    {recruitedList.length !== 0 ? (
                      recruitedList.map((list) => (
                        <tbody key={list.matching_log_id}>
                          <tr>
                            <Td>{list.createdAt.slice(0, 10).replaceAll('-', '.')}</Td>
                            <Td>{list.title}</Td>
                            <Td>
                              {!list.isEvaluated && (
                                <button
                                  className='text-white bg-blue-500 shadow-lg shadow-blue-500/50 px-[15px] py-[1px] rounded-lg'
                                  onClick={() => {
                                    setVisible(!visible);
                                    setSelectedList(list);
                                  }}>
                                  팀원
                                </button>
                              )}
                            </Td>
                          </tr>
                        </tbody>
                      ))
                    ) : (
                      <tbody>
                        <tr>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                        </tr>
                        <div>완료된 매칭 이력이 없습니다.</div>
                      </tbody>
                    )}

                    <Pagination
                      activePage={page}
                      itemsCountPerPage={5}
                      totalItemsCount={list.length}
                      pageRangeDisplayed={3}
                      prevPageText={'‹'}
                      nextPageText={'›'}
                      onChange={handlePageChange}
                    />
                  </table>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
      {visible && <Evaluation selectedList={selectedList} setVisible={setVisible} />}
    </Background>
  );
};

export default MatchingList;

const Container = tw.div`
  w-[800px]
  h-[500px]
  mt-[0.7rem]
  bg-white
  rounded-b-[15px]
  rounded-tr-[15px]
  p-[30px]
  pt-[40px]

  flex
  justify-center
  items-start
`;

const Th = tw.th`
  pb-[8px]
`;

const Td = tw.td`
  p-[8px]
`;
