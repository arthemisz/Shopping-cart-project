import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Check, ShieldCheck, CreditCard } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/formatters';

const FORM_FIELDS = [
  { key: 'name', label: 'Full Name', type: 'text', colSpan: 'sm:col-span-2' },
  { key: 'email', label: 'Email Address', type: 'email', colSpan: 'sm:col-span-2' },
  { key: 'address', label: 'Delivery Address', type: 'text', colSpan: 'sm:col-span-2' },
  { key: 'city', label: 'City', type: 'text', colSpan: '' },
  { key: 'zip', label: 'Postal Code', type: 'text', colSpan: '' },
];

export function CheckoutModal({ isOpen, onClose }) {
  const { items, total, clearCart } = useCart();
  const { addToast } = useToast();
  const [placed, setPlaced] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [formData, setFormData] = useState({
    name: 'Alexander Wright',
    email: 'alexander.wright@example.com',
    address: '450 Park Avenue',
    city: 'New York',
    zip: '10022',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const ref = `NX-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(ref);
    setPlaced(true);
    addToast({ title: 'Order Confirmed', message: `Reference ${ref} received.`, type: 'success' });
    setTimeout(clearCart, 500);
  };

  const handleClose = () => {
    setPlaced(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={placed ? 'Order Receipt' : 'Checkout & Dispatch'} maxWidth="max-w-lg">
      {placed ? (
        <div className="space-y-6 text-center py-4">
          <div className="w-12 h-12 bg-zinc-950 text-white rounded-full flex items-center justify-center mx-auto">
            <Check className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-zinc-950">Order Confirmed</h3>
            <p className="text-xs text-zinc-500">
              Reference: <span className="font-mono font-bold text-zinc-900">{orderRef}</span>
            </p>
          </div>

          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 text-xs text-zinc-600 text-left space-y-2">
            <div className="flex justify-between border-b border-zinc-200 pb-2">
              <span className="text-zinc-500">Recipient:</span>
              <span className="font-semibold text-zinc-900">{formData.name}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-2">
              <span className="text-zinc-500">Confirmation Sent To:</span>
              <span className="font-semibold text-zinc-900">{formData.email}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-2">
              <span className="text-zinc-500">Shipping Address:</span>
              <span className="text-right font-medium text-zinc-900">{formData.address}, {formData.city}, {formData.zip}</span>
            </div>
            <div className="flex justify-between pt-1 font-bold text-zinc-950 text-sm">
              <span>Total Charged:</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <p className="text-[11px] text-zinc-400">A shipping notification with tracking details will follow once dispatched.</p>
          <Button variant="primary" size="md" className="w-full" onClick={handleClose}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 text-xs text-zinc-600">
            <span className="flex items-center gap-1.5 font-medium">
              <CreditCard className="w-4 h-4 text-zinc-500" /> Express Checkout
            </span>
            <span className="font-bold text-zinc-950">{formatPrice(total)} ({items.length} items)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {FORM_FIELDS.map(({ key, label, type, colSpan }) => (
              <div key={key} className={colSpan}>
                <label className="block font-medium text-zinc-700 mb-1">{label}</label>
                <input
                  type={type}
                  required
                  value={formData[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-md text-zinc-900 text-xs focus-ring"
                />
              </div>
            ))}
          </div>

          <div className="p-3 bg-zinc-50 rounded-md border border-zinc-200 flex items-center justify-between text-xs text-zinc-600">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-zinc-700" /> Test Mode (Demo authorization)
            </span>
            <span className="font-bold text-zinc-950">{formatPrice(total)}</span>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <Button variant="outline" size="md" onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="primary" size="md">
              Complete Order • {formatPrice(total)}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export default CheckoutModal;
