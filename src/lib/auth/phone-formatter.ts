import { parsePhoneNumber, isValidPhoneNumber, CountryCode } from 'libphonenumber-js'

/**
 * Format phone number to E.164 format (+256...)
 * Note: dialCode in COMMON_COUNTRIES doesn't have +, but E.164 format adds it
 */
export function formatPhoneNumber(phone: string, defaultCountry: CountryCode = 'UG'): string {
  try {
    const phoneNumber = parsePhoneNumber(phone, defaultCountry)
    return phoneNumber.format('E.164')
  } catch (error) {
    throw new Error('Invalid phone number')
  }
}

/**
 * Validate phone number
 */
export function validatePhoneNumber(phone: string, defaultCountry: CountryCode = 'UG'): boolean {
  return isValidPhoneNumber(phone, defaultCountry)
}

/**
 * Get country code from phone number
 */
export function getCountryCode(phone: string): string | undefined {
  try {
    const phoneNumber = parsePhoneNumber(phone)
    return phoneNumber?.country
  } catch {
    return undefined
  }
}

/**
 * Format phone number for display (national format)
 */
export function formatPhoneForDisplay(phone: string, defaultCountry: CountryCode = 'UG'): string {
  try {
    const phoneNumber = parsePhoneNumber(phone, defaultCountry)
    return phoneNumber.formatNational()
  } catch {
    return phone
  }
}

/**
 * Country type definition
 */
export type Country = {
  code: string
  name: string
  dialCode: string
  flag: string
}

/**
 * All country codes for selector (no + prefix in display)
 */
export const COMMON_COUNTRIES: Country[] = [
  // East Africa (Top priority)
  { code: 'UG', name: 'Uganda', dialCode: '256', flag: '🇺🇬' },
  { code: 'KE', name: 'Kenya', dialCode: '254', flag: '🇰🇪' },
  { code: 'TZ', name: 'Tanzania', dialCode: '255', flag: '🇹🇿' },
  { code: 'RW', name: 'Rwanda', dialCode: '250', flag: '🇷🇼' },
  { code: 'BI', name: 'Burundi', dialCode: '257', flag: '🇧🇮' },
  { code: 'SS', name: 'South Sudan', dialCode: '211', flag: '🇸🇸' },
  { code: 'ET', name: 'Ethiopia', dialCode: '251', flag: '🇪🇹' },
  { code: 'SO', name: 'Somalia', dialCode: '252', flag: '🇸🇴' },
  
  // West Africa
  { code: 'NG', name: 'Nigeria', dialCode: '234', flag: '🇳🇬' },
  { code: 'GH', name: 'Ghana', dialCode: '233', flag: '🇬🇭' },
  { code: 'SN', name: 'Senegal', dialCode: '221', flag: '🇸🇳' },
  { code: 'CI', name: 'Ivory Coast', dialCode: '225', flag: '🇨🇮' },
  { code: 'ML', name: 'Mali', dialCode: '223', flag: '🇲🇱' },
  { code: 'BF', name: 'Burkina Faso', dialCode: '226', flag: '🇧🇫' },
  { code: 'NE', name: 'Niger', dialCode: '227', flag: '🇳🇪' },
  { code: 'TG', name: 'Togo', dialCode: '228', flag: '🇹🇬' },
  { code: 'BJ', name: 'Benin', dialCode: '229', flag: '🇧🇯' },
  { code: 'LR', name: 'Liberia', dialCode: '231', flag: '🇱🇷' },
  { code: 'SL', name: 'Sierra Leone', dialCode: '232', flag: '🇸🇱' },
  { code: 'GM', name: 'Gambia', dialCode: '220', flag: '🇬🇲' },
  { code: 'GN', name: 'Guinea', dialCode: '224', flag: '🇬🇳' },
  { code: 'GW', name: 'Guinea-Bissau', dialCode: '245', flag: '🇬🇼' },
  { code: 'CV', name: 'Cape Verde', dialCode: '238', flag: '🇨🇻' },
  
  // Southern Africa
  { code: 'ZA', name: 'South Africa', dialCode: '27', flag: '🇿🇦' },
  { code: 'ZW', name: 'Zimbabwe', dialCode: '263', flag: '🇿🇼' },
  { code: 'ZM', name: 'Zambia', dialCode: '260', flag: '🇿🇲' },
  { code: 'MW', name: 'Malawi', dialCode: '265', flag: '🇲🇼' },
  { code: 'MZ', name: 'Mozambique', dialCode: '258', flag: '🇲🇿' },
  { code: 'BW', name: 'Botswana', dialCode: '267', flag: '🇧🇼' },
  { code: 'NA', name: 'Namibia', dialCode: '264', flag: '🇳🇦' },
  { code: 'LS', name: 'Lesotho', dialCode: '266', flag: '🇱🇸' },
  { code: 'SZ', name: 'Eswatini', dialCode: '268', flag: '🇸🇿' },
  
  // North Africa
  { code: 'EG', name: 'Egypt', dialCode: '20', flag: '🇪🇬' },
  { code: 'MA', name: 'Morocco', dialCode: '212', flag: '🇲🇦' },
  { code: 'DZ', name: 'Algeria', dialCode: '213', flag: '🇩🇿' },
  { code: 'TN', name: 'Tunisia', dialCode: '216', flag: '🇹🇳' },
  { code: 'LY', name: 'Libya', dialCode: '218', flag: '🇱🇾' },
  { code: 'SD', name: 'Sudan', dialCode: '249', flag: '🇸🇩' },
  
  // Central Africa
  { code: 'CD', name: 'DR Congo', dialCode: '243', flag: '🇨🇩' },
  { code: 'CG', name: 'Congo', dialCode: '242', flag: '🇨🇬' },
  { code: 'CM', name: 'Cameroon', dialCode: '237', flag: '🇨🇲' },
  { code: 'CF', name: 'Central African Republic', dialCode: '236', flag: '🇨🇫' },
  { code: 'TD', name: 'Chad', dialCode: '235', flag: '🇹🇩' },
  { code: 'GA', name: 'Gabon', dialCode: '241', flag: '🇬🇦' },
  { code: 'GQ', name: 'Equatorial Guinea', dialCode: '240', flag: '🇬🇶' },
  { code: 'ST', name: 'São Tomé and Príncipe', dialCode: '239', flag: '🇸🇹' },
  
  // Europe
  { code: 'GB', name: 'United Kingdom', dialCode: '44', flag: '🇬🇧' },
  { code: 'FR', name: 'France', dialCode: '33', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', dialCode: '49', flag: '🇩🇪' },
  { code: 'IT', name: 'Italy', dialCode: '39', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', dialCode: '34', flag: '🇪🇸' },
  { code: 'NL', name: 'Netherlands', dialCode: '31', flag: '🇳🇱' },
  { code: 'BE', name: 'Belgium', dialCode: '32', flag: '🇧🇪' },
  { code: 'CH', name: 'Switzerland', dialCode: '41', flag: '🇨🇭' },
  { code: 'AT', name: 'Austria', dialCode: '43', flag: '🇦🇹' },
  { code: 'SE', name: 'Sweden', dialCode: '46', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', dialCode: '47', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', dialCode: '45', flag: '🇩🇰' },
  { code: 'FI', name: 'Finland', dialCode: '358', flag: '🇫🇮' },
  { code: 'PL', name: 'Poland', dialCode: '48', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', dialCode: '351', flag: '🇵🇹' },
  { code: 'GR', name: 'Greece', dialCode: '30', flag: '🇬🇷' },
  { code: 'IE', name: 'Ireland', dialCode: '353', flag: '🇮🇪' },
  
  // Americas
  { code: 'US', name: 'United States', dialCode: '1', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', dialCode: '1', flag: '🇨🇦' },
  { code: 'MX', name: 'Mexico', dialCode: '52', flag: '🇲🇽' },
  { code: 'BR', name: 'Brazil', dialCode: '55', flag: '🇧🇷' },
  { code: 'AR', name: 'Argentina', dialCode: '54', flag: '🇦🇷' },
  { code: 'CO', name: 'Colombia', dialCode: '57', flag: '🇨🇴' },
  { code: 'CL', name: 'Chile', dialCode: '56', flag: '🇨🇱' },
  { code: 'PE', name: 'Peru', dialCode: '51', flag: '🇵🇪' },
  { code: 'VE', name: 'Venezuela', dialCode: '58', flag: '🇻🇪' },
  
  // Asia
  { code: 'CN', name: 'China', dialCode: '86', flag: '🇨🇳' },
  { code: 'IN', name: 'India', dialCode: '91', flag: '🇮🇳' },
  { code: 'JP', name: 'Japan', dialCode: '81', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', dialCode: '82', flag: '🇰🇷' },
  { code: 'PK', name: 'Pakistan', dialCode: '92', flag: '🇵🇰' },
  { code: 'BD', name: 'Bangladesh', dialCode: '880', flag: '🇧🇩' },
  { code: 'PH', name: 'Philippines', dialCode: '63', flag: '🇵🇭' },
  { code: 'VN', name: 'Vietnam', dialCode: '84', flag: '🇻🇳' },
  { code: 'TH', name: 'Thailand', dialCode: '66', flag: '🇹🇭' },
  { code: 'MY', name: 'Malaysia', dialCode: '60', flag: '🇲🇾' },
  { code: 'SG', name: 'Singapore', dialCode: '65', flag: '🇸🇬' },
  { code: 'ID', name: 'Indonesia', dialCode: '62', flag: '🇮🇩' },
  { code: 'AE', name: 'UAE', dialCode: '971', flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '966', flag: '🇸🇦' },
  { code: 'TR', name: 'Turkey', dialCode: '90', flag: '🇹🇷' },
  { code: 'IL', name: 'Israel', dialCode: '972', flag: '🇮🇱' },
  
  // Oceania
  { code: 'AU', name: 'Australia', dialCode: '61', flag: '🇦🇺' },
  { code: 'NZ', name: 'New Zealand', dialCode: '64', flag: '🇳🇿' },
]
