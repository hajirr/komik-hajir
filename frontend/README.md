## API Reference

#### Get komik di halaman home

```http
  GET /api/home
```

#### Search komik

```http
  POST /api/search
```

| Parameter | Type     | Description                                                                                            |
| :-------- | :------- | :----------------------------------------------------------------------------------------------------- |
| `query`   | `string` | **Required**. masukan judul komik dan ganti spasi dengan + contoh "one punch man" jadi "one+punch+man" |

#### Detail komik

```http
  POST /api/komik
```

| Parameter | Type     | Description                                                                                        |
| :-------- | :------- | :------------------------------------------------------------------------------------------------- |
| `url`     | `string` | **Required**. masukan url komik dari komikcast contoh "https://komikcast.site/komik/super-system/" |

#### Detail chapter komik

```http
  POST /api/chapter
```

| Parameter | Type     | Description                                                                                                                              |
| :-------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `url`     | `string` | **Required**. masukan url chapter komik dari komikcast contoh "https://komikcast.site/chapter/super-system-chapter-01-bahasa-indonesia/" |
