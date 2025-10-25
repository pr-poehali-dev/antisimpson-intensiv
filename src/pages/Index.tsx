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
      setParallaxOffset(scrolled);
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
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
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

            <div className="relative animate-fade-in order-1 md:order-2">
              <div 
                className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-100 will-change-transform" 
                style={{ transform: `translateY(${-parallaxOffset * 0.15}px) scale(${1 + parallaxOffset * 0.00005})` }}
              >
                <img 
                  src="https://cdn.poehali.dev/files/6eff48de-9aa2-42ca-a633-a2ac128405c7.png" 
                  alt="Ксения Леонова"
                  className="w-full h-auto object-cover transition-all duration-500 ease-out hover:scale-110"
                />
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
            
            <div className="space-y-6">
              <img 
                src="https://cdn.poehali.dev/files/e87e9311-4201-47ce-9e54-a513908bf9de.png" 
                alt="Профессиональный успех"
                className="w-full rounded-lg shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              />
              <img 
                src="https://cdn.poehali.dev/files/14faf318-1cd2-40b3-a5a3-0d7e0175bebe.png" 
                alt="Сомнительно но окей"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Amplification Section */}
      <section id="amplification" className="py-20 px-4 bg-muted scroll-reveal">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
            И что, если с вами всё в порядке?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://cdn.poehali.dev/files/3a0b53bd-3034-466a-b25f-32aab2f30724.jpg" 
                alt="Профессиональный эксперт"
                className="w-full rounded-lg shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              />
            </div>
            
            <div className="space-y-4 text-lg leading-relaxed order-1 md:order-2">
              <p className="text-secondary">
                Вы снова редактируете пост о себе, откладываете запуск группы, потому что
              </p>
              <p className="text-accent italic font-medium bg-white p-4 rounded-lg shadow-sm">
                Не поднимаете цену, потому что все клиенты разбегутся, кто будет мне платить такие деньги? Решу чуть-чуть и буду готова.
              </p>
              <p className="text-secondary">
                Записываетесь на новое обучение, надеясь, что после него наконец почувствуете уверенность.
              </p>
              <p className="text-secondary">
                Но вместо неё приходит тревога - та самая, которая шепчет:
              </p>
              <p className="text-accent italic text-xl font-medium text-center my-6">
                Ты ещё не достаточна. Подожди. Потом.
              </p>
              <p className="text-secondary">
                И внутри появляется тяжёлая усталость. Не от клиентов. Не от работы.
              </p>
              <p className="text-accent italic font-medium text-center text-xl mt-6">
                А от постоянной борьбы с собой...
              </p>
              
              <div className="mt-8 text-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white font-bold text-lg px-10 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                  onClick={() => scrollToSection('registration')}
                >
                  Пора остановить эту борьбу ⚡
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Section */}
      <section id="understanding" className="py-20 px-4 bg-white scroll-reveal">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
            Почему так?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-lg leading-relaxed">
              <p className="text-secondary">
                Почти все умные, образованные и честные эксперты через это проходят.
              </p>
              <p className="text-secondary">
                Синдром самозванца - не про слабость.
              </p>
              <p className="text-secondary">Это просто показатель того, что вы...</p>
              <p className="text-accent italic font-medium text-center text-xl my-6">
                об это как раз интенсив, вы увидите что именно он показывает каждому из нас.
              </p>
              <p className="text-secondary">
                Проблема в том, что когда вы не понимаете, как с ним обращаться,
              </p>
              <p className="text-accent font-semibold text-xl text-center my-4">
                он превращается в тормоз.
              </p>
              
              <div className="mt-8 text-center">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-10 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                  onClick={() => scrollToSection('registration')}
                >
                  Узнать, как это исправить 🔥
                </Button>
              </div>
            </div>
            
            <div>
              <img 
                src="https://cdn.poehali.dev/files/e014bebd-4e7e-444b-b138-cb89ddd22aeb.jpeg" 
                alt="Специалист за работой"
                className="w-full rounded-lg shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 px-4 bg-gradient-to-b from-accent/5 to-white scroll-reveal">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
            А что, если всё иначе?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://cdn.poehali.dev/files/c32eddd7-b598-4255-a78b-d2069594cacb.jpg" 
                alt="Ты говоришь что у меня синдром самозванца"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            <div className="space-y-4 text-lg leading-relaxed order-1 md:order-2">
              <p className="text-secondary">
                А если синдром самозванца - это не то, что нужно убить,
              </p>
              <p className="text-secondary">а то, что нужно понять?</p>
              <p className="text-secondary">
                Он появляется не потому, что вы плохой специалист,
              </p>
              <p className="text-secondary">а потому, что ... это вы узнаете на</p>
              <p className="text-accent italic font-medium text-center text-xl my-6">интенсиве)</p>
              <p className="text-secondary">
                Его невозможно убрать навсегда. Но можно научиться управлять им.
              </p>
              <p className="text-secondary">
                Понимать, когда он говорит правду, а когда просто пугает.
              </p>
              <p className="text-secondary">
                И возвращать себе уверенность - спокойно, без надрыва...
              </p>
              
              <div className="mt-8 text-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg px-10 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                  onClick={() => scrollToSection('registration')}
                >
                  Я готов узнать больше! ✨
                </Button>
              </div>
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

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/79147043536"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse-glow group"
        aria-label="Написать в WhatsApp"
      >
        <Icon name="MessageCircle" size={28} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">1</span>
      </a>

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