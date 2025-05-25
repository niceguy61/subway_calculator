import React, { useState } from 'react';
import './UpdateNotes.css';

const UpdateNotes = ({ translations }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotes = () => {
    setIsOpen(!isOpen);
  };

  // 현재 언어 확인
  const language = translations?.language || 'ko';
  
  // 번역 텍스트 또는 기본값 사용
  const t = {
    updateNotes: translations?.updateNotes || '업데이트 노트',
    showUpdateNotes: translations?.showUpdateNotes || '업데이트 노트 보기',
    hideUpdateNotes: translations?.hideUpdateNotes || '업데이트 노트 닫기'
  };

  return (
    <div className="update-notes-container">
      <button className="update-notes-button" onClick={toggleNotes}>
        {isOpen ? t.hideUpdateNotes : t.showUpdateNotes}
      </button>
      
      {isOpen && (
        <div className="update-notes-content">
          <h3>{t.updateNotes}</h3>
          <div className="update-note">
            <div className="update-version">v1.0.1</div>
            <div className="update-date">{translations?.language === 'en' ? 'May 25, 2025' : '2025-05-25'}</div>
            <ul className="update-items">
              <li>{translations?.updateNote1_1 || '공유 기능 추가'}</li>
              <li>{translations?.updateNote1_2 || '서브웨이 코리아 기준 성분 데이터 적용 (크롤링 후 AI 계산)'}</li>
              <li>{translations?.updateNote1_3 || '상단바에 실시간 입력한 칼로리 정보 기록'}</li>
              <li>{translations?.updateNote1_4 || 'Meat에 마우스 올리면 description 정보 표기됨'}</li>
              <li>{translations?.updateNote1_5 || '한국어/영어 언어 전환 기능 추가'}</li>
              <li>{translations?.updateNote1_6 || '랜덤 조합 생성 기능 추가'}</li>
              <li>{translations?.updateNote1_7 || '모든 선택 초기화 기능 추가'}</li>
            </ul>
          </div>
          <div className="update-note">
            <div className="update-version">v1.0</div>
            <div className="update-date">{translations?.language === 'en' ? 'May 23, 2025' : '2025-05-23'}</div>
            <ul className="update-items">
              <li>{translations?.updateNote0_1 || '서비스 시작'}</li>
              <li>{translations?.updateNote0_2 || '사이즈 추가'}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateNotes;