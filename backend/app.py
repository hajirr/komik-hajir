import requests as req
from bs4 import BeautifulSoup
import json
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route('/api/home', methods=['GET'])
def home():
    url = "https://komikcast.site"
    home_page = req.get(url)

    soup = BeautifulSoup(home_page.text, "html.parser")

    # HOT KOMIK UPDATE
    swiper_wrapper = soup.find_all("div", class_="swiper-wrapper")
    hot_komik_update = []

    # RILISAN TERBARU
    listupd = soup.find_all("div", class_='listupd')
    rilisan_terbaru = []

    # POPULAR MANGA
    serieslist_pop = soup.find_all("div", class_="serieslist pop")
    daftar_popular_manga = []

    for link in swiper_wrapper:
        a = link.find_all("a")
        for item in a:
            url = item.get("href")
            class_title = item.find(class_="title")
            img = item.find("img")
            title = class_title.text
            image = img["src"]
            rating = item.find(class_='numscore').text
            chapter = item.find(class_='chapter').text
            hot_komik_update.append(
                {"url": url, "title": title, "image": image, "rating": rating, 'chapter': chapter})

    second_index_of_listupd = 0
    for utao in listupd:
        if second_index_of_listupd == 2:
            uta = utao.find_all("div", class_="uta")
            for uta_child in uta:
                luf = uta_child.find_all("div", class_="luf")
                imgu = uta_child.find_all('div', class_="imgu data-tooltip")
                for img in imgu:
                    image = img.find_all('img')
                    for src in image:
                        image_komik = src['src']
                for luf_child in luf:
                    a_series = luf_child.find_all(
                        "a", class_="series data-tooltip")
                    for link in a_series:
                        url_komik = link.get("href")
                        title_komik = link.find("h3").text

                    ul = luf_child.find_all("ul")
                    for li in ul:
                        a = li.find_all("a")
                        i = li.find_all('i')
                        daftar_chapter = []
                        updated_at = []
                        for italic in i:
                            updated_at.append(italic.text)
                        updated_at_index = 0
                        for link in a:
                            url_chapter = link.get("href")
                            title_chapter = link.text
                            daftar_chapter.append(
                                {"url": url_chapter, "title": title_chapter, "updated_at": updated_at[updated_at_index]})
                            updated_at_index += 1
                    rilisan_terbaru.append(
                        {"url": url_komik, "title": title_komik,  'image': image_komik, "chapter": daftar_chapter})
        second_index_of_listupd += 1

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
                span = komik.find_all('span')
                genre = []
                for a in h2.find_all('a'):
                    url_komik_popular = a.get('href')
                    title_komik_popular = a.text
                for a in span:
                    link = a.find_all('a')
                    for title in link:
                        genre.append(title.text)
                daftar_popular_manga.append(
                    {'image': src, "url": url_komik_popular, "title": title_komik_popular, 'genre': genre})

    return jsonify({
        'status': True,
        'hot_komik_update': hot_komik_update,
        'rilisan_terbaru': rilisan_terbaru,
        'popular_manga': daftar_popular_manga,
    })


@app.route('/api/search', methods=['POST'])
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
            class_title = item.find_all('h3', class_='title')
            class_img = item.find_all('img')
            class_numscore = item.find_all(class_='numscore')
            class_chapter = item.find_all(class_='chapter')

            for h3_title in class_title:
                title = h3_title.text
            for img in class_img:
                image = img['src']
            for numscore in class_numscore:
                rating = numscore.text
            for h3_title in class_chapter:
                chapter = h3_title.text

            daftar_komik.append(
                {'url': url, 'title': title, 'image': image, 'rating': rating, 'chapter': chapter})

    return jsonify({
        'status': True,
        'response': daftar_komik,
    })


@app.route('/api/komik', methods=['POST'])
def detail():
    try:
        url = request.form.get('url')
        detail_page = req.get(url)

        soup = BeautifulSoup(detail_page.text, 'html.parser')

        chapter_wrapper = soup.find_all('ul', id="chapter-wrapper")

        daftar_chapter = []

        for chapter in chapter_wrapper:
            updated_at = []
            for div in chapter.find_all('div', class_="chapter-link-time"):
                updated_at.append(div.text)
            updated_at_index = 0
            for a in chapter.find_all('a'):
                title = a.text
                url = a.get('href')
                daftar_chapter.append(
                    {'url': url, 'title': title, 'updated_at': updated_at[updated_at_index]})
                updated_at_index += 1

        return jsonify({
            'status': True,
            'response': daftar_chapter,
        })
    except NameError as e:
        return jsonify({
            'status': False,
            'response': e
        })


@app.route('/api/chapter', methods=['POST'])
def chapter():
    url = request.form.get('url')

    detail_page = req.get(url)

    soup = BeautifulSoup(detail_page.text, 'html.parser')

    main_reading_area = soup.find_all('div', class_="main-reading-area")
    title = soup.find('h1').text

    daftar_gambar = []

    class_nextprev = soup.find_all('div', class_='nextprev')
    for nextprev in class_nextprev:
        tag_a = nextprev.find_all('a')
        navigasi = []
        for a in tag_a:
            navigasi.append(
                {'ke': '{}'.format(a['rel'][0]), 'url': '{}'.format(a['href']), 'title': a.text})

    for image in main_reading_area:
        for img in image.find_all('img'):
            url = img['src']
            daftar_gambar.append({'url': url, 'title': title})
    chapter = {'gambar': daftar_gambar, 'navigasi': navigasi}

    return jsonify({
        'status': True,
        'response': chapter,
    })
