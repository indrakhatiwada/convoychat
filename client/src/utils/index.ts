const initOAuthWindow = (onSuccess: Function) => () => {
  let url =
    process.env.NODE_ENV === "development"
      ? "localhost:4000"
      : window.location.host;

  window.open(
    `${window.location.protocol}//${url}/auth/login`,
    "__blank",
    "width=500&height=800"
  );
  window.addEventListener("message", event => {
    if (event.data === "success") {
      onSuccess();
    }
  });
};

const formatDate = (date: string): string =>
  new Date(Number(date))
    .toDateString()
    .slice(4, 10)
    .toLowerCase();

// https://github.com/withspectrum/spectrum/blob/alpha/admin/src/helpers/utils.js
const timeAgo = (time: string): string | number => {
  const MS_PER_SECOND = 1000;
  const MS_PER_MINUTE = 60 * 1000;
  const MS_PER_HOUR = MS_PER_MINUTE * 60;
  const MS_PER_DAY = MS_PER_HOUR * 24;
  const MS_PER_YEAR = MS_PER_DAY * 365;

  let current: any = new Date();
  let previous: any = new Date(Number(time));
  let elapsed = current - previous

  if (elapsed < MS_PER_MINUTE) {
    return Math.round(elapsed / MS_PER_SECOND) + 's ago';
  } else if (elapsed < MS_PER_HOUR) {
    return Math.round(elapsed / MS_PER_MINUTE) + 'm ago';
  } else if (elapsed < MS_PER_DAY) {
    return Math.round(elapsed / MS_PER_HOUR) + 'h ago';
  } else if (elapsed < MS_PER_YEAR) {
    return Math.round(elapsed / MS_PER_DAY) + 'd ago';
  } else {
    return Math.round(elapsed / MS_PER_YEAR) + 'y ago';
  }
}

const scrollToBottom = (elm: HTMLElement) => {
  if (!elm || !(elm instanceof HTMLElement)) return;
  elm.scrollTop = elm.scrollTop = elm.scrollHeight - elm.clientHeight;
}

export { initOAuthWindow, formatDate, timeAgo, scrollToBottom };