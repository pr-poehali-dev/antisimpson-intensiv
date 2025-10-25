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
    const targetDate = new Date('2025-11-11T19:00:00+03:00').getTime();

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
    <div className="min-h-screen bg-white">
      {/* Countdown Timer */}
      <div className="bg-accent text-white py-6 px-4 border-b border-accent/20">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <p className="text-sm md:text-base font-light tracking-wide">До начала интенсива осталось</p>
            <div className="flex gap-4 md:gap-8">
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded px-4 py-3 min-w-[60px] border border-white/20">
                  <p className="text-3xl md:text-4xl font-light tabular-nums">{timeLeft.days}</p>
                  <p className="text-xs font-light opacity-80 mt-1">дней</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded px-4 py-3 min-w-[60px] border border-white/20">
                  <p className="text-3xl md:text-4xl font-light tabular-nums">{timeLeft.hours}</p>
                  <p className="text-xs font-light opacity-80 mt-1">часов</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded px-4 py-3 min-w-[60px] border border-white/20">
                  <p className="text-3xl md:text-4xl font-light tabular-nums">{timeLeft.minutes}</p>
                  <p className="text-xs font-light opacity-80 mt-1">минут</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded px-4 py-3 min-w-[60px] border border-white/20">
                  <p className="text-3xl md:text-4xl font-light tabular-nums">{timeLeft.seconds}</p>
                  <p className="text-xs font-light opacity-80 mt-1">секунд</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-32 px-6 md:px-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="animate-fade-in order-2 md:order-1 space-y-8">
              <h1 className="text-3xl md:text-6xl font-light text-primary leading-[1.15] tracking-tight">
                Антисамозванец: как перестать сомневаться в себе и начать действовать
              </h1>
              <p className="text-base md:text-lg text-secondary font-light leading-relaxed">
                Онлайн-интенсив для помогающих специалистов, которые устали чувствовать, что всё время "не дотягивают", и хотят наконец выйти на новый уровень в профессии и доходе.
              </p>
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-white font-normal text-base px-10 py-6 rounded transition-all border-0"
                onClick={() => scrollToSection('registration')}
              >
                Записаться на интенсив
              </Button>
            </div>

            <div className="relative animate-fade-in order-1 md:order-2">
              <div 
                className="relative overflow-hidden rounded transition-transform duration-100 will-change-transform" 
                style={{ transform: `translateY(${-parallaxOffset * 0.1}px)` }}
              >
                <img 
                  src="https://cdn.poehali.dev/files/6eff48de-9aa2-42ca-a633-a2ac128405c7.png" 
                  alt="Ксения Леонова"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="intro" className="py-16 md:py-32 px-6 md:px-12 bg-muted scroll-reveal">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div className="space-y-6 text-base md:text-lg font-light leading-relaxed">
              <p className="text-primary">Вас благодарят клиенты.</p>
              <p className="text-primary">Коллеги говорят, что вы классный специалист.</p>
              <p className="text-primary">
                К вам приходят по рекомендации, вы постоянно учитесь, стараетесь, вкладываетесь.
              </p>
              <p className="text-primary">И вроде бы всё хорошо.</p>
              <div className="h-12"></div>
              <p className="text-primary">
                Но внутри всё равно время от времени подкрадывается это чувство - будто вы не до конца настоящий профессионал.
              </p>
              <div className="border-l border-accent pl-6 py-4 my-8 space-y-3">
                <p className="text-primary">Как будто просто повезло.</p>
                <p className="text-primary">
                  Как будто всё держится не на вас, а на удаче или хороших клиентах.
                </p>
              </div>
              <p className="text-primary">
                И когда кто-то говорит: Вы такой крутой эксперт, внутри что-то сжимается.
              </p>
              <p className="text-primary">
                Хочется улыбнуться и сказать спасибо, но в голове крутится:
              </p>
              <p className="text-accent text-2xl font-light text-center my-12">
                Это не про меня...
              </p>
              
              <div className="mt-12 text-center">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-white font-normal text-base px-10 py-6 rounded transition-all"
                  onClick={() => scrollToSection('registration')}
                >
                  Записаться сейчас
                </Button>
              </div>
            </div>
            
            <div className="space-y-8">
              <img 
                src="https://cdn.poehali.dev/files/e87e9311-4201-47ce-9e54-a513908bf9de.png" 
                alt="Профессиональный успех"
                className="w-full rounded"
              />
              <img 
                src="https://cdn.poehali.dev/files/14faf318-1cd2-40b3-a5a3-0d7e0175bebe.png" 
                alt="Сомнительно но окей"
                className="w-full rounded"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Amplification Section */}
      <section id="amplification" className="py-16 md:py-32 px-6 md:px-12 bg-white scroll-reveal">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-4xl font-light text-primary mb-16 text-center tracking-tight">
            И что, если с вами всё в порядке?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div className="order-2 md:order-1">
              <img 
                src="https://cdn.poehali.dev/files/3a0b53bd-3034-466a-b25f-32aab2f30724.jpg" 
                alt="Профессиональный эксперт"
                className="w-full rounded"
              />
            </div>
            
            <div className="space-y-6 text-base md:text-lg font-light leading-relaxed order-1 md:order-2">
              <p className="text-primary">
                Вы снова редактируете пост о себе, откладываете запуск группы, потому что
              </p>
              <p className="text-accent bg-muted p-6 rounded">
                Не поднимаете цену, потому что все клиенты разбегутся, кто будет мне платить такие деньги? Решу чуть-чуть и буду готова.
              </p>
              <p className="text-primary">
                Записываетесь на новое обучение, надеясь, что после него наконец почувствуете уверенность.
              </p>
              <p className="text-primary">
                Но вместо неё приходит тревога - та самая, которая шепчет:
              </p>
              <p className="text-accent text-2xl font-light text-center my-12">
                Ты ещё не достаточна. Подожди. Потом.
              </p>
              <p className="text-primary">
                И внутри появляется тяжёлая усталость. Не от клиентов. Не от работы.
              </p>
              <p className="text-accent text-center text-xl mt-8">
                От постоянного доказывания себе, что вы имеете право занимать своё место.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Section */}
      <section id="what-happens" className="py-16 md:py-32 px-6 md:px-12 bg-muted scroll-reveal">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-4xl font-light text-primary mb-16 text-center tracking-tight">
            Что происходит на самом деле
          </h2>
          
          <div className="space-y-8 max-w-3xl mx-auto">
            <Card className="bg-white border-0 rounded">
              <CardContent className="p-8">
                <p className="text-base md:text-lg font-light leading-relaxed text-primary">
                  Вы не плохой специалист. И вам не нужен ещё один курс, чтобы это доказать.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-0 rounded">
              <CardContent className="p-8">
                <p className="text-base md:text-lg font-light leading-relaxed text-primary">
                  С вами не что-то не так. У вас просто синдром самозванца - знакомый каждому второму хорошему специалисту.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-0 rounded">
              <CardContent className="p-8">
                <p className="text-base md:text-lg font-light leading-relaxed text-primary">
                  Он не о компетентности. Он о внутренней опоре. О том, разрешаете ли вы себе быть видимой. Повышать цены. Не прятаться. Занимать своё место.
                </p>
              </CardContent>
            </Card>
            
            <div className="text-center pt-8">
              <p className="text-accent text-xl md:text-2xl font-light leading-relaxed">
                И именно это мы разберём на интенсиве Антисамозванец
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-16 md:py-32 px-6 md:px-12 bg-white scroll-reveal">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-4xl font-light text-primary mb-16 text-center tracking-tight">
            Что вы получите на интенсиве
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="space-y-8">
              <div className="border-l border-accent pl-6 space-y-3">
                <h3 className="text-lg md:text-xl font-normal text-primary">Узнаете, откуда берётся синдром самозванца</h3>
                <p className="text-base font-light text-secondary leading-relaxed">
                  Почему даже крутые специалисты постоянно сомневаются в себе, и как разорвать эту связь раз и навсегда.
                </p>
              </div>
              
              <div className="border-l border-accent pl-6 space-y-3">
                <h3 className="text-lg md:text-xl font-normal text-primary">Найдёте свои точки опоры</h3>
                <p className="text-base font-light text-secondary leading-relaxed">
                  Научитесь опираться на себя вместо того, чтобы постоянно искать подтверждение извне. Перестанете ждать разрешения действовать.
                </p>
              </div>
              
              <div className="border-l border-accent pl-6 space-y-3">
                <h3 className="text-lg md:text-xl font-normal text-primary">Разрешите себе расти</h3>
                <p className="text-base font-light text-secondary leading-relaxed">
                  Поднять цены. Взять сложного клиента. Запустить новый формат. Выйти с экспертностью. Перестанете себя сдерживать.
                </p>
              </div>
              
              <div className="border-l border-accent pl-6 space-y-3">
                <h3 className="text-lg md:text-xl font-normal text-primary">Начнёте чувствовать уверенность</h3>
                <p className="text-base font-light text-secondary leading-relaxed">
                  Не когда-то потом. Не после следующего курса. А прямо сейчас - в своей практике, в своей цене, в себе.
                </p>
              </div>
            </div>
            
            <div>
              <img 
                src="https://cdn.poehali.dev/files/3a0b53bd-3034-466a-b25f-32aab2f30724.jpg" 
                alt="Результаты интенсива"
                className="w-full rounded"
              />
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white font-normal text-base px-10 py-6 rounded transition-all"
              onClick={() => scrollToSection('registration')}
            >
              Присоединиться к интенсиву
            </Button>
          </div>
        </div>
      </section>

      {/* Format and Price Section */}
      <section className="py-16 md:py-32 px-6 md:px-12 bg-muted scroll-reveal">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-4xl font-light text-primary mb-16 text-center tracking-tight">
            Формат и стоимость
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white border-0 rounded">
              <CardContent className="p-8">
                <h3 className="text-xl md:text-2xl font-normal text-primary mb-8">Детали интенсива</h3>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <Icon name="Calendar" className="text-accent flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-normal text-primary mb-1">Даты</p>
                      <p className="text-sm font-light text-secondary">11 и 14 ноября в 19:00 мск</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Icon name="Clock" className="text-accent flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-normal text-primary mb-1">Длительность</p>
                      <p className="text-sm font-light text-secondary">2 встречи по 2 часа</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Icon name="Video" className="text-accent flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-normal text-primary mb-1">Формат</p>
                      <p className="text-sm font-light text-secondary">Онлайн в Zoom с записью</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Icon name="Users" className="text-accent flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-normal text-primary mb-1">Участники</p>
                      <p className="text-sm font-light text-secondary">До 15 человек для глубокой работы</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-0 rounded">
              <CardContent className="p-8">
                <h3 className="text-xl md:text-2xl font-normal text-primary mb-8">Что входит</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <Icon name="Check" className="text-accent flex-shrink-0 mt-1" size={20} />
                    <p className="text-sm font-light text-secondary">2 живые встречи с разборами</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Icon name="Check" className="text-accent flex-shrink-0 mt-1" size={20} />
                    <p className="text-sm font-light text-secondary">Запись всех встреч</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Icon name="Check" className="text-accent flex-shrink-0 mt-1" size={20} />
                    <p className="text-sm font-light text-secondary">Практические упражнения</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Icon name="Check" className="text-accent flex-shrink-0 mt-1" size={20} />
                    <p className="text-sm font-light text-secondary">Рабочая тетрадь</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Icon name="Check" className="text-accent flex-shrink-0 mt-1" size={20} />
                    <p className="text-sm font-light text-secondary">Чат поддержки участников</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-white border-0 rounded max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <p className="text-sm font-light text-secondary mb-2">Стоимость участия</p>
              <p className="text-4xl md:text-5xl font-light text-primary mb-2">7 900 ₽</p>
              <p className="text-sm font-light text-accent">
                Ранняя цена до 1 ноября - 5 900 ₽
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Author Section */}
      <section id="author" className="py-16 md:py-32 px-6 md:px-12 bg-white scroll-reveal">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-4xl font-light text-primary mb-16 text-center tracking-tight">
            Ведущая интенсива
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <img 
                src="https://cdn.poehali.dev/files/6eff48de-9aa2-42ca-a633-a2ac128405c7.png" 
                alt="Ксения Леонова"
                className="w-full rounded"
              />
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-normal text-primary">Ксения Леонова</h3>
              <p className="text-base md:text-lg font-light text-secondary leading-relaxed">
                Психолог, коуч, супервизор. Работаю с помогающими специалистами уже более 10 лет.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <Icon name="Check" className="text-accent flex-shrink-0 mt-1" size={20} />
                  <p className="text-sm font-light text-secondary">
                    Сертифицированный психолог, коуч ICF, супервизор
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <Icon name="Check" className="text-accent flex-shrink-0 mt-1" size={20} />
                  <p className="text-sm font-light text-secondary">
                    Провела более 5000 часов индивидуальных сессий
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <Icon name="Check" className="text-accent flex-shrink-0 mt-1" size={20} />
                  <p className="text-sm font-light text-secondary">
                    Автор программ для специалистов помогающих профессий
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <Icon name="Check" className="text-accent flex-shrink-0 mt-1" size={20} />
                  <p className="text-sm font-light text-secondary">
                    Помогла сотням специалистов преодолеть синдром самозванца
                  </p>
                </div>
              </div>
              
              <p className="text-base font-light text-primary leading-relaxed pt-4 border-t border-border">
                Я точно знаю, что синдром самозванца - это не про недостаток знаний или опыта. 
                Это про разрешение быть собой и занимать своё место. И я помогу вам это разрешение себе дать.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-32 px-6 md:px-12 bg-muted scroll-reveal">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-light text-primary mb-16 text-center tracking-tight">
            Частые вопросы
          </h2>
          
          <div className="space-y-6">
            <Card className="bg-white border-0 rounded">
              <CardContent className="p-8">
                <h3 className="text-lg font-normal text-primary mb-3">Мне подойдёт этот интенсив?</h3>
                <p className="text-base font-light text-secondary leading-relaxed">
                  Да, если вы помогающий специалист (психолог, коуч, терапевт, наставник) и чувствуете, 
                  что синдром самозванца мешает вам развиваться профессионально и повышать доход.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-0 rounded">
              <CardContent className="p-8">
                <h3 className="text-lg font-normal text-primary mb-3">Что если я не смогу прийти на встречу?</h3>
                <p className="text-base font-light text-secondary leading-relaxed">
                  Все встречи записываются. Вы сможете посмотреть их в любое удобное время.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-0 rounded">
              <CardContent className="p-8">
                <h3 className="text-lg font-normal text-primary mb-3">Как проходит оплата?</h3>
                <p className="text-base font-light text-secondary leading-relaxed">
                  После регистрации вы получите ссылку на оплату. Принимаем карты и СБП.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-0 rounded">
              <CardContent className="p-8">
                <h3 className="text-lg font-normal text-primary mb-3">Можно ли вернуть деньги?</h3>
                <p className="text-base font-light text-secondary leading-relaxed">
                  Да, если вы передумали участвовать до начала первой встречи, мы вернём полную стоимость.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="registration" className="py-16 md:py-32 px-6 md:px-12 bg-white scroll-reveal">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-2xl md:text-4xl font-light text-primary mb-4 text-center tracking-tight">
            Записаться на интенсив
          </h2>
          <p className="text-center text-accent font-light mb-12">
            Осталось 7 мест по ранней цене
          </p>
          
          <Card className="bg-muted border-0 rounded">
            <CardContent className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-light text-primary mb-2">Ваше имя</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white border-border rounded font-light"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-light text-primary mb-2">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white border-border rounded font-light"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-light text-primary mb-2">Телефон</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white border-border rounded font-light"
                    required
                  />
                </div>
                
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-white font-normal text-base py-6 rounded transition-all"
                >
                  Зарегистрироваться
                </Button>
                
                <p className="text-xs font-light text-secondary text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-muted border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-4">
            <p className="text-sm font-light text-secondary">© 2025 Ксения Леонова. Все права защищены.</p>
            <div className="flex justify-center gap-6">
              <a href="#" className="text-sm font-light text-secondary hover:text-accent transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-sm font-light text-secondary hover:text-accent transition-colors">
                Публичная оферта
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
