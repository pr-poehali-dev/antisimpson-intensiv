import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const targetDate = new Date('2025-10-17T19:00:00+03:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setParallaxOffset(scrolled * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо за регистрацию! Мы свяжемся с вами в ближайшее время.');
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Countdown Timer */}
      <div className="bg-accent text-white py-4 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <p className="text-lg font-semibold">До начала интенсива осталось:</p>
            <div className="flex gap-3 md:gap-6">
              <div className="text-center">
                <div className="bg-white/20 rounded-lg px-4 py-2 min-w-[70px]">
                  <p className="text-3xl font-bold">{timeLeft.days}</p>
                  <p className="text-xs opacity-90">дней</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-lg px-4 py-2 min-w-[70px]">
                  <p className="text-3xl font-bold">{timeLeft.hours}</p>
                  <p className="text-xs opacity-90">часов</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-lg px-4 py-2 min-w-[70px]">
                  <p className="text-3xl font-bold">{timeLeft.minutes}</p>
                  <p className="text-xs opacity-90">минут</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-lg px-4 py-2 min-w-[70px]">
                  <p className="text-3xl font-bold">{timeLeft.seconds}</p>
                  <p className="text-xs opacity-90">секунд</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted scroll-reveal" style={{ transform: `translateY(${parallaxOffset}px)` }}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="animate-fade-in order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                Антисамозванец: как перестать сомневаться в себе и начать действовать
              </h1>
              <p className="text-lg md:text-xl text-secondary mb-8 leading-relaxed">
                Онлайн-интенсив для помогающих специалистов, которые устали чувствовать, что всё время "не дотягивают", и хотят наконец выйти на новый уровень в профессии и доходе.
              </p>
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-white font-semibold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                onClick={() => scrollToSection('registration')}
              >
                Записаться на интенсив
              </Button>
            </div>

            <div className="relative animate-fade-in order-1 md:order-2 group">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop" 
                  alt="Confident professional"
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="intro" className="py-20 px-4 bg-white scroll-reveal">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-lg leading-relaxed">
              <p className="text-secondary">Вас благодарят клиенты.</p>
              <p className="text-secondary">Коллеги говорят, что вы классный специалист.</p>
              <p className="text-secondary">
                К вам приходят по рекомендации, вы постоянно учитесь, стараетесь, вкладываетесь.
              </p>
              <p className="text-secondary">И вроде бы всё хорошо.</p>
              <p className="text-secondary mt-8">
                Но внутри всё равно время от времени подкрадывается это чувство - будто вы не до конца настоящий профессионал.
              </p>
              <div className="bg-accent/10 border-l-4 border-accent p-6 my-6">
                <p className="text-primary font-semibold">Как будто просто повезло.</p>
                <p className="text-primary font-semibold mt-2">
                  Как будто всё держится не на вас, а на удаче или хороших клиентах.
                </p>
              </div>
              <p className="text-secondary">
                И когда кто-то говорит: Вы такой крутой эксперт, внутри что-то сжимается.
              </p>
              <p className="text-secondary">
                Хочется улыбнуться и сказать спасибо, но в голове крутится:
              </p>
              <p className="text-accent italic text-xl font-medium text-center my-6">
                Это не про меня...
              </p>
              
              <div className="mt-8 text-center">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-white font-bold text-lg px-10 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 animate-pulse"
                  onClick={() => scrollToSection('registration')}
                >
                  Хватит сомневаться - запишитесь сейчас!
                </Button>
              </div>
            </div>
            
            <div>
              <img 
                src="https://cdn.poehali.dev/files/14faf318-1cd2-40b3-a5a3-0d7e0175bebe.png" 
                alt="Сомнительно но окей"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="registration" className="py-20 px-4 bg-accent/5 scroll-reveal">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
            Запишитесь на интенсив
          </h2>
          <p className="text-secondary text-center mb-8">
            Заполните форму, и мы свяжемся с вами для подтверждения регистрации
          </p>
          
          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Имя
                  </label>
                  <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ваше имя"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Телефон
                  </label>
                  <Input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-white">
                  Зарегистрироваться
                </Button>
                
                <div className="flex items-center gap-4 mt-6 pt-6 border-t">
                  <Icon name="Phone" className="text-accent" size={24} />
                  <div>
                    <p className="text-sm text-secondary">Есть вопросы? Звоните:</p>
                    <a href="tel:+79147043536" className="text-lg font-semibold text-primary hover:text-accent transition-colors">
                      +7 914 704-35-36
                    </a>
                    <p className="text-sm text-secondary">Менеджер: Екатерина</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pt-4">
                  <Icon name="MessageCircle" className="text-green-600" size={24} />
                  <div>
                    <p className="text-sm text-secondary">Или напишите в WhatsApp:</p>
                    <a 
                      href="https://wa.me/79147043536" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-green-600 hover:text-green-700 transition-colors"
                    >
                      Написать в WhatsApp
                    </a>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-primary text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-sm opacity-80">
            &copy; 2025 Антисамозванец. Все права защищены.
          </p>
          <div className="mt-4 flex justify-center gap-4 text-sm">
            <a href="tel:+79147043536" className="hover:text-accent transition-colors">
              +7 914 704-35-36
            </a>
            <span className="opacity-50">|</span>
            <a 
              href="https://wa.me/79147043536" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              WhatsApp
            </a>
          </div>
          <p className="text-xs opacity-60 mt-2">Менеджер: Екатерина</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
