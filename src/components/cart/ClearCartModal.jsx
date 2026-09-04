import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AlertCircle } from 'lucide-react';

export function ClearCartModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Clear Shopping Bag" maxWidth="max-w-md">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-md bg-zinc-100 text-zinc-700 flex items-center justify-center shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5" />
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Are you sure you want to clear your shopping bag? All saved selections will be removed.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-zinc-100">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Clear Bag
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ClearCartModal;
