import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  ArrowRight,
  CreditCard
} from 'lucide-react';

export const DonatePage: React.FC = () => {
  const navigate = useNavigate();
  const { recordDonation } = useData();
  const { user } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    document.title = 'Donate to Prism • Fuel LGBTQIA+ Sanctuary & Care';
  }, []);

  const [frequency, setFrequency] = useState<'monthly' | 'one-time'>('monthly');
  const [currency, setCurrency] = useState<'₹' | '$'>('₹');
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [donorName, setDonorName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [dedicatedTo, setDedicatedTo] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'wallet'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const presetsINR = [500, 1000, 2500, 5000];
  const presetsUSD = [10, 25, 50, 100];

  const currentPresets = currency === '₹' ? presetsINR : presetsUSD;

  const handlePresetSelect = (val: number) => {
    setAmount(val);
    setIsCustom(false);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    const parsed = parseFloat(e.target.value);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (amount <= 0) {
      addToast({
        type: 'error',
        title: 'Invalid Amount',
        message: 'Please select or enter a valid donation amount.'
      });
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const saved = recordDonation({
        amount,
        currency,
        frequency,
        donorName: isAnonymous ? 'Anonymous Ally' : (donorName.trim() || 'Generous Supporter'),
        isAnonymous,
        dedicatedTo: dedicatedTo.trim() || undefined
      });

      setIsProcessing(false);
      navigate(`/donate/success?id=${saved.id}&amount=${amount}&currency=${encodeURIComponent(currency)}&frequency=${frequency}`);
    }, 800);
  };

  return (
    <div id="donate-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-12">
      <Breadcrumbs items={[{ label: 'Support & Donate' }]} />

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Sustain Life-Saving Community Care</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Invest in Queer Liberation, Healing &amp; Sanctuary
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          100% of community contributions go directly to funding free peer counseling circles, youth crisis interventions, emergency relocation housing, and safe Pride gatherings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Donation Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Frequency Toggle & Currency */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setFrequency('monthly')}
                  className={`px-5 py-2 rounded-xl transition-all ${
                    frequency === 'monthly'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  Give Monthly (Most Impact)
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('one-time')}
                  className={`px-5 py-2 rounded-xl transition-all ${
                    frequency === 'one-time'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  One-Time Gift
                </button>
              </div>

              {/* Currency Selector */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <span>Currency:</span>
                <select
                  value={currency}
                  onChange={(e) => {
                    const c = e.target.value as '₹' | '$';
                    setCurrency(c);
                    setAmount(c === '₹' ? 1000 : 25);
                    setIsCustom(false);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                >
                  <option value="₹">₹ INR (India)</option>
                  <option value="$">$ USD (Global)</option>
                </select>
              </div>
            </div>

            {/* Amount Presets */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Select Amount ({currency})
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {currentPresets.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handlePresetSelect(val)}
                    className={`py-3 px-4 rounded-2xl font-extrabold text-lg border-2 transition-all ${
                      !isCustom && amount === val
                        ? 'border-rose-600 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 hover:border-rose-300'
                    }`}
                  >
                    {currency}{val.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div className="pt-2">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base font-bold text-slate-400">
                    {currency}
                  </span>
                  <input
                    type="number"
                    min="1"
                    value={customAmount}
                    onChange={handleCustomChange}
                    onFocus={() => setIsCustom(true)}
                    placeholder="Or enter a custom gift amount..."
                    className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 ${
                      isCustom ? 'border-rose-600 ring-1 ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Donor Information */}
            <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Donor Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    disabled={isAnonymous}
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="e.g. Maya Lin"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Receipt Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 rounded text-rose-600"
                />
                <span>Make this gift anonymous on public community honor rolls</span>
              </label>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Dedicate this gift in honor or memory of someone (Optional)
                </label>
                <input
                  type="text"
                  value={dedicatedTo}
                  onChange={(e) => setDedicatedTo(e.target.value)}
                  placeholder="e.g. In loving memory of Marsha, or dedicated to chosen family"
                  className="w-full text-xs px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Payment Channel
              </label>
              <div className="grid grid-cols-3 gap-3 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Card / NetBanking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>UPI / QR Code</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'wallet'
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Lock className="w-5 h-5" />
                  <span>Apple / Google Pay</span>
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="pride"
              size="lg"
              isLoading={isProcessing}
              className="w-full shadow-lg shadow-rose-500/20 text-base"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>
                Complete {frequency === 'monthly' ? 'Monthly' : 'One-Time'} Gift of {currency}{amount.toLocaleString()}
              </span>
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <Lock className="w-4 h-4 text-emerald-500" />
              <span>256-bit SSL encrypted. 100% Tax-Deductible Non-Profit Entity.</span>
            </div>
          </form>
        </div>

        {/* Right: Real-World Impact Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-5">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Your Gift In Action
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="font-extrabold text-rose-600 dark:text-rose-400 text-base shrink-0">
                  {currency === '₹' ? '₹500' : '$10'}
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-white block">Crisis Lifeline Connection</strong>
                  <span>Funds emergency phone &amp; text dispatch for three LGBTQIA+ youth in crisis.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="font-extrabold text-indigo-600 dark:text-indigo-400 text-base shrink-0">
                  {currency === '₹' ? '₹1,000' : '$25'}
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-white block">Peer Circle Facilitation</strong>
                  <span>Provides a month of licensed supervision for our weekly trans support circles.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="font-extrabold text-purple-600 dark:text-purple-400 text-base shrink-0">
                  {currency === '₹' ? '₹2,500' : '$50'}
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-white block">Legal Name &amp; Gender Change</strong>
                  <span>Covers court filing fees and notarization for a transgender adult updating identity documents.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="font-extrabold text-emerald-600 dark:text-emerald-400 text-base shrink-0">
                  {currency === '₹' ? '₹5,000' : '$100'}
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-white block">Emergency Shelter Grant</strong>
                  <span>Secures safe temporary housing and grocery stipends for displaced queer youth.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-indigo-950 to-purple-950 text-white p-6 space-y-2 border border-indigo-900">
            <span className="text-xs uppercase tracking-wider font-bold text-rose-300">
              Financial Transparency
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              We publish audited annual financial reports. 88% of every dollar goes directly into community programs and crisis relief, keeping overhead minimal.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
