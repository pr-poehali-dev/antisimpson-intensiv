import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const notifyPayment = async () => {
      const invoiceId = searchParams.get('InvId') || searchParams.get('invId');
      const outSum = searchParams.get('OutSum') || searchParams.get('outSum');
      
      try {
        const response = await fetch('https://functions.poehali.dev/392adbef-ec19-4693-a6ac-d8ad00c822c0', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'payment_success',
            invoiceId,
            amount: outSum,
            timestamp: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setIsProcessing(false);
      }
    };

    notifyPayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {isProcessing ? (
          <>
            <Loader2 className="w-16 h-16 text-purple-600 animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Обработка платежа...
            </h1>
            <p className="text-gray-600">
              Пожалуйста, подождите
            </p>
          </>
        ) : (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Оплата прошла успешно!
            </h1>
            <p className="text-gray-600 mb-6">
              Спасибо за регистрацию на интенсив! Мы отправили подтверждение на вашу почту.
            </p>
            {error && (
              <p className="text-sm text-amber-600 mb-4">
                Уведомление может быть отправлено с задержкой
              </p>
            )}
            <Link to="/">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Вернуться на главную
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
