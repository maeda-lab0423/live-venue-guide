const venues = [
  {
    "id": "tokyo-dome",
    "prefecture": "東京都",
    "area": "文京区",
    "name": "東京ドーム",
    "aliases": [
      "とうきょうどーむ",
      "tokyo dome",
      "ドーム"
    ],
    "capacity": "約 55,000人",
    "address": "東京都文京区後楽1-3-61",
    "nearestStation": "水道橋駅",
    "walkMinutes": "約3分",
    "officialUrl": "https://www.tokyo-dome.co.jp/dome/",
    "seatingChartUrl": "https://www.tokyo-dome.co.jp/dome/seat/",
    "scheduleUrl": "https://www.tokyo-dome.co.jp/dome/event/",
    "lat": 35.70564,
    "lng": 139.751891
  },
  {
    "id": "zepp-divercity-tokyo",
    "prefecture": "東京都",
    "area": "江東区",
    "name": "Zepp DiverCity (TOKYO)",
    "aliases": [
      "ぜっぷだいばーしてぃ",
      "zepp divercity",
      "ゼップ"
    ],
    "capacity": "約 2,473人 (スタンディング)",
    "address": "東京都江東区青海 1-1-10 ダイバーシティ東京 プラザ",
    "nearestStation": "東京テレポート駅",
    "walkMinutes": "約5分",
    "officialUrl": "https://www.zepp.co.jp/hall/divercity/",
    "seatingChartUrl": "https://www.zepp.co.jp/hall/divercity/#seating",
    "scheduleUrl": "https://www.zepp.co.jp/hall/divercity/schedule/",
    "lat": 35.62514,
    "lng": 139.775518
  },
  {
    "id": "yokohama-arena",
    "prefecture": "神奈川県",
    "area": "横浜市",
    "name": "横浜アリーナ",
    "aliases": [
      "よこはまありーな",
      "yokohama arena",
      "横アリ"
    ],
    "capacity": "約 17,000人",
    "address": "神奈川県横浜市港北区新横浜3丁目10",
    "nearestStation": "新横浜駅",
    "walkMinutes": "約5分",
    "officialUrl": "https://www.yokohama-arena.co.jp/",
    "seatingChartUrl": "https://www.yokohama-arena.co.jp/seatguide/",
    "scheduleUrl": "https://www.yokohama-arena.co.jp/event/",
    "lat": 35.508535,
    "lng": 139.61521
  },
  {
    "id": "saitama-super-arena",
    "prefecture": "埼玉県",
    "area": "さいたま市",
    "name": "さいたまスーパーアリーナ",
    "aliases": [
      "さいたますーぱーありーな",
      "たまあり",
      "saitama super arena"
    ],
    "capacity": "約 37,000人 (スタジアムモード)",
    "address": "埼玉県さいたま市中央区新都心8",
    "nearestStation": "さいたま新都心駅",
    "walkMinutes": "約3分",
    "officialUrl": "https://www.saitama-arena.co.jp/",
    "seatingChartUrl": "https://www.saitama-arena.co.jp/seat_view/",
    "scheduleUrl": "https://www.saitama-arena.co.jp/schedule/",
    "lat": 35.894886,
    "lng": 139.63083
  },
  {
    "id": "toyosu-pit",
    "prefecture": "東京都",
    "area": "江東区",
    "name": "豊洲PIT",
    "aliases": [
      "とよすぴっと",
      "toyosu pit"
    ],
    "capacity": "約 3,103人 (スタンディング)",
    "address": "東京都江東区豊洲6-1-23",
    "nearestStation": "新豊洲駅",
    "walkMinutes": "約3分",
    "officialUrl": "https://toyosu-pit.team-smile.org/",
    "seatingChartUrl": "https://toyosu-pit.team-smile.org/seat",
    "scheduleUrl": "https://toyosu-pit.team-smile.org/schedule",
    "lat": 35.647965,
    "lng": 139.78912
  },
  {
    "id": "world-kinen-hall",
    "prefecture": "兵庫県",
    "area": "神戸",
    "name": "ワールド記念ホール（神戸ポートアイランドホール）",
    "aliases": [
      "神戸ポートアイランドホール",
      "ワールド記念ホール（神戸ポートアイランドホール）",
      "神戸"
    ],
    "capacity": "最大8,000人",
    "address": "",
    "nearestStation": "ポートライナー「市民広場駅」",
    "walkMinutes": "約3分",
    "officialUrl": "https://www.kobe-spokyo.jp/world-kobe/",
    "seatingChartUrl": "https://www.kobe-spokyo.jp/world-kobe/guide/",
    "scheduleUrl": "https://www.kobe-spokyo.jp/world-kobe/event/",
    "lat": null,
    "lng": null
  },
  {
    "id": "kobe-bunka-hall",
    "prefecture": "兵庫県",
    "area": "神戸",
    "name": "神戸文化ホール（大ホール）",
"aliases": [
  "大ホール",
  "神戸文化ホール（大ホール）",
  "神戸",
  "こうべ",
  "ぶんかほーる"
],
    "capacity": "2,043席",
    "address": "",
    "nearestStation": "神戸市営地下鉄「大倉山駅」",
    "walkMinutes": "約1分",
    "officialUrl": "https://www.kobe-bunka.jp/hall/",
    "seatingChartUrl": "https://www.kobe-bunka.jp/hall/wordpress/wp-content/uploads/2018/07/bc465afb2826306b18dfe335ca93fa9b.pdf",
    "scheduleUrl": "https://www.kobe-bunka.jp/hall/event/",
    "lat": null,
    "lng": null
  },
  {
    "id": "kobe-kokusai-hall",
    "prefecture": "兵庫県",
    "area": "神戸",
    "name": "神戸国際会館こくさいホール",
   "aliases": [
  "神戸国際会館こくさいホール",
  "神戸",
  "こうべ",
  "こくさいほーる"
],
    "capacity": "2,112席",
    "address": "",
    "nearestStation": "各線「三宮駅」",
    "walkMinutes": "約5分",
    "officialUrl": "https://www.kih.co.jp/kokusaihall/",
    "seatingChartUrl": "https://www.kih.co.jp/kokusaihall/seat/",
    "scheduleUrl": "https://www.kih.co.jp/kokusaihall/event/",
    "lat": null,
    "lng": null
  },
  {
    "id": "matsukata-hall",
    "prefecture": "兵庫県",
    "area": "神戸",
    "name": "神戸新聞松方ホール",
"aliases": [
  "神戸新聞松方ホール",
  "神戸",
  "こうべ",
  "まつかたほーる"
],
    "capacity": "706席",
    "address": "",
    "nearestStation": "JR「神戸駅」、地下鉄「ハーバーランド駅」",
    "walkMinutes": "約10分",
    "officialUrl": "https://matsukata.kobe-np.co.jp/",
    "seatingChartUrl": "https://matsukata.kobe-np.co.jp/about/",
    "scheduleUrl": "https://matsukata.kobe-np.co.jp/event/",
    "lat": null,
    "lng": null
  },
  {
    "id": "kobe-asahi-hall",
    "prefecture": "兵庫県",
    "area": "神戸",
    "name": "神戸朝日ホール",
    "aliases": [
      "神戸朝日ホール",
      "神戸"
    ],
    "capacity": "505席",
    "address": "",
    "nearestStation": "各線「三宮駅」「元町駅」",
    "walkMinutes": "約10分",
    "officialUrl": "https://www.kobe-asahihall.jp/",
    "seatingChartUrl": "https://www.kobe-asahihall.jp/hall/",
    "scheduleUrl": "https://www.kobe-asahihall.jp/event/",
    "lat": null,
    "lng": null
  },
  {
    "id": "padoma",
    "prefecture": "兵庫県",
    "area": "神戸",
    "name": "live music club PADOMA",
    "aliases": [
      "live music club padoma",
      "神戸"
    ],
    "capacity": "220名",
    "address": "",
    "nearestStation": "地下鉄西神・山手線「三宮駅」",
    "walkMinutes": "約6分",
    "officialUrl": "https://padoma.jp/",
    "seatingChartUrl": "",
    "scheduleUrl": "https://padoma.jp/schedule/",
    "lat": null,
    "lng": null
  },
  {
    "id": "aiia-theater-kobe",
    "prefecture": "兵庫県",
    "area": "神戸",
    "name": "AiiA 2.5 Theater Kobe",
    "aliases": [
      "aiia 2.5 theater kobe",
      "神戸"
    ],
    "capacity": "808席",
    "address": "",
    "nearestStation": "山陽新幹線・神戸市営地下鉄「新神戸駅」",
    "walkMinutes": "直結（約1分）",
    "officialUrl": "https://aiia-theater.com/",
    "seatingChartUrl": "https://aiia-theater.com/seat/",
    "scheduleUrl": "https://aiia-theater.com/schedule/",
    "lat": null,
    "lng": null
  },
  {
    "id": "glion-arena-kobe",
    "prefecture": "兵庫県",
    "area": "神戸",
    "name": "GLION ARENA KOBE",
    "aliases": [
      "glion arena kobe",
      "神戸"
    ],
    "capacity": "約8,000人",
    "address": "",
    "nearestStation": "各線「三宮駅」",
    "walkMinutes": "約20分（ポートライナー「貿易センター駅」から約13分）",
    "officialUrl": "https://glion-arena.com/",
    "seatingChartUrl": "https://glion-arena.com/seat/",
    "scheduleUrl": "https://glion-arena.com/event/",
    "lat": null,
    "lng": null
  },
  {
    "id": "shinkaichi-art-hiroba",
    "prefecture": "兵庫県",
    "area": "神戸",
    "name": "新開地アートひろば",
    "aliases": [
      "新開地アートひろば",
      "神戸"
    ],
    "capacity": "不明",
    "address": "",
    "nearestStation": "阪神・阪急・山陽・神鉄「新開地駅」",
    "walkMinutes": "約5分",
    "officialUrl": "https://s-ah.jp/",
    "seatingChartUrl": "https://s-ah.jp/visit/facility/",
    "scheduleUrl": "https://s-ah.jp/event/",
    "lat": null,
    "lng": null
  },
  {
    "id": "harbor-studio",
    "prefecture": "兵庫県",
    "area": "神戸",
    "name": "Harbor Studio",
    "aliases": [
      "harbor studio",
      "神戸"
    ],
    "capacity": "600人",
    "address": "",
    "nearestStation": "海岸線「みなと元町駅」",
    "walkMinutes": "約5分",
    "officialUrl": "https://harbor-studio.net/",
    "seatingChartUrl": "",
    "scheduleUrl": "https://harbor-studio.net/schedule/",
    "lat": null,
    "lng": null
  },
  {
    "id": "taiyo-to-tora",
    "prefecture": "兵庫県",
    "area": "神戸",
    "name": "MUSIC ZOO KOBE 太陽と虎",
    "aliases": [
      "music zoo kobe 太陽と虎",
      "神戸"
    ],
    "capacity": "不明",
    "address": "",
    "nearestStation": "JR「三ノ宮駅」",
    "walkMinutes": "約5分",
    "officialUrl": "https://taitora.com/",
    "seatingChartUrl": "",
    "scheduleUrl": "https://taitora.com/schedule/",
    "lat": null,
    "lng": null
  },
  {
    "id": "kobe-varit",
    "prefecture": "兵庫県",
    "area": "神戸",
    "name": "神戸VARIT.",
    "aliases": [
      "神戸varit.",
      "神戸"
    ],
    "capacity": "不明",
    "address": "",
    "nearestStation": "地下鉄西神・山手線「三宮駅」",
    "walkMinutes": "約4分",
    "officialUrl": "http://varit.jp/",
    "seatingChartUrl": "",
    "scheduleUrl": "http://varit.jp/schedule/",
    "lat": null,
    "lng": null
  },
  {
    "id": "club-gessekai",
    "prefecture": "兵庫県",
    "area": "神戸",
    "name": "クラブ月世界",
    "aliases": [
      "クラブ月世界",
      "神戸"
    ],
    "capacity": "274名",
    "address": "",
    "nearestStation": "阪急「神戸三宮駅」",
    "walkMinutes": "約3分",
    "officialUrl": "https://gessekai.net/",
    "seatingChartUrl": "",
    "scheduleUrl": "https://gessekai.net/schedule",
    "lat": null,
    "lng": null
  },
  {
    "id": "109-cinemas-hat-kobe",
    "prefecture": "兵庫県",
    "area": "神戸",
    "name": "109シネマズHAT神戸",
    "aliases": [
      "109シネマズhat神戸",
      "神戸"
    ],
    "capacity": "不明（映画館のためスクリーンによる）",
    "address": "",
    "nearestStation": "阪神「岩屋駅」または「春日野道駅」",
    "walkMinutes": "約8分",
    "officialUrl": "https://109cinemas.net/hatkobe/",
    "seatingChartUrl": "https://109cinemas.net/hatkobe/seat.html",
    "scheduleUrl": "https://109cinemas.net/hatkobe/schedule/",
    "lat": null,
    "lng": null
  },
  {
    "id": "gcenter-hyogo",
    "prefecture": "兵庫県",
    "area": "阪神",
    "name": "兵庫県立芸術文化センター（KOBELCO大ホール）",
    "aliases": [
      "kobelco大ホール",
      "兵庫県立芸術文化センター（kobelco大ホール）",
      "阪神"
    ],
    "capacity": "2,001席",
    "address": "",
    "nearestStation": "阪急「西宮北口駅」",
    "walkMinutes": "約2分",
    "officialUrl": "https://www1.gcenter-hyogo.jp/",
    "seatingChartUrl": "https://www1.gcenter-hyogo.jp/seat/",
    "scheduleUrl": "https://www1.gcenter-hyogo.jp/program/",
    "lat": null,
    "lng": null
  },
  {
    "id": "nishinomiya-amity-hall",
    "prefecture": "兵庫県",
    "area": "阪神",
    "name": "西宮市民会館（アミティ・ベイコムホール）",
    "aliases": [
      "アミティ・ベイコムホール",
      "西宮市民会館（アミティ・ベイコムホール）",
      "阪神"
    ],
    "capacity": "1,180席",
    "address": "",
    "nearestStation": "阪神「西宮駅」",
    "walkMinutes": "約1分",
    "officialUrl": "https://nishi-bunka.or.jp/amity/",
    "seatingChartUrl": "https://nishi-bunka.or.jp/amity/pdf/seat.pdf",
    "scheduleUrl": "https://nishi-bunka.or.jp/event/",
    "lat": null,
    "lng": null
  },
  {
    "id": "takarazuka-vega-hall",
    "prefecture": "兵庫県",
    "area": "阪神",
    "name": "宝塚ベガ・ホール",
    "aliases": [
      "宝塚ベガ・ホール",
      "阪神"
    ],
    "capacity": "372席",
    "address": "",
    "nearestStation": "阪急「清荒神駅」",
    "walkMinutes": "約1分",
    "officialUrl": "https://takarazuka-c.jp/vegahall/",
    "seatingChartUrl": "https://takarazuka-c.jp/vegahall/facility.html",
    "scheduleUrl": "https://takarazuka-c.jp/event/",
    "lat": null,
    "lng": null
  },
  {
    "id": "sanda-satonone-hall",
    "prefecture": "兵庫県",
    "area": "阪神",
    "name": "三田市総合文化センター（郷の音ホール）",
    "aliases": [
      "郷の音ホール",
      "三田市総合文化センター（郷の音ホール）",
      "阪神"
    ],
    "capacity": "1,002席（大ホール）",
    "address": "",
    "nearestStation": "JR・神鉄「三田駅」",
    "walkMinutes": "約12分",
    "officialUrl": "https://sanda-bunka.jp/",
    "seatingChartUrl": "https://sanda-bunka.jp/facility/hall_l/",
    "scheduleUrl": "https://sanda-bunka.jp/event/",
    "lat": null,
    "lng": null
  },
  {
    "id": "amashin-archaic-hall",
    "prefecture": "兵庫県",
    "area": "阪神",
    "name": "あましんアルカイックホール（尼崎市総合文化センター）",
    "aliases": [
      "尼崎市総合文化センター",
      "あましんアルカイックホール（尼崎市総合文化センター）",
      "阪神"
    ],
    "capacity": "1,823席（大ホール）",
    "address": "",
    "nearestStation": "阪神「尼崎駅」",
    "walkMinutes": "約5分",
    "officialUrl": "https://www.archaic.or.jp/",
    "seatingChartUrl": "https://www.archaic.or.jp/guide/hall/archaic.html",
    "scheduleUrl": "https://www.archaic.or.jp/event/",
    "lat": null,
    "lng": null
  },
  {
    "id": "itami-hall",
    "prefecture": "兵庫県",
    "area": "阪神",
    "name": "東リ いたみホール（伊丹市立文化会館）",
    "aliases": [
      "伊丹市立文化会館",
      "東リ いたみホール（伊丹市立文化会館）",
      "阪神"
    ],
    "capacity": "1,201席（大ホール）",
    "address": "",
    "nearestStation": "阪急「伊丹駅」",
    "walkMinutes": "約3分",
    "officialUrl": "https://itami-hall.com/",
    "seatingChartUrl": "https://itami-hall.com/facility/daisyo-hall/",
    "scheduleUrl": "https://itami-hall.com/event/",
    "lat": null,
    "lng": null
  },
  {
    "id": "itami-aiphonic-hall",
    "prefecture": "兵庫県",
    "area": "阪神",
    "name": "伊丹アイフォニックホール（伊丹市立音楽ホール）",
    "aliases": [
      "伊丹市立音楽ホール",
      "伊丹アイフォニックホール（伊丹市立音楽ホール）",
      "阪神"
    ],
    "capacity": "502席",
    "address": "",
    "nearestStation": "阪急「伊丹駅」",
    "walkMinutes": "約4分",
    "officialUrl": "http://aiphonic.jp/",
    "seatingChartUrl": "http://aiphonic.jp/sisetu/sisetu.html",
    "scheduleUrl": "http://aiphonic.jp/event/event.html",
    "lat": null,
    "lng": null
  },
  {
    "id": "mitsunaka-hall",
    "prefecture": "兵庫県",
    "area": "阪神",
    "name": "川西市みつなかホール",
    "aliases": [
      "川西市みつなかホール",
      "阪神"
    ],
    "capacity": "525席",
    "address": "",
    "nearestStation": "阪急・能勢電「川西能勢口駅」",
    "walkMinutes": "約5分",
    "officialUrl": "https://www.kawanishi-bunka-sports.com/bunka/",
    "seatingChartUrl": "https://www.kawanishi-bunka-sports.com/bunka/facility/mitsunaka.html",
    "scheduleUrl": "https://www.kawanishi-bunka-sports.com/bunka/event/",
    "lat": null,
    "lng": null
  },
  {
    "id": "amagasaki-base",
    "prefecture": "兵庫県",
    "area": "阪神",
    "name": "AMAGASAKI BASE",
    "aliases": [
      "amagasaki base",
      "阪神"
    ],
    "capacity": "不明",
    "address": "",
    "nearestStation": "阪神「尼崎駅」",
    "walkMinutes": "約1分",
    "officialUrl": "https://amagasakibass.com/",
    "seatingChartUrl": "",
    "scheduleUrl": "https://amagasakibass.com/schedule/",
    "lat": null,
    "lng": null
  },
  {
    "id": "acrie-himeji",
    "prefecture": "兵庫県",
    "area": "播磨",
    "name": "アクリエひめじ（姫路市文化コンベンションセンター）",
    "aliases": [
      "姫路市文化コンベンションセンター",
      "アクリエひめじ（姫路市文化コンベンションセンター）",
      "播磨"
    ],
    "capacity": "2,010席（大ホール）",
    "address": "",
    "nearestStation": "JR「姫路駅」",
    "walkMinutes": "約10分",
    "officialUrl": "https://www.himeji-ccc.jp/",
    "seatingChartUrl": "https://www.himeji-ccc.jp/facility/hall_l.html",
    "scheduleUrl": "https://www.himeji-ccc.jp/event/",
    "lat": null,
    "lng": null
  },
  {
    "id": "kakogawa-shimin-hall",
    "prefecture": "兵庫県",
    "area": "播磨",
    "name": "加古川市民会館",
    "aliases": [
      "加古川市民会館",
      "播磨"
    ],
    "capacity": "1,551席",
    "address": "",
    "nearestStation": "JR「加古川駅」",
    "walkMinutes": "約15分（バス約5分）",
    "officialUrl": "https://www.kakogawa-shimin.jp/",
    "seatingChartUrl": "https://www.kakogawa-shimin.jp/facility/",
    "scheduleUrl": "https://www.kakogawa-shimin.jp/event/",
    "lat": null,
    "lng": null
  },
  {
    "id": "akashi-shimin-hall",
    "prefecture": "兵庫県",
    "area": "播磨",
    "name": "明石市立市民会館（アワーズホール）",
    "aliases": [
      "アワーズホール",
      "明石市立市民会館（アワーズホール）",
      "播磨"
    ],
    "capacity": "1,268席（大ホール）",
    "address": "",
    "nearestStation": "JR・山陽「明石駅」",
    "walkMinutes": "約15分",
    "officialUrl": "https://akashi.hall-info.jp/akashi/",
    "seatingChartUrl": "https://akashi.hall-info.jp/akashi/facility/",
    "scheduleUrl": "https://akashi.hall-info.jp/akashi/event/",
    "lat": null,
    "lng": null
  },
  {
    "id": "ako-harmony-hall",
    "prefecture": "兵庫県",
    "area": "播磨",
    "name": "赤穂市文化会館（ハーモニーホール）",
    "aliases": [
      "ハーモニーホール",
      "赤穂市文化会館（ハーモニーホール）",
      "播磨"
    ],
    "capacity": "1,154席（大ホール）",
    "address": "",
    "nearestStation": "JR「播州赤穂駅」",
    "walkMinutes": "約8分",
    "officialUrl": "https://www.ako-hyogo.jp/",
    "seatingChartUrl": "https://www.ako-hyogo.jp/facility/hall_l.html",
    "scheduleUrl": "https://www.ako-hyogo.jp/event/",
    "lat": null,
    "lng": null
  },
  {
    "id": "himeji-beta",
    "prefecture": "兵庫県",
    "area": "播磨",
    "name": "姫路Beta",
    "aliases": [
      "姫路beta",
      "播磨"
    ],
    "capacity": "180名",
    "address": "",
    "nearestStation": "JR「姫路駅」",
    "walkMinutes": "約10分",
    "officialUrl": "https://www.beta-music.com/",
    "seatingChartUrl": "",
    "scheduleUrl": "https://www.beta-music.com/schedule/",
    "lat": null,
    "lng": null
  },
  {
    "id": "toyooka-shimin-hall",
    "prefecture": "兵庫県",
    "area": "但馬",
    "name": "豊岡市民会館",
    "aliases": [
      "豊岡市民会館",
      "但馬"
    ],
    "capacity": "1,126席",
    "address": "",
    "nearestStation": "JR「豊岡駅」",
    "walkMinutes": "約15〜20分（タクシー約5分）",
    "officialUrl": "https://www.city.toyooka.lg.jp/1019810/1019844/shiminhall/",
    "seatingChartUrl": "https://www.city.toyooka.lg.jp/1019810/1019844/shiminhall/1002111.html",
    "scheduleUrl": "https://www.city.toyooka.lg.jp/1019810/1019844/shiminhall/",
    "lat": null,
    "lng": null
  },
  {
    "id": "izushi-eirakukan",
    "prefecture": "兵庫県",
    "area": "但馬",
    "name": "出石 永楽館",
    "aliases": [
      "出石 永楽館",
      "但馬"
    ],
    "capacity": "368人",
    "address": "",
    "nearestStation": "JR「豊岡駅」からバス",
    "walkMinutes": "バス約30分、終点下車徒歩3分",
    "officialUrl": "http://eirakukan.com/",
    "seatingChartUrl": "http://eirakukan.com/?page_id=425",
    "scheduleUrl": "http://eirakukan.com/?page_id=425",
    "lat": null,
    "lng": null
  },
  {
    "id": "tanba-mori-hall",
    "prefecture": "兵庫県",
    "area": "丹波",
    "name": "丹波の森公苑（ホール）",
    "aliases": [
      "ホール",
      "丹波の森公苑（ホール）",
      "丹波"
    ],
    "capacity": "622席",
    "address": "",
    "nearestStation": "JR「柏原駅」",
    "walkMinutes": "約15分",
    "officialUrl": "https://tanba-mori.or.jp/",
    "seatingChartUrl": "https://tanba-mori.or.jp/facility/hall/",
    "scheduleUrl": "https://tanba-mori.or.jp/event/",
    "lat": null,
    "lng": null
  },
  {
    "id": "sumoto-buntai",
    "prefecture": "兵庫県",
    "area": "淡路",
    "name": "洲本市文化体育館（しばえもん座）",
    "aliases": [
      "しばえもん座",
      "洲本市文化体育館（しばえもん座）",
      "淡路"
    ],
    "capacity": "542席（文化ホール）",
    "address": "",
    "nearestStation": "洲本バスセンター（高速バス）",
    "walkMinutes": "約5分",
    "officialUrl": "https://www.city.sumoto.lg.jp/site/buntai/",
    "seatingChartUrl": "https://www.city.sumoto.lg.jp/site/buntai/7008.html",
    "scheduleUrl": "https://www.city.sumoto.lg.jp/site/buntai/",
    "lat": null,
    "lng": null
  },
  {
    "id": "awaji-shizuka-hall",
    "prefecture": "兵庫県",
    "area": "淡路",
    "name": "淡路市立しづかホール",
    "aliases": [
      "淡路市立しづかホール",
      "淡路"
    ],
    "capacity": "802人",
    "address": "",
    "nearestStation": "不明（高速バス利用が一般的）",
    "walkMinutes": "不明",
    "officialUrl": "https://shizukahall.com/",
    "seatingChartUrl": "https://shizukahall.com/facility/",
    "scheduleUrl": "https://shizukahall.com/event/",
    "lat": null,
    "lng": null
  }
];
