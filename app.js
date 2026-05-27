// import { venues } from './data.js'; // ローカルファイル実行エラー回避のためコメントアウト

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const autocompleteList = document.getElementById('autocomplete-list');
  const homeStationInput = document.getElementById('home-station');
  const saveStationBtn = document.getElementById('save-station-btn');

  const searchScreen = document.getElementById('search-screen');
  const favoritesScreen = document.getElementById('favorites-screen');
  const navSearch = document.getElementById('nav-search');
  const navFavorites = document.getElementById('nav-favorites');

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

  const venueActiveBar = document.getElementById('venue-active-bar');
  const venueActiveName = document.getElementById('venue-active-name');
  const closeVenueBtn = document.getElementById('close-venue-btn');
  const closeVenueBtnBottom = document.getElementById('close-venue-btn-bottom');

  let currentVenue = null;

  function getVenueKey(venue) {
    return venue.id || venue.name;
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

  function showScreen(screenName) {
    const isFavorites = screenName === 'favorites';

    searchScreen.classList.toggle('active', !isFavorites);
    favoritesScreen.classList.toggle('active', isFavorites);
    navSearch.classList.toggle('active', !isFavorites);
    navFavorites.classList.toggle('active', isFavorites);

    if (isFavorites) {
      autocompleteList.classList.remove('active');
      renderFavorites();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function showSearchScreen() {
    showScreen('search');
  }

  function showFavoritesScreen() {
    showScreen('favorites');
  }

  function isFavorite(venue) {
    if (!venue) return false;
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

      const openBtn = document.createElement('button');
      openBtn.type = 'button';
      openBtn.className = 'favorite-open';
      openBtn.innerHTML = `
        <span class="favorite-name">${venue.name}</span>
        <span class="favorite-meta">${venue.nearestStation || '最寄り駅情報なし'} / ${venue.capacity || 'キャパ情報なし'}</span>
      `;
      openBtn.addEventListener('click', () => {
        searchInput.value = venue.name;
        autocompleteList.classList.remove('active');
        showSearchScreen();
        showVenueDetails(venue);
      });

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.textContent = '解除';
      removeBtn.className = 'favorite-remove';
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const updated = getFavorites().filter(itemKey => itemKey !== key);
        saveFavorites(updated);
        renderFavorites();
        updateFavoriteButton(currentVenue);
      });

      card.appendChild(removeBtn);
      card.appendChild(openBtn);
      favoritesList.appendChild(card);
    });
  }

  function setExternalLink(linkEl, url, show = true) {
    if (!linkEl) return;

    if (url && show) {
      linkEl.href = url;
      linkEl.style.display = 'inline-flex';
      linkEl.target = '_blank';
      linkEl.rel = 'noopener noreferrer';
    } else {
      linkEl.style.display = 'none';
      linkEl.removeAttribute('href');
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

    venueNameEl.textContent = venue.name || '';
    venueAddressEl.textContent = venue.address || '情報なし';
    venueStationEl.textContent = venue.nearestStation || '情報なし';
    venueCapacityEl.textContent = venue.capacity || '情報なし';

    const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(venue.nearestStation || '')}&destination=${encodeURIComponent(venue.name || '')}&travelmode=walking`;
    setExternalLink(googleMapLink, mapUrl);
    setExternalLink(officialLink, venue.officialUrl);
    setExternalLink(seatingChartLink, venue.seatingChartUrl);
    setExternalLink(scheduleLink, venue.scheduleUrl);

    updateTransitLink(venue);
    updateFavoriteButton(venue);

    if (venueActiveName) venueActiveName.textContent = venue.name || '会場名';
    if (venueActiveBar) venueActiveBar.style.display = 'flex';

    venueDetails.classList.add('active');
  }

  function closeVenueDetails() {
    currentVenue = null;
    localStorage.removeItem('lastVenueId');
    searchInput.value = '';
    autocompleteList.classList.remove('active');
    venueDetails.classList.remove('active');
    if (venueActiveBar) venueActiveBar.style.display = 'none';
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
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    autocompleteList.innerHTML = '';

    if (query.length < 1) {
      autocompleteList.classList.remove('active');
      return;
    }

    showSearchScreen();

    const matches = venues.filter(v => {
      const name = (v.name || '').toLowerCase();
      const station = (v.nearestStation || '').toLowerCase();
      const area = `${v.prefecture || ''}${v.area || ''}`.toLowerCase();
      const aliases = Array.isArray(v.aliases) ? v.aliases : [];

      const matchName = name.includes(query);
      const matchStation = station.includes(query);
      const matchArea = area.includes(query);
      const matchAlias = aliases.some(alias => String(alias).toLowerCase().includes(query));

      return matchName || matchStation || matchArea || matchAlias;
    });

    if (matches.length > 0) {
      matches.slice(0, 30).forEach(venue => {
        const li = document.createElement('li');
        li.className = 'autocomplete-item';
        li.innerHTML = `
          <span class="autocomplete-name">${venue.name}</span>
          <span class="autocomplete-meta">${venue.nearestStation || ''}${venue.capacity ? ' / ' + venue.capacity : ''}</span>
        `;

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

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !autocompleteList.contains(e.target)) {
      autocompleteList.classList.remove('active');
    }
  });

  if (favoriteBtn) favoriteBtn.addEventListener('click', toggleFavorite);
  if (closeVenueBtn) closeVenueBtn.addEventListener('click', closeVenueDetails);
  if (closeVenueBtnBottom) closeVenueBtnBottom.addEventListener('click', closeVenueDetails);
  if (navSearch) navSearch.addEventListener('click', showSearchScreen);
  if (navFavorites) navFavorites.addEventListener('click', showFavoritesScreen);

  renderFavorites();
});
