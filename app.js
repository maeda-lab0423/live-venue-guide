// import { venues } from './data.js'; // ローカルファイル実行エラー回避のためコメントアウト

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const searchInput = document.getElementById('search-input');
  const autocompleteList = document.getElementById('autocomplete-list');
  const homeStationInput = document.getElementById('home-station');
  const saveStationBtn = document.getElementById('save-station-btn');
  
  const venueDetails = document.getElementById('venue-details');
  const venueNameEl = document.getElementById('venue-name');
  const venueAddressEl = document.getElementById('venue-address');
  const venueStationEl = document.getElementById('venue-station');
  const venueCapacityEl = document.getElementById('venue-capacity');
  
  const googleMapLink = document.getElementById('google-map-link');
  const seatingChartLink = document.getElementById('seating-chart-link');
  const scheduleLink = document.getElementById('schedule-link');
  const transitLink = document.getElementById('transit-link');

  let currentVenue = null;

  // =====================
  // 関数定義（先に宣言）
  // =====================

  function updateTransitLink(venue) {
    const homeStation = localStorage.getItem('homeStation');
    if (homeStation) {
      // Yahoo!乗換案内の終電検索 (type=2 が終電) を利用
      // 夜行バスや飛行機が終電として判定されないよう、新幹線・特急をON(shin=1, ex=1)、飛行機・高速バス・フェリーをOFF(al=0, hb=0, sr=0)にする
      const from = encodeURIComponent(venue.nearestStation);
      const to = encodeURIComponent(homeStation);
      
      transitLink.href = `https://transit.yahoo.co.jp/search/result?from=${from}&to=${to}&type=2&shin=1&ex=1&al=0&hb=0&lb=1&sr=0`;
      transitLink.textContent = `🚃 ${homeStation} への終電を調べる (Yahoo!乗換案内)`;
      transitLink.style.display = 'inline-flex';
    } else {
      transitLink.style.display = 'none';
    }
  }

  function showVenueDetails(venue) {
    currentVenue = venue;
    // 会場をlocalStorageに保存（「戻る」で戻ってきたとき用）
    localStorage.setItem('lastVenueId', venue.id);
    
    // Update basic info
    venueNameEl.textContent = venue.name;
    venueAddressEl.textContent = venue.address;
    venueStationEl.textContent = venue.nearestStation;
    venueCapacityEl.textContent = venue.capacity;

    // Google Maps Route (Walking from nearest station to venue)
    googleMapLink.href = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(venue.nearestStation)}&destination=${encodeURIComponent(venue.name)}&travelmode=walking`;

    // Seating Chart
    seatingChartLink.href = venue.seatingChartUrl;

    // Schedule Link
    if (venue.scheduleUrl) {
      scheduleLink.href = venue.scheduleUrl;
      scheduleLink.style.display = 'inline-flex';
    } else {
      scheduleLink.style.display = 'none';
    }

    // Transit / Last Train Link
    updateTransitLink(venue);

    venueDetails.classList.add('active');
  }

  // =====================
  // 初期化処理
  // =====================

  // 自宅最寄り駅を復元
  const savedStation = localStorage.getItem('homeStation');
  if (savedStation) {
    homeStationInput.value = savedStation;
  }

  // 直前に表示していた会場を復元（「戻る」ボタン対応）
  const lastVenueId = localStorage.getItem('lastVenueId');
  if (lastVenueId) {
    const lastVenue = venues.find(v => v.id === lastVenueId);
    if (lastVenue) {
      searchInput.value = lastVenue.name;
      showVenueDetails(lastVenue);
    }
  }

  // =====================
  // イベントリスナー
  // =====================

  // Save station handler
  saveStationBtn.addEventListener('click', () => {
    const station = homeStationInput.value.trim();
    if (station) {
      localStorage.setItem('homeStation', station);
      alert('自宅の最寄り駅を保存しました。この情報はブラウザ内にのみ保存されます。');
    } else {
      localStorage.removeItem('homeStation');
      alert('設定をクリアしました。');
    }
    
    // If a venue is already selected, update the transit link
    if (currentVenue) {
      updateTransitLink(currentVenue);
    }
  });

  // Autocomplete logic
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    autocompleteList.innerHTML = '';
    
    if (query.length < 1) {
      autocompleteList.classList.remove('active');
      return;
    }

    const matches = venues.filter(v => {
      const matchName = v.name.toLowerCase().includes(query);
      const matchAlias = v.aliases.some(alias => alias.includes(query));
      return matchName || matchAlias;
    });

    if (matches.length > 0) {
      matches.forEach(venue => {
        const li = document.createElement('li');
        li.className = 'autocomplete-item';
        li.textContent = venue.name;
        li.addEventListener('click', () => {
          searchInput.value = venue.name;
          autocompleteList.classList.remove('active');
          showVenueDetails(venue);
        });
        autocompleteList.appendChild(li);
      });
      autocompleteList.classList.add('active');
    } else {
      autocompleteList.classList.remove('active');
    }
  });

  // Hide autocomplete when clicking outside
  document.addEventListener('click', (e) => {
    if (e.target !== searchInput && e.target !== autocompleteList) {
      autocompleteList.classList.remove('active');
    }
  });

});
