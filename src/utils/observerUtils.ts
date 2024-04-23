export const observerIntersection = (
  target: Element,
  callback1?: () => void
) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("isIntersecting");
        callback1?.();
      }
    });
  });
  observer.observe(target);
};
