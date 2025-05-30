import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import MenuSelector from './components/MenuSelector';
import NutritionFacts from './components/NutritionFacts';
import StatusBar from './components/StatusBar';
import SizeSelector from './components/SizeSelector';
import DataSourceInfo from './components/DataSourceInfo';
import ShareLink from './components/ShareLink';
import CalorieCounter from './components/CalorieCounter';
import UpdateNotes from './components/UpdateNotes';
import RandomSelector from './components/RandomSelector';
import ResetButton from './components/ResetButton';
import LanguageToggle from './components/LanguageToggle';
import translations from './translations';
import subwayData from './data/subwayData.json';

function App() {
  const [selectedSize, setSelectedSize] = useState(subwayData.sizes[0]); // 기본값 15cm
  const [selectedBread, setSelectedBread] = useState([]);
  const [selectedMeats, setSelectedMeats] = useState([]);
  const [selectedVegetables, setSelectedVegetables] = useState([]);
  const [selectedCheeses, setSelectedCheeses] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [language, setLanguage] = useState('ko'); // 기본 언어: 한국어
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // 각 섹션에 대한 ref 생성
  const sizeRef = useRef(null);
  const breadRef = useRef(null);
  const meatRef = useRef(null);
  const vegetablesRef = useRef(null);
  const cheeseRef = useRef(null);
  const sauceRef = useRef(null);
  
  // 모든 선택된 항목을 하나의 배열로 합침
  const allSelectedItems = [
    ...selectedBread.map(item => ({ ...item, category: 'bread' })),
    ...selectedMeats.map(item => ({ ...item, category: 'meat' })),
    ...selectedVegetables.map(item => ({ ...item, category: 'vegetables' })),
    ...selectedCheeses.map(item => ({ ...item, category: 'cheese' })),
    ...selectedSauces.map(item => ({ ...item, category: 'sauce' }))
  ];

  // URL에서 파라미터 파싱
  useEffect(() => {
    try {
      console.log('URL 파싱 시작:', location.search);
      const params = new URLSearchParams(location.search);
      
      // 초기화 플래그 - 파라미터가 있을 때만 기본값 설정을 건너뛰기 위함
      let hasParams = false;
      
      // 사이즈 파싱
      const sizeId = params.get('size');
      if (sizeId) {
        hasParams = true;
        const size = translatedData.sizes.find(s => s.id === sizeId);
        if (size) setSelectedSize(size);
      }
      
      // 빵 파싱
      const breadId = params.get('bread');
      if (breadId) {
        hasParams = true;
        const bread = translatedData.breads.find(b => b.id === breadId);
        if (bread) setSelectedBread([bread]);
      }
      
      // 메인 재료 파싱
      const meatId = params.get('meat');
      if (meatId) {
        hasParams = true;
        const meat = translatedData.meats.find(m => m.id === meatId);
        if (meat) setSelectedMeats([meat]);
      }
      
      // 채소 파싱 (여러 개 가능)
      const vegIds = params.get('veg');
      if (vegIds) {
        hasParams = true;
        const vegs = vegIds.split(',')
          .map(id => translatedData.vegetables.find(v => v.id === id))
          .filter(Boolean);
        if (vegs.length > 0) setSelectedVegetables(vegs);
      }
      
      // 치즈 파싱
      const cheeseId = params.get('cheese');
      if (cheeseId) {
        hasParams = true;
        console.log('치즈 파싱:', cheeseId);
        const cheese = translatedData.cheeses.find(c => c.id === cheeseId);
        if (cheese) {
          console.log('치즈 찾음:', cheese.name);
          setSelectedCheeses([cheese]);
        }
      } else if (hasParams) {
        // 파라미터가 있지만 치즈가 없는 경우 - 선택 안함으로 설정
        const noCheese = translatedData.cheeses.find(cheese => cheese.id === 'no_cheese');
        if (noCheese) setSelectedCheeses([noCheese]);
      }
      
      // 소스 파싱 (여러 개 가능)
      const sauceIds = params.get('sauce');
      if (sauceIds) {
        hasParams = true;
        console.log('소스 파싱:', sauceIds);
        const sauceIdArray = sauceIds.split(',');
        console.log('소스 ID 배열:', sauceIdArray);
        
        const sauces = sauceIdArray
          .map(id => {
            const sauce = translatedData.sauces.find(s => s.id === id);
            if (sauce) {
              console.log('소스 찾음:', id, sauce.name);
            } else {
              console.log('소스 못 찾음:', id);
            }
            return sauce;
          })
          .filter(Boolean);
          
        console.log('찾은 소스 개수:', sauces.length);
        if (sauces.length > 0) {
          setSelectedSauces(sauces);
        }
      } else if (hasParams) {
        // 파라미터가 있지만 소스가 없는 경우 - 선택 안함으로 설정
        const noSauce = translatedData.sauces.find(sauce => sauce.id === 'no_sauce');
        if (noSauce) setSelectedSauces([noSauce]);
      }
      
      // 파라미터가 없는 경우 초기 로딩 시 기본값 설정
      if (!hasParams) {
        // 치즈 기본값
        const noCheese = translatedData.cheeses.find(cheese => cheese.id === 'no_cheese');
        if (noCheese) setSelectedCheeses([noCheese]);
        
        // 소스 기본값
        const noSauce = translatedData.sauces.find(sauce => sauce.id === 'no_sauce');
        if (noSauce) setSelectedSauces([noSauce]);
      }
    } catch (error) {
      console.error('URL 파싱 오류:', error);
    }
  }, [location.search]);

  // 초기 로딩 시 치즈와 소스에 '선택 안함' 옵션 자동 선택 - URL 파싱에서 처리하므로 비활성화
  /*
  useEffect(() => {
    if (selectedCheeses.length === 0) {
      const noCheese = subwayData.cheeses.find(cheese => cheese.id === 'no_cheese');
      if (noCheese) {
        setSelectedCheeses([noCheese]);
      }
    }
    
    if (selectedSauces.length === 0) {
      const noSauce = subwayData.sauces.find(sauce => sauce.id === 'no_sauce');
      if (noSauce) {
        setSelectedSauces([noSauce]);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  */
  
  // 선택 항목이 변경될 때 URL 업데이트 - 비활성화
  // 이 기능은 ShareLink 컴포넌트에서 처리하도록 변경
  /*
  useEffect(() => {
    // 초기 로딩 시에는 URL 업데이트 건너뛰기
    if (selectedBread.length === 0 && selectedMeats.length === 0) return;
    
    const params = new URLSearchParams();
    
    // 사이즈 추가
    if (selectedSize) {
      params.set('size', selectedSize.id);
    }
    
    // 빵 추가
    if (selectedBread.length > 0) {
      params.set('bread', selectedBread[0].id);
    }
    
    // 메인 재료 추가
    if (selectedMeats.length > 0) {
      params.set('meat', selectedMeats[0].id);
    }
    
    // 채소 추가 (여러 개 가능)
    if (selectedVegetables.length > 0) {
      params.set('veg', selectedVegetables.map(v => v.id).join(','));
    }
    
    // 치즈 추가 (no_cheese가 아닌 경우만)
    if (selectedCheeses.length > 0 && selectedCheeses[0].id !== 'no_cheese') {
      params.set('cheese', selectedCheeses[0].id);
    }
    
    // 소스 추가 (여러 개 가능, no_sauce가 아닌 경우만)
    const filteredSauces = selectedSauces.filter(s => s.id !== 'no_sauce');
    if (filteredSauces.length > 0) {
      params.set('sauce', filteredSauces.map(s => s.id).join(','));
    }
    
    // URL 업데이트 (히스토리 변경 없이)
    navigate(`?${params.toString()}`, { replace: true });
  }, [selectedSize, selectedBread, selectedMeats, selectedVegetables, selectedCheeses, selectedSauces, navigate]);
  */

  // 상태바 클릭 시 해당 섹션으로 스크롤
  const scrollToSection = (section) => {
    const refs = {
      size: sizeRef,
      bread: breadRef,
      meat: meatRef,
      vegetables: vegetablesRef,
      cheese: cheeseRef,
      sauce: sauceRef
    };
    
    if (refs[section] && refs[section].current) {
      refs[section].current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // 상태바에 전달할 선택된 항목들
  const selectedItems = {
    size: [selectedSize],
    bread: selectedBread,
    meat: selectedMeats,
    vegetables: selectedVegetables,
    cheese: selectedCheeses,
    sauce: selectedSauces
  };

  // 현재 언어에 맞는 번역 텍스트 가져오기
  const t = translations[language];
  
  // 언어 전환 핸들러
  const handleLanguageToggle = (lang) => {
    setLanguage(lang);
  };
  
  // 데이터 번역 처리
  const getTranslatedData = () => {
    // 현재 언어에 맞는 번역 데이터 가져오기
    const currentTranslations = translations[language];
    
    // 빵, 치즈, 소스, 야채, 메인 재료 데이터 번역
    const translatedBreads = subwayData.breads.map(bread => ({
      ...bread,
      name: currentTranslations[bread.id] || bread.name
    }));
    
    const translatedCheeses = subwayData.cheeses.map(cheese => ({
      ...cheese,
      name: currentTranslations[cheese.id] || cheese.name
    }));
    
    const translatedSauces = subwayData.sauces.map(sauce => ({
      ...sauce,
      name: currentTranslations[sauce.id] || sauce.name
    }));
    
    const translatedVegetables = subwayData.vegetables.map(vegetable => ({
      ...vegetable,
      name: currentTranslations[vegetable.id] || vegetable.name
    }));
    
    const translatedMeats = subwayData.meats.map(meat => ({
      ...meat,
      name: currentTranslations[meat.id] || meat.name,
      description: currentTranslations[`${meat.id}_desc`] || meat.description
    }));
    
    return {
      ...subwayData,
      breads: translatedBreads,
      cheeses: translatedCheeses,
      sauces: translatedSauces,
      vegetables: translatedVegetables,
      meats: translatedMeats
    };
  };
  
  // 번역된 데이터
  const translatedData = getTranslatedData();
  
  return (
    <div className="App">
      <header className="App-header">
        <img src="/subway-logo.png" alt="Subway Logo" className="logo" />
        <h1>{t.title} (Unofficial)</h1>
        <p>{t.subtitle}</p>
        <LanguageToggle 
          currentLanguage={language} 
          onToggle={handleLanguageToggle} 
        />
      </header>
      
      <div className="status-bar-container">
        <CalorieCounter 
          selectedItems={allSelectedItems} 
          selectedSize={selectedSize}
          translations={{ currentCalories: t.currentCalories }}
        />
        <StatusBar 
          selectedItems={selectedItems} 
          onItemClick={scrollToSection}
          translations={{
            size: t.size,
            bread: t.bread,
            meat: t.meat,
            vegetables: t.vegetables,
            cheese: t.cheese,
            sauce: t.sauce,
            required: t.required,
            selected: t.selected,
            select: t.select
          }}
        />
      </div>
      
      <div className="container">
        <div className="menu-container">
          <div ref={sizeRef} className="menu-selector">
            <SizeSelector 
              sizes={translatedData.sizes}
              selectedSize={selectedSize}
              onChange={setSelectedSize}
              translations={{ sizeSelection: t.sizeSelection }}
            />
          </div>
          
          <div ref={breadRef}>
            <MenuSelector 
              title="bread" 
              items={translatedData.breads} 
              selectedItems={selectedBread} 
              onChange={setSelectedBread} 
            />
          </div>
          
          <div ref={meatRef}>
            <MenuSelector 
              title="meat" 
              items={translatedData.meats} 
              selectedItems={selectedMeats} 
              onChange={setSelectedMeats} 
            />
          </div>
          
          <div ref={vegetablesRef}>
            <MenuSelector 
              title="vegetables" 
              items={translatedData.vegetables} 
              selectedItems={selectedVegetables} 
              onChange={setSelectedVegetables} 
            />
          </div>
          
          <div ref={cheeseRef}>
            <MenuSelector 
              title="cheese" 
              items={translatedData.cheeses} 
              selectedItems={selectedCheeses} 
              onChange={setSelectedCheeses} 
            />
          </div>
          
          <div ref={sauceRef}>
            <MenuSelector 
              title="sauce" 
              items={translatedData.sauces} 
              selectedItems={selectedSauces} 
              onChange={setSelectedSauces} 
            />
          </div>
          
          <UpdateNotes 
            translations={{
              language: language,
              updateNotes: t.updateNotes,
              showUpdateNotes: t.showUpdateNotes,
              hideUpdateNotes: t.hideUpdateNotes,
              updateNote1_1: t.updateNote1_1,
              updateNote1_2: t.updateNote1_2,
              updateNote1_3: t.updateNote1_3,
              updateNote1_4: t.updateNote1_4,
              updateNote1_5: t.updateNote1_5,
              updateNote1_6: t.updateNote1_6,
              updateNote1_7: t.updateNote1_7,
              updateNote0_1: t.updateNote0_1,
              updateNote0_2: t.updateNote0_2
            }}
          />
          <DataSourceInfo 
            translations={{
              language: language,
              importantNotice: t.importantNotice,
              dataSource: t.dataSource,
              disclaimer: t.disclaimer,
              contact: t.contact,
              importantNotice1: t.importantNotice1,
              importantNotice2: t.importantNotice2,
              importantNotice3: t.importantNotice3,
              importantNotice4: t.importantNotice4
            }}
          />
        </div>
        
        <div className="nutrition-container">
          <NutritionFacts 
            selectedItems={allSelectedItems} 
            selectedSize={selectedSize}
            translations={{
              nutritionFacts: t.nutritionFacts,
              calories: t.calories,
              carbs: t.carbs,
              protein: t.protein,
              fat: t.fat,
              sodium: t.sodium,
              nutrient: t.nutrient,
              amount: t.amount,
              sizeInfo: t.sizeInfo
            }}
          />
          
          <div className="selected-items">
            <h3>{t.selectedItems}</h3>
            <ul>
              <li className="category">
                <span className="category-name">{t.size}:</span> {selectedSize.name}
              </li>
              {selectedBread.length > 0 && (
                <li className="category">
                  <span className="category-name">{t.bread}:</span> {selectedBread[0].name}
                </li>
              )}
              {selectedMeats.length > 0 && (
                <li className="category">
                  <span className="category-name">{t.meat}:</span> {selectedMeats[0].name}
                </li>
              )}
              {selectedVegetables.length > 0 && (
                <li className="category">
                  <span className="category-name">{t.vegetables}:</span> 
                  {selectedVegetables.map(item => item.name).join(', ')}
                </li>
              )}
              {selectedCheeses.length > 0 && selectedCheeses[0].id !== 'no_cheese' && (
                <li className="category">
                  <span className="category-name">{t.cheese}:</span> {selectedCheeses[0].name}
                </li>
              )}
              {selectedSauces.length > 0 && selectedSauces[0].id !== 'no_sauce' && (
                <li className="category">
                  <span className="category-name">{t.sauce}:</span> 
                  {selectedSauces.map(item => item.id !== 'no_sauce' ? item.name : '').filter(Boolean).join(', ')}
                </li>
              )}
            </ul>
          </div>
          
          <ShareLink 
            selectedItems={selectedItems} 
            selectedSize={selectedSize}
            buttonText={t.shareButton}
            copiedText={t.linkCopied}
          />
          
          <div className="button-group">
            <RandomSelector 
              subwayData={translatedData} 
              onRandomSelect={(randomItems) => {
                setSelectedSize(randomItems.size);
                setSelectedBread(randomItems.bread);
                setSelectedMeats(randomItems.meat);
                setSelectedVegetables(randomItems.vegetables);
                setSelectedCheeses(randomItems.cheese);
                setSelectedSauces(randomItems.sauce);
                
                // 첫 번째 섹션으로 스크롤
                if (sizeRef.current) {
                  sizeRef.current.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
              buttonText={t.randomButton}
            />
            
            <ResetButton 
              onReset={() => {
                // 기본값으로 초기화
                setSelectedSize(subwayData.sizes[0]); // 15cm
                setSelectedBread([]);
                setSelectedMeats([]);
                setSelectedVegetables([]);
                
                // 치즈와 소스는 '선택 안함' 옵션으로 설정
                const noCheese = translatedData.cheeses.find(cheese => cheese.id === 'no_cheese');
                if (noCheese) setSelectedCheeses([noCheese]);
                
                const noSauce = translatedData.sauces.find(sauce => sauce.id === 'no_sauce');
                if (noSauce) setSelectedSauces([noSauce]);
                
                // 첫 번째 섹션으로 스크롤
                if (sizeRef.current) {
                  sizeRef.current.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
              buttonText={t.resetButton}
            />
          </div>
        </div>
      </div>
      
      <footer className="App-footer">
        <div className="footer-content">
          <div className="contact-info">
            <p>{language === 'ko' ? '문의' : 'Contact'}: <a href="mailto:niceguy6112@gmail.com">niceguy6112@gmail.com</a></p>
            <p><a href="https://github.com/niceguy61/subway_calculator" target="_blank" rel="noopener noreferrer">GitHub</a></p>
          </div>
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} {language === 'ko' ? '서브웨이 칼로리 계산기' : 'Subway Calorie Calculator'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;