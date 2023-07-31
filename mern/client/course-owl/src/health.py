import requests
from bs4 import BeautifulSoup
import itertools
import csv
rootHealth = "https://hhs.purdue.edu/about-hhs/directory/?staff_faculty_type=Faculty&pg="
linkHealth = "https://hhs.purdue.edu/directory/"

emailBase = "@purdue.edu"

def storingIntoCsv(root) :
    info = gettingAllTeachersInfo(root)
    with open('professorHealthInfo.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerows(info)


def gettingAllTeachersInfo(root) :
    allTeacherLinks = addAlphabet(root)
    infoCollected = [gettingInfoFromEachTeacherLink(x) for x in allTeacherLinks]
    return infoCollected

def gettingInfoFromEachTeacherLink(singleTeacherLink) :
    result = requests.get(singleTeacherLink)
    content = result.text
    soup = BeautifulSoup(content, 'html.parser')
    try : 
        rawName = soup.find('h1', {'class': 'name'}).getText()
        nameOfTeacher = " ".join(rawName.split()).lower().title()
    except : 
        nameOfTeacher = ""
    try :
        rawTitle =  soup.find('p', {'class': 'title'})
        text = list(rawTitle.stripped_strings)
        titleOfTeacher = "; ".join(text)
    except :
        titleOfTeacher = ""
    try :
        emailPara = soup.find('p', {'class': 'email'})
        email = emailPara.find('a').getText()
    except :
        email=""
    try :
        imageDiv = soup.find('div',{'class' : 'column is-3 personal-info'})
        imageLink = imageDiv.find('img')["data-src"]        
    except :
        imageLink = ""
    return [nameOfTeacher, titleOfTeacher, email, imageLink]

def addAlphabet(root) :
    rootPlusAlphabet= [root+str(i) for i in range(1,15)]
    finalLinksNeeded = [getLinksFromPage(i) for i in rootPlusAlphabet]
    combined = list(itertools.chain.from_iterable(finalLinksNeeded))
    return combined    

def getLinksFromPage(root):
    result = requests.get(root)
    content = result.text
    soup = BeautifulSoup(content, 'html.parser')
    allLinks = soup.select('a')
    linksNeeded = [x['href'] for x in allLinks if linkHealth in x['href']]
    uniqueLinks = set(linksNeeded)
    return uniqueLinks


gettingAllTeachersInfo(rootHealth)