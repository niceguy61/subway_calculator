import requests
import json
import os
from bs4 import BeautifulSoup
import re
from datetime import datetime
import time
menu_ids = [1533, 1492, 1493, 1535, 1514, 1519, 1528, 1406, 1530, 1515, 1518, 1520, 1401, 1524, 1511, 1521, 1522, 1529, 1526, 1532, 1531, 1469, 1403]

def get_subway_menu_info(menu_id):
    """
    서브웨이 한국 사이트에서 메뉴 정보를 크롤링합니다.
    """
    url = f"https://www.subway.co.kr/menuView/sandwich?menuItemIdx={menu_id}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        response.encoding = 'utf-8'  # 인코딩 설정
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 메뉴 이름 가져오기
        menu_name_element = soup.select_one('h2.name')
        menu_name = menu_name_element.text.strip() if menu_name_element else "Unknown"
        
        # 메뉴 설명 가져오기
        description = ""
        summary_element = soup.select_one('.menu_info .summary')
        if summary_element:
            description = summary_element.text.strip()
        
        # 영양 정보 가져오기
        nutrition_info = {}
        
        # 영양성분표에서 정보 추출
        nutrition_table = soup.select_one('.component_chart table')
        if nutrition_table:
            headers = [th.text.strip() for th in nutrition_table.select('thead th')]
            values = [td.text.strip() for td in nutrition_table.select('tbody td')]
            
            # 괄호 안의 % 제거하고 숫자만 추출
            for i, header in enumerate(headers):
                if i < len(values):
                    value_text = values[i]
                    value_number = re.search(r'\d+(\.\d+)?', value_text)
                    if value_number:
                        nutrition_info[header] = float(value_number.group())
        
        # 영양성분 기본 정보 (위트 브레드, 야채 5종 등)
        nutrition_notes = []
        notice_elements = soup.select('.notice li')
        for element in notice_elements:
            nutrition_notes.append(element.text.strip())
        
        # 썹픽 레시피 정보 가져오기
        subpick_recipes = []
        recipe_elements = soup.select('.recipe li p')
        
        for element in recipe_elements:
            recipe_text = element.text.strip()
            if recipe_text and '야채 5종' not in recipe_text:
                subpick_recipes.append(recipe_text)
        
        # 메뉴 ID에서 고유 ID 생성
        unique_id = menu_name.lower().replace(' ', '_')
        
        print(f"Successfully fetched menu info for {menu_name} (ID: {menu_id})")
        return {
            "id": menu_id,
            "unique_id": unique_id,
            "name": menu_name,
            "description": description,
            "nutrition": nutrition_info,
            "nutrition_notes": nutrition_notes,
            "subpick_recipes": subpick_recipes
        }
    except Exception as e:
        print(f"Error fetching menu info for ID {menu_id}: {e}")
        return None

def update_subway_data(menu_info, data_file_path):
    """
    크롤링한 정보를 기존 subwayData.json 파일에 업데이트합니다.
    """
    # 기존 데이터 로드
    with open(data_file_path, 'r', encoding='utf-8') as f:
        subway_data = json.load(f)
    
    if not menu_info:
        print("No menu information provided.")
        return
    
    # 'recipes' 섹션이 없으면 추가
    if 'recipes' not in subway_data:
        subway_data['recipes'] = []
    
    # 메뉴 이름으로 기존 레시피 검색
    menu_name = menu_info['name']
    existing_recipe = next((recipe for recipe in subway_data.get('recipes', []) 
                           if recipe.get('name') == menu_name), None)
    
    # 영양 정보 매핑
    nutrition_mapping = {
        '열량(kcal)': 'calories',
        '단백질(g)': 'protein',
        '포화지방(g)': 'saturated_fat',
        '당류(g)': 'sugar',
        '나트륨(mg)': 'sodium',
        '탄수화물(g)': 'carbs',
        '지방(g)': 'fat',
        '중량(g)': 'weight'
    }
    
    # 영양 정보 변환
    nutrition = {}
    for kr_key, en_key in nutrition_mapping.items():
        if kr_key in menu_info['nutrition']:
            nutrition[en_key] = menu_info['nutrition'][kr_key]
    
    # 레시피 정보 생성
    recipe_data = {
        "id": menu_info['id'],
        "name": menu_name,
        "description": menu_info.get('description', ''),
        "nutrition": nutrition,
        "subpick_recipes": menu_info['subpick_recipes'],
        "nutrition_notes": menu_info.get('nutrition_notes', [])
    }
    
    # 기존 레시피 업데이트 또는 새 레시피 추가
    if existing_recipe:
        existing_recipe.update(recipe_data)
    else:
        subway_data['recipes'].append(recipe_data)
    
    # meats 섹션에 추가
    if 'meats' in subway_data:
        # 메뉴 이름으로 기존 meat 검색
        existing_meat = next((meat for meat in subway_data.get('meats', []) 
                            if meat.get('name') == menu_name), None)
        
        if not existing_meat:
            # 기본 야채 5종의 영양 성분 합계 계산
            basic_veggies = {
                "calories": 0,
                "carbs": 0,
                "protein": 0,
                "fat": 0,
                "sodium": 0
            }
            
            veggies_to_subtract = ["lettuce", "tomatoes", "cucumbers", "green_peppers", "red_onions"]
            for veggie_id in veggies_to_subtract:
                veggie = next((v for v in subway_data["vegetables"] if v["id"] == veggie_id), None)
                if veggie:
                    basic_veggies["calories"] += veggie.get("calories", 0)
                    basic_veggies["carbs"] += veggie.get("carbs", 0)
                    basic_veggies["protein"] += veggie.get("protein", 0)
                    basic_veggies["fat"] += veggie.get("fat", 0)
                    basic_veggies["sodium"] += veggie.get("sodium", 0)
            
            # 위트 브레드 영양 성분 가져오기
            wheat_bread = next((b for b in subway_data["breads"] if b["id"] == "wheat"), None)
            
            # 영양 정보에서 기본 야채와 브레드 제외
            meat_nutrition = {}
            for key, value in nutrition.items():
                if key in ["calories", "carbs", "protein", "fat", "sodium"]:
                    # 기본 야채 5종 영양 성분 제외
                    if key in basic_veggies:
                        value -= basic_veggies[key]
                    
                    # 위트 브레드 영양 성분 제외
                    if wheat_bread and key in wheat_bread:
                        value -= wheat_bread[key]
                    
                    # 음수 방지
                    meat_nutrition[key] = max(0, value)
                else:
                    meat_nutrition[key] = value
            
            # meat 정보 생성
            meat_data = {
                "id": menu_info.get('unique_id', menu_name.lower().replace(' ', '_')),
                "name": menu_name,
                "description": menu_info.get('description', ''),
                "calories": meat_nutrition.get('calories', 0),
                "carbs": meat_nutrition.get('carbs', 0),
                "protein": meat_nutrition.get('protein', 0),
                "fat": meat_nutrition.get('fat', 0),
                "sodium": meat_nutrition.get('sodium', 0)
            }
            
            # 추가 영양 정보가 있으면 포함
            for key, value in meat_nutrition.items():
                if key not in ["calories", "carbs", "protein", "fat", "sodium"]:
                    meat_data[key] = value
            
            subway_data['meats'].append(meat_data)
            print(f"Added '{menu_name}' to meats section")
    
    # 메타데이터 업데이트
    subway_data['metadata']['lastUpdated'] = datetime.now().strftime('%Y-%m-%d')
    
    # 업데이트된 데이터 저장
    with open(data_file_path, 'w', encoding='utf-8') as f:
        json.dump(subway_data, f, ensure_ascii=False, indent=2)
    
    print(f"Updated subway data with information for {menu_name}")

def process_menu_ids(menu_ids, data_file_path):
    """
    여러 메뉴 ID를 처리하여 subwayData.json을 업데이트합니다.
    """
    for menu_id in menu_ids:
        print(f"Processing menu ID: {menu_id}")
        menu_info = get_subway_menu_info(menu_id)
        if menu_info:
            update_subway_data(menu_info, data_file_path)
        # 서버 부하를 줄이기 위해 요청 간 간격 추가
        time.sleep(1)

def extract_subpick_recipes_from_html(html_content):
    """
    HTML 문자열에서 썹픽 레시피 정보를 추출합니다.
    """
    soup = BeautifulSoup(html_content, 'html.parser')
    
    subpick_recipes = []
    recipe_elements = soup.select('.recipe li p')
    
    for element in recipe_elements:
        recipe_text = element.text.strip()
        if recipe_text and '야채 5종' not in recipe_text:
            subpick_recipes.append(recipe_text)
    
    return subpick_recipes

def update_subpick_recipes(data_file_path):
    """
    수동으로 썹픽 레시피 정보를 업데이트합니다.
    """
    # 기존 데이터 로드
    with open(data_file_path, 'r', encoding='utf-8') as f:
        subway_data = json.load(f)
    
    # 터키 베이컨 에그 슬라이스 레시피 정보 추가
    for recipe in subway_data.get('recipes', []):
        if recipe.get('id') == 1533:  # 터키 베이컨 에그 슬라이스
            recipe['subpick_recipes'] = [
                "위트",
                "터키 3장",
                "베이컨 2장",
                "에그 1개(슬라이스)",
                "모차렐라 치즈",
                "마요네즈",
                "스위트 칠리"
            ]
            print(f"Updated subpick recipes for {recipe['name']}")
        
        elif recipe.get('id') == 1492:  # 터키 베이컨 아보카도
            recipe['subpick_recipes'] = [
                "위트",
                "터키 3장",
                "베이컨 2장",
                "아보카도 1스쿱",
                "모짜렐라 치즈",
                "마요네즈",
                "스위트 어니언"
            ]
            print(f"Updated subpick recipes for {recipe['name']}")
    
    # 업데이트된 데이터 저장
    with open(data_file_path, 'w', encoding='utf-8') as f:
        json.dump(subway_data, f, ensure_ascii=False, indent=2)
    
    print("Successfully updated subpick recipes")

def add_nutrition_notes(data_file_path):
    """
    영양성분 기본 정보를 추가합니다.
    """
    # 기존 데이터 로드
    with open(data_file_path, 'r', encoding='utf-8') as f:
        subway_data = json.load(f)
    
    # 영양성분 기본 정보
    nutrition_notes = [
        "※ 15cm 샌드위치의 영양 정보는 기본 야채 5종(양상추, 토마토, 오이, 피망(파프리카), 양파), 15cm 위트 브레드 및 제품에 따른 미트류가 포함되어 있으며, 치즈와 소스는 제외됩니다.",
        "※ 샐러드의 영양 정보는 기본 야채 5종(양상추, 토마토, 오이, 피망(파프리카), 양파) 및 제품에 따른 미트류가 포함되어 있으며, 치즈와 소스는 제외됩니다.",
        "※ 단, 메뉴명에 '치즈'가 포함되는 경우 치즈의 영양정보도 포함됩니다.",
        "※ 랩의 영양 정보는 치즈와 소스를 포함한 고정 레시피를 기준으로 합니다.",
        "※ 아침메뉴의 영양 정보는 15cm 위트 브레드 및 제품에 따른 미트류, 야채, 아메리칸 치즈가 포함되어 있으며, 소스는 제외됩니다.",
        "※ 영양 정보표에 표시된 제품의 영양 정보/중량은 표준 레시피를 기준으로 하나, 계절의 변화, 공급사의 변화, 원재료의 수급 상황 및 제품 제조시에 발생하는 중량의 차이 등에 따라 실제 제공되는 제품의 영양 정보/중량과 차이가 있을 수 있습니다.",
        "※ 괄호 안 %는 1일 영양소 기준치에 대한 비율입니다."
    ]
    
    # 모든 레시피에 영양성분 기본 정보 추가
    for recipe in subway_data.get('recipes', []):
        if not recipe.get('nutrition_notes'):
            recipe['nutrition_notes'] = nutrition_notes
    
    # 메타데이터에 영양성분 기본 정보 추가
    subway_data['metadata']['nutrition_notes'] = nutrition_notes
    
    # 업데이트된 데이터 저장
    with open(data_file_path, 'w', encoding='utf-8') as f:
        json.dump(subway_data, f, ensure_ascii=False, indent=2)
    
    print("Successfully added nutrition notes")

if __name__ == "__main__":
    data_file_path = os.path.join(os.path.dirname(__file__), "subwayData.json")
    
    # 모든 메뉴 ID에 대해 크롤링 실행
    process_menu_ids(menu_ids, data_file_path)
    
    # 수동으로 썹픽 레시피 정보 업데이트
    update_subpick_recipes(data_file_path)
    
    # 영양성분 기본 정보 추가
    add_nutrition_notes(data_file_path)
    
    print("All updates completed successfully!")