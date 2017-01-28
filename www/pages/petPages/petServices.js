angular.module('pet.service', ['app.pet'])
.factory('Pet', function ($rootScope, $http) {
  const factory = {};
  let stats = null;
  let happiness = null;

  // ///////////////////////////////
  // //////// Happiness ////////////
  // ///////////////////////////////
  const bearTilt = () => {
    TweenMax.to('.bear', 1, {
      rotation: 2,
      transformOrigin: '50% 50%',
    });
    TweenMax.to('.bear', 1, {
      rotation: -2,
      transformOrigin: '50% 50%',
      delay: 1,
      onComplete: bearTilt,
    });
  };

  const setHappiness = () => {
    if (happiness < 51) {
      TweenMax.to('.mouth', 0, { alpha: 0 });
      TweenMax.to('.frown', 0, { alpha: 1 });
      if (happiness < 26) {
        TweenMax.to('.tears', 2, { alpha: 0.7 });
      }
    } else {
      bearTilt();
    }
  };

  // /////////////////////////////////////
  // //////BEAR TOUCH EFFECT//////////////
  // /////////////////////////////////////

  const earDown = () => {
    TweenMax.to('.ears', 0.5, { y: 7 });
    TweenMax.to('.leftArm', 0.5, { rotation: 0, transformOrigin: '80% 50%' });
    TweenMax.to('.balloons', 0.5, { y: 0, x: 0 });
  };

  const earUp = () => {
    TweenMax.to('.ears', 0.5, { y: -7, onComplete: earDown });
    TweenMax.to('.leftArm', 0.5, { rotation: 75, transformOrigin: '80% 50%' });
    TweenMax.to('.balloons', 0.5, { y: -77, x: 12 });
  };

  let tear = 1;
  factory.bearTouch = () => {
    // TweenMax.to('.leftFoot', 0.5, { rotation: -15, transformOrigin: 'right' });
    // TweenMax.to('.leftFoot', 0.5, { rotation: 0, transformOrigin: 'right', delay: .5 });
    // IF BEAR IS HAPPY
    if (happiness > 25) {
      earUp();
    } else {
      // IF BEAR IS SAD
      if (tear % 2 === 1) {
        TweenMax.to('.tear3', 4, { y: 30, ease: 'easeIn' });
        TweenMax.to('.tear3', 2, { alpha: 0, delay: 2 });
        TweenMax.to('.tear3', 0.001, { y: 0, alpha: 1, delay: 4 });
        tear++;
      } else {
        TweenMax.to('.tear2', 4, { y: 30, ease: 'easeIn' });
        TweenMax.to('.tear2', 2, { alpha: 0, delay: 2 });
        TweenMax.to('.tear2', 0.001, { y: 0, alpha: 1, delay: 4 });
        tear++;
      }
      if (tear % 4 === 1) {
        TweenMax.to('.redBal', 6, { y: -800, ease: 'easeIn', x: -150 });
        TweenMax.to('.stringRed', 6, { y: -800, ease: 'easeIn', x: -150 });
        TweenMax.to('.stringRed', 2, {
          rotation: '5_short',
          transformOrigin: '0% 0%',
          ease: 'easeIn',
        });
      }
      if (tear % 6 === 1) {
        TweenMax.to('.yellowBal', 6, { y: -800, ease: 'easeIn', x: -150 });
        TweenMax.to('.stringYellow', 6, { y: -800, ease: 'easeIn', x: -150 });
        TweenMax.to('.stringYellow', 2, {
          rotation: '-10_short',
          transformOrigin: '0% 0%',
          ease: 'easeIn',
        });
      }
      if (tear % 8 === 1) {
        TweenMax.to('.blueBal', 6, { y: -800, ease: 'easeIn', x: -150 });
        TweenMax.to('.stringBlue', 6, { y: -800, ease: 'easeIn', x: -150 });
        TweenMax.to('.stringBlue', 2, { rotation: '20_short',
        transformOrigin: '0% 0%',
        ease: 'easeIn',
      });
      }
    }
  };

  // ////////////////////////////
  // ////// ACCESSORIES /////////
  // ////////////////////////////
  const setAccessories = () => {
    const accessories = stats.accessories;
    const hat = accessories.hat;
    const necklace = accessories.necklace;
    const balloons = accessories.balloons;
    if (hat) {
      TweenMax.fromTo('.hat', 2, { alpha: 0, y: -150 }, { alpha: 1, y: 0 });
    }
    if (balloons) {
      TweenMax.to('.balloons', 0, { alpha: 1 });
    }
    if (necklace) {
      TweenMax.to('.necklace', 0, { alpha: 1 });
    }
  };

  // ////////////////////////////
  // ///// CLOCK FUNCTIONS///////
  // ////////////////////////////
  Date.prototype.timeNow = function () {
    // WTF is this???
    return ((this.getHours() < 10) ? '0' : '') + this.getHours() + ':'
    + ((this.getMinutes() < 10) ? '0' : '') + this.getMinutes() + ':'
    + ((this.getSeconds() < 10) ? '0' : '') + this.getSeconds();
  };

  const newDate = new Date();
  let datetime;
  let second;
  let minute;
  let hour;
  const setClock = () => {
    setInterval(() => {
      datetime = newDate.timeNow();
      second = datetime.slice(6, 8) * 360 / 60;
      minute = datetime.slice(3, 5) * 360 / 60;
      hour = datetime.slice(0, 2) * 360 / 12 + (minute / 12);
      if (hour === 360) {
        hour = 0;
      }
      if (minute === 360) {
        minute = 0;
      }
      if (second === 360) {
        second = 0;
      }

      TweenMax.to('.hourHand', 1, { rotation: `${hour}_short`, transformOrigin: 'bottom' });
      TweenMax.to('.minuteHand', 1, { rotation: `${minute}_short`, transformOrigin: 'bottom' });
      TweenMax.to('.secondHand', 1, { rotation: `${second}_short`, transformOrigin: 'bottom' });
    }, 1000);
  };

  // ////////////////////////////////
  // /////////Day & Night////////////
  // ////////////////////////////////
  factory.setBackground = () => {
    const datetime1 = newDate.timeNow();
    const minute1 = datetime1.slice(3, 5) * 360 / 60;
    const hour1 = datetime1.slice(0, 2) * 360 / 12 + (minute1 / 12);
    if (hour1 > 180 && hour1 < 540) {
      $('.ground').css('background-image', 'url(../img/woods_day.png)');
    } else {
      $('.ground').css('background-image', 'url(../img/woods_night.png)');
    }
  };

  // //////////////////////////////
  // //////// EVOLUTION ///////////
  // //////////////////////////////
  const setEvolution = () => {
    if (stats.progress > 50) {
      TweenMax.to('.tusks', 0, { alpha: 1 });
      TweenMax.to('.claws', 0, { alpha: 1 });
    }
  };

  // ////////////////////
  // /////Get Req////////
  // ////////////////////
  factory.getStats = () => {
    return $http.get(`http://35.167.2.107:3000/v1/pet_stats/?id__is=${$rootScope.pet.id}`)
      .then(res => {
        stats = res.data.data[0];
        happiness = stats.happiness;
        stats.progress = (stats.goal_progress / stats.goal_amt) * 100;
        setAccessories();
        setHappiness();
        setEvolution();
        if (stats.accessories.necklace) {
          setClock();
        }
        return stats;
      }, err => {
        console.warn(err);
      });
  };

  // /////////////////////////////////////////////////////
  // ///////Initial Function to Fix Bear Size/////////////
  // /////////////////////////////////////////////////////
  factory.bearGrow = () => {
    TweenMax.to('.bear', 0, { scale: 1.15, y: 130 });
  };

  return factory;
});
