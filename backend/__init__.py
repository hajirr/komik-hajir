import requests as req
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'kuhaku2022'

CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route('/', methods=['GET'])
def index():
    return jsonify({
        'status': 'success',
    })


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
        title_komik = soup.find('h1').text
        image = soup.find('img', class_='komik_info-content-thumbnail-image')
        released = soup.find(
            'span', class_='komik_info-content-info-release').text
        komik_info_content_info = soup.find_all(
            'span', class_='komik_info-content-info')
        genre_item = soup.find_all('a', class_='genre-item')
        sinopsis_p = soup.find('div', class_='komik_info-description-sinopsis')
        sinopsis = sinopsis_p.text
        
        daftar_chapter = []
        info_komik = []
        genres = []

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

        info_komik.append(released)
        for info in komik_info_content_info:
            info_komik.append(info.text)

        for genre in genre_item:
            genres.append(genre.text)

        return jsonify({
            'status': True,
            'response': {'title': title_komik,'sinopsis': sinopsis, 'genre': genres, 'info_komik': info_komik, 'image': image['src'], 'daftar_chapter': daftar_chapter},
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
    chapter_nav_control = soup.find_all('div', class_="chapter_nav-control")
    title_komik = soup.find('h1').text
    detail_komik = soup.find('div', class_='allc')
    url_komik = detail_komik.find('a')

    daftar_gambar = []
    daftar_chapter = []

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

    first_index_of_chapter_nav_control = 0
    for nav_control in chapter_nav_control:
        if first_index_of_chapter_nav_control == 0:
            options = nav_control.find_all('option')
            for option in options:
                daftar_chapter.append(
                    {'title': option.text, 'url': option['value']})
        first_index_of_chapter_nav_control += 1

    chapter = {'title': title_komik, 'detail_komik': url_komik['href'],
               'gambar': daftar_gambar, 'navigasi': navigasi, 'list': daftar_chapter}

    return jsonify({
        'status': True,
        'response': chapter,
    })


@app.route('/api/anime/op_home', methods=['GET', 'POST'])
def op_home():
    if request.method == 'GET':
        url = "https://oploverz.co.in"
        home_page = req.get(url)

        soup = BeautifulSoup(home_page.text, "html.parser")

        list_hot_update = []
        list_latest_updated = []

        styleegg_articles = soup.find_all('article', class_='bs styleegg')
        stylesix_articles = soup.find_all('article', class_='stylesix')

        for item_styleegg in styleegg_articles:
            h2 = item_styleegg.find('h2')
            img = item_styleegg.find('img')
            a = item_styleegg.find('a')
            title = h2.text
            list_hot_update.append(
                {'title': title, 'image': img['src'], 'url': a['href']})

        for item_stylesix in stylesix_articles:
            h2 = item_stylesix.find('h2')
            img = item_stylesix.find('img')
            a = item_stylesix.find('a')
            scr = item_stylesix.find('span', class_='scr')
            title = h2.text
            if(scr != None):
                score = scr.text
            else:
                score = ''
            li = item_stylesix.find_all('li')
            info = []
            for item_li in li:
                if 'Posted' not in item_li.text:
                    info.append(item_li.text.capitalize())
            list_latest_updated.append(
                {'title': title, 'image': img['src'], 'url': a['href'], 'score': score, 'info': info})

        hpage = soup.find('div', class_='hpage')
        navigate = []
        a = hpage.find_all('a')
        for item_a in a:
            navigate.append({'title': item_a.text, 'url': item_a['href']})

        return jsonify({
            'status': True,
            'response': {'hot': list_hot_update, 'latest': list_latest_updated, 'navigate': navigate}
        })
    if request.method == 'POST':
        url = request.form.get('url')
        home_page = req.get(url)

        soup = BeautifulSoup(home_page.text, "html.parser")

        list_hot_update = []
        list_latest_updated = []

        styleegg_articles = soup.find_all('article', class_='bs styleegg')
        stylesix_articles = soup.find_all('article', class_='stylesix')

        for item_styleegg in styleegg_articles:
            h2 = item_styleegg.find('h2')
            img = item_styleegg.find('img')
            a = item_styleegg.find('a')
            title = h2.text
            list_hot_update.append(
                {'title': title, 'image': img['src'], 'url': a['href']})

        for item_stylesix in stylesix_articles:
            h2 = item_stylesix.find('h2')
            img = item_stylesix.find('img')
            a = item_stylesix.find('a')
            scr = item_stylesix.find('span', class_='scr')
            title = h2.text
            score = scr.text
            li = item_stylesix.find_all('li')
            info = []
            for item_li in li:
                if 'Posted' not in item_li.text:
                    info.append(item_li.text.capitalize())
            list_latest_updated.append(
                {'title': title, 'image': img['src'], 'url': a['href'], 'score': score, 'info': info})

        hpage = soup.find('div', class_='hpage')
        navigate = []
        a = hpage.find_all('a')
        for item_a in a:
            navigate.append({'title': item_a.text, 'url': item_a['href']})

        return jsonify({
            'status': True,
            'response': {'hot': list_hot_update, 'latest': list_latest_updated, 'navigate': navigate}
        })


@app.route('/api/anime/op_episode', methods=['POST'])
def op_episode():
    url = request.form.get('url')

    detail_page = req.get(url)

    soup = BeautifulSoup(detail_page.text, 'html.parser')

    player_embed = soup.find('div', class_='player-embed')
    iframe = player_embed.find('iframe')
    entry_title = soup.find('h1', class_='entry-title')
    naveps = soup.find('div', class_='naveps')
    nvs = naveps.find_all('div', class_='nvs')
    title = entry_title.text

    navbar_episodes = []
    for nvs_item in nvs:
        a = nvs_item.find('a')
        if a != None:
            navbar_episodes.append({'title': a.text, 'url': a['href']})

    list_url_download = []
    soraddlx = soup.find_all('div', class_='soraddlx')
    for item_soraddlx in soraddlx:
        ekstensi = item_soraddlx.find('h3').text
        soraurlx = item_soraddlx.find_all('div', 'soraurlx')
        list_url = []
        for item_soraurlx in soraurlx:
            resolusi = item_soraurlx.find('strong').text
            a = item_soraurlx.find_all('a')
            list_a_soraurlx = []
            for item_a in a:
                list_a_soraurlx.append(
                    {'url': item_a['href'], 'server': item_a.text})
            list_url.append(
                {'list_server': list_a_soraurlx, 'resolusi': resolusi})

        list_url_download.append(
            {'ekstensi': ekstensi, 'master': list_url})

    listupd = soup.find('div', class_='listupd')
    a = listupd.find_all('a')
    list_rekomendasi_anime = []
    for item_a in a:
        h2 = item_a.find('h2')
        img = item_a.find('img')
        title_anime = h2.text
        list_rekomendasi_anime.append(
            {'title': title_anime, 'image': img['src'], 'url': item_a['href']})
    return jsonify({
        'status': True,
        'response': {'title': title, 'url_streaming': iframe['src'], 'download': list_url_download, 'list_rekomendasi_anime': list_rekomendasi_anime, 'navbar_episodes': navbar_episodes}
    })


@app.route('/api/anime/op_detail', methods=['POST'])
def op_detail():
    url = request.form.get('url')

    detail_page = req.get(url)

    soup = BeautifulSoup(detail_page.text, 'html.parser')
    infox = soup.find('div', class_='infox')
    thumbook = soup.find('div', class_='thumbook')
    img = thumbook.find('img')
    rating = thumbook.find('strong').text

    h1 = infox.find('h1')
    mindesc = infox.find('div', 'mindesc')
    alter_span = infox.find('span', class_='alter')
    spe = infox.find('div', class_='spe')
    span = spe.find_all('span')
    genxed = infox.find('div', class_='genxed')
    a = genxed.find_all('a')
    desc = infox.find('div', class_='desc')

    title = h1.text
    min_description = mindesc.text.replace('oploverz.asia', 'baubawang.com').replace(
        'Oploverz', 'Baubawang').replace('oploverz', 'baubawang')
    description = desc.text.replace('oploverz.asia', 'baubawang.com').replace(
        'Oploverz', 'Baubawang').replace('oploverz', 'baubawang')
    if alter_span != None:
        alter = alter_span.text
    else:
        alter = ''
    info = []
    for span_item in span:
        if 'Posted' not in span_item.text:
            info.append(span_item.text)
    genre = []
    for a_item in a:
        genre.append({'url': a_item['href'], 'title': a_item.text})

    bixbox = soup.find('div', class_='bixbox bxcl epcheck')
    lastend = bixbox.find('div', class_='lastend')
    a_lastend = lastend.find_all('a')
    li_episode = bixbox.find_all('li')

    firstandlast = []
    for item_a in a_lastend:
        span = item_a.find('span', class_='epcur')
        title = span.text
        firstandlast.append({'url': item_a['href'], 'title': title})

    list_of_episode = []
    for li_item in li_episode:
        a = li_item.find('a')
        title = li_item.find('div', class_='epl-title').text
        list_of_episode.append({'url': a['href'], 'title': title})
    return jsonify({
        'status': True,
        'response': {
            'title': title,
            'image': img['src'],
            'rating': rating,
            'min_desc': min_description,
            'desc': description,
            'alter': alter,
            'info': info,
            'genre': genre,
            'first_and_last': firstandlast,
            'list_of_episodes': list_of_episode,
        }
    })


@app.route('/api/anime/op_search', methods=['POST'])
def anime_search():
    query = request.form.get('query')
    home_page = req.get('https://oploverz.co.in/?s={}'.format(query))

    soup = BeautifulSoup(home_page.text, "html.parser")

    listupd = soup.find('div', class_="listupd")
    search_result = []
    a = listupd.find_all('a')
    for a_item in a:
        h2 = a_item.find('h2')
        epx = a_item.find('span', class_='epx')
        img = a_item.find('img')
        status = epx.text
        title = h2.text
        search_result.append(
            {'url': a_item['href'], 'title': title, 'image': img['src'], 'statuc': status})

    return jsonify({
        'status': True,
        'response': search_result,
    })


@app.route('/api/anime/op_genres', methods=['POST'])
def anime_genres():
    url = request.form.get('url')
    genre_page = req.get(url)
    soup = BeautifulSoup(genre_page.text, 'html.parser')

    genre_result = []
    listupd = soup.find('div', class_="listupd")
    releases = soup.find('div', class_="releases")
    pagination = soup.find('div', class_="pagination")
    h1 = releases.find('h1')
    a = listupd.find_all('a')
    for a_item in a:
        h2 = a_item.find('h2')
        epx = a_item.find('span', class_='epx')
        img = a_item.find('img')
        status = epx.text
        title = h2.text
        genre_result.append(
            {'url': a_item['href'], 'title': title, 'image': img['src'], 'statuc': status})

    paginations = []
    a_pagination = pagination.find_all('a')
    for a_pagination_item in a_pagination:
        paginations.append({
            'title': a_pagination_item.text,
            'url': a_pagination_item['href']
        })
    title = h1.text
    return jsonify({
        'status': True,
        'response': {
            'title': title,
            'result': genre_result,
            'pagination': paginations
        },
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0')
