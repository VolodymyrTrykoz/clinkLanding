$(document).ready(function () {
  const $reactPath = $('.react');
  const $honeycombPath = $('.honeycomb');
  const $stethoscopePath2 = $('.stethoscope');
  const $stethoscopePath1 = $('.stethoscopeDot');
  const reactPathLength = $reactPath[0].getTotalLength();
  const honeycombPathLength = $honeycombPath[0].getTotalLength();
  const stethoscopePath1Length = $stethoscopePath1[0].getTotalLength();
  const stethoscopePath2Length = $stethoscopePath2[0].getTotalLength();
  const svgBlocksHeight = $('.about__items').height();
  const largeScreen = $(window).innerWidth() > 1024;
  let svgAnimationFired = false;
  const presentationOffset = $('.presentation__wrapper').offset().top;
  const windowHeight = $(window).height();
  let presentationFired = false;


  $honeycombPath.attr('stroke-dashoffset', honeycombPathLength);
  $reactPath.attr('stroke-dashoffset', reactPathLength);
  $stethoscopePath1.attr('stroke-dashoffset', stethoscopePath1Length);
  $stethoscopePath2.attr('stroke-dashoffset', stethoscopePath2Length);

  if(largeScreen){
    runFirstAnimation();
    $(window).on('scroll', handleWindowScroll);
    let tl = new TimelineMax();
        tl.set((['.item', '.presentation__wrapper .container']), {opacity: 0});
  }

  function handleWindowScroll() {
    const winOffTop = $(window).scrollTop();
    if (!svgAnimationFired && (winOffTop >= svgBlocksHeight)) {
      runSvgScene();
    }
    if (!presentationFired && (winOffTop >= presentationOffset - windowHeight / 2)) {
      runPresentationScene();
    }
  }
  function runPresentationScene(){
    let tl = new TimelineMax();
    tl
      .fromTo(('.presentation__wrapper .container'), 1, {y: 20, opacity: 0}, {y:0, opacity: 1})
      .fromTo(('.personal__wrapper'), 1, {y: 20, opacity: 0}, {y:0, opacity: 1});
    presentationFired = true;
  }
  function runFirstAnimation(){
    let tl = new TimelineMax();
    tl
      .staggerFromTo((['.header__item','.greeting__wrapper h1', '.greeting__wrapper h2']), 1, {y: 20, opacity: 0}, {y:0, opacity: 1}, .5)
      .fromTo(('.about__info'), 1, {y: 20, opacity: 0}, {y:-100, opacity: 1});
  }
  function runSvgScene(){
    let tl = new TimelineMax();
    tl
      .staggerFromTo(('.item'), 1, {y: 20}, {y:0, opacity: 1, onComplete: drawSVG }, .5);
  }
  function drawSVG(){
    let tlMenu = new TimelineMax();
    tlMenu
      .to($honeycombPath, 3, { strokeDashoffset : 0,  ease: Power1.easeInOut})
      .to($stethoscopePath2, .5, { strokeDashoffset : 0,  ease: Power1.easeInOut})
      .to($stethoscopePath1, .5, { strokeDashoffset : 0,  ease: Power1.easeInOut})
      .to($reactPath, 2, { strokeDashoffset : 0,  ease: Power1.easeInOut})
      .to($honeycombPath, .2, { fill : '#69d2e7'})
      .to($stethoscopePath2, .1, { fill : '#69d2e7'})
      .to($stethoscopePath1, .1, { fill : '#69d2e7'})
      .to($reactPath, .2, { fill : '#69d2e7'});
    svgAnimationFired = true;
  }




  //Even when JS is disabled user still can see a content
  $('.presentation__disabledJS').addClass('presentation__disabledJS--disabled');
  $('.personal__disabledJS').addClass('personal__disabledJS--disabled');

  // Carousel
  $('.presentation__items').carousel({
      duration: 200,
      dist: 0,
      padding: -500,
    });
  $('.personal__wrapper').carousel({
      fullWidth: true,
      indicators: true
  });
  $('.carousel__left').click({props: 'next'}, changeSlider);
  $('.carousel__right').click({props: 'prev'}, changeSlider);
  function changeSlider (e) {
      const direction = e.data.props;
      e.preventDefault();
      e.stopPropagation();
      $('.presentation__items').carousel(direction);
  }
});

