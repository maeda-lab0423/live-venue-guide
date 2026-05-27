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
  const transitLink = document.getElementById('transit-link');
  const officialLink = document.getElementById('official-link');
  const seatingChartLink = document.getElementById('seating-chart-link');
  const scheduleLink = document.getElementById('schedule-link');

  const venueActiveBar = document.getElementById('venue-active-bar');
  const venueActiveName = document.getElementById('venue-active-name');
  const closeVenueBtn = document.getElementById('close-venue-btn');
  const closeVenueBtnBottom = document.getElementById('close-venue-btn-bottom');

  let currentVenue = null;

  function normalizeText(value) {
    return String(value || '').toLowerCase().replace(/\s+/g, '');
  }

  function openExternal(linkEl, url, visible = true) {
    if (!linkEl) return;
    if (!url || url === 'なし' || url === '不明') {
      linkEl.style.display = 'none';
      linkEl.removeAttribute('href');
      return;
    }
    linkEl.href = url;
    linkEl.target = '_blank';
    linkEl.rel = 'noopener noreferrer';
    linkEl.style.display = visible ? 'inline-flex' : 'none';
  }

  function updateTransitLink(venue) {
    const homeStation = localStorage.getItem('homeStation');
    if (!homeStation || !venue) {
      transitLink.style.display = 'none';
      return;
    }

    const from = encodeURIComponent(venue.nearestStation || venue.name);
    const to = encodeURIComponent(homeStation);
    const url = `https://transit.yahoo.co.jp/search/result?from=${from}&to=${to}&type=2&shin=1&ex=1&al=0&hb=0&lb=1&sr=0`;

    transitLink.textContent = `🚃 ${homeStation} への終電を調べる`;
    openExternal(transitLink, url);
  }

  function showVenueDetails(venue) {
    currentVenue = venue;
    localStorage.setItem('lastVenueId', venue.id);

    venueNameEl.textContent = venue.name || '会場名';
    venueCapacityEl.textContent = venue.capacity || '不明';
    venueStationEl.textContent = `${venue.nearestStation || '不明'}${venue.walkMinutes ? `（徒歩 ${venue.walkMinutes}）` : ''}`;
    venueAddressEl.textContent = venue.address || `${venue.prefecture || ''}${venue.area ? ' / ' + venue.area : ''}` || '未登録';

    venueActiveName.textContent = venue.name || '会場名';
    venueActiveBar.style.display = 'flex';

    const origin = encodeURIComponent(venue.nearestStation || '');
    const destination = encodeURIComponent(venue.address || venue.name || '');
    const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;
    openExternal(googleMapLink, mapUrl);

    openExternal(officialLink, venue.officialUrl);
    openExternal(seatingChartLink, venue.seatingChartUrl);
    openExternal(scheduleLink, venue.scheduleUrl);
    updateTransitLink(venue);

    venueDetails.classList.add('active');
    document.body.classList.add('has-active-venue');
    venueDetails.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function closeVenueDetails() {
    currentVenue = null;
    localStorage.removeItem('lastVenueId');
    searchInput.value = '';
    autocompleteList.innerHTML = '';
    autocompleteList.classList.remove('active');
    venueDetails.classList.remove('active');
    venueActiveBar.style.display = 'none';
    document.body.classList.remove('has-active-venue');
    searchInput.focus();
  }

  function renderAutocomplete(query) {
    autocompleteList.innerHTML = '';
    const normalizedQuery = normalizeText(query);

    if (!normalizedQuery) {
      autocompleteList.classList.remove('active');
      return;
    }

    const matches = venues.filter(v => {
      const target = [v.name, v.prefecture, v.area, v.nearestStation, ...(v.aliases || [])]
        .map(normalizeText)
        .join(' ');
      return target.includes(normalizedQuery);
    }).slice(0, 12);

    if (matches.length === 0) {
      autocompleteList.classList.remove('active');
      return;
    }

    matches.forEach(venue => {
      const li = document.createElement('li');
      li.className = 'autocomplete-item';
      li.innerHTML = `
        <span class="autocomplete-name">${venue.name}</span>
        <span class="autocomplete-meta">${venue.prefecture || ''}${venue.area ? ' / ' + venue.area : ''}</span>
      `;
      li.addEventListener('click', () => {
        searchInput.value = venue.name;
        autocompleteList.classList.remove('active');
        showVenueDetails(venue);
      });
      autocompleteList.appendChild(li);
    });

    autocompleteList.classList.add('active');
  }

  const savedStation = localStorage.getItem('homeStation');
  if (savedStation) homeStationInput.value = savedStation;

  const lastVenueId = localStorage.getItem('lastVenueId');
  if (lastVenueId) {
    const lastVenue = venues.find(v => v.id === lastVenueId);
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
      alert('自宅の最寄り駅をクリアしました。');
    }
    if (currentVenue) updateTransitLink(currentVenue);
  });

  homeStationInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') saveStationBtn.click();
  });

  searchInput.addEventListener('input', (e) => renderAutocomplete(e.target.value));

  searchInput.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const query = normalizeText(searchInput.value);
    const venue = venues.find(v => normalizeText(v.name) === query) ||
      venues.find(v => normalizeText(v.name).includes(query));
    if (venue) showVenueDetails(venue);
  });

  closeVenueBtn.addEventListener('click', closeVenueDetails);
  closeVenueBtnBottom.addEventListener('click', closeVenueDetails);

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      autocompleteList.classList.remove('active');
    }
  });
});
