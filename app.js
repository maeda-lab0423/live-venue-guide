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

  const searchScreen = document.getElementById('search-screen');
  const favoritesScreen = document.getElementById('favorites-screen');
  const mypageScreen = document.getElementById('
