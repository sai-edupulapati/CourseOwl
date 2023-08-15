from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import shutil
import time
import os

import shutil

import time

import requests
import io
import subprocess

import pandas as pd

from webdriver_manager.chrome import ChromeDriverManager
driver = webdriver.Chrome()

from pymongo import MongoClient

# Set up MongoDB Atlas connection
# Replace placeholders with your MongoDB Atlas connection details
mongo_uri = "mongodb+srv://courseowl241:kmwouENhxx3iJPUi@cluster0.jtihfjn.mongodb.net/"
client = MongoClient(mongo_uri)
db = client["Schedule_Data"]
collection = db["Course_Data"]

# Path to your ChromeDriver executable
#webdriver_path = '/Users/kushagragovil/Downloads/chromedriver' 

# URL of the webpage with the export button
url = 'https://timetable.mypurdue.purdue.edu/Timetabling/gwt.jsp?page=classes#name=AAE&term=Fall2023PWL'

# Path to save the downloaded CSV file
csv_path = '/Users/kushagragovil/Desktop'

# Set up Chrome options
#chrome_options = webdriver.ChromeOptions()
#chrome_options.add_argument('--headless')  # Run in headless mode without opening a browser window

# Create a new ChromeDriver service
#service = Service(webdriver_path)

# Create a new instance of the Chrome driver
#driver = webdriver.Chrome(service=service, options=chrome_options)

try:
    # Open the webpage
    driver.get(url)

    print("hello")

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

    # Wait for the "Export" button to be clickable
    export_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, '/html/body/span[3]/span/span[2]/span[1]/span[3]/span[2]/div/table/tbody/tr[2]/td/div/div[2]/span/button[3]'))
    )

    print("wefweg")

    # Click the "Export" button
    export_button.click()

    time.sleep(15)

    # Wait for the "Export CSV" button to be clickable
    export_csv_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, '//td[contains(text(), "Export CSV")]'))
    )

    print("hewe")

    # Click the "Export CSV" button
    export_csv_button.click()


    # Get the current URL (CSV download link)
    csv_url = driver.current_url

    print("hoho")


    # Use subprocess to call the mongoimport command
    subprocess.run([
        'mongoimport',
        '--uri', mongo_uri,
        '--collection', 'Course_Data',  # Collection name in MongoDB
        '--type', 'csv',
        '--file', csv_url,
        '--headerline'
    ])
    

finally:
    # Quit the browser
    driver.quit()
