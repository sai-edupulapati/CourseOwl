import os
import time
import shutil
import pandas as pd
from pymongo import MongoClient
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

# Initialize the ChromeDriver
driver = webdriver.Chrome()

# MongoDB setup
mongo_uri = "mongodb+srv://courseowl241:kmwouENhxx3iJPUi@cluster0.jtihfjn.mongodb.net/"
client = MongoClient(mongo_uri)
db = client["Schedule_Data"]
collection = db["Course_Data"]

# Function to process a URL
def process_url(url):
    try:
        # Open the webpage
        driver.get(url)
        
        time.sleep(15)
        
        more_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, '/html/body/span[3]/span/span[2]/span[1]/span[3]/span[2]/div/table/tbody/tr[2]/td/div/div[2]/span/button[4]'))
        )
        
        more_button.click()
        
        time.sleep(10)
        
        note_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div/div/table/tbody/tr[2]/td'))
        )
        
        note_button.click()
        
        time.sleep(10)
        
        more_button.click()
        
        time.sleep(5)
        
        enrol_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div/div/table/tbody/tr[8]/td'))
        )
        
        enrol_button.click()
        
        time.sleep(10)
        
        export_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, '/html/body/span[3]/span/span[2]/span[1]/span[3]/span[2]/div/table/tbody/tr[2]/td/div/div[2]/span/button[3]'))
        )
        
        export_button.click()
        
        export_csv_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, '//td[contains(text(), "Export CSV")]'))
        )
        
        export_csv_button.click()
        
        time.sleep(15)
        source = '/Users/kushagragovil/Downloads/events.csv'
        
        df = pd.read_csv(source)
        data = df.to_dict(orient='records')
        collection.insert_many(data)
        os.remove(source)
        
        print('CSV data uploaded to MongoDB Atlas and local file deleted successfully!')
    
    finally:
        # Quit the browser
        driver.quit()

# List of URLs to process
urls = [
    'https://timetable.mypurdue.purdue.edu/Timetabling/gwt.jsp?page=classes#name=AAE&term=Fall2023PWL',
    'https://example.com',  # Replace with the second URL
    'https://example.net'   # Replace with the third URL
]

for url in urls:
    process_url(url)
    print(f'Processing of URL {url} completed')

print('All URLs processed successfully!')
