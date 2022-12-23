import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyPage from '../pages/MyPage';
import MatchingList from '../pages/MatchingList';
import NotFound from '../pages/NotFound';
import RecruitMap from '../pages/RecruitMap';
import Register from '../pages/Register';
import EditUserInfo from '../pages/Mypage/EditUserInfo';
import CafeList from '../pages/CafeList';
import RecruitList from '../pages/recruit-list/RecruitList';
import RecruitDetail from '../pages/RecruitDetail';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recruit-list' element={<RecruitList />} />
        <Route path='/recruit-map' element={<Home />} />
        <Route path='/recruit-detail' element={<RecruitDetail />} />
        <Route path='/cafelist' element={<CafeList />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/matching-list' element={<MatchingList />} />
        <Route path='/mypage/edit' element={<EditUserInfo />} />
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
