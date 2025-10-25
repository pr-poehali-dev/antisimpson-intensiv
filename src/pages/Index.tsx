import { useState, useEffect, useRef } from 'react';
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
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text Content */}
            <div className="animate-fade-in order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                Антисамозванец: как перестать сомневаться в себе и начать действовать
              </h1>
              <p className="text-lg md:text-xl text-secondary mb-8 leading-relaxed">
                Онлайн-интенсив для помогающих специалистов, которые устали чувствовать, что всё время «не дотягивают», и хотят наконец выйти на новый уровень в профессии и доходе.
              </p>
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-white font-semibold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                onClick={() => scrollToSection('registration')}
              >
                Записаться на интенсив
              </Button>
            </div>

            {/* Image with Text Overlay */}
            <div className="relative animate-fade-in order-1 md:order-2 group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div 
                  className="relative"
                  style={{ transform: `translateY(${parallaxOffset}px)` }}
                >
                  <img 
                    src="https://cdn.poehali.dev/files/3adc6dd1-6629-4583-98c4-433d777402e6.png" 
                    alt="Профессиональный психолог"
                    className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="absolute bottom-8 left-8 right-8 transition-all duration-700 group-hover:bottom-10">
                  <div className="inline-block">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                      <span className="text-accent block drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">АНТИ</span>
                      <span className="text-primary block drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)]">САМОЗВАНЕЦ</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="intro" className="py-20 px-4 bg-white scroll-reveal">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Text - Left */}
            <div className="space-y-4 text-lg leading-relaxed">
              <p className="text-secondary">Вас благодарят клиенты.</p>
              <p className="text-secondary">Коллеги говорят, что вы классный специалист.</p>
              <p className="text-secondary">
                К вам приходят по рекомендации, вы постоянно учитесь, стараетесь, вкладываетесь.
              </p>
              <p className="text-secondary">И вроде бы всё хорошо.</p>
              <p className="text-secondary mt-8">
                Но внутри всё равно время от времени подкрадывается это чувство — будто вы не до конца настоящий профессионал.
              </p>
              <div className="bg-accent/10 border-l-4 border-accent p-6 my-6">
                <p className="text-primary font-semibold">Как будто просто повезло.</p>
                <p className="text-primary font-semibold mt-2">
                  Как будто всё держится не на вас, а на удаче или «хороших клиентах».
                </p>
              </div>
              <p className="text-secondary">
                И когда кто-то говорит: «Вы такой крутой эксперт», внутри что-то сжимается.
              </p>
              <p className="text-secondary">
                Хочется улыбнуться и сказать спасибо, но в голове крутится:
              </p>
              <p className="text-accent italic text-xl font-medium text-center my-6">
                «Это не про меня...»
              </p>
            </div>
            
            {/* Image - Right */}
            <div>
              <img 
                src="https://cdn.poehali.dev/files/14faf318-1cd2-40b3-a5a3-0d7e0175bebe.png" 
                alt="Сомнительно, но окей"
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
            {/* Image - Left */}
            <div className="order-2 md:order-1">
              <img 
                src="https://cdn.poehali.dev/files/c088feb4-a7b4-4af6-8712-1dd693ee6058.jpeg" 
                alt="Специалист за работой"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            {/* Text - Right */}
            <div className="space-y-4 text-lg leading-relaxed order-1 md:order-2">
              <p className="text-secondary">
                Вы снова редактируете пост о себе, откладываете запуск группы, потому что
              </p>
              <p className="text-accent italic font-medium bg-white p-4 rounded-lg shadow-sm">
                Не поднимаете цену, потому что все клиенты разбегутся, кто будет мне платить такие деньги? 
                «Решу чуть-чуть и буду готова».
              </p>
              <p className="text-secondary">
                Записываетесь на новое обучение, надеясь, что после него наконец почувствуете уверенность.
              </p>
              <p className="text-secondary">
                Но вместо неё приходит тревога — та самая, которая шепчет:
              </p>
              <p className="text-accent italic text-xl font-medium text-center my-6">
                «Ты ещё не достаточна. Подожди. Потом.»
              </p>
              <p className="text-secondary">
                И внутри появляется тяжёлая усталость. Не от клиентов. Не от работы.
              </p>
              <p className="text-accent italic font-medium text-center text-xl mt-6">
                А от постоянной борьбы с собой...
              </p>
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
            {/* Text - Left */}
            <div className="space-y-4 text-lg leading-relaxed">
              <p className="text-secondary">
                Почти все умные, образованные и честные эксперты через это проходят.
              </p>
              <p className="text-secondary">
                Синдром самозванца — не про слабость.
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
            </div>
            
            {/* Image - Right */}
            <div>
              <img 
                src="https://cdn.poehali.dev/files/dc705272-2e79-4923-b065-6f31b430e1e2.jpg" 
                alt="Синдром самозванца vs Реальность"
                className="w-full rounded-lg shadow-lg"
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
            {/* Image - Left */}
            <div className="order-2 md:order-1">
              <img 
                src="https://cdn.poehali.dev/files/c32eddd7-b598-4255-a78b-d2069594cacb.jpg" 
                alt="Ты говоришь, что у меня синдром самозванца"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            {/* Text - Right */}
            <div className="space-y-4 text-lg leading-relaxed order-1 md:order-2">
              <p className="text-secondary">
                А если синдром самозванца — это не то, что нужно «убить»,
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
                И возвращать себе уверенность — спокойно, без надрыва...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section id="for-whom" className="py-20 px-4 bg-muted scroll-reveal">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
            Для кого этот интенсив
          </h2>
          <p className="text-xl text-secondary text-center mb-12">
            Этот формат точно для вас, если вы:
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              'бесконечно учитесь, но не чувствуете, что стали увереннее;',
              'всё знаете, но боитесь заявить о себе, чтобы не показаться «выскочкой»;',
              'постоянно сравниваете себя с другими и чувствуете, что «всё ещё не готовы»;',
              'не можете спокойно говорить о своих услугах и чувствуете стыд за деньги;',
              'устали ждать момента, когда «наконец поверите в себя».'
            ].map((item, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex items-start gap-4">
                  <Icon name="CheckCircle" className="text-accent mt-1 flex-shrink-0" size={24} />
                  <p className="text-secondary">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="bg-accent/10 border-l-4 border-accent p-6 mt-8">
            <p className="text-primary font-medium">
              Если внутри вас есть ощущение, что вы способны на большее, но что-то мешает, — вы в правильном месте!
            </p>
          </div>
        </div>
      </section>

      {/* Program */}
      <section id="program" className="py-20 px-4 bg-white scroll-reveal">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
            Что будет на интенсиве
          </h2>
          <div className="space-y-8">
            <Card className="border-2 border-accent/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-primary">
                    Понять, как работает самозванец
                  </h3>
                </div>
                <p className="text-secondary text-lg leading-relaxed">
                  Мы разберём, с чем люди чаще всего путают синдром самозванца, почему он возникает именно 
                  у сильных специалистов и почему попытки «побороться» с ним обычно только усиливают внутренний 
                  конфликт. Вы познакомитесь с авторской моделью работы с самозванцем — подходом, который помогает 
                  не бороться, а вернуть внутреннюю опору.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-primary">
                    Вернуться в уверенность и начать действовать
                  </h3>
                </div>
                <p className="text-secondary text-lg leading-relaxed">
                  Этот день — про вас настоящего. Про уверенность, которая не зависит от лайков, одобрения или 
                  внешних результатов. Про то, как действовать спокойно, без надрыва и тревоги. Вторая часть — 
                  ответы на вопросы, домашние задания и живые разборы ситуаций участников.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Results */}
      <section id="results" className="py-20 px-4 bg-gradient-to-b from-accent/5 to-muted scroll-reveal">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
            После интенсива вы сможете:
          </h2>
          <div className="grid gap-6">
            {[
              'Понять, почему вы чувствовали себя «недостаточно» — и перестанете винить себя',
              'Узнать, как быстро вернуть внутреннюю опору, когда сомнения накрывают',
              'Почувствовать уверенность без надуманной мотивации',
              'Спокойно говорить о своих услугах и поднимать цену без страха'
            ].map((item, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardContent className="p-6 flex items-start gap-4">
                  <span className="text-3xl">✅</span>
                  <p className="text-secondary text-lg">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-gradient-to-b from-white to-muted scroll-reveal">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
            Что говорят участники
          </h2>
          <p className="text-secondary text-center mb-12 text-lg">Реальные истории специалистов, которые уже прошли путь</p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center text-2xl font-bold text-accent">
                    ЕМ
                  </div>
                  <div>
                    <p className="font-bold text-primary text-lg">Елена М.</p>
                    <p className="text-sm text-secondary">психолог, 7 лет опыта</p>
                  </div>
                </div>
                <p className="text-secondary italic mb-4">"Я поняла, что самозванец — это не про мою некомпетентность, а про то, что я растёт. Теперь я спокойно повысила цену консультации в 2 раза и клиенты остались."</p>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => <Icon key={i} name="Star" className="text-accent fill-accent" size={16} />)}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center text-2xl font-bold text-accent">
                    АК
                  </div>
                  <div>
                    <p className="font-bold text-primary text-lg">Анна К.</p>
                    <p className="text-sm text-secondary">коуч, 4 года опыта</p>
                  </div>
                </div>
                <p className="text-secondary italic mb-4">"После интенсива я перестала сравнивать себя с коллегами и наконец запустила свою групповую программу. Набрала 15 человек за неделю!"</p>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => <Icon key={i} name="Star" className="text-accent fill-accent" size={16} />)}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center text-2xl font-bold text-accent">
                    ДС
                  </div>
                  <div>
                    <p className="font-bold text-primary text-lg">Дмитрий С.</p>
                    <p className="text-sm text-secondary">психотерапевт, 10 лет</p>
                  </div>
                </div>
                <p className="text-secondary italic mb-4">"Я думал, что синдром самозванца — это навсегда. Но Инна показала, как превратить его в ресурс. Теперь я веду супервизии и чувствую себя на своём месте."</p>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => <Icon key={i} name="Star" className="text-accent fill-accent" size={16} />)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Effective */}
      <section id="why-effective" className="py-20 px-4 bg-white scroll-reveal">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
            👍 Почему этот формат эффективный
          </h2>
          <div className="space-y-6">
            {[
              'Здесь не будет мотивации на эмоциях. Только реальные механизмы, которые работают.',
              'Не будет борьбы с собой — вы научитесь видеть, где уверенность теряется, и возвращать её.',
              'Это не «про уверенность вообще» — это про то, как чувствовать себя на своём месте.',
              'После этих двух дней вы перестанете «ждать, когда будете готовы» — и начнёте действовать.'
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 bg-muted p-6 rounded-lg">
                <Icon name="Star" className="text-accent mt-1 flex-shrink-0" size={24} />
                <p className="text-secondary text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Turning Point */}
      <section id="turning-point" className="py-20 px-4 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 scroll-reveal">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
            ✨ Возможно, именно эти два дня станут для вас поворотной точкой
          </h2>
          <div className="space-y-4 text-lg text-secondary">
            <p>Вы больше не будете сравнивать себя с другими.</p>
            <p>Не будете бояться ошибиться или показаться «слишком».</p>
            <p className="text-xl font-semibold text-primary">
              Вы начнёте действовать — спокойно, уверенно и по-настоящему.
            </p>
          </div>
        </div>
      </section>

      {/* Authors */}
      <section id="authors" className="py-20 px-4 bg-white scroll-reveal">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
            🧑‍🏫 Авторы и ведущие
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-accent/20 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-2">Инна Сорока</h3>
                <p className="text-accent font-semibold mb-4">клинический психолог, супервизор</p>
                <p className="text-secondary">
                  помогает экспертам вернуть уверенность и устойчивость в профессии.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-2">Марина Шулягина</h3>
                <p className="text-accent font-semibold mb-4">маркетолог</p>
                <p className="text-secondary">
                  помогающий психологам строить систему клиентов и расти без выгорания.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-muted border-none">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">«Психология как бизнес»</h3>
              <p className="text-secondary text-lg mb-4">
                пространство, где специалисты учатся не просто помогать людям, а строить устойчивую систему 
                дохода на том, что умеют и любят.
              </p>
              <p className="text-secondary">
                Сотни экспертов уже прошли наши программы: повысили доход, увеличили поток клиентов, нашли своё 
                позиционирование и перестали бояться быть видимыми.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Details */}
      <section id="details" className="py-20 px-4 bg-muted scroll-reveal">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
            Формат и стоимость
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="border-2 border-accent/20 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="Calendar" className="text-accent" size={32} />
                  <div>
                    <p className="text-sm text-secondary">Даты проведения</p>
                    <p className="text-xl font-bold text-primary">17 и 20 октября</p>
                    <p className="text-secondary">в 19.00 мск</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="Clock" className="text-accent" size={32} />
                  <div>
                    <p className="text-sm text-secondary">Длительность</p>
                    <p className="text-xl font-bold text-primary">2 дня по 3 часа</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Globe" className="text-accent" size={32} />
                  <div>
                    <p className="text-sm text-secondary">Формат</p>
                    <p className="text-xl font-bold text-primary">Онлайн</p>
                    <p className="text-secondary">с записями и чат поддержки</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent bg-gradient-to-br from-accent to-accent/80 text-white shadow-xl">
              <CardContent className="p-8 flex flex-col items-center justify-center h-full">
                <p className="text-lg mb-2">Стоимость участия</p>
                <p className="text-5xl font-bold mb-2">5 800 ₽</p>
                <p className="text-center opacity-90">полный доступ к материалам</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white border-2 border-accent/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-6">🎁 Бонусы для участников:</h3>
              <div className="space-y-3">
                {[
                  'Тетрадь с практиками и упражнениями «Антисамозванец»',
                  'Чек-лист «Мои опоры»',
                  'Аудиопрактика «Возвращение в состояние спокойной уверенности»'
                ].map((bonus, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Icon name="Gift" className="text-accent" size={24} />
                    <p className="text-secondary text-lg">{bonus}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Registration Form */}
      <section id="registration" className="py-20 px-4 bg-gradient-to-b from-white to-accent/10 scroll-reveal">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Записаться на интенсив «Антисамозванец»
          </h2>
          <Card className="shadow-2xl border-2 border-accent/20">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Ваше имя *
                  </label>
                  <Input
                    type="text"
                    placeholder="Введите ваше имя"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    placeholder="example@mail.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Телефон *
                  </label>
                  <Input
                    type="tel"
                    placeholder="+7 (999) 999-99-99"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="text-lg"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-accent hover:bg-accent/90 text-white font-semibold text-lg py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  Записаться на интенсив
                </Button>
              </form>
              <p className="text-sm text-secondary text-center mt-6">
                если у вас остались вопросы, или хотите оплатить из-за рубежа, пишите{' '}
                <a href="tel:+79147043536" className="text-accent font-semibold hover:underline">
                  +79147043536
                </a>{' '}
                менеджер Екатерина.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="mb-4">
            Вопросы? Свяжитесь с нами:{' '}
            <a href="tel:+79147043536" className="text-accent font-semibold hover:underline">
              +79147043536
            </a>{' '}
            (менеджер Екатерина)
          </p>
          <p className="text-sm opacity-80">© 2025 Психология как бизнес</p>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/79147043536"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
        aria-label="Написать в WhatsApp"
      >
        <svg 
          className="w-8 h-8 md:w-10 md:h-10" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Написать в WhatsApp
        </span>
      </a>
    </div>
  );
};

export default Index;