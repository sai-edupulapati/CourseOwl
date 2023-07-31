import requests
from bs4 import BeautifulSoup
import itertools
import csv
import copy
emailBase = "@purdue.edu"
rootBusiness = "https://www.business.purdue.edu/directory/view.php?search=AllFac&pn="
linkBusiness = "bio.php?username="

def storingIntoCsv(root) :
    info = gettingAllTeachersInfo(root)
    with open('professorBusinessInfo.csv', 'w', newline='') as file:
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
        rawName = soup.find('h1')
        nameOfTeacher= " ".join(rawName.getText().split())
    except :
        nameOfTeacher = ""
    try :
        divElement = soup.find('div', {'class': 'lg-7 xs-10'})
        neededPara = divElement.find('strong')
        dup =copy.copy(neededPara)
        neededPara.select_one('a').decompose()
        title = neededPara.getText()
        dept = dup.find('a').getText()
        titleOfTeacher = " : ".join([title,dept])
    except :
        titleOfTeacher = ""
    try :
        emailDiv = soup.find("div",{'class':"lg-2 sm-10"})
        emailLink = emailDiv.find('a').getText()
    except :
        emailLink=""
    try :
        imageDiv = soup.find("div",{"class" : "lg-3 xs-10"})
        imageLink = imageDiv.find("img")["src"]
    except :
        imageLink = ""
    return [nameOfTeacher,titleOfTeacher ,emailLink, imageLink]

def addAlphabet(root) :
    rootPlusAlphabet= [root+str(i) for i in range(1,10)]
    finalLinksNeeded = [getLinksFromPage(i) for i in rootPlusAlphabet]
    combined = list(itertools.chain.from_iterable(finalLinksNeeded))
    return combined

def getLinksFromPage(eachAlphabetLink):
    result = requests.get(eachAlphabetLink)
    content = result.text
    soup = BeautifulSoup(content, 'html.parser')
    allLinks = soup.find_all('a', href=True)
    linksNeeded =  ["https://www.business.purdue.edu/directory/" + x['href'] for x in allLinks if linkBusiness in x['href']]
    uniqueLinks = set(linksNeeded)
    return uniqueLinks

storingIntoCsv(rootBusiness)
