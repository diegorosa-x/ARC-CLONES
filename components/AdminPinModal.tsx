
import React, { useState } from 'react';

interface AdminPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AdminPinModal: React.FC<AdminPinModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // PIN definido via env ou padrão de segurança para dev
    const validPin = process.env.ADMIN_PIN || '1234';

    if (pin === validPin) {
      sessionStorage.setItem('admin_auth', 'true');
      setError(false);
      onSuccess();
    } else {
      setError(true);
      setPin('');
      // Shake effect placeholder ou feedback visual
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-brand-bg border border-brand-muted p-10 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="text-center mb-8">
          <i className="fa-solid fa-lock text-brand-gold text-3xl mb-4"></i>
          <h2 className="text-lg font-brand font-bold uppercase tracking-widest text-slate-900 dark:text-white">Acesso Restrito</h2>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-2">Insira o PIN de Administrador</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            autoFocus
            type="password"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value);
              setError(false);
            }}
            placeholder="••••"
            className={`w-full bg-brand-muted/20 border ${error ? 'border-red-500' : 'border-brand-muted'} p-4 text-center text-2xl tracking-[1em] focus:ring-1 focus:ring-brand-gold outline-none transition-all text-slate-900 dark:text-white`}
          />
          
          {error && (
            <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest text-center animate-bounce">
              PIN INCORRETO. ACESSO NEGADO.
            </p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={onClose}
              className="py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-brand-gold text-brand-bg py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-lg"
            >
              Validar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPinModal;
