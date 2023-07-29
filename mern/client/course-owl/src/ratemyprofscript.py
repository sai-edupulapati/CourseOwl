import requests
from bs4 import BeautifulSoup
import itertools
import csv
root = "https://engineering.purdue.edu/Engr/People/ptDirectory?letter="
engineeringLink = "https://engineering.purdue.edu/Engr/People/ptProfile?resource_id="
emailBase = "@purdue.edu"
imageBase = "https://engineering.purdue.edu/ResourceDB/ResourceFiles/image"

def storingIntoCsv(root) :
    info = gettingAllTeachersInfo(root)
    with open('professorInfo.csv', 'w', newline='') as file:
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
    rawName = soup.find('h1', {'class': 'person-name'})
    nameOfTeacher= " ".join(rawName.getText().split())
    try :
        rawTitle = soup.find('h3', {'class': 'person-title'})
        titleOfTeacher = " ".join(rawTitle.getText().split())
    except :
        titleOfTeacher = ""
    allLinksFromTeacher = soup.select('a')
    try :
        emailLink = [x['href'] for x in allLinksFromTeacher if emailBase in x['href']][0][7:]
    except :
        emailLink=""
    allImages = soup.findAll("img")
    try :
        imageLink = [x['src'] for x in allImages if imageBase in x['src']][0]
    except :
        imageLink = ""
    return [nameOfTeacher,titleOfTeacher ,emailLink, imageLink]

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
    linksNeeded = [x['href'] for x in allLinks if engineeringLink in x['href']]
    uniqueLinks = set(linksNeeded)
    return uniqueLinks

storingIntoCsv(root)