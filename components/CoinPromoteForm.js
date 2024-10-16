import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PaymentIcon from '@mui/icons-material/Payment';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Autocomplete, TextField, Radio, RadioGroup, FormControlLabel } from '@mui/material';

const PromoteCoinForm = () => {
  const [selectedToken, setSelectedToken] = useState({ label: 'Bitcoin (BTC)' });
  const [selectedPackage, setSelectedPackage] = useState({ value: '0.05 BNB', label: '1 day promoted + 500 votes', day: 1 });
  const [paymentCurrency, setPaymentCurrency] = useState('BNB');

  const availableTokens = [
    { label: 'Bitcoin (BTC)' },
    { label: 'Ethereum (ETH)' },
    { label: 'Binance Coin (BNB)' },
    { label: 'Solana (SOL)' },
    { label: 'Dogecoin (DOGE)' },
    { label: 'Cardano (ADA)' },
  ];

  // Dynamic packages based on selected currency
  const packageOptions = {
    BNB: [
      { value: '0.05 BNB', label: '1 day promoted + 500 votes', day: 1 },
      { value: '0.1 BNB', label: '3 days promoted + 1500 votes', day: 3 },
      { value: '0.18 BNB', label: '7 days promoted + 3500 votes', day: 7 },
    ],
    SOL: [
      { value: '0.1 SOL', label: '1 day promoted + 400 votes', day: 1 },
      { value: '0.3 SOL', label: '3 days promoted + 1200 votes', day: 3 },
      { value: '0.6 SOL', label: '7 days promoted + 3000 votes', day: 7 },
    ],
    ETH: [
      { value: '0.1 ETH', label: '1 day promoted + 500 votes', day: 1 },
      { value: '0.3 ETH', label: '3 days promoted + 1500 votes', day: 3 },
      { value: '0.6 ETH', label: '7 days promoted + 3500 votes', day: 7 },
    ],
  };

  const packages = packageOptions[paymentCurrency]; // Fetch based on currency

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      {/* Info Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="min-h-28 flex flex-wrap items-center justify-center space-x-2 border-white py-3 px-4 text-center rounded-lg w-[32%] border-2">
          <SearchIcon className="text-3xl font-semibold" />
          <span className="text-xl font-semibold">Get Visitors</span>
          <span className="w-full text-sm opacity-65">More than 75,000 views daily</span>
        </div>
        <div className="min-h-28 flex flex-wrap items-center justify-center space-x-2 border-white py-3 px-4 text-center rounded-lg w-[32%] border-2">
          <PaymentIcon className="text-3xl font-semibold" />
          <span className="text-xl font-semibold">Web3 Payment</span>
          <span className="w-full text-sm opacity-65">Safe & Instant crypto payment</span>
        </div>
        <div className="min-h-28 flex flex-wrap items-center justify-center space-x-2 border-white py-3 px-4 text-center rounded-lg w-[32%] border-2">
          <HelpOutlineIcon className="text-3xl font-semibold" />
          <span className="text-xl font-semibold">How to use?</span>
          <span className="w-full text-sm opacity-65">Select token, duration, and click pay now!</span>
        </div>
      </div>

      {/* Select Token (Searchable Dropdown) */}
      <div className="mb-4">
        <label className="block text-sm mb-2">1. Select Your Token</label>
        <Autocomplete
  options={availableTokens}
  getOptionLabel={(option) => option.label}
  renderInput={(params) => (
    <TextField
      {...params}
      placeholder="Search coin by name"
      variant="outlined"
      fullWidth
      sx={{
        bgcolor: 'gray.700',
        color: 'white',
        '& .MuiOutlinedInput-root': {
          '& input': {
            color: 'white', // Input text color
          },
          '& fieldset': {
            borderColor: '#555', // Customize border color
          },
          '&:hover fieldset': {
            borderColor: '#777',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#FFD700', // Focus border color (yellow)
          },
        },
        '& .MuiInputLabel-root': {
          color: 'white', // Label color
        },
        '& .MuiAutocomplete-endAdornment svg': {
          color: 'white', // Arrow icon color
        },
      }}
    />
  )}
  value={selectedToken}
  onChange={(e, value) => setSelectedToken(value)}
/>

      </div>

      {/* Select Payment Currency */}
      <div className="flex flex-col items-start mb-4">
  <label className="block text-sm mb-2">2. Select Payment Currency</label>
  <div className="flex bg-gray-700 rounded-lg overflow-hidden">
    {['BNB', 'SOL', 'ETH'].map((currency, index) => (
      <div
        key={currency}
        className={`flex-1 px-4 py-2 text-center cursor-pointer border border-gray-600 ${
          paymentCurrency === currency ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'
        } ${index === 0 ? 'rounded-l-lg' : ''} ${
          index === 2 ? 'rounded-r-lg' : ''
        }`}
        onClick={() => {
          setPaymentCurrency(currency);
          setSelectedPackage(packageOptions[currency][0]); // Default to first package on change
        }}
      >
        <span>{currency}</span>
      </div>
    ))}
  </div>
</div>



      {/* Select Package (Radio Group with Custom Styling) */}
      <div className="mb-4">
        <label className="block text-sm mb-2">3. Select Package</label>
        <RadioGroup
          value={selectedPackage}
          onChange={(e) => setSelectedPackage(JSON.parse(e.target.value))}
        >
          {packages.map((pkg) => (
            <FormControlLabel
              key={pkg.value}
              value={JSON.stringify(pkg)} // Store the entire object as a string in the value
              control={<Radio />}
              label={`${pkg.value} - ${pkg.label}`}
              sx={{
                '& .MuiRadio-root': {
                  color: '#FFD700', // Customize radio button color
                },
                '& .MuiFormControlLabel-label': {
                  fontWeight: 'bold',
                },
              }}
            />
          ))}
        </RadioGroup>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <label className="block text-sm mb-2">4. Summary</label>
        <div className="p-4 bg-gray-700 rounded-lg">
          <p>Service: <strong>{selectedPackage.label}</strong></p>
          <p>Days: <strong>{selectedPackage.day}</strong></p>
          <p>Price: <strong>{selectedPackage.value}</strong></p>
        </div>
      </div>

      {/* Pay Button */}
      <div className="text-center">
        <button className="w-full bg-yellow-500 py-3 rounded-lg hover:bg-yellow-600 focus:outline-none">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PromoteCoinForm;
