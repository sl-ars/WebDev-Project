export interface Message {
  message: string
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
  type: string,
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
    name: string,
    symbol: string,
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
    description: string,
    logo: string,
    urls: {
        website: string[],
        twitter: string[],
        facebook: string[],
        reddit: string[],
        technical_doc: string[],
        source_code: string[]
    }
}
