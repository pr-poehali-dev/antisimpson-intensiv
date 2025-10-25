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
    <div className="min-h-screen bg-background">
      {/* Countdown Timer */}
      <div className="bg-accent text-accent-foreground py-6 px-4 border-b-2 border-accent/30">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <p className="text-base md:text-lg tracking-wide">✨ До начала интенсива осталось ✨</p>
            <div className="flex gap-4 md:gap-8">
              <div className="text-center">
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl px-5 py-4 min-w-[70px] border-2 border-accent/20 shadow-lg">
                  <p className="text-3xl md:text-4xl tabular-nums">{timeLeft.days}</p>
                  <p className="text-xs opacity-80 mt-1">дней</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl px-5 py-4 min-w-[70px] border-2 border-accent/20 shadow-lg">
                  <p className="text-3xl md:text-4xl tabular-nums">{timeLeft.hours}</p>
                  <p className="text-xs opacity-80 mt-1">часов</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl px-5 py-4 min-w-[70px] border-2 border-accent/20 shadow-lg">
                  <p className="text-3xl md:text-4xl tabular-nums">{timeLeft.minutes}</p>
                  <p className="text-xs opacity-80 mt-1">минут</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl px-5 py-4 min-w-[70px] border-2 border-accent/20 shadow-lg">
                  <p className="text-3xl md:text-4xl tabular-nums">{timeLeft.seconds}</p>
                  <p className="text-xs opacity-80 mt-1">секунд</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-28 px-6 md:px-12 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="animate-fade-in order-2 md:order-1 space-y-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl text-primary leading-[1.2]">
                Антисамозванец: как перестать сомневаться в себе и начать действовать
              </h1>
              <p className="text-lg md:text-xl text-secondary leading-relaxed">
                Онлайн-интенсив для помогающих специалистов, которые устали чувствовать, что всё время "не дотягивают", и хотят наконец выйти на новый уровень в профессии и доходе.
              </p>
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl hover:shadow-2xl transition-all text-lg px-12 py-7 rounded-full border-2 border-accent/30"
                onClick={() => scrollToSection('registration')}
              >
                Записаться на интенсив
              </Button>
            </div>

            <div className="relative animate-fade-in order-1 md:order-2">
              <div 
                className="relative overflow-hidden rounded-3xl shadow-2xl transition-transform duration-100 will-change-transform border-4 border-accent/20" 
                style={{ transform: `translateY(${-parallaxOffset * 0.1}px)` }}
              >
                <img 
                  src="https://cdn.poehali.dev/files/6eff48de-9aa2-42ca-a633-a2ac128405c7.png" 
                  alt="Николаева Екатерина"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="intro" className="py-16 md:py-28 px-6 md:px-12 bg-card scroll-reveal">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div className="space-y-6 text-lg md:text-xl leading-relaxed">
              <p className="text-primary">Вас благодарят клиенты.</p>
              <p className="text-primary">Коллеги говорят, что вы классный специалист.</p>
              <p className="text-primary">
                К вам приходят по рекомендации, вы постоянно учитесь, стараетесь, вкладываетесь.
              </p>
              <p className="text-primary">И вроде бы всё хорошо.</p>
              <div className="h-8"></div>
              <p className="text-primary">
                Но внутри всё равно время от времени подкрадывается это чувство - будто вы не до конца настоящий профессионал.
              </p>
              <div className="border-l-4 border-accent pl-8 py-6 my-8 space-y-4 bg-accent/5 rounded-r-2xl">
                <p className="text-primary text-xl">Как будто просто повезло.</p>
                <p className="text-primary text-xl">
                  Как будто всё держится не на вас, а на удаче или хороших клиентах.
                </p>
              </div>
              <p className="text-primary">
                И когда кто-то говорит: Вы такой крутой эксперт, внутри что-то сжимается.
              </p>
              <p className="text-primary">
                Хочется улыбнуться и сказать спасибо, но в голове крутится:
              </p>
              <p className="text-accent text-2xl md:text-3xl italic text-center my-10">
                Это не про меня...
              </p>
              
              <div className="mt-12 text-center">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl hover:shadow-2xl transition-all text-lg px-12 py-7 rounded-full"
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
                className="w-full rounded-3xl shadow-xl border-4 border-accent/10"
              />
              <img 
                src="https://cdn.poehali.dev/files/14faf318-1cd2-40b3-a5a3-0d7e0175bebe.png" 
                alt="Сомнительно но окей"
                className="w-full rounded-3xl shadow-xl border-4 border-secondary/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Amplification Section */}
      <section id="amplification" className="py-16 md:py-28 px-6 md:px-12 bg-background scroll-reveal">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl text-primary mb-16 text-center">
            И что, если с вами всё в порядке?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div className="order-2 md:order-1">
              <img 
                src="https://cdn.poehali.dev/files/3a0b53bd-3034-466a-b25f-32aab2f30724.jpg" 
                alt="Профессиональный эксперт"
                className="w-full rounded-3xl shadow-xl border-4 border-accent/20"
              />
            </div>
            
            <div className="space-y-6 text-lg md:text-xl leading-relaxed order-1 md:order-2">
              <p className="text-primary">
                Вы снова редактируете пост о себе, откладываете запуск группы, потому что
              </p>
              <div className="bg-accent/10 p-8 rounded-3xl border-2 border-accent/20">
                <p className="text-accent italic text-xl">
                  Не поднимаете цену, потому что все клиенты разбегутся, кто будет мне платить такие деньги? Решу чуть-чуть и буду готова.
                </p>
              </div>
              <p className="text-primary">
                Записываетесь на новое обучение, надеясь, что после него наконец почувствуете уверенность.
              </p>
              <p className="text-primary">
                Но вместо неё приходит тревога - та самая, которая шепчет:
              </p>
              <p className="text-accent text-2xl md:text-3xl italic text-center my-10">
                Ты ещё не достаточна. Подожди. Потом.
              </p>
              <p className="text-primary">
                И внутри появляется тяжёлая усталость. Не от клиентов. Не от работы.
              </p>
              <p className="text-accent text-center text-xl md:text-2xl italic mt-8">
                От постоянного доказывания себе, что вы имеете право занимать своё место.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Section */}
      <section id="what-happens" className="py-16 md:py-28 px-6 md:px-12 bg-card scroll-reveal">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl text-primary mb-16 text-center">
            Что происходит на самом деле
          </h2>
          
          <div className="space-y-8 max-w-3xl mx-auto">
            <Card className="bg-gradient-to-br from-muted to-card border-2 border-accent/20 rounded-3xl shadow-lg">
              <CardContent className="p-8 md:p-10">
                <p className="text-lg md:text-xl leading-relaxed text-primary">
                  Вы не плохой специалист. И вам не нужен ещё один курс, чтобы это доказать.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-muted to-card border-2 border-secondary/20 rounded-3xl shadow-lg">
              <CardContent className="p-8 md:p-10">
                <p className="text-lg md:text-xl leading-relaxed text-primary">
                  С вами не что-то не так. У вас просто синдром самозванца - знакомый каждому второму хорошему специалисту.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-muted to-card border-2 border-accent/20 rounded-3xl shadow-lg">
              <CardContent className="p-8 md:p-10">
                <p className="text-lg md:text-xl leading-relaxed text-primary">
                  Он не о компетентности. Он о внутренней опоре. О том, разрешаете ли вы себе быть видимой. Повышать цены. Не прятаться. Занимать своё место.
                </p>
              </CardContent>
            </Card>
            
            <div className="text-center pt-10">
              <p className="text-accent text-2xl md:text-3xl leading-relaxed">
                И именно это мы разберём на интенсиве <span className="italic">Антисамозванец</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-16 md:py-28 px-6 md:px-12 bg-background scroll-reveal">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl text-primary mb-16 text-center">
            Что вы получите на интенсиве
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-10">
              <div className="border-l-4 border-accent pl-8 space-y-3">
                <h3 className="text-xl md:text-2xl text-primary">Узнаете, откуда берётся синдром самозванца</h3>
                <p className="text-base md:text-lg text-secondary leading-relaxed">
                  Почему даже крутые специалисты постоянно сомневаются в себе, и как разорвать эту связь раз и навсегда.
                </p>
              </div>
              
              <div className="border-l-4 border-secondary pl-8 space-y-3">
                <h3 className="text-xl md:text-2xl text-primary">Найдёте свои точки опоры</h3>
                <p className="text-base md:text-lg text-secondary leading-relaxed">
                  Научитесь опираться на себя вместо того, чтобы постоянно искать подтверждение извне. Перестанете ждать разрешения действовать.
                </p>
              </div>
              
              <div className="border-l-4 border-accent pl-8 space-y-3">
                <h3 className="text-xl md:text-2xl text-primary">Разрешите себе расти</h3>
                <p className="text-base md:text-lg text-secondary leading-relaxed">
                  Поднять цены. Взять сложного клиента. Запустить новый формат. Выйти с экспертностью. Перестанете себя сдерживать.
                </p>
              </div>
              
              <div className="border-l-4 border-secondary pl-8 space-y-3">
                <h3 className="text-xl md:text-2xl text-primary">Начнёте чувствовать уверенность</h3>
                <p className="text-base md:text-lg text-secondary leading-relaxed">
                  Не когда-то потом. Не после следующего курса. А прямо сейчас - в своей практике, в своей цене, в себе.
                </p>
              </div>
            </div>
            
            <div>
              <img 
                src="https://cdn.poehali.dev/files/3a0b53bd-3034-466a-b25f-32aab2f30724.jpg" 
                alt="Результаты интенсива"
                className="w-full rounded-3xl shadow-2xl border-4 border-accent/20"
              />
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl hover:shadow-2xl transition-all text-lg px-12 py-7 rounded-full"
              onClick={() => scrollToSection('registration')}
            >
              Присоединиться к интенсиву
            </Button>
          </div>
        </div>
      </section>

      {/* Format and Price Section */}
      <section className="py-16 md:py-28 px-6 md:px-12 bg-card scroll-reveal">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl text-primary mb-16 text-center">
            Формат и стоимость
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gradient-to-br from-background to-muted border-2 border-accent/20 rounded-3xl shadow-lg">
              <CardContent className="p-8 md:p-10">
                <h3 className="text-2xl md:text-3xl text-primary mb-8">Детали интенсива</h3>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <Icon name="Calendar" className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="text-lg text-primary mb-1">Даты</p>
                      <p className="text-base text-secondary">11 и 14 ноября в 19:00 мск</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Icon name="Clock" className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="text-lg text-primary mb-1">Длительность</p>
                      <p className="text-base text-secondary">2 встречи по 2 часа</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Icon name="Video" className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="text-lg text-primary mb-1">Формат</p>
                      <p className="text-base text-secondary">Онлайн в Zoom с записью</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Icon name="Users" className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="text-lg text-primary mb-1">Участники</p>
                      <p className="text-base text-secondary">До 15 человек для глубокой работы</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-background to-muted border-2 border-secondary/20 rounded-3xl shadow-lg">
              <CardContent className="p-8 md:p-10">
                <h3 className="text-2xl md:text-3xl text-primary mb-8">Что входит</h3>
                <div className="space-y-5">
                  <div className="flex gap-4 items-start">
                    <Icon name="Check" className="text-accent flex-shrink-0 mt-1" size={24} />
                    <p className="text-base text-secondary">2 живые встречи с разборами</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Icon name="Check" className="text-accent flex-shrink-0 mt-1" size={24} />
                    <p className="text-base text-secondary">Запись всех встреч</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Icon name="Check" className="text-accent flex-shrink-0 mt-1" size={24} />
                    <p className="text-base text-secondary">Практические упражнения</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Icon name="Check" className="text-accent flex-shrink-0 mt-1" size={24} />
                    <p className="text-base text-secondary">Рабочая тетрадь</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Icon name="Check" className="text-accent flex-shrink-0 mt-1" size={24} />
                    <p className="text-base text-secondary">Чат поддержки участников</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-gradient-to-br from-accent/20 via-card to-secondary/20 border-2 border-accent/30 rounded-3xl shadow-2xl max-w-2xl mx-auto">
            <CardContent className="p-10 md:p-12 text-center">
              <p className="text-base text-secondary mb-3">Стоимость участия</p>
              <p className="text-5xl md:text-6xl text-primary mb-3">7 900 ₽</p>
              <p className="text-lg text-accent italic">
                Ранняя цена до 1 ноября - 5 900 ₽
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Author Section */}
      <section id="author" className="py-16 md:py-28 px-6 md:px-12 bg-background scroll-reveal">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl text-primary mb-16 text-center">
            Ведущая интенсива
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div>
              <img 
                src="https://cdn.poehali.dev/files/6eff48de-9aa2-42ca-a633-a2ac128405c7.png" 
                alt="Николаева Екатерина"
                className="w-full rounded-3xl shadow-2xl border-4 border-accent/20"
              />
            </div>
            
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl text-primary">Николаева Екатерина</h3>
              <p className="text-lg md:text-xl text-secondary leading-relaxed">
                Психолог, коуч, супервизор. Работаю с помогающими специалистами уже более 10 лет.
              </p>
              
              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  <Icon name="Check" className="text-accent flex-shrink-0 mt-1" size={24} />
                  <p className="text-base text-secondary">
                    Сертифицированный психолог, коуч ICF, супервизор
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <Icon name="Check" className="text-accent flex-shrink-0 mt-1" size={24} />
                  <p className="text-base text-secondary">
                    Провела более 5000 часов индивидуальных сессий
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <Icon name="Check" className="text-accent flex-shrink-0 mt-1" size={24} />
                  <p className="text-base text-secondary">
                    Автор программ для специалистов помогающих профессий
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <Icon name="Check" className="text-accent flex-shrink-0 mt-1" size={24} />
                  <p className="text-base text-secondary">
                    Помогла сотням специалистов преодолеть синдром самозванца
                  </p>
                </div>
              </div>
              
              <div className="border-l-4 border-accent pl-8 py-6 bg-accent/5 rounded-r-3xl mt-8">
                <p className="text-lg text-primary leading-relaxed italic">
                  Я точно знаю, что синдром самозванца - это не про недостаток знаний или опыта. 
                  Это про разрешение быть собой и занимать своё место. И я помогу вам это разрешение себе дать.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-28 px-6 md:px-12 bg-card scroll-reveal">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-5xl text-primary mb-16 text-center">
            Частые вопросы
          </h2>
          
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-background to-muted border-2 border-accent/20 rounded-3xl shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl md:text-2xl text-primary mb-4">Мне подойдёт этот интенсив?</h3>
                <p className="text-base md:text-lg text-secondary leading-relaxed">
                  Да, если вы помогающий специалист (психолог, коуч, терапевт, наставник) и чувствуете, 
                  что синдром самозванца мешает вам развиваться профессионально и повышать доход.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-background to-muted border-2 border-secondary/20 rounded-3xl shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl md:text-2xl text-primary mb-4">Что если я не смогу прийти на встречу?</h3>
                <p className="text-base md:text-lg text-secondary leading-relaxed">
                  Все встречи записываются. Вы сможете посмотреть их в любое удобное время.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-background to-muted border-2 border-accent/20 rounded-3xl shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl md:text-2xl text-primary mb-4">Как проходит оплата?</h3>
                <p className="text-base md:text-lg text-secondary leading-relaxed">
                  После регистрации вы получите ссылку на оплату. Принимаем карты и СБП.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-background to-muted border-2 border-secondary/20 rounded-3xl shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl md:text-2xl text-primary mb-4">Можно ли вернуть деньги?</h3>
                <p className="text-base md:text-lg text-secondary leading-relaxed">
                  Да, если вы передумали участвовать до начала первой встречи, мы вернём полную стоимость.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="registration" className="py-16 md:py-28 px-6 md:px-12 bg-gradient-to-b from-background via-muted/30 to-background scroll-reveal">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-5xl text-primary mb-4 text-center">
            Записаться на интенсив
          </h2>
          <p className="text-center text-accent text-lg italic mb-12">
            ✨ Осталось 7 мест по ранней цене ✨
          </p>
          
          <Card className="bg-gradient-to-br from-card to-muted border-2 border-accent/30 rounded-3xl shadow-2xl">
            <CardContent className="p-10 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-base text-primary mb-3">Ваше имя</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-background border-2 border-accent/20 rounded-xl text-base py-6 focus:border-accent transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-base text-primary mb-3">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-background border-2 border-accent/20 rounded-xl text-base py-6 focus:border-accent transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-base text-primary mb-3">Телефон</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-background border-2 border-accent/20 rounded-xl text-base py-6 focus:border-accent transition-colors"
                    required
                  />
                </div>
                
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl hover:shadow-2xl transition-all text-lg py-7 rounded-full border-2 border-accent/30"
                >
                  Зарегистрироваться
                </Button>
                
                <p className="text-sm text-secondary text-center mt-6">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-card border-t-2 border-accent/20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-4">
            <p className="text-sm text-secondary">© 2025 Николаева Екатерина. Все права защищены.</p>
            <div className="flex justify-center gap-8">
              <a href="#" className="text-sm text-secondary hover:text-accent transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-sm text-secondary hover:text-accent transition-colors">
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
