import React from 'react';

const DataSourceInfo = ({ translations }) => {
  // 현재 언어 확인
  const language = translations?.language || 'ko';
  
  // 번역 텍스트 또는 기본값 사용
  const t = {
    importantNotice: translations?.importantNotice || '중요 안내사항',
    dataSource: translations?.dataSource || '데이터 출처',
    disclaimer: translations?.disclaimer || '* 영양 정보는 한국 서브웨이 공식 데이터를 기반으로 하지만, 실제 제품과 차이가 있을 수 있습니다.',
    contact: translations?.contact || '문의 및 제보:'
  };

  return (
    <div className="data-source-info">
      <h3>{t.importantNotice}</h3>
      <div className="important-notice">
        <p>- {translations?.importantNotice1 || '이 칼로리 계산기는 공식 Subway 계산기가 아니므로 공식 Data와 일치하지 않을 수 있습니다.'}</p>
        <p>- {translations?.importantNotice2 || '매장에서 성분표에 기재된 정량을 주지 않으면 해당 계산기의 Data와 일치하지 않을 수 있습니다.'}</p>
        <p>- {translations?.importantNotice3 || 'Meat 메뉴의 경우, 한국 서브웨이의 각 상품페이지를 참고하여 작성하였습니다.'}</p>
        <p>- {translations?.importantNotice4 || '한국 성분표에 공개되지 않은 데이터의 경우 호주의 성분표 데이터를 참고하였습니다.'}</p>
      </div>
      
      <h4>{t.dataSource}</h4>
      <ul>
        <li><a href="https://www.subway.co.kr/freshInfo" target="_blank" rel="noopener noreferrer">{language === 'ko' ? '한국 성분표' : 'Korean Nutrition Info'}</a></li>
        <li><a href="https://www.subway.com/en-AU/MenuNutrition/Nutrition" target="_blank" rel="noopener noreferrer">{language === 'ko' ? '호주 성분표 Data' : 'Australian Nutrition Data'}</a></li>
      </ul>
      <p className="disclaimer">{t.disclaimer}</p>
      <p className="contact-email">{t.contact} <a href="mailto:niceguy6112@gmail.com">niceguy6112@gmail.com</a></p>
    </div>
  );
};

export default DataSourceInfo;