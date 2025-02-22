"use client";

import { useState, useEffect, useRef } from 'react';

import NextImage from 'next/image';
import { Button, Image } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import Lenis from '@studio-freight/lenis';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { Splide, SplideSlide } from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/splide/css';

import bg from '@public/src/images/bgimg.png';
import gdgocIcon from '@public/src/images/GDGoC_icon.png';
import card1 from '@public/src/images/activity/seminar.jpg';
import card2 from '@public/src/images/activity/snack.jpg';
import card3 from '@public/src/images/activity/party.jpg';
import card4 from '@public/src/images/activity/conf.jpg';
import card5 from '@public/src/images/activity/googleconf.jpg';
import card6 from '@public/src/images/activity/christmas.jpg';

import study1 from '@public/src/images/study/notion.png';
import study2 from '@public/src/images/study/github.png';
import study3 from '@public/src/images/study/figma.png';

import gdg from '@public/src/images/logo/gdg.png';
import gpters from '@public/src/images/logo/gpters.png';
import inha from '@public/src/images/logo/inha.png';
import link from '@public/src/images/logo/link.png';
import kang from '@public/src/images/logo/강쌤과외.png';
import dongyeon from '@public/src/images/logo/동연.png';
import chajidan from '@public/src/images/logo/창지단.png';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const router = useRouter();

  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);
  const buttonRef = useRef(null);
  const recruitTextRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const checkTypeHangul = () => {
      if (typeof window !== 'undefined' && window.TypeHangul) {
        console.log('TypeHangul 라이브러리가 로드되었습니다.');
        TypeHangul.type('#typing-effect', {
          text: '개발자와 비개발자가 같이 성장하는 즐거움 with Google',
          speed: 27,
          intervalType: 20,
          humanize: 0.02,
        });
        
        const typingEffect = document.getElementById('typing-effect');
        typingEffect.addEventListener('th.endType', () => {
          console.log('타이핑 효과가 완료되었습니다.');
          gsap.fromTo(logoRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power1.inOut' });

          gsap.fromTo(
            recruitTextRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power1.inOut' }
          );

          gsap.fromTo(
            buttonRef.current,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              delay: 0.4,
              ease: 'power1.out',
              onComplete: () => {
                gsap.to(buttonRef.current, {
                  y: '-=10',
                  duration: 1.5,
                  repeat: -1,
                  yoyo: true,
                  ease: 'power1.inOut',
                });
              },
            }
          );

          if (leftArrowRef.current && rightArrowRef.current) {
            // 왼쪽 화살표 설정
            gsap.set(leftArrowRef.current, { strokeDasharray: 1000, strokeDashoffset: 1000 });

            // 오른쪽 화살표 설정
            gsap.set(rightArrowRef.current, { strokeDasharray: 1000, strokeDashoffset: 1000 });

            // 왼쪽 화살표 애니메이션
            gsap.to(leftArrowRef.current, {
              strokeDashoffset: 0,
              duration: 5,
              ease: 'power1.inOut',
            });

            // 오른쪽 화살표 애니메이션
            gsap.to(rightArrowRef.current, {
              strokeDashoffset: 0,
              duration: 2.5,
              ease: 'power1.inOut',
            });
          }
        });
      } else {
        console.log('TypeHangul 라이브러리를 찾을 수 없습니다. 재시도 중...');
        // TypeHangul이 로드되지 않았다면 100ms 후에 다시 확인
        setTimeout(checkTypeHangul, 100);
      }
    };

    console.log('TypeHangul 로딩 체크를 시작합니다.');
    checkTypeHangul();
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // ScrollTrigger와 Lenis 연동
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 800);
    });

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#section2',
        start: 'top top',
        end: '+=200%',
        scrub: true,
        pin: true,
        markers: false,
      },
    });

    // 네온 깜빡임 효과를 위한 텍스트 요소들 선택
    const neonLetters = document.querySelectorAll('#section2 .neon1');

    // GDGOC 전체가 동시에 깜빡이도록 수정
    tl.to(
      neonLetters,
      {
        textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
        duration: 0.1,
        yoyo: true,
        repeat: 3,
        ease: 'steps(2)', // 계단식 애니메이션으로 지직거리는 효과 구현
        stagger: {
          each: 0.05, // 각 글자간의 아주 작은 시차
          from: 'random', // 랜덤한 순서로 깜빡임
        },
      },
      0
    );

    // 약간의 간격을 두고 두 번째 깜빡임
    tl.to(
      neonLetters,
      {
        textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
        duration: 0.15,
        yoyo: true,
        repeat: 2,
        ease: 'steps(1)',
        stagger: {
          each: 0.03,
          from: 'random',
        },
      },
      0.5
    );

    // 기존 텍스트 애니메이션
    tl.fromTo('#section2-text1', { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.2)
      .fromTo('#section2-text2', { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.7)
      .fromTo('#section2-text3', { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 1.2)
      .fromTo('#section2-text4', { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 1.7);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const setScreenHeight = () => {
      const height = window.innerHeight;
      document.getElementById('section2').style.height = `${height}px`;
    };

    setScreenHeight();
    window.addEventListener('resize', setScreenHeight);

    return () => window.removeEventListener('resize', setScreenHeight);
  }, []);

  useEffect(() => {
    // section3 숫자 애니메이션
    const numberElements = gsap.utils.toArray('.number-animation');
    const list = [1863, 111, 36, 102];

    numberElements.forEach((element, index) => {
      gsap.set(element, { textContent: '0' });
      console.log(list[index]);
      gsap.to(element, {
        textContent: list[index],
        duration: 0.8,
        ease: 'power1.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: '#section3',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // section4 카드 애니메이션 추가
    gsap.fromTo(
      '#cards',
      {
        y: 90,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#section4',
          start: 'top center',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      '#logos',
      {
        y: 90,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7, // duration을 줄여서 더 빠르게 애니메이션
        delay: 0.3, // delay도 줄여서 더 빨리 시작
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#section6',
          start: 'top center',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // 페이지 전환 후 ScrollTrigger refresh
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // useEffect(() => {
  //   const splide = new Splide('#card-carousel', {
  //     type: 'loop',
  //     drag: 'free',
  //     focus: 'center',
  //     perPage: 4,
  //     breakpoints: {
  //       1024: {
  //         perPage: 3,
  //       },
  //     },
  //     autoScroll: {
  //       speed: 1.5,
  //     },
  //     arrows: false,
  //     pagination: false,
  //   });

  //   splide.mount({ AutoScroll });

  //   return () => {
  //     splide.destroy();
  //   };
  // }, []);

  //카드 hover default 기능
  const [hoveredCard, setHoveredCard] = useState(2);

  const handleMouseEnter = (cardIndex) => {
    setHoveredCard(cardIndex);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className='flex flex-col w-screen'>
      <div id='section1' className='flex flex-col h-screen w-full relative'>
        <div className='absolute top-0 left-0flex flex-row select-none pt-[53px] px-[96px] mobile:pt-8 mobile:px-0 mobile:w-full mobile:flex mobile:justify-center'>
          <div className='flex flex-row gap-x-[16px] w-fit cursor-pointer'>
            <NextImage className='' src={gdgocIcon} alt='gdgocIcon' width={54} height={26} />
            <div className='text-white text-[16px] pt-[3px]'>
              <strong>GDGoC</strong> Inha univ.
            </div>
          </div>
        </div>
        <NextImage src={bg} alt='bg' fill className='absolute top-0 left-0 -z-10 object-cover mobile:blur' />
        <div className='absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-black to-transparent'></div>
        <div className='flex flex-col w-full h-full items-center'>
          <div
            id='typing-effect'
            className='text-white/95 text-[3vw] mobile:text-xl font-extrabold min-h-[48px] mobile:min-h-[30px] mt-60 mobile:mt-40 mobile:text-center mobile:max-w-[350px]'
          ></div>
          <div className='font-ocra text-4xl mt-4 flex opacity-0 mobile:text-5xl mobile:mt-8' ref={logoRef}>
            <span className='text-red-500 neon-text tracking-normal'>G</span>
            <span className='text-green-500 neon-text tracking-normal'>D</span>
            <span className='text-yellow-500 neon-text tracking-normal'>G</span>
            <span className='text-blue-500 neon-text tracking-normal'>o</span>
            <span className='text-red-500 neon-text tracking-normal'>C</span>
            <span className='text-white ml-4 font-bold mobile:text-2xl mobile:mt-[17px] mobile:ml-2'>INHA</span>
          </div>
          <p
            className='text-white/90 mt-32 mobile:mt-48 text-[35px] mobile:text-2xl mobile:mt-[17svh] font-bold opacity-0'
            ref={recruitTextRef}
          >
            2025-1 Recruitment
          </p>
          <div className='flex flex-row mt-[41px] w-full justify-center items-center opacity-0' ref={buttonRef}>
            <svg
              className='min-w-[90px] hidden'
              width='51'
              height='31'
              viewBox='0 0 51 31'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                ref={leftArrowRef}
                d='M2.21611 2.34863C7.10778 14.0088 23.2195 33.429 48.534 17.8271M48.534 17.8271L36.0617 12.2884M48.534 17.8271L44.3587 29.278'
                stroke='#BFBFBF'
                strokeWidth='3'
                strokeLinecap='round'
                style={{
                  strokeDasharray: '1000',
                  strokeDashoffset: '1000',
                }}
              />
            </svg>

            <Button
              onPress={() => router.push('/recruit')}
              radius='full'
              className='w-60 mr-3 h-16 mobile:w-40 mobile:h-14 mobile:text-2xl bg-gradient-to-r from-[#EA4335] to-[#FF6E62] text-white text-3xl relative group'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-[#EA4335] to-[#FF6E62] blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300'></div>
              <span className='font-semibold relative z-10'>지원하기</span>
            </Button>

            <svg
              width='90'
              className='hidden'
              height='68'
              viewBox='0 0 90 68'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                ref={rightArrowRef}
                d='M88.4135 2.26674C75.4201 21.3307 44.7322 53.767 22.2678 35.276C6.92995 22.6517 24.6615 7.13738 40.9065 21.5997C57.1515 36.062 43.1315 70.5562 2.7082 57.2459M2.7082 57.2459L9.74433 52.2916M2.7082 57.2459L9.55602 66.445'
                stroke='#BFBFBF'
                strokeWidth='3'
                strokeLinecap='round'
                style={{
                  strokeDasharray: '1000',
                  strokeDashoffset: '1000',
                }}
              />
            </svg>
          </div>
        </div>
      </div>
      <div id='section2' className='flex flex-col w-full h-screen bg-black relative'>
        <div className='flex flex-col items-center w-full h-full'>
          <div className='text-white/90 text-[3.5vw] font-semibold mobile:text-[5vw] mt-40 mobile:mt-24 mobile:mx-[30px]'>
            <span className='font-ocra font-normal mobile:text-3xl'>
              <span className='text-red-500 neon1 neon-text-sm'>G</span>
              <span className='text-green-500 neon1 neon-text-sm'>D</span>
              <span className='text-yellow-500 neon1 neon-text-sm'>G</span>
              <span className='text-blue-500 neon1 neon-text-sm'>o</span>
              <span className='text-red-500 neon1 neon-text-sm'>C</span>
              <span className='text-white ml-2 neon-text-sm'>INHA</span>
            </span>
            , 어떤 곳인가요?
          </div>
          <div className='text-white space-y-4 font-semibold text-[2.5vw] mobile:text-xl flex flex-col items-center mt-20 gap-y-4 text-center'>
            <p id='section2-text1' className='opacity-0'>
              <span className='text-red-500'>개발</span>에 관심 있는 사람들이 모여{' '}
              <br className='hidden mobile:inline' />
              <span className='text-green-500'>네트워킹</span> 하고,
            </p>
            <p id='section2-text2' className='opacity-0'>
              다양한 프로젝트에 참여하며 <br className='hidden mobile:inline' />
              <span className='text-yellow-500'>함께 성장</span>하는 공간입니다.
            </p>
            <p id='section2-text3' className='opacity-0'>
              비개발자부터 숙련된 개발자까지 <br className='hidden mobile:inline' />
              누구나 <span className='text-blue-500'>함께</span>할 수 있습니다.
            </p>
            <p id='section2-text4' className='opacity-0'>
              GDGoC라는 글로벌 IT 무대에서 <br className='hidden mobile:inline' />
              끊임없이 기회를 찾고 <span className='text-red-500'>성장</span>해보세요!
            </p>
          </div>
        </div>
      </div>
      <div
        id='section3'
        className='flex flex-wrap justify-center items-start h-full w-full mt-[200vh] px-20 gap-x-20 gap-y-12 mobile:flex-col mobile:items-center'
      >
        <div className='flex flex-col items-center justify-center flex-1'>
          <p className='text-red-500 text-[2.5vw] font-semibold mb-4 mobile:text-[7vw]'>전세계</p>
          <div className='flex flex-row'>
            <p className='text-white text-[5vw] number-animation text-right mobile:text-[10vw]'>1863</p>
            <p className='text-white text-[5vw] flex-none mobile:text-[10vw]'>+</p>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center flex-1'>
          <p className='text-green-500 text-[2.5vw] font-semibold mb-4 mobile:text-[7vw]'>참여국가</p>
          <div className='flex flex-row'>
            <p className='text-white text-[5vw] number-animation text-right mobile:text-[10vw]'>111</p>
            <p className='text-white text-[5vw] flex-none mobile:text-[10vw]'>개국</p>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center flex-1'>
          <p className='text-yellow-500 text-[2.5vw] font-semibold mb-4 mobile:text-[7vw]'>국내</p>
          <div className='flex flex-row'>
            <p className='text-white text-[5vw] number-animation text-right mobile:text-[10vw]'>36</p>
            <p className='text-white text-[5vw] flex-none mobile:text-[10vw]'>대학</p>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center flex-1'>
          <p className='text-blue-500 text-[2.5vw] font-semibold mb-4 mobile:text-[7vw]'>현재 멤버</p>
          <div className='flex flex-row'>
            <p className='text-white text-[5vw] number-animation text-right mobile:text-[10vw]'>102</p>
            <p className='text-white text-[5vw] flex-none mobile:text-[10vw]'>명</p>
          </div>
        </div>
      </div>
      <div id='section4' className='flex flex-col h-full w-full justify-center'>
        <div className='text-white text-[3.5vw] mobile:text-[6vw] mobile:mx-[20px] font-semibold mt-96 text-center'>
          <div className='text-[70px] mobile:text-[26vw]'>❓</div>
          합류하면 어떤 활동들을 할 수 있나요?
        </div>
        <div id='cards' className='flex flex-col w-full h-full mt-36 mb-36 opacity-0'>
          <div className='grid grid-cols-3 mobile:grid-cols-2 gap-5 px-28 tablet:px-30 mobile:px-4'>
            <div
              id='card'
              className='group relative w-full h-[300px] rounded-2xl overflow-hidden'
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                isBlurred
                src={card1.src}
                alt='card1'
                width={500}
                height={300}
                as={NextImage}
                className='object-cover transition-transform duration-300 group-hover:scale-110 z-0'
              />
              <div
                className={`absolute inset-0 bg-black/70 transition-opacity duration-300 flex items-center justify-center z-10 ${
                  hoveredCard === 1 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className='text-white text-center p-6'>
                  <h3 className='text-[2.5vw] font-bold mb-2 mobile:text-[4vw]'>연사자 초청</h3>
                  <p className='text-[1.5vw] mobile:text-[4vw]'>실전활용도 높은 온/오프 강연</p>
                </div>
              </div>
            </div>

            <div
              id='card'
              className='group relative w-full h-[300px] rounded-2xl overflow-hidden'
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                isBlurred
                src={card2.src}
                alt='card2'
                width={500}
                height={300}
                as={NextImage}
                className='object-cover transition-transform duration-300 group-hover:scale-110 z-0'
              />
              <div
                className={`absolute inset-0 bg-black/70 transition-opacity duration-300 flex items-center justify-center z-10 ${
                  hoveredCard === 2 ? 'opacity-100' : 'opacity-0'
                }`} // Default visible overlay for second card
              >
                <div className='text-white text-center p-6'>
                  <h3 className='text-[2.5vw] font-bold mb-2 mobile:text-[4vw]'>간식드리미</h3>
                  <p className='text-[1.5vw] mobile:text-[4vw]'>정성 가득 시험기간 간식드리미</p>
                </div>
              </div>
            </div>

            <div
              id='card'
              className='group relative w-full h-[300px] rounded-2xl overflow-hidden'
              onMouseEnter={() => handleMouseEnter(3)}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                isBlurred
                src={card3.src}
                alt='card3'
                width={500}
                height={300}
                as={NextImage}
                className='object-cover transition-transform duration-300 group-hover:scale-110 z-0'
              />
              <div
                className={`absolute inset-0 bg-black/70 transition-opacity duration-300 flex items-center justify-center z-10 ${
                  hoveredCard === 3 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className='text-white text-center p-6'>
                  <h3 className='text-[2.5vw] font-bold mb-2 mobile:text-[4vw]'>네트워킹 행사</h3>
                  <p className='text-[1.5vw] mobile:text-[4vw]'>MT/한강/잔망 등 다같이 외부 나들이</p>
                </div>
              </div>
            </div>

            <div
              id='card'
              className='group relative w-full h-[300px] rounded-2xl overflow-hidden'
              onMouseEnter={() => handleMouseEnter(4)}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                isBlurred
                src={card4.src}
                alt='card4'
                width={500}
                height={300}
                as={NextImage}
                className='object-cover transition-transform duration-300 group-hover:scale-110 z-0'
              />
              <div
                className={`absolute inset-0 bg-black/70 transition-opacity duration-300 flex items-center justify-center z-10 ${
                  hoveredCard === 4 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className='text-white text-center p-6'>
                  <h3 className='text-[2.5vw] font-bold mb-2 mobile:text-[4vw]'>내부 행사</h3>
                  <p className='text-[1.5vw] mobile:text-[4vw]'>자체•연합 해커톤 주최 및 참여</p>
                </div>
              </div>
            </div>

            <div
              id='card'
              className='group relative w-full h-[300px] rounded-2xl overflow-hidden'
              onMouseEnter={() => handleMouseEnter(5)}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                isBlurred
                src={card5.src}
                alt='card5'
                width={500}
                height={300}
                as={NextImage}
                className='object-cover transition-transform duration-300 group-hover:scale-110 z-0'
              />
              <div
                className={`absolute inset-0 bg-black/70 transition-opacity duration-300 flex items-center justify-center z-10 ${
                  hoveredCard === 5 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className='text-white text-center p-6'>
                  <h3 className='text-[2.5vw] font-bold mb-2 mobile:text-[4vw]'>외부행사</h3>
                  <p className='text-[1.5vw] mobile:text-[4vw]'>Google 등 IT기업의 네트워킹/레퍼런스 참여</p>
                </div>
              </div>
            </div>

            <div
              id='card'
              className='group relative w-full h-[300px] rounded-2xl overflow-hidden'
              onMouseEnter={() => handleMouseEnter(6)}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                isBlurred
                src={card6.src}
                alt='card6'
                width={500}
                height={300}
                as={NextImage}
                className='object-cover transition-transform duration-300 group-hover:scale-110 z-0'
              />
              <div
                className={`absolute inset-0 bg-black/70 transition-opacity duration-300 flex items-center justify-center z-10 ${
                  hoveredCard === 6 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className='text-white text-center p-6'>
                  <h3 className='text-[2.5vw] font-bold mb-2 mobile:text-[4vw]'>크리스마스 파티</h3>
                  <p className='text-[1.5vw] mobile:text-[4vw]'>연말 파티와 함께하는 네트워킹</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div id="section5" className="flex flex-col h-screen w-full justify-start items-center">
        <p className="text-white text-6xl mobile:text-2xl font-semibold text-center mt-56 mobile:mt-36 mb-20">이런 공부, 같이 해보실래요?</p>
        
        <div id="card-carousel" className="splide w-full px-20 mt-20 mobile:mt-5 mobile:px-0">
          <div className="splide__track">
            <div className="splide__list">
              <div className="splide__slide" >
                <div className="w-[300px] h-[400px] tablet:w-[200px] tablet:h-[300px] mobile:w-[120px] mobile:h-[200px] rounded-2xl">
                  <NextImage src={study1} alt="card1" className="w-full h-full" width={300} height={400} />
                </div>
                <p className="text-white text-2xl tablet:text-xl mobile:text-base font-semibold mt-4">Notion 특강</p>
              </div>
              <div className="splide__slide" >
                <div className="w-[300px] h-[400px] tablet:w-[200px] tablet:h-[300px] mobile:w-[120px] mobile:h-[200px] rounded-2xl">
                  <NextImage src={study2} alt="card1" className="w-full h-full" width={300} height={400} />
                </div>
                <p className="text-white text-2xl tablet:text-xl mobile:text-base font-semibold mt-4">Github 특강</p>
              </div>
              <div className="splide__slide" >
                <div className="w-[300px] h-[400px] tablet:w-[200px] tablet:h-[300px] mobile:w-[120px] mobile:h-[200px] rounded-2xl">
                  <NextImage src={study3} alt="card1" className="w-full h-full" width={300} height={400} />
                </div>
                <p className="text-white text-2xl tablet:text-xl mobile:text-base font-semibold mt-4">Figma 특강</p>
              </div>
              <div className="splide__slide" >
                <div className="w-[300px] h-[400px] tablet:w-[200px] tablet:h-[300px] mobile:w-[120px] mobile:h-[200px] rounded-2xl">
                  <NextImage src={study1} alt="card1" className="w-full h-full" width={300} height={400} />
                </div>
                <p className="text-white text-2xl tablet:text-xl mobile:text-base font-semibold mt-4">Notion 특강</p>
              </div>
              <div className="splide__slide" >
                <div className="w-[300px] h-[400px] tablet:w-[200px] tablet:h-[300px] mobile:w-[120px] mobile:h-[200px] rounded-2xl">
                  <NextImage src={study2} alt="card1" className="w-full h-full" width={300} height={400} />
                </div>
                <p className="text-white text-2xl tablet:text-xl mobile:text-base font-semibold mt-4">Github 특강</p>
              </div>
              <div className="splide__slide" >
                <div className="w-[300px] h-[400px] tablet:w-[200px] tablet:h-[300px] mobile:w-[120px] mobile:h-[200px] rounded-2xl">
                  <NextImage src={study3} alt="card1" className="w-full h-full" width={300} height={400} />
                </div>
                <p className="text-white text-2xl tablet:text-xl mobile:text-base font-semibold mt-4">Figma 특강</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div id='section6' className='flex flex-col h-full w-full justify-start items-center'>
        <div id='logos' className='w-full'>
          <div className='text-white text-[3.5vw] mobile:text-2xl mt-60 mobile:mt-24 w-full text-center'>
            <span className='font-ocra font-extrabold'>
              <span className='text-red-500'>G</span>
              <span className='text-green-500'>D</span>
              <span className='text-yellow-500'>G</span>
              <span className='text-blue-500'>o</span>
              <span className='text-red-500'>C</span>
              <span className='text-white ml-2'>INHA</span>
            </span>
            와 함께하는 단체
          </div>
          <div className='grid grid-cols-3 gap-5 w-full mt-20 mb-20 px-40 justify-between mobile:px-10'>
            <div className='flex flex-col items-center justify-center'>
              <NextImage
                src={gdg}
                alt='gdg'
                width={200}
                height={200}
                className='h-[20vh] mobile:h-[10vh] object-contain'
              />
              <p className='text-white text-[2vw] mobile:text-[3.5vw] font-semibold mt-4'>GDG Korea</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <NextImage
                src={gpters}
                alt='gpters'
                width={200}
                height={200}
                className='h-[20vh] mobile:h-[10vh] object-contain'
              />
              <p className='text-white text-[2vw] mobile:text-[3.5vw] font-semibold mt-4'>GPTERS</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <NextImage
                src={kang}
                alt='kang'
                width={200}
                height={200}
                className='h-[20vh] mobile:h-[10vh] object-contain'
              />
              <p className='text-white text-[2vw] mobile:text-[3.5vw] font-semibold mt-4'>강쌤과외</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <NextImage
                src={inha}
                alt='inha'
                width={200}
                height={200}
                className='h-[20vh] mobile:h-[10vh] object-contain'
              />
              <p className='text-white text-[2vw] mobile:text-[3.5vw] font-semibold mt-4'>
                SW중심대학
                <br className='hidden mobile:inline' />
                사업단
              </p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <NextImage
                src={dongyeon}
                alt='dongyeon'
                width={200}
                height={200}
                className='h-[20vh] mobile:h-[10vh] object-contain'
              />
              <p className='text-white text-[2vw] mobile:text-[3.5vw] font-semibold mt-4'>
                인하대학교 <br className='hidden mobile:inline' />
                동아리연합회
              </p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <NextImage
                src={chajidan}
                alt='chajidan'
                width={200}
                height={200}
                className='h-[20vh] mobile:h-[10vh] object-contain'
              />
              <p className='text-white text-[2vw] mobile:text-[3.5vw] font-semibold mt-4'>
                인하대학교 <br className='hidden mobile:inline' />
                창업지원단
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id='section7' className='flex flex-col h-full w-full justify-start items-center'>
        <div className='flex flex-col justify-center items-center w-full mt-56 mobile:mt-36 text-white text-[3.5vw] mobile:text-2xl font-semibold text-center'>
          <span>
            <strong className='text-[#EA4335]'>G</strong>
            <strong className='text-[#34A853]'>D</strong>
            <strong className='text-[#F9AB00]'>G</strong>
            <strong className='text-[#4285F4]'>o</strong>
            <strong className='text-[#EA4335]'>C</strong>와 함께
          </span>
          <br className='hidden mobile:inline' />
          변화하는 나를 만나보세요
        </div>
        <div className='flex flex-row mt-32 mb-96 mobile:mb-60 w-full justify-center items-center space-x-3'>
          <Button
            onPress={() => router.push('/recruit')}
            radius='full'
            className='w-64 max-w-full h-14 mobile:w-40 mobile:h-12 mobile:text-2xl bg-gradient-to-r from-[#EA4335] to-[#FF6E62] text-white text-3xl relative group'
          >
            <div className='absolute inset-0 bg-gradient-to-r from-[#EA4335] to-[#FF6E62] blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300'></div>
            <span className='font-semibold relative z-10'>지원하기</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
