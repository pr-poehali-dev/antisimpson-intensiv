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
            <p className="text-base md:text-lg font-semibold text-center">До начала интенсива осталось:</p>
            <div className="flex gap-2 md:gap-6">
              <div className="text-center">
                <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[60px] md:min-w-[70px]">
                  <p className="text-2xl md:text-3xl font-bold">{timeLeft.days}</p>
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
      <section className="py-8 md:py-20 px-4 bg-gradient-to-b from-background to-muted relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 hidden md:block">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div className="animate-fade-in order-2 md:order-1">
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 md:mb-6 leading-tight">
                Антисамозванец: как перестать сомневаться в себе и начать действовать
              </h1>
              <p className="text-sm md:text-xl text-secondary mb-6 md:mb-8 leading-relaxed">
                Онлайн-интенсив для помогающих специалистов, которые устали чувствовать, что всё время "не дотягивают", и хотят наконец выйти на новый уровень в профессии и доходе.
              </p>
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-white font-semibold text-sm md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-full shadow-lg hover:shadow-xl transition-all w-full md:w-auto"
                onClick={() => scrollToSection('registration')}
              >
                Записаться на интенсив
              </Button>
            </div>

            <div className="relative animate-fade-in order-1 md:order-2 mb-4 md:mb-0">
              <div 
                className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl transition-transform duration-100 will-change-transform" 
                style={{ transform: `translateY(${-parallaxOffset * 0.15}px) scale(${1 + parallaxOffset * 0.00005})` }}
              >
                <img 
                  src="https://cdn.poehali.dev/files/6eff48de-9aa2-42ca-a633-a2ac128405c7.png" 
                  alt="Ксения Леонова"
                  className="w-full h-auto object-cover transition-all duration-500 ease-out md:hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="intro" className="py-8 md:py-20 px-4 bg-white scroll-reveal">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
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
              <div className="bg-accent/10 border-l-4 border-accent p-4 md:p-6 my-4 md:my-6">
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
                  className="bg-accent hover:bg-accent/90 text-white font-bold text-sm md:text-lg px-6 md:px-10 py-4 md:py-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 animate-pulse w-full md:w-auto"
                  onClick={() => scrollToSection('registration')}
                >
                  Записаться сейчас
                </Button>
              </div>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <img 
                src="https://cdn.poehali.dev/files/e87e9311-4201-47ce-9e54-a513908bf9de.png" 
                alt="Профессиональный успех"
                className="w-full rounded-lg shadow-lg transition-all duration-500 md:hover:scale-105 md:hover:shadow-2xl"
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
      <section id="amplification" className="py-8 md:py-20 px-4 bg-muted scroll-reveal">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-6 md:mb-12 text-center">
            И что, если с вами всё в порядке?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://cdn.poehali.dev/files/3a0b53bd-3034-466a-b25f-32aab2f30724.jpg" 
                alt="Профессиональный эксперт"
                className="w-full rounded-lg shadow-lg transition-all duration-500 md:hover:scale-105 md:hover:shadow-2xl"
              />
            </div>
            
            <div className="space-y-3 md:space-y-4 text-sm md:text-lg leading-relaxed order-1 md:order-2">
              <p className="text-secondary">
                Вы снова редактируете пост о себе, откладываете запуск группы, потому что
              </p>
              <p className="text-accent italic font-medium bg-white p-3 md:p-4 rounded-lg shadow-sm text-xs md:text-base">
                Не поднимаете цену, потому что все клиенты разбегутся, кто будет мне платить такие деньги? Решу чуть-чуть и буду готова.
              </p>
              <p className="text-secondary">
                Записываетесь на новое обучение, надеясь, что после него наконец почувствуете уверенность.
              </p>
              <p className="text-secondary">
                Но вместо неё приходит тревога - та самая, которая шепчет:
              </p>
              <p className="text-accent italic text-sm md:text-xl font-medium text-center my-3 md:my-6">
                Ты ещё не достаточна. Подожди. Потом.
              </p>
              <p className="text-secondary">
                И внутри появляется тяжёлая усталость. Не от клиентов. Не от работы.
              </p>
              <p className="text-accent italic font-medium text-center text-sm md:text-xl mt-4 md:mt-6">
                А от постоянной борьбы с собой...
              </p>
              
              <div className="mt-6 md:mt-8 text-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white font-bold text-sm md:text-lg px-6 md:px-10 py-4 md:py-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 w-full md:w-auto"
                  onClick={() => scrollToSection('registration')}
                >
                  Остановить борьбу
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Section */}
      <section id="understanding" className="py-8 md:py-20 px-4 bg-white scroll-reveal">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-6 md:mb-12 text-center">
            Почему так?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="space-y-3 md:space-y-4 text-sm md:text-lg leading-relaxed">
              <p className="text-secondary">
                Почти все умные, образованные и честные эксперты через это проходят.
              </p>
              <p className="text-secondary">
                Синдром самозванца - не про слабость.
              </p>
              <p className="text-secondary">Это просто показатель того, что вы...</p>
              <p className="text-accent italic font-medium text-center text-sm md:text-xl my-3 md:my-6">
                об это как раз интенсив, вы увидите что именно он показывает каждому из нас.
              </p>
              <p className="text-secondary">
                Проблема в том, что когда вы не понимаете, как с ним обращаться,
              </p>
              <p className="text-accent font-semibold text-sm md:text-xl text-center my-3 md:my-4">
                он превращается в тормоз.
              </p>
              
              <div className="mt-8 text-center">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white font-bold text-sm md:text-lg px-6 md:px-10 py-4 md:py-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 w-full md:w-auto"
                  onClick={() => scrollToSection('registration')}
                >
                  Узнать больше
                </Button>
              </div>
            </div>
            
            <div>
              <img 
                src="https://cdn.poehali.dev/files/2912cd2e-5715-497f-a70e-57e6db3ef98a.jpg" 
                alt="Синдром самозванца vs Реальность"
                className="w-full rounded-lg shadow-lg transition-all duration-500 md:hover:scale-105 md:hover:shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-8 md:py-20 px-4 bg-gradient-to-b from-accent/5 to-white scroll-reveal">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-6 md:mb-12 text-center">
            А что, если всё иначе?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="order-2 md:order-1 space-y-4 md:space-y-6">
              <img 
                src="https://cdn.poehali.dev/files/cfbfbeb4-2b90-423e-a214-c29044fed484.jpg" 
                alt="О синдроме самозванца"
                className="w-full rounded-lg shadow-lg transition-all duration-500 md:hover:scale-105 md:hover:shadow-2xl"
              />
              <img 
                src="https://cdn.poehali.dev/files/c32eddd7-b598-4255-a78b-d2069594cacb.jpg" 
                alt="Ты говоришь что у меня синдром самозванца"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            <div className="space-y-3 md:space-y-4 text-sm md:text-lg leading-relaxed order-1 md:order-2">
              <p className="text-secondary">
                А если синдром самозванца - это не то, что нужно убить,
              </p>
              <p className="text-secondary">а то, что нужно понять?</p>
              <p className="text-secondary">
                Он появляется не потому, что вы плохой специалист,
              </p>
              <p className="text-secondary">а потому, что ... это вы узнаете на</p>
              <p className="text-accent italic font-medium text-center text-sm md:text-xl my-3 md:my-6">интенсиве)</p>
              <p className="text-secondary">
                Его невозможно убрать навсегда. Но можно научиться управлять им.
              </p>
              <p className="text-secondary">
                Понимать, когда он говорит правду, а когда просто пугает.
              </p>
              <p className="text-secondary">
                И возвращать себе уверенность - спокойно, без надрыва...
              </p>
              
              <div className="mt-6 md:mt-8 text-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-sm md:text-lg px-6 md:px-10 py-4 md:py-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 w-full md:w-auto"
                  onClick={() => scrollToSection('registration')}
                >
                  Узнать больше
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-8 md:py-20 px-4 bg-white scroll-reveal">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-6 md:mb-12 text-center">
            Для кого этот интенсив
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-start">
            <div className="space-y-4 md:col-span-2">
              {[
                'Бесконечно учитесь, но не чувствуете, что стали увереннее',
                'Всё знаете, но боитесь заявить о себе, чтобы не показаться "выскочкой"',
                'Постоянно сравниваете себя с другими и чувствуете, что "всё ещё не готовы"',
                'Не можете спокойно говорить о цене и чувствуете стыд за деньги',
                'Устали ждать момента, когда "наконец поверите в себя"'
              ].map((item, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <Icon name="CheckCircle2" className="text-accent flex-shrink-0 mt-1" size={20} />
                  <p className="text-sm md:text-lg text-secondary">{item}</p>
                </div>
              ))}
              <div className="bg-accent/10 p-4 md:p-6 rounded-lg mt-6">
                <p className="text-sm md:text-lg text-secondary italic">
                  Если внутри вас есть ощущение, что вы способны на большее, но что-то мешает — вы в правильном месте!
                </p>
              </div>
            </div>
            <div className="order-first md:order-last">
              <img 
                src="https://cdn.poehali.dev/files/44ad70db-333a-49d3-9672-2967eca7003c.png" 
                alt="Уверенная в себе женщина"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section className="py-8 md:py-20 px-4 bg-muted scroll-reveal">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-6 md:mb-12 text-center">
            Что будет на интенсиве
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
            <Card className="bg-white">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className="bg-accent text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-base md:text-lg">1</div>
                  <h3 className="text-lg md:text-2xl font-bold text-primary">День 1</h3>
                </div>
                <h4 className="text-base md:text-xl font-semibold text-accent mb-2 md:mb-3">
                  Понять, как работает самозванец
                </h4>
                <p className="text-sm md:text-base text-secondary leading-relaxed">
                  Разберём, с чем люди чаще всего путают синдром самозванца, почему он возникает у сильных специалистов и почему попытки "побороть" его только усиливают внутренний конфликт. Вы познакомитесь с авторской моделью Инны Сороки.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className="bg-accent text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-base md:text-lg">2</div>
                  <h3 className="text-lg md:text-2xl font-bold text-primary">День 2</h3>
                </div>
                <h4 className="text-base md:text-xl font-semibold text-accent mb-2 md:mb-3">
                  Вернуться в уверенность и начать действовать
                </h4>
                <p className="text-sm md:text-base text-secondary leading-relaxed">
                  Как действовать спокойно, без надрыва и тревоги. Ответы на вопросы, практики и живые разборы ситуаций участников.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-accent/10 to-primary/10 p-4 md:p-8 rounded-lg">
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6 text-center">
              Что вы получите:
            </h3>
            <div className="grid md:grid-cols-2 gap-3 md:gap-4">
              {[
                'Понять, почему вы чувствовали себя "недостаточно" — и перестанете винить себя',
                'Узнать, как быстро вернуть внутреннюю опору, когда сомнения накрывают',
                'Почувствовать уверенность без надуманной мотивации',
                'Спокойно говорить о своих услугах и поднимать цену без страха'
              ].map((item, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <Icon name="Sparkles" className="text-accent flex-shrink-0 mt-1" size={20} />
                  <p className="text-sm md:text-base text-secondary">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Authors Section */}
      <section className="py-8 md:py-20 px-4 bg-white scroll-reveal">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-6 md:mb-12 text-center">
            Авторы и ведущие
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
            <Card>
              <CardContent className="p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">Инна Сорока</h3>
                <p className="text-sm md:text-base text-secondary leading-relaxed">
                  Клинический психолог, супервизор. Помогает экспертам вернуть уверенность и устойчивость в профессии.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">Марина Шульгина</h3>
                <p className="text-sm md:text-base text-secondary leading-relaxed">
                  Маркетолог, помогает психологам выстраивать систему клиентов и расти без выгорания.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-primary/5 p-4 md:p-8 rounded-lg text-center">
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 md:mb-4">
              Психология как бизнес
            </h3>
            <p className="text-sm md:text-lg text-secondary max-w-3xl mx-auto">
              Проект, где специалисты учатся не просто помогать людям, а строить устойчивую систему дохода на том, что умеют и любят.
            </p>
          </div>
        </div>
      </section>

      {/* Format and Price Section */}
      <section className="py-8 md:py-20 px-4 bg-gradient-to-b from-accent/5 to-white scroll-reveal">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-6 md:mb-12 text-center">
            Формат и стоимость
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
            <Card className="bg-white">
              <CardContent className="p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6">Детали интенсива</h3>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex gap-3 items-start">
                    <Icon name="Calendar" className="text-accent flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-sm md:text-base text-primary">Даты</p>
                      <p className="text-sm md:text-base text-secondary">17 и 20 октября в 19:00 мск</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Icon name="Clock" className="text-accent flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-sm md:text-base text-primary">Длительность</p>
                      <p className="text-sm md:text-base text-secondary">2 дня по 3 часа</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Icon name="Video" className="text-accent flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-sm md:text-base text-primary">Формат</p>
                      <p className="text-sm md:text-base text-secondary">Онлайн, с записями и чат-поддержкой</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent to-accent/80 text-white">
              <CardContent className="p-4 md:p-6 flex flex-col justify-center items-center text-center h-full">
                <p className="text-sm md:text-lg mb-2 md:mb-3 opacity-90">Стоимость участия</p>
                <p className="text-4xl md:text-6xl font-bold mb-3 md:mb-4">5 800 ₽</p>
                <Button 
                  size="lg"
                  className="bg-white text-accent hover:bg-white/90 font-bold text-sm md:text-lg px-6 md:px-8 py-4 md:py-6 w-full md:w-auto"
                  onClick={() => scrollToSection('registration')}
                >
                  Записаться сейчас
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6 text-center">
              Бонусы при регистрации
            </h3>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  icon: 'BookOpen',
                  title: 'Тетрадь с практиками',
                  description: 'Упражнения "Антисамозванец"'
                },
                {
                  icon: 'ListChecks',
                  title: 'Чек-лист',
                  description: '"Мои опоры"'
                },
                {
                  icon: 'Headphones',
                  title: 'Аудиопрактика',
                  description: 'Возвращение в состояние спокойной уверенности'
                }
              ].map((bonus, index) => (
                <div key={index} className="text-center">
                  <div className="bg-accent/10 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3">
                    <Icon name={bonus.icon} className="text-accent" size={28} />
                  </div>
                  <h4 className="font-semibold text-sm md:text-base text-primary mb-1 md:mb-2">{bonus.title}</h4>
                  <p className="text-xs md:text-sm text-secondary">{bonus.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="registration" className="py-8 md:py-20 px-4 bg-accent/5 scroll-reveal">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4 text-center">
            Записаться на интенсив "Антисамозванец"
          </h2>
          <p className="text-secondary text-center mb-8 text-sm md:text-base">
            Заполните форму, и мы свяжемся с вами для подтверждения регистрации
          </p>
          
          <Card>
            <CardContent className="p-6 md:p-8">
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
                
                <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-white text-base md:text-lg py-5 md:py-6">
                  Зарегистрироваться
                </Button>
                
                <div className="flex items-center gap-4 mt-6 pt-6 border-t">
                  <Icon name="Phone" className="text-accent" size={24} />
                  <div>
                    <p className="text-sm text-secondary">Есть вопросы? Звоните:</p>
                    <a href="tel:+79149324628" className="text-lg font-semibold text-primary hover:text-accent transition-colors">
                      +7 914 932-46-28
                    </a>
                    <p className="text-sm text-secondary">Менеджер: Яна</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pt-4">
                  <Icon name="MessageCircle" className="text-green-600" size={24} />
                  <div>
                    <p className="text-sm text-secondary">Или напишите в WhatsApp:</p>
                    <a 
                      href="https://wa.me/79149324628" 
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

      {/* Final Quote Section */}
      <section className="py-8 md:py-16 px-4 bg-gradient-to-b from-primary/5 to-accent/5 scroll-reveal">
        <div className="container mx-auto max-w-4xl text-center">
          <Icon name="Sparkles" className="text-accent mx-auto mb-4 md:mb-6" size={48} />
          <p className="text-lg md:text-2xl text-primary italic leading-relaxed">
            Возможно, именно эти два дня станут для вас поворотной точкой. Вы перестанете сравнивать себя с другими и начнёте действовать — спокойно, уверенно и по-настоящему.
          </p>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/79149324628"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 md:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse-glow group"
        aria-label="Написать в WhatsApp"
      >
        <Icon name="MessageCircle" size={24} className="md:w-7 md:h-7 group-hover:rotate-12 transition-transform" />
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