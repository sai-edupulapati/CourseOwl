
import requests
from bs4 import BeautifulSoup
import itertools
import csv
rootEducation = "https://education.purdue.edu/faculty-profiles/char/"
linkEducation  = "https://education.purdue.edu/faculty-profiles/name/"
emailBase = "@purdue.edu"

def storingIntoCsv(root) :
    info = gettingAllTeachersInfo(root)
    with open('professorEducationInfo.csv', 'w', newline='') as file:
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
        rawName = soup.find('span', {'class': 'fn n notranslate'})
        nameOfTeacher= " ".join(rawName.getText().split())
    except : 
        nameOfTeacher = ""
    try :
        rawTitle =  soup.find('span', {'class': 'title notranslate'})
        rawOrg =  soup.find('span', {'class': 'organization-name notranslate'})
        titleOfTeacher = " ".join(rawTitle.getText().split()) + " : " + " ".join(rawOrg.getText().split()) 
    except :
        titleOfTeacher = ""
    try :
        email = soup.find('span', {'class': 'email-address'}).getText() 
    except :
        email=""
    try :
        image = soup.find('img',{'class' : 'cn-image photo'})
        imageLink = "https:" + image['srcset'].split()[0]
    except :
        imageLink = ""
    return [nameOfTeacher, titleOfTeacher, email, imageLink]

def addAlphabet(root) :
    rootPlusAlphabet= [root+chr(64+i) for i in range(1,27)]
    finalLinksNeeded = [getLinksFromPage(i) for i in rootPlusAlphabet]
    combined = list(itertools.chain.from_iterable(finalLinksNeeded))
    return combined

def getLinksFromPage(eachAlphabetLink):
    result = requests.get(eachAlphabetLink)
    content = result.text
    soup = BeautifulSoup(content, 'html.parser')
    allLinks = soup.select('a')
    linksNeeded = [x['href'] for x in allLinks if linkEducation in x['href']]
    uniqueLinks = set(linksNeeded)
    return uniqueLinks

storingIntoCsv(rootEducation)