document.addEventListener("DOMContentLoaded", function () {
  if (screen.width < 768) {
    alert(
      "You are using a Mobile device. Animations may not work properly. Use a Laptop/PC for a better experience."
    );
  } else if (screen.width >= 768 && screen.width <= 1024) {
    alert(
      "You are using a Tablet. Some features might not be optimized. For the best experience, use a Laptop/PC."
    );
  }
});
function locomotiveWithGsap() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotiveWithGsap();

function navDropdown() {
  let Menu = document.querySelector("#menu");
  let svgs = document.querySelectorAll("#tp svg");
  let NavA = document.querySelectorAll("#nav-elements a");
  let NavCon = document.querySelector("#nav-fixed");
  let NavCrossIcon = document.querySelector("#menu > i");
  let NavCartIcon = document.querySelector("#nav-fixed > i");
  let NavSpans = document.querySelectorAll("#menu span");

  let tl = gsap.timeline();

  tl.to("#hamburger", {
    top: 0,
    delay: 0,
  });

  tl.to("#h-menu a", {
    right: 0,
    opacity: 1,
    delay: 0,
  });

  tl.pause();

  let isOpen = false;

  Menu.addEventListener("click", () => {
    if (!isOpen) {
      tl.play();

      svgs.forEach((e) => {
        e.style.color = "#fff";
      });

      NavCon.style.backgroundColor = "transparent";
      NavCrossIcon.style.display = "flex";
      NavCartIcon.style.color = "#fff";

      NavSpans.forEach((e) => {
        e.style.display = "none";
      });
      NavA.forEach((e) => {
        e.style.color = "#fff";
      });

      isOpen = true;
    } else {
      // Close the menu
      tl.reverse();

      setTimeout(() => {
        svgs.forEach((e) => {
          e.style.color = "#000";
        });

        NavCon.style.backgroundColor = "#f7f7f7";
        NavCrossIcon.style.display = "none";
        NavCartIcon.style.color = "#000";

        NavSpans.forEach((e) => {
          e.style.display = "block";
        });

        NavA.forEach((e) => {
          e.style.color = "#1a1a1a";
        });
      }, 600);

      isOpen = false;
    }
    if (typeof locoScroll !== "undefined") {
      locoScroll.update(); // Refresh Locomotive Scroll
    }
  });
}

navDropdown();
function navAnimation() {
  gsap.from(".carts >img", {
    opacity: 0,
    scale: 1.1,
    scrollTrigger: {
      trigger: ".carts",
      scroller: "#main",
      start: "top 70%",
    },
  });

  gsap.to("#tp", {
    transform: "translateY(-50%)",
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top -5%",
      end: "top -15%",
      scrub: 1,
    },
  });

  gsap.to("#nav-elements a", {
    opacity: 0,
    display: "none",
    y: "-10px",
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top 0%",
      end: "top -20%",
      scrub: true,
    },
  });
}
navAnimation();

function heroFade() {
  let tl = gsap.timeline();

  tl.from("#logo", {
    y: "-100%",
    stagger: 0.5,
    opacity: 0,
    duration: 1,
  });

  tl.from("#navbar div", {
    y: "-100%",
    opacity: 0,
    duration: 0.6,
  });

  tl.from("#hero h1", {
    y: "140%",
    stagger: 0.5,
    opacity: 0,
  });

  tl.from("#photo-container img", {
    opacity: 0,
  });
}
heroFade();

function pointerAnimation() {
  let pointer = document.querySelector(".pointer");

  let photoCon = document.querySelector("#photo-container img ");

  photoCon.addEventListener("mouseenter", () => {
    pointer.style.display = "flex";
    pointer.style.scale = 1;
  });

  photoCon.addEventListener("mouseleave", () => {
    pointer.style.display = "none";
  });

  photoCon.addEventListener("mousemove", (e) => {
    pointer.style.top = `${e.y - 5}px`;
    pointer.style.left = `${e.x - 5}px`;
  });
}
pointerAnimation();

function Page3Cart() {
  gsap.from("#page3-carts", {
    y: 150,
    opacity: 0,
    stagger: 0.4,
    scrollTrigger: {
      trigger: "#page3",
      scroller: "#main",
      start: "top 30%",
      end: "Top 0",
    },
  });
}
Page3Cart();

function Page4Img() {
  gsap.from("#page4 img", {
    y: 200,
    opacity: 0,
    scale: 1.2,
    scrollTrigger: {
      trigger: "#page4 img",
      scroller: "#main",
      start: "top 70%",
    },
  });
}
Page4Img();

function Page5_SVG() {
  gsap.to("#tp", {
    transform: "translateY(50%)",
    scrollTrigger: {
      trigger: "#page5",
      scroller: "#main",
      start: "top -20%",
      end: "top -25%",
      scrub: true,
    },
  });
}
Page5_SVG();