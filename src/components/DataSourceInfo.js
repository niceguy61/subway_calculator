import React from 'react';

const DataSourceInfo = () => {
  return (
    <div className="data-source-info">
      <h3>중요 안내사항</h3>
      <div className="important-notice">
        <p>이 칼로리 계산기는 공식 서브웨이 계산기가 아니므로 공식 데이터와 일치하지 않을 수 있습니다.</p>
        <p>공식 데이터를 제공해주실 수 있거나 공식 성분표 링크를 아시는 분께선 제보해주시면 업데이트하겠습니다. 감사합니다.</p>
      </div>
      
      <h4>데이터 출처</h4>
      <ul>
        <li><a href="https://www.subway.co.kr/freshInfo" target="_blank" rel="noopener noreferrer">한국 성분표</a></li>
      </ul>
      <p className="disclaimer">* 영양 정보는 한국 서브웨이 공식 데이터를 기반으로 하지만, 실제 제품과 차이가 있을 수 있습니다.</p>
      <p className="contact-email">문의 및 제보: <a href="mailto:niceguy6112@gmail.com">niceguy6112@gmail.com</a></p>
    </div>
  );
};

export default DataSourceInfo;