import requests as req
from bs4 import BeautifulSoup
import json
from flask import Flask, request, jsonify, send_from_directory


app = Flask(__name__)


@app.route('/hot-komik-update', methods=['GET'])
def hot_komik_update():
    url = "https://komikcast.site"
    home_page = req.get(url)

    soup = BeautifulSoup(home_page.text, "html.parser")

    swiper_wrapper = soup.find_all("div", class_="swiper-wrapper")
    hot_komik_update = []
        
    for link in swiper_wrapper:
        a = link.find_all("a")
        for item in a:
            url = item.get("href")
            class_title = item.find(class_="title")
            img = item.find("img")
            title = class_title.text
            image = img["src"]
            hot_komik_update.append({"url": url, "title": title, "image": image})

    return jsonify({
        'status': True,
        'response': hot_komik_update,
    })


@app.route('/rilisan-terbaru', methods=['GET'])
def rilisan_terbaru():
    url = "https://komikcast.site"
    home_page = req.get(url)

    soup = BeautifulSoup(home_page.text, "html.parser")
        
    lsitupd = soup.find_all("div", class_="listupd")

    rilisan_terbaru = []

    for utao in lsitupd:
        uta = utao.find_all("div", class_="uta")
        for uta_child in uta:
            luf = uta_child.find_all("div", class_="luf")
            for luf_child in luf:
                a_series = luf_child.find_all("a", class_="series data-tooltip")
                for link in a_series:
                    url_komik = link.get("href")
                    title_komik = link.find("h3").text

                ul = luf_child.find_all("ul")
                for li in ul:
                    a = li.find_all("a")
                    daftar_chapter = []
                    for link in a:
                        url_chapter = link.get("href")
                        title_chapter = link.text
                        daftar_chapter.append({"url": url_chapter, "title": title_chapter})
                    rilisan_terbaru.append({"url": url_komik, "title": title_komik, "chapter": daftar_chapter})

    return jsonify({
        'status': True,
        'response': rilisan_terbaru,
    })

@app.route('/popular-manga', methods=['GET'])
def popular_manga():
    url = "https://komikcast.site"
    home_page = req.get(url)

    soup = BeautifulSoup(home_page.text, "html.parser")
        
    serieslist_pop = soup.find_all("div", class_="serieslist pop")
    daftar_popular_manga = []

    for pop in serieslist_pop:
        li = pop.find_all('li')
        for list in li:
            imgseries = list.find_all('div', class_="imgseries")
            for image in imgseries:
                img = image.find_all('img')
                for url in img:
                    src = url['src']
            leftseries = list.find_all('div', class_="leftseries")
            for komik in leftseries:
                h2 = komik.find('h2')
                for a in h2.find_all('a'):
                    url_komik_popular = a.get('href')
                    title_komik_popular = a.text
                daftar_popular_manga.append({'image': src, "url": url_komik_popular, "title": title_komik_popular})

    return jsonify({
        'status': True,
        'response': daftar_popular_manga,
    })


@app.route('/search', methods=['POST'])
def search():
    query = request.form.get('query')
    home_page = req.get('https://komikcast.site/?s={}'.format(query))

    soup = BeautifulSoup(home_page.text, "html.parser")
            
    list_update_item = soup.find_all('div', class_="list-update_item")

    daftar_komik = []

    for link in list_update_item:
        a = link.find_all('a')
        for item in a:
            url = item.get('href')
            class_title = item.find(class_='title')
            img = item.find('img')

            title = class_title.text
            image = img['src']

            daftar_komik.append({'url': url, 'title': title, 'image': image})

    return jsonify({
        'status': True,
        'response': daftar_komik,
    })

@app.route('/detail', methods=['POST'])
def detail():
    url = request.form.get('url')
    detail_page = req.get(url)

    soup = BeautifulSoup(detail_page.text, 'html.parser')

    chapter_wrapper = soup.find_all('ul', id="chapter-wrapper")

    daftar_chapter = []

    for chapter in chapter_wrapper:
        for a in chapter.find_all('a'):
            title = a.text
            url = a.get('href')
            daftar_chapter.append({'url': url, 'title': title})

    return jsonify({
        'status': True,
        'response': daftar_chapter,
    })

@app.route('/chapter', methods=['POST'])
def chapter():
    url = request.form.get('url')

    detail_page = req.get(url)

    soup = BeautifulSoup(detail_page.text, 'html.parser')

    main_reading_area = soup.find_all('div', class_="main-reading-area")
    title = soup.find('h1').text

    daftar_gambar = []

    for image in main_reading_area:
        for img in image.find_all('img'):
            url = img['src']
            daftar_gambar.append({'url': url, 'title': title})

    return jsonify({
        'status': True,
        'response': daftar_gambar,
    })
