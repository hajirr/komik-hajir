import requests as req
from bs4 import BeautifulSoup

url = 'https://komikcast.site'
home_page = req.get(url)

soup = BeautifulSoup(home_page.text, 'html.parser')

swiper_wrapper = soup.find_all('div', class_="swiper-slide splide-slide")

for link in swiper_wrapper:
    a = link.find_all('a')
    for item in a:
        url = item.get('href')
        title = item.find(class_='title')
        print(url, title.text)
