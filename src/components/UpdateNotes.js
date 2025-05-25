import React, { useState } from 'react';
import './UpdateNotes.css';

const UpdateNotes = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotes = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="update-notes-container">
      <button className="update-notes-button" onClick={toggleNotes}>
        {isOpen ? '업데이트 노트 닫기' : '업데이트 노트 보기'}
      </button>
      
      {isOpen && (
        <div className="update-notes-content">
          <h3>업데이트 노트</h3>
          <div className="update-note">
            <div className="update-version">v1.0.1</div>
            <div className="update-date">2025-05-25</div>
            <ul className="update-items">
              <li>공유 기능 추가</li>
              <li>서브웨이 코리아 기준 성분 데이터 적용 (크롤링 후 AI 계산)</li>
              <li>상단바에 실시간 입력한 칼로리 정보 기록</li>
              <li>Meat에 마우스 올리면 description 정보 표기됨</li>
            </ul>
          </div>
          <div className="update-note">
            <div className="update-version">v1.0</div>
            <div className="update-date">2025-05-23</div>
            <ul className="update-items">
              <li>서비스 시작</li>
              <li>사이즈 추가</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateNotes;