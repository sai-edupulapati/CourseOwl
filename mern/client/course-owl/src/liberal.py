import requests
from bs4 import BeautifulSoup
import itertools
import csv

rootLiberal = "https://cla.purdue.edu/directory/?_ga=2.6434746.946637159.1690637419-532680865.1690637419"
linkLiberal = "profiles/"

def storingIntoCsv(root) :
    info = gettingAllTeachersInfo(root)
    with open('professorLiberalInfo.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerows(info)


def gettingAllTeachersInfo(root) :
    allTeacherLinks = getLinksFromPage(root)
    infoCollected = [gettingInfoFromEachTeacherLink(x) for x in allTeacherLinks]
    return infoCollected

def gettingInfoFromEachTeacherLink(singleTeacherLink) :
    result = requests.get(singleTeacherLink)
    content = result.text
    soup = BeautifulSoup(content, 'html.parser')
    try : 
        nameArticle = soup.find('article', {'class': 'content__main'})
        rawName = nameArticle.find('h1').getText()
        nameOfTeacher = " ".join(rawName.split())
    except : 
        nameOfTeacher = ""
    try :
        firstPara = soup.find('p')
        finalList = []
        while (True) :
            firstPara = firstPara.find_next()
            if (firstPara.name == "strong") :
                strings = list(firstPara.stripped_strings)
                neededList = strings[0].split()
                for i in range(len(neededList)) :
                    if (neededList[i] == "//") :
                        neededList[i] = ':'
                title = " ".join(neededList)
                finalList.append(title)
                                
            else :
                if (firstPara.name == "hr" or firstPara.name == "footer" or firstPara.name == "a") :
                    break
        titleOfTeacher = ";".join(finalList)
    except :
        titleOfTeacher = ""
    try :
        emailPara = soup.find('div', {'class': 'office-info-wrapper'})
        email = "".join(emailPara.find('a').getText().split())
    except :
        email=""
    try :
        imageArticle = soup.find('article',{'class' : 'content__main'})
        rawImageLink = imageArticle.find('img')["src"]  
        if ("../../" in rawImageLink) :
            imageLink = "https://cla.purdue.edu/" + rawImageLink[6:]
        elif ("../" in rawImageLink) :
            imageLink = "https://cla.purdue.edu/directory/" + rawImageLink[3:]
    except :
        imageLink = ""
    return [nameOfTeacher, titleOfTeacher, email, imageLink]
   
def getLinksFromPage(root):
    result = requests.get(root)
    content = result.text
    soup = BeautifulSoup(content, 'html.parser')
    allLinks = soup.select('a')
    linksNeeded = ["https://cla.purdue.edu/directory/" + x['href'] for x in allLinks if linkLiberal in x['href']]
    uniqueLinks = set(linksNeeded)
    return uniqueLinks


gettingInfoFromEachTeacherLink("https://cla.purdue.edu/directory/profiles/janice-kelly.html")