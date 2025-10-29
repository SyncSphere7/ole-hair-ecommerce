// Comprehensive list of world currencies
export interface Currency {
  code: string
  name: string
  symbol: string
  flag: string
  locale: string
}

export const CURRENCIES: Currency[] = [
  // Major currencies first
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', locale: 'en-US' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', locale: 'en-EU' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', locale: 'en-GB' },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'UGX', flag: '🇺🇬', locale: 'en-UG' },
  
  // African currencies
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪', locale: 'en-KE' },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', flag: '🇹🇿', locale: 'en-TZ' },
  { code: 'RWF', name: 'Rwandan Franc', symbol: 'RF', flag: '🇷🇼', locale: 'en-RW' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬', locale: 'en-NG' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', flag: '🇬🇭', locale: 'en-GH' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦', locale: 'en-ZA' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: '£E', flag: '🇪🇬', locale: 'ar-EG' },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'DH', flag: '🇲🇦', locale: 'ar-MA' },
  { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br', flag: '🇪🇹', locale: 'am-ET' },
  
  // Asian currencies
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', locale: 'ja-JP' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', locale: 'zh-CN' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', locale: 'en-IN' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷', locale: 'ko-KR' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', locale: 'en-SG' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰', locale: 'en-HK' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭', locale: 'th-TH' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾', locale: 'ms-MY' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩', locale: 'id-ID' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭', locale: 'en-PH' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳', locale: 'vi-VN' },
  
  // Middle Eastern currencies
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪', locale: 'ar-AE' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦', locale: 'ar-SA' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: '﷼', flag: '🇶🇦', locale: 'ar-QA' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', flag: '🇰🇼', locale: 'ar-KW' },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب', flag: '🇧🇭', locale: 'ar-BH' },
  { code: 'OMR', name: 'Omani Rial', symbol: '﷼', flag: '🇴🇲', locale: 'ar-OM' },
  { code: 'JOD', name: 'Jordanian Dinar', symbol: 'د.ا', flag: '🇯🇴', locale: 'ar-JO' },
  { code: 'LBP', name: 'Lebanese Pound', symbol: '£L', flag: '🇱🇧', locale: 'ar-LB' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱', locale: 'he-IL' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷', locale: 'tr-TR' },
  { code: 'IRR', name: 'Iranian Rial', symbol: '﷼', flag: '🇮🇷', locale: 'fa-IR' },
  
  // European currencies
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭', locale: 'de-CH' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴', locale: 'nb-NO' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪', locale: 'sv-SE' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰', locale: 'da-DK' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱', locale: 'pl-PL' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿', locale: 'cs-CZ' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺', locale: 'hu-HU' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei', flag: '🇷🇴', locale: 'ro-RO' },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', flag: '🇧🇬', locale: 'bg-BG' },
  { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn', flag: '🇭🇷', locale: 'hr-HR' },
  { code: 'RSD', name: 'Serbian Dinar', symbol: 'дин', flag: '🇷🇸', locale: 'sr-RS' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺', locale: 'ru-RU' },
  { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴', flag: '🇺🇦', locale: 'uk-UA' },
  
  // Americas currencies
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', locale: 'en-CA' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽', locale: 'es-MX' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷', locale: 'pt-BR' },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$', flag: '🇦🇷', locale: 'es-AR' },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$', flag: '🇨🇱', locale: 'es-CL' },
  { code: 'COP', name: 'Colombian Peso', symbol: '$', flag: '🇨🇴', locale: 'es-CO' },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', flag: '🇵🇪', locale: 'es-PE' },
  { code: 'UYU', name: 'Uruguayan Peso', symbol: '$U', flag: '🇺🇾', locale: 'es-UY' },
  { code: 'BOB', name: 'Bolivian Boliviano', symbol: 'Bs', flag: '🇧🇴', locale: 'es-BO' },
  { code: 'PYG', name: 'Paraguayan Guarani', symbol: '₲', flag: '🇵🇾', locale: 'es-PY' },
  
  // Oceania currencies
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', locale: 'en-AU' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿', locale: 'en-NZ' },
  { code: 'FJD', name: 'Fijian Dollar', symbol: 'FJ$', flag: '🇫🇯', locale: 'en-FJ' },
  
  // More African currencies
  { code: 'XOF', name: 'West African CFA Franc', symbol: 'CFA', flag: '🌍', locale: 'fr-SN' },
  { code: 'XAF', name: 'Central African CFA Franc', symbol: 'FCFA', flag: '🌍', locale: 'fr-CM' },
  { code: 'BWP', name: 'Botswana Pula', symbol: 'P', flag: '🇧🇼', locale: 'en-BW' },
  { code: 'NAD', name: 'Namibian Dollar', symbol: 'N$', flag: '🇳🇦', locale: 'en-NA' },
  { code: 'SZL', name: 'Swazi Lilangeni', symbol: 'L', flag: '🇸🇿', locale: 'en-SZ' },
  { code: 'LSL', name: 'Lesotho Loti', symbol: 'L', flag: '🇱🇸', locale: 'en-LS' },
  { code: 'MWK', name: 'Malawian Kwacha', symbol: 'MK', flag: '🇲🇼', locale: 'en-MW' },
  { code: 'ZMW', name: 'Zambian Kwacha', symbol: 'ZK', flag: '🇿🇲', locale: 'en-ZM' },
  { code: 'ZWL', name: 'Zimbabwean Dollar', symbol: 'Z$', flag: '🇿🇼', locale: 'en-ZW' },
  { code: 'MZN', name: 'Mozambican Metical', symbol: 'MT', flag: '🇲🇿', locale: 'pt-MZ' },
  { code: 'AOA', name: 'Angolan Kwanza', symbol: 'Kz', flag: '🇦🇴', locale: 'pt-AO' },
  { code: 'DZD', name: 'Algerian Dinar', symbol: 'د.ج', flag: '🇩🇿', locale: 'ar-DZ' },
  { code: 'TND', name: 'Tunisian Dinar', symbol: 'د.ت', flag: '🇹🇳', locale: 'ar-TN' },
  { code: 'LYD', name: 'Libyan Dinar', symbol: 'ل.د', flag: '🇱🇾', locale: 'ar-LY' },
  { code: 'SDG', name: 'Sudanese Pound', symbol: 'ج.س', flag: '🇸🇩', locale: 'ar-SD' },
  
  // More Asian currencies
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩', locale: 'bn-BD' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰', locale: 'ur-PK' },
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: '₨', flag: '🇱🇰', locale: 'si-LK' },
  { code: 'NPR', name: 'Nepalese Rupee', symbol: '₨', flag: '🇳🇵', locale: 'ne-NP' },
  { code: 'BTN', name: 'Bhutanese Ngultrum', symbol: 'Nu', flag: '🇧🇹', locale: 'dz-BT' },
  { code: 'MVR', name: 'Maldivian Rufiyaa', symbol: 'Rf', flag: '🇲🇻', locale: 'dv-MV' },
  { code: 'AFN', name: 'Afghan Afghani', symbol: '؋', flag: '🇦🇫', locale: 'fa-AF' },
  { code: 'UZS', name: 'Uzbek Som', symbol: 'лв', flag: '🇺🇿', locale: 'uz-UZ' },
  { code: 'KZT', name: 'Kazakhstani Tenge', symbol: '₸', flag: '🇰🇿', locale: 'kk-KZ' },
  { code: 'KGS', name: 'Kyrgyzstani Som', symbol: 'лв', flag: '🇰🇬', locale: 'ky-KG' },
  { code: 'TJS', name: 'Tajikistani Somoni', symbol: 'ЅМ', flag: '🇹🇯', locale: 'tg-TJ' },
  { code: 'TMT', name: 'Turkmenistani Manat', symbol: 'T', flag: '🇹🇲', locale: 'tk-TM' },
  { code: 'AZN', name: 'Azerbaijani Manat', symbol: '₼', flag: '🇦🇿', locale: 'az-AZ' },
  { code: 'GEL', name: 'Georgian Lari', symbol: '₾', flag: '🇬🇪', locale: 'ka-GE' },
  { code: 'AMD', name: 'Armenian Dram', symbol: '֏', flag: '🇦🇲', locale: 'hy-AM' },
  { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br', flag: '🇧🇾', locale: 'be-BY' },
  { code: 'MDL', name: 'Moldovan Leu', symbol: 'L', flag: '🇲🇩', locale: 'ro-MD' },
  
  // Caribbean and Central America
  { code: 'JMD', name: 'Jamaican Dollar', symbol: 'J$', flag: '🇯🇲', locale: 'en-JM' },
  { code: 'TTD', name: 'Trinidad Dollar', symbol: 'TT$', flag: '🇹🇹', locale: 'en-TT' },
  { code: 'BBD', name: 'Barbadian Dollar', symbol: 'Bds$', flag: '🇧🇧', locale: 'en-BB' },
  { code: 'BSD', name: 'Bahamian Dollar', symbol: 'B$', flag: '🇧🇸', locale: 'en-BS' },
  { code: 'BZD', name: 'Belize Dollar', symbol: 'BZ$', flag: '🇧🇿', locale: 'en-BZ' },
  { code: 'GTQ', name: 'Guatemalan Quetzal', symbol: 'Q', flag: '🇬🇹', locale: 'es-GT' },
  { code: 'HNL', name: 'Honduran Lempira', symbol: 'L', flag: '🇭🇳', locale: 'es-HN' },
  { code: 'NIO', name: 'Nicaraguan Córdoba', symbol: 'C$', flag: '🇳🇮', locale: 'es-NI' },
  { code: 'CRC', name: 'Costa Rican Colón', symbol: '₡', flag: '🇨🇷', locale: 'es-CR' },
  { code: 'PAB', name: 'Panamanian Balboa', symbol: 'B/.', flag: '🇵🇦', locale: 'es-PA' },
  { code: 'DOP', name: 'Dominican Peso', symbol: 'RD$', flag: '🇩🇴', locale: 'es-DO' },
  { code: 'HTG', name: 'Haitian Gourde', symbol: 'G', flag: '🇭🇹', locale: 'ht-HT' },
  { code: 'CUP', name: 'Cuban Peso', symbol: '₱', flag: '🇨🇺', locale: 'es-CU' },
  
  // Pacific currencies
  { code: 'WST', name: 'Samoan Tala', symbol: 'WS$', flag: '🇼🇸', locale: 'en-WS' },
  { code: 'TOP', name: 'Tongan Paʻanga', symbol: 'T$', flag: '🇹🇴', locale: 'to-TO' },
  { code: 'VUV', name: 'Vanuatu Vatu', symbol: 'VT', flag: '🇻🇺', locale: 'en-VU' },
  { code: 'SBD', name: 'Solomon Islands Dollar', symbol: 'SI$', flag: '🇸🇧', locale: 'en-SB' },
  { code: 'PGK', name: 'Papua New Guinea Kina', symbol: 'K', flag: '🇵🇬', locale: 'en-PG' },
  
  // Cryptocurrencies (popular ones)
  { code: 'BTC', name: 'Bitcoin', symbol: '₿', flag: '₿', locale: 'en-US' },
  { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', flag: 'Ξ', locale: 'en-US' },
]

// Default currency (UGX - current base currency)
export const DEFAULT_CURRENCY = 'UGX'

// Popular currencies to show first in selector
export const POPULAR_CURRENCIES = [
  'USD', 'EUR', 'GBP', 'UGX', 'KES', 'TZS', 'RWF', 'NGN', 'GHS', 'ZAR',
  'JPY', 'CNY', 'INR', 'AUD', 'CAD', 'CHF', 'AED', 'SAR'
]

export function getCurrency(code: string): Currency | undefined {
  return CURRENCIES.find(currency => currency.code === code)
}

export function getPopularCurrencies(): Currency[] {
  return POPULAR_CURRENCIES.map(code => getCurrency(code)).filter(Boolean) as Currency[]
}

export function getAllCurrencies(): Currency[] {
  return CURRENCIES
}