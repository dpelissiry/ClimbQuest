from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://www.mountainproject.com/route-finder?selectedIds=105708959&type=boulder&diffMinrock=1800&diffMinboulder=20000&diffMinaid=70000&diffMinice=30000&diffMinmixed=50000&diffMaxrock=5500&diffMaxboulder=20050&diffMaxaid=75260&diffMaxice=38500&diffMaxmixed=60000&is_trad_climb=1&is_sport_climb=1&is_top_rope=1&stars=1.8&pitches=0&sort1=popularity+desc&sort2=rating")

# Adjust the XPath based on the actual element you wish to interact with
export_xpath = '//*[@id="body-climb"]/div[7]/div/div[2]/div/div[1]/a[2]'

# Wait for the export link to be clickable and then click it
export = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, export_xpath)))
export.click()

# for v in range(0,17):
#     export = driver.find_element(By.XPATH,'//*[@id="body-climb"]/div[7]/div/div[2]/div/div[1]/a[2]')
#     export.send_keys(Keys.RETURN)
#     break
    # min_grade = driver.find_element(By.XPATH,f'//*[@id="diffMinboulder"]/option[{v}]')
    # max_grade = driver.find_element(By.XPATH,f'//*[@id="diffMaxboulder"]/option[{v}]')
    # search = driver.find_element(By.XPATH,'//*[@id="routeFinderForm"]/table/tbody/tr[6]/td[2]/input')
