const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
  return fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
    response.json()
  );
}
export function fetchCoinInfo(coinId: string | undefined) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId: string | undefined) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory(coinId: string | undefined) {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  ).then((response) => {
    if (response.status !== 200) {
      throw new Error("There was a problem. Status Code: " + response.status);
    }
    return response.json();
  });
}
