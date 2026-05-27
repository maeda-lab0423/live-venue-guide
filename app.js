// import { venues } from './data.js'; // ローカルファイル実行エラー回避のためコメントアウト

document.addEventListener('DOMContentLoaded', () => {
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

  const favoriteBtn = document.getElementById('favorite-btn');
  const favoritesList = document.getElementById('favorites-list');

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

  function isFavorite(venue) {
    const key = getVenueKey(venue);
    return getFavorites().includes(key);
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
      favoritesList.innerHTML = '<p class="empty-favorites">お気に入り登録した会場がここに表示されます。</p>';
      return;
    }

    favorites.forEach(key => {
      const venue = venues.find(v => getVenueKey(v) === key);
      if (!venue) return;

      const item = document.createElement('div');
      item.className = 'favorite-item';

      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = venue.name;
      button.addEventListener('click', () => {
        searchInput.value = venue.name;
        autocompleteList.classList.remove('active');
        showVenueDetails(venue);
      });

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.textContent = '解除';
      removeBtn.className = 'favorite-remove-btn';
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const updated = getFavorites().filter(itemKey => itemKey !== key);
        saveFavorites(updated);
        renderFavorites();
        updateFavoriteButton(currentVenue);
      });

      item.appendChild(button);
      item.appendChild(removeBtn);
      favoritesList.appendChild(item);
    });
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

    googleMapLink.href = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(venue.nearestStation || '')}&destination=${encodeURIComponent(venue.name || '')}&travelmode=walking`;
    googleMapLink.target = '_blank';
    googleMapLink.rel = 'noopener noreferrer';

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

    const matches = venues.filter(v => {
      const name = (v.name || '').toLowerCase();
      const aliases = Array.isArray(v.aliases) ? v.aliases : [];

      const matchName = name.includes(query);
      const matchAlias = aliases.some(alias =>
        String(alias).toLowerCase().includes(query)
      );

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

  document.addEventListener('click', (e) => {
    if (e.target !== searchInput && e.target !== autocompleteList) {
      autocompleteList.classList.remove('active');
    }
  });

  if (favoriteBtn) {
    favoriteBtn.addEventListener('click', toggleFavorite);
  }

  renderFavorites();
});