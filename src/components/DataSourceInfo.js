import React from 'react';

const DataSourceInfo = () => {
  return (
    <div className="data-source-info">
      <h3>중요 안내사항</h3>
      <div className="important-notice">
        <p>- 이 칼로리 계산기는 공식 Subway 계산기가 아니므로 공식 Data와 일치하지 않을 수 있습니다.</p>
        <p>- 매장에서 성분표에 기재된 정량을 주지 않으면 해당 계산기의 Data와 일치하지 않을 수 있습니다.</p>
        <p>- Meat 메뉴의 경우, 한국 서브웨이의 각 상품페이지를 참고하여 작성하였습니다.</p>
        <p>- 한국 성분표에 공개되지 않은 데이터의 경우 호주의 성분표 데이터를 참고하였습니다.</p>
      </div>
      
      <h4>데이터 출처</h4>
      <ul>
        <li><a href="https://www.subway.co.kr/freshInfo" target="_blank" rel="noopener noreferrer">한국 성분표</a></li>
        <li><a href="https://www.subway.com/en-AU/MenuNutrition/Nutrition" target="_blank" rel="noopener noreferrer">호주 성분표 Data</a></li>
      </ul>
      <p className="disclaimer">* 영양 정보는 한국 서브웨이 공식 데이터를 기반으로 하지만, 실제 제품과 차이가 있을 수 있습니다.</p>
      <p className="contact-email">문의 및 제보: <a href="mailto:niceguy6112@gmail.com">niceguy6112@gmail.com</a></p>
    </div>
  );
};

export default DataSourceInfo;