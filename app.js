// import { venues } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const headerSearchArea = document.getElementById('header-search-area');
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
  const officialLink = document.getElementById('official-link');
  const seatingChartLink = document.getElementById('seating-chart-link');
  const scheduleLink = document.getElementById('schedule-link');
  const transitLink = document.getElementById('transit-link');

  const favoriteBtn = document.getElementById('favorite-btn');
  const favoritesList = document.getElementById('favorites-list');
  const recentList = document.getElementById('recent-list');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const stationDisplayArea = document.getElementById('station-display-area');
const stationEditArea = document.getElementById('station-edit-area');
const stationDisplayName = document.getElementById('station-display-name');
const changeStationBtn = document.getElementById('change-station-btn');

  const searchScreen = document.getElementById('search-screen');
  const favoritesScreen = document.getElementById('favorites-screen');
  const mypageScreen = document.getElementById('mypage-screen');

  const navSearch = document.getElementById('nav-search');
  const navFavorites = document.getElementById('nav-favorites');
  const navMypage = document.getElementById('nav-mypage');
const recordDateInput = document.getElementById('record-date');
const recordArtistInput = document.getElementById('record-artist');
const recordVenueInput = document.getElementById('record-venue');
const recordSeatInput = document.getElementById('record-seat');
const recordMemoInput = document.getElementById('record-memo');
const saveRecordBtn = document.getElementById('save-record-btn');
const recordList = document.getElementById('record-list');
  let currentVenue = null;

  function getVenueKey(venue) {
    return venue.id || venue.name;
  }

  function updateClearSearchButton() {
    if (!clearSearchBtn) return;
    const isSearchActive = searchScreen.classList.contains('active');

    if (currentVenue && isSearchActive) {
      clearSearchBtn.classList.add('visible');
    } else {
      clearSearchBtn.classList.remove('visible');
    }
  }

  function showSearchScreen() {
    searchScreen.classList.add('active');
    favoritesScreen.classList.remove('active');
    mypageScreen.classList.remove('active');

    navSearch.classList.add('active');
    navFavorites.classList.remove('active');
    navMypage.classList.remove('active');

    if (headerSearchArea) headerSearchArea.style.display = 'block';

    updateClearSearchButton();
  }

  function showFavoritesScreen() {
    favoritesScreen.classList.add('active');
    searchScreen.classList.remove('active');
    mypageScreen.classList.remove('active');

    navFavorites.classList.add('active');
    navSearch.classList.remove('active');
    navMypage.classList.remove('active');

    if (headerSearchArea) headerSearchArea.style.display = 'none';

    updateClearSearchButton();
    renderFavorites();
  }

  function showMyPageScreen() {
    mypageScreen.classList.add('active');
    searchScreen.classList.remove('active');
    favoritesScreen.classList.remove('active');

    navMypage.classList.add('active');
    navSearch.classList.remove('active');
    navFavorites.classList.remove('active');

    if (headerSearchArea) headerSearchArea.style.display = 'none';

    updateClearSearchButton();
    updateMyPage();
    function getLiveRecords() {
  try {
    return JSON.parse(localStorage.getItem('liveRecords')) || [];
  } catch (e) {
    return [];
  }
}

function saveLiveRecords(records) {
  localStorage.setItem('liveRecords', JSON.stringify(records));
}

function renderLiveRecords() {
  if (!recordList) return;

  const records = getLiveRecords();
  recordList.innerHTML = '';

  if (records.length === 0) {
    recordList.innerHTML = '<p class="favorites-empty">参戦記録がここに表示されます。</p>';
    return;
  }

  records.forEach((record, index) => {
    const card = document.createElement('div');
    card.className = 'record-card';

    card.innerHTML = `
      <div class="record-main">
        <div class="record-date">${record.date || '日付未設定'}</div>
        <div class="record-title">${record.artist || 'アーティスト未入力'}</div>
        <div class="record-meta">${record.venue || ''}</div>
        <div class="record-meta">${record.seat || ''}</div>
        <div class="record-memo">${record.memo || ''}</div>
      </div>
      <button class="record-delete" type="button">削除</button>
    `;

    card.querySelector('.record-delete').addEventListener('click', () => {
      const updated = getLiveRecords();
      updated.splice(index, 1);
      saveLiveRecords(updated);
      renderLiveRecords();
    });

    recordList.appendChild(card);
  });
}

function addLiveRecord() {
  const record = {
    date: recordDateInput.value,
    artist: recordArtistInput.value.trim(),
    venue: recordVenueInput.value.trim(),
    seat: recordSeatInput.value.trim(),
    memo: recordMemoInput.value.trim()
  };

  if (!record.date && !record.artist && !record.venue && !record.memo) {
    alert('日付・アーティスト名・会場名など、どれか1つは入力してください。');
    return;
  }

  const records = getLiveRecords();
  records.unshift(record);
  saveLiveRecords(records);

  recordDateInput.value = '';
  recordArtistInput.value = '';
  recordVenueInput.value = '';
  recordSeatInput.value = '';
  recordMemoInput.value = '';

  renderLiveRecords();
}
  }

  function getFavorites() {
    try {
      return JSON.parse(localStorage.getItem('favoriteVenues')) || [];
    } catch (e) {
      return [];
    }
  }

  function saveFavorites(favorites) {
    localStorage.setItem('favoriteVenues', JSON.stringify(favorites));
  }

  function isFavorite(venue) {
    return getFavorites().includes(getVenueKey(venue));
  }

  function updateFavoriteButton(venue) {
    if (!favoriteBtn || !venue) return;

    if (isFavorite(venue)) {
      favoriteBtn.textContent = '★ お気に入り済み';
      favoriteBtn.classList.add('active');
    } else {
      favoriteBtn.textContent = '⭐ お気に入り';
      favoriteBtn.classList.remove('active');
    }
  }

  function toggleFavorite() {
    if (!currentVenue) return;

    const key = getVenueKey(currentVenue);
    let favorites = getFavorites();

    if (favorites.includes(key)) {
      favorites = favorites.filter(item => item !== key);
    } else {
      if (favorites.length >= 10) {
        alert('お気に入りは最大10件までです。');
        return;
      }
      favorites.push(key);
    }

    saveFavorites(favorites);
    updateFavoriteButton(currentVenue);
    renderFavorites();
    updateMyPage();
  }

  function renderFavorites() {
    if (!favoritesList) return;

    const favorites = getFavorites();
    favoritesList.innerHTML = '';

    if (favorites.length === 0) {
      favoritesList.innerHTML = '<p class="favorites-empty">お気に入り登録した会場がここに表示されます。</p>';
      return;
    }

    favorites.forEach(key => {
      const venue = venues.find(v => getVenueKey(v) === key);
      if (!venue) return;

      const card = document.createElement('div');
      card.className = 'favorite-card';

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'favorite-remove';
      removeBtn.textContent = '解除';
      removeBtn.addEventListener('click', () => {
        const updated = getFavorites().filter(item => item !== key);
        saveFavorites(updated);
        renderFavorites();
        updateFavoriteButton(currentVenue);
        updateMyPage();
      });

      const openBtn = document.createElement('button');
      openBtn.type = 'button';
      openBtn.className = 'favorite-open';
      openBtn.innerHTML = `
        <span class="favorite-name">${venue.name}</span>
        <span class="favorite-meta">${venue.nearestStation || ''}</span>
      `;

      openBtn.addEventListener('click', () => {
        searchInput.value = venue.name;
        showSearchScreen();
        showVenueDetails(venue);
      });

      card.appendChild(removeBtn);
      card.appendChild(openBtn);
      favoritesList.appendChild(card);
    });
  }

  function getRecentVenues() {
    try {
      return JSON.parse(localStorage.getItem('recentVenues')) || [];
    } catch (e) {
      return [];
    }
  }

  function saveRecentVenue(venue) {
    const key = getVenueKey(venue);
    let recent = getRecentVenues();

    recent = recent.filter(item => item !== key);
    recent.unshift(key);
    recent = recent.slice(0, 5);

    localStorage.setItem('recentVenues', JSON.stringify(recent));
    renderRecentVenues();
    updateMyPage();
  }

  function renderRecentVenues() {
    if (!recentList) return;

    const recent = getRecentVenues();
    recentList.innerHTML = '';

    if (recent.length === 0) {
      recentList.innerHTML = '<p class="favorites-empty">最近見た会場がここに表示されます。</p>';
      return;
    }

    recent.forEach(key => {
      const venue = venues.find(v => getVenueKey(v) === key);
      if (!venue) return;

      const card = document.createElement('div');
      card.className = 'favorite-card';

      const openBtn = document.createElement('button');
      openBtn.type = 'button';
      openBtn.className = 'favorite-open';
      openBtn.innerHTML = `
        <span class="favorite-name">${venue.name}</span>
        <span class="favorite-meta">${venue.nearestStation || ''}</span>
      `;

      openBtn.addEventListener('click', () => {
        searchInput.value = venue.name;
        showSearchScreen();
        showVenueDetails(venue);
      });

      card.appendChild(openBtn);
      recentList.appendChild(card);
    });
  }

  function updateMyPage() {
    const homeStation = localStorage.getItem('homeStation') || '未設定';
    const favorites = getFavorites();
    const recent = getRecentVenues();

    const homeStationEl = document.getElementById('mypage-home-station');
    const favoritesCountEl = document.getElementById('mypage-favorites-count');
    const recentCountEl = document.getElementById('mypage-recent-count');

    if (homeStationEl) homeStationEl.textContent = homeStation;
    if (favoritesCountEl) favoritesCountEl.textContent = `${favorites.length}件`;
    if (recentCountEl) recentCountEl.textContent = `${recent.length}件`;
  }
function updateStationSettingView() {
  const homeStation = localStorage.getItem('homeStation');

  if (!stationDisplayArea || !stationEditArea || !stationDisplayName) return;

  if (homeStation) {
    stationDisplayName.textContent = homeStation;
    stationDisplayArea.style.display = 'block';
    stationEditArea.style.display = 'none';
  } else {
    stationDisplayName.textContent = '未設定';
    stationDisplayArea.style.display = 'none';
    stationEditArea.style.display = 'block';
  }
}
  function updateTransitLink(venue) {
    const homeStation = localStorage.getItem('homeStation');

    if (homeStation && venue.nearestStation) {
      const from = encodeURIComponent(venue.nearestStation);
      const to = encodeURIComponent(homeStation);

      transitLink.href = `https://transit.yahoo.co.jp/search/result?from=${from}&to=${to}&type=2&shin=1&ex=1&al=0&hb=0&lb=1&sr=0`;
      transitLink.textContent = `🚃 ${homeStation} への終電を調べる`;
      transitLink.style.display = 'inline-flex';
      transitLink.target = '_blank';
      transitLink.rel = 'noopener noreferrer';
    } else {
      transitLink.style.display = 'none';
    }
  }

  function showVenueDetails(venue) {
    currentVenue = venue;

    localStorage.setItem('lastVenueId', getVenueKey(venue));
    saveRecentVenue(venue);

    venueNameEl.textContent = venue.name || '';
    venueAddressEl.textContent = venue.address || '情報なし';
    venueStationEl.textContent = venue.nearestStation || '情報なし';
    venueCapacityEl.textContent = venue.capacity || '情報なし';

    googleMapLink.href = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(venue.nearestStation || '')}&destination=${encodeURIComponent(venue.name || '')}&travelmode=walking`;
    googleMapLink.target = '_blank';
    googleMapLink.rel = 'noopener noreferrer';

    if (officialLink) {
      if (venue.officialUrl) {
        officialLink.href = venue.officialUrl;
        officialLink.style.display = 'inline-flex';
        officialLink.target = '_blank';
        officialLink.rel = 'noopener noreferrer';
      } else {
        officialLink.style.display = 'none';
      }
    }

    if (venue.seatingChartUrl) {
      seatingChartLink.href = venue.seatingChartUrl;
      seatingChartLink.style.display = 'inline-flex';
      seatingChartLink.target = '_blank';
      seatingChartLink.rel = 'noopener noreferrer';
    } else {
      seatingChartLink.style.display = 'none';
    }

    if (venue.scheduleUrl) {
      scheduleLink.href = venue.scheduleUrl;
      scheduleLink.style.display = 'inline-flex';
      scheduleLink.target = '_blank';
      scheduleLink.rel = 'noopener noreferrer';
    } else {
      scheduleLink.style.display = 'none';
    }

    updateTransitLink(venue);
    updateFavoriteButton(venue);

    venueDetails.classList.add('active');
    updateClearSearchButton();
  }

  function closeVenueDetails() {
    currentVenue = null;
    localStorage.removeItem('lastVenueId');
    venueDetails.classList.remove('active');
    searchInput.value = '';
    autocompleteList.classList.remove('active');

    updateClearSearchButton();
  }

  const savedStation = localStorage.getItem('homeStation');
  if (savedStation) {
    homeStationInput.value = savedStation;
  }

  const lastVenueId = localStorage.getItem('lastVenueId');
  if (lastVenueId) {
    const lastVenue = venues.find(v => getVenueKey(v) === lastVenueId);
    if (lastVenue) {
      searchInput.value = lastVenue.name;
      showVenueDetails(lastVenue);
    }
  }

  saveStationBtn.addEventListener('click', () => {
    const station = homeStationInput.value.trim();

    if (station) {
      localStorage.setItem('homeStation', station);
      alert('自宅の最寄り駅を保存しました。');
    } else {
      localStorage.removeItem('homeStation');
      alert('設定をクリアしました。');
    }

    if (currentVenue) {
      updateTransitLink(currentVenue);
    }

    updateMyPage();
    updateStationSettingView();
  });

  searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim().toLowerCase();

  autocompleteList.innerHTML = '';

  if (query.length < 2) {
    autocompleteList.classList.remove('active');
    return;
  }

    const matches = venues.filter(v => {
      const aliases = Array.isArray(v.aliases) ? v.aliases : [];

      const searchText = [
        v.name,
        v.prefecture,
        v.area,
        v.nearestStation,
        v.searchText,
        ...aliases
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchText.includes(query);
    });

    if (matches.length > 0) {
      matches.forEach(venue => {
        const li = document.createElement('li');

        li.className = 'autocomplete-item';
        li.innerHTML = `
          <span class="autocomplete-name">${venue.name}</span>
          <span class="autocomplete-meta">${venue.nearestStation || ''}</span>
        `;

        li.addEventListener('click', () => {
          searchInput.value = venue.name;
          autocompleteList.classList.remove('active');
          showSearchScreen();
          showVenueDetails(venue);
        });

        autocompleteList.appendChild(li);
      });

      autocompleteList.classList.add('active');
    } else {
      autocompleteList.classList.remove('active');
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !autocompleteList.contains(e.target)) {
      autocompleteList.classList.remove('active');
    }
  });

  if (favoriteBtn) favoriteBtn.addEventListener('click', toggleFavorite);
if (clearSearchBtn) {
  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    autocompleteList.innerHTML = '';
    autocompleteList.classList.remove('active');
    clearSearchBtn.classList.remove('visible');
    searchInput.focus();
  });
}
  if (navSearch) navSearch.addEventListener('click', showSearchScreen);
  if (navFavorites) navFavorites.addEventListener('click', showFavoritesScreen);
  if (navMypage) navMypage.addEventListener('click', showMyPageScreen);
  if (saveRecordBtn) {
  saveRecordBtn.addEventListener('click', addLiveRecord);
}
  if (changeStationBtn) {
  changeStationBtn.addEventListener('click', () => {
    stationDisplayArea.style.display = 'none';
    stationEditArea.style.display = 'block';
    homeStationInput.value = localStorage.getItem('homeStation') || '';
    homeStationInput.focus();
  });
}
  
 const recentPanel = document.getElementById('recent-section');
const recentToggleBtn = document.getElementById('recent-toggle-btn');

if (recentToggleBtn && recentPanel) {
  recentToggleBtn.addEventListener('click', () => {
    recentPanel.classList.toggle('open');

    if (recentPanel.classList.contains('open')) {
      recentToggleBtn.textContent = '＞';
    } else {
      recentToggleBtn.textContent = '＜';
    }
  });
}
  
’初期表示
  renderFavorites();
  renderRecentVenues();
  updateMyPage();
  updateStationSettingView();
　updateClearSearchButton();
　renderLiveRecords();


let touchStartX = 0;
let touchEndX = 0;

if (recentPanel) {

  recentPanel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  recentPanel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;

    if (touchEndX - touchStartX > 60) {
      recentPanel.classList.remove('open');
      recentToggleBtn.textContent = '＜';
    }
  });

  recentPanel.addEventListener('mousedown', (e) => {
    touchStartX = e.screenX;
  });

  recentPanel.addEventListener('mouseup', (e) => {
    touchEndX = e.screenX;

    if (touchEndX - touchStartX > 80) {
      recentPanel.classList.remove('open');
      recentToggleBtn.textContent = '＜';
    }
  });

}
});
