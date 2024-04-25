export interface Message {
  message: String
}

export interface PortfolioElement {
  id: number,
  user_id: number,
  currency_id: number,
  quantity: number,

  coinDetails: Currency
}

export interface Transaction {
  id: number,
  type: String,
  user_id: number,
  currency_id: number,
  quantity: number,
  price: number
}

export interface AuthToken{
  access: string
}

export interface User{
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  balance: number,
}

export interface Balance{
  user_id: number,
  balance: number,
}

export interface Portfolio {
  user_id: number,
  crypto_id: {
    id: number,
    name: string,
    symbol: string,
    quote: {
      USD: {
        price: number
      }
    }
  },
  quantity: number,
}


export interface Currency {
    id: number,
    name: String,
    symbol: String,
    cmc_rank: number,
    circulating_supply: number,
    max_supply: number,
    quote: {
        USD: {
            price: number,
            market_cap: number,
            volume_24h: number,
            percent_change_24h: number,
            percent_change_7d: number,
            fully_diluted_market_cap: number
        }
    }
}

export interface CurrencyMetadata {
    id: number,
    description: String,
    logo: String,
    urls: {
        website: String[],
        twitter: String[],
        facebook: String[],
        reddit: String[],
        technical_doc: String[],
        source_code: String[]
    }
}

// export const currency_metadata_example: CurrencyMetadata = {
//     id: 1,
//     description: 'Битко́йн, или битко́ин — пиринговая платёжная система, использующая одноимённую единицу для учёта операций. Для обеспечения функционирования и защиты системы используются криптографические методы, но при этом вся информация о транзакциях между адресами системы доступна в открытом виде.',
//     logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Bitcoin_Digital_Currency_Logo.png',
//     urls: {
//         website: ['https://www.wikipedia.org/'],
//         twitter: ['https://www.wikipedia.org/'],
//         facebook: ['https://www.wikipedia.org/', 'https://www.wikipedia.org/'],
//         reddit: [],
//         technical_doc: ['https://www.wikipedia.org/'],
//         source_code: []
//     }
// }

// export const currencies_example: Currency[] = [
//     {id: 1, max_supply: 200000000, cmc_rank: 1, name: 'Bitcoin', symbol: 'BTC', circulating_supply: 1929919291929, quote: {USD: {fully_diluted_market_cap: 1212121211, price: 41632.147753521356, market_cap: 791738578891.785, volume_24h: 28838242204.710552, percent_change_24h: 0.71761542, percent_change_7d: 0.78095225}}},
//     {id: 2, max_supply: 200000000, cmc_rank: 1, name: 'Bitcoin', symbol: 'BTC', circulating_supply: 1929919291929, quote: {USD: {fully_diluted_market_cap: 1212121211, price: 41632.147753521356, market_cap: 791738578891.785, volume_24h: 28838242204.710552, percent_change_24h: 0.71761542, percent_change_7d: 0.78095225}}},
//     {id: 3, max_supply: 200000000, cmc_rank: 1, name: 'Bitcoin', symbol: 'BTC', circulating_supply: 1929919291929, quote: {USD: {fully_diluted_market_cap: 1212121211, price: 41632.147753521356, market_cap: 791738578891.785, volume_24h: 28838242204.710552, percent_change_24h: 0.71761542, percent_change_7d: 0.78095225}}},
//     {id: 4, max_supply: 200000000, cmc_rank: 1, name: 'Bitcoin', symbol: 'BTC', circulating_supply: 1929919291929, quote: {USD: {fully_diluted_market_cap: 1212121211, price: 41632.147753521356, market_cap: 791738578891.785, volume_24h: 28838242204.710552, percent_change_24h: 0.71761542, percent_change_7d: 0.78095225}}},
//     {id: 5, max_supply: 200000000, cmc_rank: 1, name: 'Bitcoin', symbol: 'BTC', circulating_supply: 1929919291929, quote: {USD: {fully_diluted_market_cap: 1212121211, price: 41632.147753521356, market_cap: 791738578891.785, volume_24h: 28838242204.710552, percent_change_24h: 0.71761542, percent_change_7d: 0.78095225}}},
//     {id: 6, max_supply: 200000000, cmc_rank: 1, name: 'Bitcoin', symbol: 'BTC', circulating_supply: 1929919291929, quote: {USD: {fully_diluted_market_cap: 1212121211, price: 41632.147753521356, market_cap: 791738578891.785, volume_24h: 28838242204.710552, percent_change_24h: 0.71761542, percent_change_7d: 0.78095225}}},
//     {id: 7, max_supply: 200000000, cmc_rank: 1, name: 'Bitcoin', symbol: 'BTC', circulating_supply: 1929919291929, quote: {USD: {fully_diluted_market_cap: 1212121211, price: 41632.147753521356, market_cap: 791738578891.785, volume_24h: 28838242204.710552, percent_change_24h: 0.71761542, percent_change_7d: 0.78095225}}},
//     {id: 8, max_supply: 200000000, cmc_rank: 1, name: 'Bitcoin', symbol: 'BTC', circulating_supply: 1929919291929, quote: {USD: {fully_diluted_market_cap: 1212121211, price: 41632.147753521356, market_cap: 791738578891.785, volume_24h: 28838242204.710552, percent_change_24h: 0.71761542, percent_change_7d: 0.78095225}}},
//     {id: 9, max_supply: 200000000, cmc_rank: 1, name: 'Bitcoin', symbol: 'BTC', circulating_supply: 1929919291929, quote: {USD: {fully_diluted_market_cap: 1212121211, price: 41632.147753521356, market_cap: 791738578891.785, volume_24h: 28838242204.710552, percent_change_24h: 0.71761542, percent_change_7d: 0.78095225}}},
//     {id: 10, max_supply: 200000000, cmc_rank: 1, name: 'Bitcoin', symbol: 'BTC', circulating_supply: 1929919291929, quote: {USD: {fully_diluted_market_cap: 1212121211, price: 41632.147753521356, market_cap: 791738578891.785, volume_24h: 28838242204.710552, percent_change_24h: 0.71761542, percent_change_7d: 0.78095225}}},
//     {id: 11, max_supply: 200000000, cmc_rank: 1, name: 'Bitcoin', symbol: 'BTC', circulating_supply: 1929919291929, quote: {USD: {fully_diluted_market_cap: 1212121211, price: 41632.147753521356, market_cap: 791738578891.785, volume_24h: 28838242204.710552, percent_change_24h: 0.71761542, percent_change_7d: 0.78095225}}},
//     {id: 12, max_supply: 200000000, cmc_rank: 1, name: 'Bitcoin', symbol: 'BTC', circulating_supply: 1929919291929, quote: {USD: {fully_diluted_market_cap: 1212121211, price: 41632.147753521356, market_cap: 791738578891.785, volume_24h: 28838242204.710552, percent_change_24h: 0.71761542, percent_change_7d: 0.78095225}}},
//     {id: 13, max_supply: 200000000, cmc_rank: 1, name: 'Bitcoin', symbol: 'BTC', circulating_supply: 1929919291929, quote: {USD: {fully_diluted_market_cap: 1212121211, price: 41632.147753521356, market_cap: 791738578891.785, volume_24h: 28838242204.710552, percent_change_24h: 0.71761542, percent_change_7d: 0.78095225}}},
//     {id: 14, max_supply: 200000000, cmc_rank: 1, name: 'Bitcoin', symbol: 'BTC', circulating_supply: 1929919291929, quote: {USD: {fully_diluted_market_cap: 1212121211, price: 41632.147753521356, market_cap: 791738578891.785, volume_24h: 28838242204.710552, percent_change_24h: 0.71761542, percent_change_7d: 0.78095225}}},
//     {id: 15, max_supply: 200000000, cmc_rank: 1, name: 'Bitcoin', symbol: 'BTC', circulating_supply: 1929919291929, quote: {USD: {fully_diluted_market_cap: 1212121211, price: 41632.147753521356, market_cap: 791738578891.785, volume_24h: 28838242204.710552, percent_change_24h: 0.71761542, percent_change_7d: 0.78095225}}},
//     {id: 16, max_supply: 200000000, cmc_rank: 1, name: 'Bitcoin', symbol: 'BTC', circulating_supply: 1929919291929, quote: {USD: {fully_diluted_market_cap: 1212121211, price: 41632.147753521356, market_cap: 791738578891.785, volume_24h: 28838242204.710552, percent_change_24h: 0.71761542, percent_change_7d: 0.78095225}}},
//     {id: 17, max_supply: 200000000, cmc_rank: 1, name: 'Bitcoin', symbol: 'BTC', circulating_supply: 1929919291929, quote: {USD: {fully_diluted_market_cap: 1212121211, price: 41632.147753521356, market_cap: 791738578891.785, volume_24h: 28838242204.710552, percent_change_24h: 0.71761542, percent_change_7d: 0.78095225}}},
//     {id: 18, max_supply: 200000000, cmc_rank: 1, name: 'Bitcoin', symbol: 'BTC', circulating_supply: 1929919291929, quote: {USD: {fully_diluted_market_cap: 1212121211, price: 41632.147753521356, market_cap: 791738578891.785, volume_24h: 28838242204.710552, percent_change_24h: 0.71761542, percent_change_7d: 0.78095225}}},
// ]
